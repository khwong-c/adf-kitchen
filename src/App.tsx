import {Fragment, useMemo, useState} from "react";
import {ComposableEditor} from '@atlaskit/editor-core/composable-editor';
import {createEditorPreset} from "./editor/editorPreset";
import {usePreset} from "@atlaskit/editor-core/use-preset";
import {useSharedPluginState} from "@atlaskit/editor-common/hooks";
import {contentStyles, wrapperStyles} from "./editor/styles"
import Toolbar from "./editor/Toolbar";
import BreadcrumbsControl from "./editor/BreadcrumbsControl";
import ADFImportDialog from "./dialogs/ImportDialog";
import ADFExportDialog from "./dialogs/ExportDialog";
import type {JSONDocNode} from '@atlaskit/editor-json-transformer';

const App = () => {
    // App states and ADF document
    const [state, setState] = useState({
        isFullPage: true,
        isImportOpen: false,
        isExportOpen: false,
    });
    const [exportedCode, setExportedCode] = useState("{}");
    const [importedAdf, setImportedAdf] = useState("{}");
    // const [tourStep, setTourStep] = useState<null | number>(null);

    // Preset features
    const {editorApi, preset} = usePreset(
        () => createEditorPreset(
            state.isFullPage ? 'full-page' : 'full-width',
        ),
        [state.isFullPage],
    );
    // Selected Elements
    const {selectedPluginState} = useSharedPluginState(editorApi, ['selectedPlugin']);
    const selectedElements = useMemo(
        () => selectedPluginState?.adf ?? [],
        [selectedPluginState],
    )

    // State Manager
    const toggleFullPage = () => setState({...state, isFullPage: !state.isFullPage});
    const closeImportDialog = () => setState({...state, isImportOpen: false});
    const openImportDialog = () => setState({...state, isImportOpen: true});
    const exportCode = (items: object[] | object) => {
        setExportedCode(JSON.stringify(items, null, 2));
    }
    const openExportDialog = () => setState({...state, isExportOpen: true});
    const closeExportDialog = () => setState({...state, isExportOpen: false});


    return (
        <div style={wrapperStyles}>
            <div style={contentStyles}>
                <ADFImportDialog isOpen={state.isImportOpen}
                                 adfDoc={importedAdf}
                                 setAdfDoc={setImportedAdf}
                                 onCloseDialog={closeImportDialog}
                                 onImport={() => {
                                     editorApi?.core?.actions?.replaceDocument(importedAdf);
                                     closeImportDialog();
                                 }}
                />
                <ADFExportDialog isOpen={state.isExportOpen}
                                 exportedCode={exportedCode}
                                 onCloseDialog={closeExportDialog}
                />
                <ComposableEditor
                    appearance={state.isFullPage ? 'full-page' : 'full-width'}
                    preset={preset}
                    primaryToolbarComponents={[
                        Toolbar({
                            selections: selectedElements,
                            onClickExportSelected() {
                                exportCode(selectedElements);
                                openExportDialog();
                            },
                            onClickExportAll() {
                                editorApi?.core?.actions?.requestDocument(
                                    (doc?: JSONDocNode) => {
                                        exportCode(doc!);
                                        openExportDialog();
                                    }
                                );
                            },
                            onClickHelp() {
                            },
                            onClickImport: openImportDialog,
                        })
                    ]}
                    contentComponents={
                        <Fragment>
                            <BreadcrumbsControl
                                isFullPage={state.isFullPage}
                                onClick={toggleFullPage}
                            /><p/>
                        </Fragment>
                    }
                />
            </div>
        </div>
    )
}

export default App
