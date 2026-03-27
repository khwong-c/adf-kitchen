import {alignmentPlugin} from '@atlaskit/editor-plugins/alignment';
import {blockControlsPlugin} from '@atlaskit/editor-plugins/block-controls';
import {blockMenuPlugin} from '@atlaskit/editor-plugins/block-menu';
import {batchAttributeUpdatesPlugin} from '@atlaskit/editor-plugins/batch-attribute-updates';
import {borderPlugin} from '@atlaskit/editor-plugins/border';
import {breakoutPlugin} from '@atlaskit/editor-plugins/breakout';
import {contentInsertionPlugin} from '@atlaskit/editor-plugins/content-insertion';
import {datePlugin} from '@atlaskit/editor-plugins/date';
import {emojiPlugin} from '@atlaskit/editor-plugins/emoji';
import {fragmentPlugin} from '@atlaskit/editor-plugins/fragment';
import {indentationPlugin} from '@atlaskit/editor-plugins/indentation';
import {insertBlockPlugin} from '@atlaskit/editor-plugins/insert-block';
import {layoutPlugin} from '@atlaskit/editor-plugins/layout';
import {listPlugin} from '@atlaskit/editor-plugins/list';
import {panelPlugin} from '@atlaskit/editor-plugins/panel';
import {pasteOptionsToolbarPlugin} from '@atlaskit/editor-plugins/paste-options-toolbar';
import {placeholderTextPlugin} from '@atlaskit/editor-plugins/placeholder-text';
import {rulePlugin} from '@atlaskit/editor-plugins/rule';
import {scrollIntoViewPlugin} from '@atlaskit/editor-plugins/scroll-into-view';
import {statusPlugin} from '@atlaskit/editor-plugins/status';
import {tablesPlugin} from '@atlaskit/editor-plugins/table';
import {tasksAndDecisionsPlugin} from '@atlaskit/editor-plugins/tasks-and-decisions';
import {textColorPlugin} from '@atlaskit/editor-plugins/text-color';
import {toolbarListsIndentationPlugin} from '@atlaskit/editor-plugins/toolbar-lists-indentation';

import selectedPlugin from './selectedPlugin'

import {createDefaultPreset} from '@atlaskit/editor-core/preset-default';
import type {EditorAppearance} from "@atlaskit/editor-common/dist/types/types";


export const createEditorPreset = (
    appearance?: EditorAppearance
) => {
    const featureFlags = {}
    const preset = createDefaultPreset({
        appearance,
        allowUndoRedoButtons: true,
        preferenceToolbarAboveSelection: true,
        toolbar: {
            enableNewToolbarExperience: true,
        },
        placeholder: {
            placeholder: 'Write something...',
        },
        blockType: {
            allowFontSize: true,
        },
        base: {
            inputTracking: {enabled: false},
        },
    });
    const getEditorFeatureFlags = () => featureFlags;
    const isFullPage = appearance === 'full-page';

    return preset
        .add(contentInsertionPlugin)
        .add(batchAttributeUpdatesPlugin)
        .add([blockControlsPlugin, {
            rightSideControlsEnabled: true,
            quickInsertButtonEnabled: true,
        }])
        .add(blockMenuPlugin)
        .add([breakoutPlugin, {
            allowBreakoutButton: isFullPage,
            appearance: appearance
        }])
        .add(listPlugin)
        .add(alignmentPlugin)
        .add(textColorPlugin)
        .add(rulePlugin)
        .add([tasksAndDecisionsPlugin, {
            allowNestedTasks: false,
            consumeTabs: true,
            useLongPressSelection: false,
        }])
        .maybeAdd(emojiPlugin, false)
        .add([panelPlugin, {useLongPressSelection: false, allowCustomPanel: false, allowCustomPanelEdit: false}])
        .add([datePlugin, {
            weekStartDay: 1
        }])
        .add([placeholderTextPlugin, {}])
        .add([tablesPlugin, {
            tableOptions: {
                advanced: true,
                allowControls: true,
                allowBackgroundColor: true,
            },
            dragAndDropEnabled: true, // featureFlags.tableDragAndDrop,
            isTableScalingEnabled: true,
            allowContextualMenu: true,
            fullWidthEnabled: false,
            wasFullWidthEnabled: false, // prevAppearance && prevAppearance === 'full-width',
            getEditorFeatureFlags,
            isCommentEditor: false,
            isChromelessEditor: false,
            allowFixedColumnWidthOption: true,
        }])
        .add([layoutPlugin, {
            UNSAFE_allowSingleColumnLayout: false,
            editorAppearance: appearance,
            allowBreakout: true,
        }])
        .add([statusPlugin, {
            menuDisabled: false,
            allowZeroWidthSpaceAfter: true
        }])
        .add(indentationPlugin)
        .add(scrollIntoViewPlugin)
        .add([toolbarListsIndentationPlugin, {
            showIndentationButtons: true,
            allowHeadingAndParagraphIndentation: true,
        }])
        .maybeAdd([insertBlockPlugin, {
            appearance,
            allowTables: true,
            allowExpand: false,
            horizontalRuleEnabled: true,
            tableSelectorSupported: true,
            nativeStatusSupported: true,
            showElementBrowserLink: false,
            toolbarButtons: {
                codeBlock: {enabled: true},
                insert: {enabled: true},
                layout: {enabled: true},
                table: {enabled: true},
                taskList: {enabled: true},
            },
        }], true)
        .add(borderPlugin)
        .add(fragmentPlugin)
        .add(pasteOptionsToolbarPlugin)
        .add(selectedPlugin)
};