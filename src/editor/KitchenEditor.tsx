import {Editor, EditorActions} from '@atlaskit/editor-core';
import type {EditorPresetBuilder} from "@atlaskit/editor-common/preset";

import {token} from '@atlaskit/tokens';
import {CSSProperties} from "react";

import {EditorView} from "prosemirror-view";

const wrapperCss: CSSProperties = {
    height: '100%',

}
const contentCss: CSSProperties = {
    padding: `0 ${token('space.250', '20px')}`,
    height: '100%',
    background: token('color.background.neutral.subtle', '#fff'),
    boxSizing: 'border-box',
}


export default function KitchenEditor(props: {
    preset: EditorPresetBuilder,
    actions: EditorActions,
    onChange: (editorView: EditorView) => void,
}) {
    return (
        <div style={wrapperCss}>
            <div style={contentCss}>
                <Editor
                    appearance="full-width"
                    preset={props.preset}
                    editorActions={props.actions}
                    onChange={(editorView) => {
                        props.onChange(editorView)
                    }}
                />
            </div>
        </div>
    )
}
