import {Fragment, useState} from "react";
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
    const [isFullPage, setIsFullPage] = useState(true);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [exportedCode, setExportedCode] = useState("{}");
    const [importedAdf, setImportedAdf] = useState("{}");
    // const [tourStep, setTourStep] = useState<null | number>(null);

    // Preset features
    const {editorApi, preset} = usePreset(
        () => createEditorPreset(
            isFullPage ? 'full-page' : 'full-width',
        ),
        [isFullPage],
    );
    // Selected Elements
    const {selectedPluginState} = useSharedPluginState(editorApi, ['selectedPlugin']);
    const selectedElements = selectedPluginState?.adf ?? [];

    // State Manager
    const toggleFullPage = () => setIsFullPage(!isFullPage);
    const openImportDialog = () => setIsImportOpen(true);
    const closeImportDialog = () => setIsImportOpen(false);

    const exportCode = (items: object[] | object) => {
        setExportedCode(JSON.stringify(items, null, 2));
    }
    const openExportDialog = () => {
        setIsExportOpen(true)
    };
    const closeExportDialog = () => {
        setIsExportOpen(false)
    };


    return (
        <div style={wrapperStyles}>
            <div style={contentStyles}>
                <ADFImportDialog isOpen={isImportOpen}
                                 adfDoc={importedAdf}
                                 setAdfDoc={setImportedAdf}
                                 onCloseDialog={closeImportDialog}
                                 onImport={() => {
                                     editorApi?.core?.actions?.replaceDocument(importedAdf);
                                     closeImportDialog();
                                 }}
                />
                <ADFExportDialog isOpen={isExportOpen}
                                 exportedCode={exportedCode}
                                 onCloseDialog={closeExportDialog}
                />
                <ComposableEditor
                    appearance={isFullPage ? 'full-page' : 'full-width'}
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
                                isFullPage={isFullPage}
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
