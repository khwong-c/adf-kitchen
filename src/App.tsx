import { useCallback, useState } from 'react';

import { jsx } from '@emotion/react';

import { IconButton } from '@atlaskit/button/new';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { ButtonItem, LinkItem, PopupMenuGroup, Section } from '@atlaskit/menu';
import Popup from '@atlaskit/popup';
import {
    Header,
    NavigationHeader,
    NestableNavigationContent,
    SideNavigation,
} from '@atlaskit/side-navigation';

import {
    Content,
    LeftSidebar,
    Main,
    PageLayout,
    RightSidebar,
    useLeftSidebarFlyoutLock,
} from '@atlaskit/page-layout';

import KitchenEditor from './KitchenEditor.tsx'


export default function App(){
    return (
        <PageLayout>
            <Content>
                <LeftSidebar width={450}>
                    <SideNavigation label="Project navigation">
                        <NavigationHeader>
                            <Header description="Sidebar header description">
                                Sidebar Header
                            </Header>
                        </NavigationHeader>
                        <NestableNavigationContent initialStack={[]}>
                            <Section>
                                <LinkItem href="http://www.atlassian.com">
                                    Atlassian
                                </LinkItem>
                            </Section>
                        </NestableNavigationContent>
                    </SideNavigation>
                </LeftSidebar>
                <Main>
                    <h1>Main Content</h1>
                    <KitchenEditor/>
                </Main>
            </Content>
        </PageLayout>
    )
}