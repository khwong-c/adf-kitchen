import React from 'react';

import {css} from '@emotion/react';

import LabelIcon from '@atlaskit/icon/glyph/label';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';
import {R400} from '@atlaskit/theme/colors';
import {token} from '@atlaskit/tokens';

import type {EditorAppearance} from '@atlaskit/editor-common/dist/types/types';

import FullWidthToggle from './FullWidthToggle.tsx';

const breadcrumbWrapper = css({
    flex: '1 1 80%',
    color: 'rgb(107, 119, 140)',
});

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

interface Props {
    appearance: EditorAppearance;
    onFullWidthChange: (fullWidthMode: boolean) => void;
}

interface State {
    fullWidthMode: boolean;
}

export default class BreadcrumbsMiscActions extends React.Component<
    Props,
    State
> {
    render() {
        return (
            <>
                <div style={wrapper}>
                    <div style={link}>
                        <div style={breadcrumbWrapper}>Breadcrumbs / Placeholder / ...</div>
                    </div>
                    <div style={miscActionsWrapper}>
                        <LabelIcon label="I do nothing"/>
                        <LockFilledIcon
                            label="I do nothing"
                            primaryColor={token('color.icon.accent.red', R400)}
                        />
                        <FullWidthToggle
                            appearance={this.props.appearance}
                            onFullWidthChange={this.props.onFullWidthChange}
                        />
                    </div>

                </div>
                <h1>Title Placeholder</h1>
            </>
        );
    }
}
