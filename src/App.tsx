import {useState} from "react";
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
import Tutorial from "./tutorial/Tutorial";
import {SpotlightManager, SpotlightTarget, SpotlightTransition,} from '@atlaskit/onboarding';

const App = () => {
    // App states and ADF document
    const [isFullPage, setIsFullPage] = useState(true);
    const [isImportOpen, setIsImportOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);
    const [exportedCode, setExportedCode] = useState("{}");
    const [importedAdf, setImportedAdf] = useState("{}");
    const [tourStep, setTourStep] = useState<number | null>(null);

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

    // Tutorial Actions
    const startTour = () => setTourStep(0);
    const endTour = () => setTourStep(null);
    const nextTourStep = () => setTourStep(Math.min((tourStep ?? 0) + 1, 4));
    const prevTourStep = () => setTourStep(Math.max((tourStep ?? 0) - 1, 0));


    return (
        <SpotlightManager>
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
                                tourStep: tourStep,
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
                                onClickHelp: startTour,
                                onClickImport: openImportDialog,
                            })
                        ]}
                        contentComponents={
                            <SpotlightTarget name={"editor"}>
                                <BreadcrumbsControl
                                    isFullPage={isFullPage}
                                    onClick={toggleFullPage}
                                /><p/>
                            </SpotlightTarget>
                        }
                    />
                </div>
            </div>
            <SpotlightTransition>
                <Tutorial activeSpotlight={tourStep}
                          nextPage={nextTourStep}
                          prevPage={prevTourStep}
                          endTour={endTour}/>
            </SpotlightTransition>
        </SpotlightManager>
    )
}

export default App
