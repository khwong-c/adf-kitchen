import {EditorProps, WithEditorActions, Editor} from '@atlaskit/editor-core';
import {Help} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button/new';
import BreadcrumbsMiscActions from './editor/BreadcrumbsMiscActions.tsx';

import {
    Spotlight,
    SpotlightManager,
    SpotlightTarget,
    SpotlightTransition,
} from '@atlaskit/onboarding';

import {token} from '@atlaskit/tokens';

import createSelectedPlugin from './editor/selectedPlugin.ts';
import {useUniversalPreset} from "@atlaskit/editor-core/preset-universal";
import {usePreset} from "@atlaskit/editor-core/use-preset";
import {useSharedPluginState} from "@atlaskit/editor-common/hooks";
import {Fragment, useState} from "react";
import ADFImportDialog from "./ADFImportDialog.tsx";
import ADFExportDialog from "./ADFExportDialog.tsx";
import {RxGithubLogo} from "react-icons/rx";
import OnboardTour from "./OnboardTour.tsx";


type SelectionSummaryType = {
    total: number;
    types: number;
    entries: {
        [x: string]: number,
    },
};

const wrapperStyles = {
    boxSizing: 'border-box',
    height: '100vh',
};
const contentStyles = {
    padding: 0,
    height: '100vh',
    boxSizing: 'border-box',

};
export default function App() {
    // App states and ADF document
    const [state, setState] = useState({
        appearance: "full-page",
        isImportOpen: false,
        isExportOpen: false,
        exportedCode: {},
    });
    const [tourStep, setTourStep] = useState<null | number>(null);
    const [adfDoc, setAdfDoc] = useState({});


    // Create the editor API and selected plugin for once at the beginning
    const universalPreset = useUniversalPreset({props: {}})
    const {editorApi} = usePreset(() => universalPreset, [])
    const [selectedPlugin, _] = useState(createSelectedPlugin({api: editorApi}));

    // Obtain the selected plugin state, the selected objects with the summary
    const {selectedPluginState} = useSharedPluginState(editorApi, ['selectedPlugin']);
    const selectionSummary = (selectedPluginState?.adf || []).reduce(
        (acc: SelectionSummaryType, item: {
            type: string
        }) => {
            acc.total += 1;
            acc.types += acc.entries.hasOwnProperty(item.type) ? 0 : 1;
            acc.entries[item.type] = (acc.entries[item.type] || 0) + 1;
            return acc;
        }, {total: 0, types: 0, entries: {}}
    );
    const exportButtonStr = (selectionSummary.types === 0 && tourStep === null) ? "None" : (
        selectionSummary.types === 1 ? `${selectionSummary.total} ${Object.keys(selectionSummary.entries)[0]}` :
            `${selectionSummary.total} Objects`
    );

    // App control functions
    const openImport = () => setState({...state, isImportOpen: true});
    const closeImport = () => setState({...state, isImportOpen: false});
    const closeExport = () => setState({...state, isExportOpen: false});
    const setFullWidthMode = (fullWidthMode: boolean) => {
        setState({...state, appearance: fullWidthMode ? "full-width" : "full-page"});
    }

    const startTour = () => {
        setTourStep(0)
    };
    const tourNext = () => setTourStep((tourStep || 0) + 1);
    const tourPrev = () => setTourStep((tourStep || 1) - 1);
    const endTour = () => setTourStep(null);

    const editorProps: EditorProps = {
        useStickyToolbar: true,

        allowUndoRedoButtons: true,
        allowRule: true,
        allowTables: {
            advanced: true,
            allowColumnSorting: true,
            stickyHeaders: true,
            allowDistributeColumns: true,
            allowBackgroundColor: true,
        },
        allowBorderMark: true,

        allowExpand: true,

        allowTasksAndDecisions: true,
        allowBreakout: true,
        allowHelpDialog: true,
        allowPanel: true,
        allowTemplatePlaceholders: true,
        allowDate: true,
        allowLayouts: true,
        allowStatus: true,
        allowTextAlignment: true,
        allowIndentation: true,
        showIndentationButtons: true,

        allowFragmentMark: true,
        autoScrollIntoView: true,

        allowTextColor: true,
        codeBlock: {
            allowCopyToClipboard: true,
            appearance: state.appearance,
        },
        featureFlags: {
            // Enabling to catch during dev by default
            'safer-dispatched-transactions': true,
            'sticky-scrollbar': true,
        },
    }
    const toolbarFragment = () => (
        <Fragment>
            <Help
                onClick={(e) => {
                    startTour()
                }}
                style={{marginRight: token('space.100', '8px'),}}
            >Tutorial</Help>
            <SpotlightTarget name="github">
                <Button
                    onClick={(e) => {
                        window.open("https://github.com/khwong-c/atlassian-doc-builder")
                    }}
                    style={{marginRight: token('space.100', '8px'),}}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        <RxGithubLogo/>ADF Doc Builder
                    </div>
                </Button>
            </SpotlightTarget>
            <SpotlightTarget name="import">
                <Button
                    onClick={openImport}
                    style={{marginRight: token('space.100', '8px')}}
                >
                    Import ADF
                </Button>
            </SpotlightTarget>
            <SpotlightTarget name="exportPart">
                <Button
                    appearance={(selectionSummary.total === 0 && tourStep === null) ? "subtle" : "warning"}
                    isDisabled={selectionSummary.total === 0 && tourStep === null }
                    onClick={() => {
                        setState({
                            ...state,
                            exportedCode: (selectedPluginState?.adf || []),
                            isExportOpen: true,
                        });
                    }}
                    style={{marginRight: token('space.100', '8px')}}
                >
                    Export {exportButtonStr} {selectionSummary.total !== 0 ? "Selected" : ""}
                </Button>
            </SpotlightTarget>
            <SpotlightTarget name="exportAll">
                <Button
                    appearance="primary"
                    onClick={() => {
                        setState({
                            ...state,
                            exportedCode: adfDoc,
                            isExportOpen: true,
                        });
                    }}
                    style={{marginRight: token('space.100', '8px')}}
                >
                    Export Document
                </Button>
            </SpotlightTarget>
        </Fragment>
    )

    return (
        <WithEditorActions render={(actions) => (
            <SpotlightManager>
                <div style={wrapperStyles}>
                    <div style={contentStyles}>
                        <ADFImportDialog
                            isOpen={state.isImportOpen} editorActions={actions} closeDialog={closeImport}
                        />
                        <ADFExportDialog
                            isOpen={state.isExportOpen} closeDialog={closeExport} code={state.exportedCode}
                        />
                        <Editor
                            {...editorProps}
                            appearance={state.appearance}

                            editorActions={actions}
                            onChange={(editorView) => {
                                setAdfDoc(editorView.state.doc.toJSON())
                            }}

                            contentComponents={

                                <Fragment>
                                    <SpotlightTarget name={"editor"}>
                                        <BreadcrumbsMiscActions
                                            appearance={state.appearance}
                                            onFullWidthChange={setFullWidthMode}
                                        />
                                    </SpotlightTarget>
                                </Fragment>


                            }
                            primaryToolbarComponents={[toolbarFragment(),]}
                            dangerouslyAppendPlugins={{__plugins: [selectedPlugin]}}
                        />
                    </div>
                </div>
                <SpotlightTransition>
                    <OnboardTour activeSpotlight={tourStep} nextPage={tourNext} prevPage={tourPrev} endTour={endTour}/>
                </SpotlightTransition>
            </SpotlightManager>
        )}/>
    )
}