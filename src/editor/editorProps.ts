import type {EditorProps} from "@atlaskit/editor-core";

export const editorProps: EditorProps = {
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
    },
    featureFlags: {
        // Enabling to catch during dev by default
        'safer-dispatched-transactions': true,
        'sticky-scrollbar': true,
    },
}

export default editorProps;