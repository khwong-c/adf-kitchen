import {EditorProps, EditorActions, WithEditorActions, Editor} from '@atlaskit/editor-core';
import {AtlassianIcon} from '@atlaskit/logo';
import {
    AtlassianNavigation,
    Help,
    PrimaryButton,
    ProductHome,
} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button/new';
import BreadcrumbsMiscActions from './editor/BreadcrumbsMiscActions.tsx';


import {token} from '@atlaskit/tokens';

import createSelectedPlugin from './editor/selectedPlugin.ts';
import {useUniversalPreset} from "@atlaskit/editor-core/preset-universal";
import {usePreset} from "@atlaskit/editor-core/use-preset";
import {useSharedPluginState} from "@atlaskit/editor-common/hooks";
import {Fragment, useState} from "react";
import ADFImportDialog from "./ADFImportDialog.tsx";
import ADFExportDialog from "./ADFExportDialog.tsx";

type SelectionSummaryType = {
    total: number;
    types: number;
    entries: {
        [x: string]: number,
    },
};

const ProductHomeBadge = () => (
    <ProductHome
        icon={AtlassianIcon}
        logo={AtlassianIcon}
        siteTitle="ADF Kitchen"
        href="https://github.com/khwong-c/atlassian-doc-builder"
    />
);

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
    const [state, setState] = useState({
        appearance: "full-page",
        isImportOpen: false,
        isExportOpen: false,
        exportedCode: {},
    });
    const editorProps: EditorProps = {
        allowUndoRedoButtons: true,
        allowRule: true,
        allowTables: {
            advanced: true,
            allowColumnSorting: true,
            stickyHeaders: true,
            allowDistributeColumns: true,
            allowBackgroundColor: true,
        },
        // allowBorderMark: true,

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
        codeBlock:{
            allowCopyToClipboard: true,
            appearance: state.appearance,
        },
    }
    const universalPreset = useUniversalPreset({props: editorProps})
    const {preset, editorApi} = usePreset(() => {
        return universalPreset.add(createSelectedPlugin);
    }, []);
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


    const openImport = () => setState({...state, isImportOpen: true});
    const closeImport = () => setState({...state, isImportOpen: false});
    const openExport = () => setState({...state, isExportOpen: true});
    const closeExport = () => setState({...state, isExportOpen: false});
    const setFullWidthMode = (fullWidthMode: boolean) => {
        setState({...state, appearance: fullWidthMode ? "full-width" : "full-page"});
    }
    const setExportedCode = (exportedCode: any) => {
        setState({...state, exportedCode: exportedCode});
    }


    const exportButtonStr = selectionSummary.types === 0 ? "None" : (
        selectionSummary.types === 1 ? `${selectionSummary.total} ${Object.keys(selectionSummary.entries)[0]}` :
            `${selectionSummary.total} Objects`
    );

    const [adfDoc, setAdfDoc] = useState({});
    return (
        <WithEditorActions render={(actions) => (


                <div style={wrapperStyles}>
                    <div style={contentStyles}>
                        <ADFImportDialog
                            isOpen={state.isImportOpen} editorActions={actions} closeDialog={closeImport}
                        />
                        <ADFExportDialog
                            isOpen={state.isExportOpen} closeDialog={closeExport} code={state.exportedCode}
                        />
                        <Editor
                            editorActions={actions}
                            onChange={(editorView) => {
                                setAdfDoc(editorView.state.doc.toJSON())
                            }}

                            appearance={state.appearance}
                            useStickyToolbar={true}

                            featureFlags={{
                                // Enabling to catch during dev by default
                                'safer-dispatched-transactions': true,
                                'table-drag-and-drop': true,
                                'table-preserve-width': true,
                                'sticky-scrollbar': true,
                            }}
                            contentComponents={
                                <Fragment>
                                    <BreadcrumbsMiscActions
                                        appearance={state.appearance}
                                        onFullWidthChange={setFullWidthMode}
                                    />
                                </Fragment>
                            }

                            primaryToolbarComponents={[
                                <Fragment>
                                    <Button
                                        onClick={openImport}
                                        style={{marginRight: token('space.100', '8px')}}
                                    >
                                        Import ADF
                                    </Button>
                                    <Button
                                        appearance={selectionSummary.total === 0 ? "subtle" : "warning"}
                                        isDisabled={selectionSummary.total === 0}
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
                                        Export All
                                    </Button>
                                </Fragment>,

                            ]}

                            preset={preset}
                        />
                    </div>
                </div>

        )}/>
    )
}