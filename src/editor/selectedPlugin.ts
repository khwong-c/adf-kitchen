import {type EditorState, PluginKey} from '@atlaskit/editor-prosemirror/state';
import {SafePlugin} from '@atlaskit/editor-common/safe-plugin';
import type {PMPluginFactoryParams} from "@atlaskit/editor-common/types";
import {pluginFactory} from '@atlaskit/editor-common/utils';


// A plugin to get the selected ADF Object from the editor

const pluginName = 'selectedPlugin';

export type SelectedPluginState = {
    adf?: object[];
};

export const selectedPluginKey = new PluginKey<SelectedPluginState>(pluginName);

const {getPluginState, createPluginState} = pluginFactory(
    selectedPluginKey,
    (state: SelectedPluginState) => state,
    {
        onSelectionChanged: (editorState ?: EditorState) => {
            if (!editorState) return {
                adf: [],
            };
            const selection = editorState?.selection?.content();
            if (!selection) return {
                adf: [],
            };
            return {
                adf: selection?.toJSON()?.content ?? [],
            };
        },
        onDocChanged: (pluginState: SelectedPluginState) => pluginState || {adf: []},
    },
);

const createPlugin = (
    pmPluginFactoryParams: PMPluginFactoryParams,
) => {
    const {dispatch} = pmPluginFactoryParams;
    return new SafePlugin<SelectedPluginState>({
        key: selectedPluginKey,
        state: createPluginState(dispatch, {adf: [],}),
        getState: getPluginState,
    })
}

export default function selectedPlugin() {
    return {
        name: 'selectedPlugin',
        pmPlugins() {
            return [
                {
                    name: 'selectedPlugin',
                    plugin: (params: PMPluginFactoryParams) => createPlugin(params),
                },
            ];
        },
        getSharedState(editorState: EditorState) {
            return getPluginState(editorState);
        },
    };
}