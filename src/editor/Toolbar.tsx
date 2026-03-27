import {Fragment} from "react";
import {Help} from '@atlaskit/atlassian-navigation';
import Button from '@atlaskit/button/new';
import {RxGithubLogo} from "react-icons/rx";
import {Box, xcss} from "@atlaskit/primitives";

const buttonStyle = xcss({
    marginRight: 'space.100',
});

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

    return <Fragment>
        <Box xcss={buttonStyle}>
            <Help
                onClick={onClickHelp}
                tooltip="Tutorial"
            />
        </Box>
        <Box xcss={buttonStyle}>
            <Button
                onClick={() => {
                    window.open("https://github.com/khwong-c/atlassian-doc-builder")
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    <RxGithubLogo/>ADF Doc Builder
                </div>
            </Button>
        </Box>
        <Box xcss={buttonStyle}>
            <Button
                onClick={onClickImport}
            >
                Import ADF
            </Button>
        </Box>
        <Box xcss={buttonStyle}>
            <Button
                appearance={entryTypesCnt == 0 ? "subtle" : "warning"}
                isDisabled={entryTypesCnt == 0}
                onClick={onClickExportSelected}
            >
                {`Export 
            ${entryTypesCnt != 0 ?
                    `${summary.total} ${entryTypesCnt == 1 ? ` ${Object.keys(summary.entries)[0]}` : "Objects"}` :
                    "None"}`
                }
            </Button>
        </Box>
        <Box xcss={buttonStyle}>
            <Button
                appearance="primary"
                onClick={onClickExportAll}
            >
                Export Document
            </Button>
        </Box>
    </Fragment>
}
export default Toolbar;