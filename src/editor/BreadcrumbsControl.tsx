import {Fragment} from 'react'
import {token} from '@atlaskit/tokens';
import FullPageToggle from "./FullPageToggle.tsx";

const breadcrumbWrapper = {
    flex: '1 1 80%',
    color: 'rgb(107, 119, 140)',
};

const wrapper = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: token('space.300', '24px'),
};

const link = {
    flex: '1 1 80%',
};

const miscActionsWrapper = {
    flex: '1 1 10%',
    alignContent: 'flex-end',
};

const BreadcrumbsControl = (props: {
    isFullPage: boolean;
    onClick: () => void;
}) => {
    const {isFullPage, onClick} = props;
    return (
        <Fragment>
            <div style={wrapper}>
                <div style={link}>
                    <div style={breadcrumbWrapper}>Breadcrumbs / Placeholder / ...</div>
                </div>
                <div style={miscActionsWrapper}>
                    <FullPageToggle
                        isFullPage={isFullPage}
                        onClick={onClick}
                    />
                </div>
            </div>
            <h1>Title Placeholder</h1>
        </Fragment>
    );
}

export default BreadcrumbsControl;