import {useMemo, useState} from "react";
import {ComposableEditor} from '@atlaskit/editor-core/composable-editor';
import {useUniversalPreset} from '@atlaskit/editor-core/preset-universal';

import createSelectedPlugin from "./editor/selectedPlugin";
import {usePreset} from "@atlaskit/editor-core/use-preset";
import {useSharedPluginState} from "@atlaskit/editor-common/hooks";

import editorProps from "./editor/editorProps";
import {contentStyles, wrapperStyles} from "./editor/styles"
import Toolbar from "./editor/Toolbar";
import BreadcrumbsControl from "./editor/BreadcrumbsControl";
import ADFImportDialog from "./dialogs/ImportDialog.tsx";
import ADFExportDialog from "./dialogs/ExportDialog.tsx";

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
    const presetProps = {props: editorProps};
    const universalPreset = useUniversalPreset(presetProps);
    const {editorApi, preset} = usePreset(() => {
            return universalPreset
                .add(createSelectedPlugin)
        },
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
                                    (doc)=>{
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
                        <BreadcrumbsControl
                            isFullPage={state.isFullPage}
                            onClick={toggleFullPage}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default App
