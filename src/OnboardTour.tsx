import {
    Spotlight,
} from '@atlaskit/onboarding';
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
            A sandboxed environment where you can play around with examples is now
            only one click away.
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[1]}

            heading="Import ADF"
            target={"import"}
        >
            A sandboxed environment where you can play around with examples is now
            only one click away.
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[1]}

            heading="Export Whole Document"
            target={"exportAll"}
        >
            A sandboxed environment where you can play around with examples is now
            only one click away.
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[1]}

            heading="Export Selected Objects"
            target={"exportPart"}
        >
            A sandboxed environment where you can play around with examples is now
            only one click away.
        </Spotlight>,
        <Spotlight
            {...stypeProps}
            {...tourActions[2]}
            heading="Use with ADF Document Builder"
            target={"github"}
        >
            A sandboxed environment where you can play around with examples is now
            only one click away.
        </Spotlight>,
    ];

    if (activeSpotlight === null) {
        return (<></>)
    }

    return spotlights[activeSpotlight];
};