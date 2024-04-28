import {Spotlight} from '@atlaskit/onboarding';
import {Code} from '@atlaskit/code';
import {N0} from '@atlaskit/theme/colors';

export default function OnboardTour(props: {
    activeSpotlight: number | null;
    nextPage: () => void;
    prevPage: () => void;
    endTour: () => void;
}) {
    const {activeSpotlight, nextPage, prevPage, endTour} = props;
    const stypeProps = {
        targetRadius: 3,
        targetBgColor: N0,
    };
    const tourActions = [
        {
            actions: [
                {onClick: () => nextPage(), text: 'Next'},
                {onClick: () => endTour(), text: 'Dismiss', appearance: 'subtle'},
            ],
        },
        {
            actions: [
                {onClick: () => nextPage(), text: 'Next'},
                {onClick: () => prevPage(), text: 'Back', appearance: 'subtle'},
            ],
        },
        {
            actions: [
                {onClick: () => endTour(), text: 'Done'},
                {onClick: () => prevPage(), text: 'Back', appearance: 'subtle'},
            ],
        },
    ]

    const spotlights = [
        <Spotlight
            {...stypeProps}
            {...tourActions[0]}

            heading="Welcome to ADF Kitchen"
            target={"editor"}
        >
            <p>ADF kitchen is an Atlassian Editor sandbox, allowing user to create ADF Document with graphical
                interface.
                Exported document can be manipulated by our <Code>atlassian-doc-builder</Code> Python library.</p>
            <p>Developers can use <Code>{"{VARIABLE_NAME}"}</Code> syntax as a template variable for dynamic content.
            </p>
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[1]}

            heading="Import ADF"
            target={"import"}
        >
            <p>Developers can import existing ADF document, other than editing the document with the Editor.
                Sample ADF document is available from the import dialog.</p>
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[1]}

            heading="Export The Whole Document"
            target={"exportAll"}
        >
            <p>This opens a dialog exporting the whole document in ADF format. Developers can copy the exported code
                and load it with the <Code>load_adf()</Code> API.</p>
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[1]}

            heading="Export Selected Objects"
            target={"exportPart"}
        >
            <p>Developers can also export selected objects according to the use case (e.g. Dynamic table with variable
                number of rows). <br/> The objects are exported as an array of ADF objects, imported
                by <Code>load_adf()</Code> and inserted to existing document/objects with <Code>extend_content()</Code>
            </p>
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[2]}
            heading="Checkout our Github Repo"
            target={"github"}
        >
            <p>Don't forget to have a check with our Github Repo for further information, and
                integrate <Code>atlassian-doc-builder</Code> to our daily workflows.</p>
        </Spotlight>,
    ];

    if (activeSpotlight === null) {
        return (<></>)
    }

    return spotlights[activeSpotlight];
};