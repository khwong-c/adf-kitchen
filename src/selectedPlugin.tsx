import {PluginKey} from '@atlaskit/editor-prosemirror/state';
import type {EditorState} from '@atlaskit/editor-prosemirror/state';
import {pluginFactory, stepHasSlice} from '@atlaskit/editor-common/utils';
import type {Dispatch} from '@atlaskit/editor-common/event-dispatcher';
import {SafePlugin} from '@atlaskit/editor-common/safe-plugin';
import {DecorationSet} from '@atlaskit/editor-prosemirror/view';

import type {EditorView} from '@atlaskit/editor-prosemirror/view';
import {useEffect} from "react";
import {useSharedPluginState} from "@atlaskit/editor-common/hooks";

type SelectedPluginState = {
    adf: Array<any>
};

export const selectedPluginKey = new PluginKey<SelectedPluginState>('selectedPlugin');

const reducer = (pluginState: SelectedPluginState, action: unknown) => {
    return pluginState;
}


const {getPluginState, createPluginState} = pluginFactory(
    selectedPluginKey,
    reducer,
    {
        onSelectionChanged: (tr, pluginState: SelectedPluginState, editorState: EditorState) => {
            const selection = editorState.selection.content().toJSON();
            console.log(selection?.content ?? []);
            return {
                adf: selection?.content ?? [],
            };
        },
    },
);

const createPlugin = (
    dispatch: Dispatch,
) => {
    return new SafePlugin<SelectedPluginState>({
        key: selectedPluginKey,
        state: createPluginState(dispatch, {
            adf: [],
        }),
    });
};

export default ({api}) => {
    return {
        name: 'selectedPlugin',
        pmPlugins() {
            return [
                {
                    name: 'selectedPlugin',
                    plugin: ({dispatch}: { dispatch: Dispatch }) => createPlugin(dispatch),
                },
            ];
        },
        getSharedState(editorState: EditorState) {
            return getPluginState(editorState);
        },
    };
}