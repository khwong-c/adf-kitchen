import {PluginKey} from '@atlaskit/editor-prosemirror/state';
import type {EditorState} from '@atlaskit/editor-prosemirror/state';
import {pluginFactory} from '@atlaskit/editor-common/utils';
import type {Dispatch} from '@atlaskit/editor-common/event-dispatcher';
import {SafePlugin} from '@atlaskit/editor-common/safe-plugin';

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
            return {
                adf: selection?.content ?? [],
            };
        },
        onDocChanged: (tr, pluginState: SelectedPluginState, editorState: EditorState) => {
            return pluginState;
        }
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

export default function selectedPlugin ({api}) {
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