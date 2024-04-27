import {Editor, EditorProps} from '@atlaskit/editor-core';
import { useSharedPluginState } from '@atlaskit/editor-common/hooks';
import type {EditorView} from '@atlaskit/editor-prosemirror/view';

import {token} from '@atlaskit/tokens';
import {CSSProperties, useEffect} from "react";
import {useUniversalPreset} from "@atlaskit/editor-core/preset-universal";
import {usePreset} from "@atlaskit/editor-core/use-preset";

import createSelectedPlugin from "./selectedPlugin.tsx";
import {createDefaultPreset} from "@atlaskit/editor-core/preset-default";

const wrapperCss: CSSProperties = {
    height: '100vh',
}
const contentCss: CSSProperties = {
    padding: `0 ${token('space.250', '20px')}`,
    height: '100%',
    background: token('color.background.neutral.subtle', '#fff'),
    boxSizing: 'border-box',
}


export default function App() {
    const editorProps: EditorProps = {
        appearance: "full-page",
        allowUndoRedoButtons: true,
        allowRule: true,
        allowTables: true,
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
    }
    const universalPreset = useUniversalPreset({props: editorProps})
    const {preset, editorApi} = usePreset(() => {
        return universalPreset.add(createSelectedPlugin);
    }, []);
    const {selectedPluginState} = useSharedPluginState(editorApi, ['selectedPlugin']);


    return <div style={wrapperCss}>
        <div style={contentCss}>
            <p>{JSON.stringify(selectedPluginState)}</p>
            <Editor
                preset={preset}
                // onChange={handleChangeInTheEditor}
                // onEditorReady={onEditorReady}
                // editorActions={}
            />
        </div>
    </div>
}
