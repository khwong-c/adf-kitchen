import {Fragment} from "react";
import {Help} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button/new';
import {token} from '@atlaskit/tokens';
import {RxGithubLogo} from "react-icons/rx";

type SelectionSummaryType = {
    total: number;
    entries: object & {
        [x: string]: number,
    },
};

export const Toolbar = (props: {
    selections: Array<object>;
    tourStep?: number;
    onClickHelp: () => void;
    onClickImport: () => void;
    onClickExportSelected: () => void;
    onClickExportAll: () => void;
}) => {
    const {
        selections, tourStep,
        onClickHelp, onClickExportSelected, onClickExportAll, onClickImport
    } = props;

    const summary = (selections || []).reduce(
        (acc: SelectionSummaryType, item: object,) => {
            const itemType = (item as { type: string }).type;
            acc.total += 1;
            acc.entries[itemType] = (acc.entries[itemType] || 0) + 1;
            return acc;
        }, {total: 0, entries: {}}
    );
    const entryTypesCnt = !tourStep ? Object.keys(summary.entries).length : 0;
    // const exportButtonStr = (entryTypesCnt === 0 || tourStep === null) ? "None" :
    //     `${summary.total}${entryTypesCnt == 1 ? ` ${Object.keys(summary.entries)[0]}` : ""}`;

    return <Fragment>
        <Help
            onClick={onClickHelp}
            style={{marginRight: token('space.100', '8px'),}}
        >
            Tutorial
        </Help>
        <Button
            onClick={() => {
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
        <Button
            onClick={onClickImport}
            style={{marginRight: token('space.100', '8px')}}
        >
            Import ADF
        </Button>
        <Button
            appearance={entryTypesCnt == 0 ? "subtle" : "warning"}
            isDisabled={entryTypesCnt == 0}
            onClick={onClickExportSelected}
            style={{marginRight: token('space.100', '8px')}}
        >
            {`Export 
            ${entryTypesCnt != 0 ?
                `${summary.total} ${entryTypesCnt == 1 ? ` ${Object.keys(summary.entries)[0]}` : "Objects"}` :
                "None"}`
            }
        </Button>
        <Button
            appearance="primary"
            onClick={onClickExportAll}
            style={{marginRight: token('space.100', '8px')}}
        >
            Export Document
        </Button>
    </Fragment>
}
export default Toolbar;