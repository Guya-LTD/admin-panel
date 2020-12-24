import React, { Component, useState } from 'react';
import { Redirect, NavLink as RouterNavLink } from 'react-router-dom';
import { NavLink } from 'react-router-i18n';
import List from '@bit/guya-ltd.gcss.molecules.list';
import Sidebar from '@bit/guya-ltd.gcss.molecules.sidebar';
import PanelTemplate from '@bit/guya-ltd.gcss.templates.panel';
import Logo from '@bit/guya-ltd.gcss.molecules.logo';
import Link from '@bit/guya-ltd.gcss.atoms.link';
import Dropdown from '@bit/guya-ltd.gcss.molecules.dropdown';
import Avatar from '@bit/guya-ltd.gcss.atoms.avatar';
import ProfileLink from '@bit/guya-ltd.gcss.molecules.profilelink';
import Cookies from 'universal-cookie';
import {
    ChevronUpOutline,
    ChevronDownOutline,
    LayersOutline,
    Language,
    LogOutOutline,
    AnalyticsOutline,
    Search as SearchIcon,
    ChatboxEllipsesOutline,
    PeopleOutline,
    ChatbubblesOutline,
    StorefrontOutline,
    MapOutline
}from 'react-ionicons-icon';

import Authorization from 'hocs/Authorization';
import I18n from 'I18n';

const Index = (props) => {
    /* Props */
    const {footer, children, locale, route_location} = props;

    const cookies = new Cookies();

    /* State hooks */
    const [logoutRedirect, setLogoutredirect] = useState(false);

    const logoutFun = () => {
        cookies.remove('loged_in', { path: '/admin-panel' })
        cookies.remove('email', { path: '/admin-panel' })
        cookies.remove('name', { path: '/admin-panel' })
        cookies.remove('token', { path: '/admin-panel' })
        /*
        cookies.set('loged_in', false, { path: '/admin-panel' })
        cookies.set('email', '', { path: '/admin-panel' })
        cookies.set('name', '', { path: '/admin-panel' })
        cookies.set('token', '', { path: '/admin-panel' })
        */
        setLogoutredirect(true);
    }

    /* Sidebar logo */
    const sidebarPrimaryMenuLogo = <Logo src={process.env.PUBLIC_URL + '/images/admin-panel-logo-outline.png'} size='xs' />

    /* Sidebar Top */
    const sidebarPrimaryMenuTop = <>
                                <Dropdown
                                        type="is-hoverable is-up is-artl"
                                        trigger={
                                            <Language fill="white" />
                                        }
                                    >
                                        <NavLink ignoreLocale to= { "/en" + route_location } className="link link--md theme-royal-blue dropdown-item">
                                            English
                                        </NavLink>
                                        <NavLink ignoreLocale to={ "/am" + route_location } className="link link--md theme-royal-blue dropdown-item">
                                            እማርኛ
                                        </NavLink>
                                    </Dropdown>
    </>

    /* Sidebar Bottom */
    const sidebarPrimaryMenuBottom = <>
                                <Dropdown
                                        type="is-hoverable is-up is-artl"
                                        trigger={
                                            <Avatar src={process.env.PUBLIC_URL + '/images/no-photo.svg'} />
                                        }
                                    >
                                        <ProfileLink
                                            theme="royal-blue"
                                            photo={ <Avatar src={process.env.PUBLIC_URL + '/images/no-photo.svg'}  size="sm" /> }
                                            name={cookies.get('name')}
                                            description={cookies.get('email')}
                                            cls="dropdown-item"
                                        />
                                        <Link theme="royal-blue" cls="dropdown-item" onClick={logoutFun}>
                                            <span><LogOutOutline size="18px" /></span>
                                            <I18n t="logout" />
                                        </Link>
                                    </Dropdown>
    </>

    /* Sidebar Primay Menu */
    const sidebarPrimaryMenu = {
        logo: sidebarPrimaryMenuLogo,
        top: sidebarPrimaryMenuTop,
        bottom: sidebarPrimaryMenuBottom
    }

    /* Lists Array */
    const lists = [
        {
            type: 'faciliter',
            faciliter: {
                text: <I18n t='menu.dashboard' />,
                icon: <LayersOutline size="20px" />,
                open: <ChevronDownOutline size="20px" />,
                close: <ChevronUpOutline size="20px" />
            }
        },
        {
            type: 'collapse',
            collapse: [
                <Link size='sm' theme='royal-blue'> <I18n t='menu.all' /> </Link>,
                <Link size='sm' theme='royal-blue'> <I18n t='menu.sales' /> </Link>
            ]
        },
        { 
            type: 'single', 
            list: <>
                    <RouterNavLink to={'/' + locale + '/home/users'} activeClassName="active" className={route_location == '/home/user' ? "link link--sm theme-royal-blue active" : "link link--sm theme-royal-blue"}>
                        <span><PeopleOutline size="20px" /></span>
                            <I18n t="users" />
                    </RouterNavLink>
                    <br />
                    <br />
                    <RouterNavLink to={'/' + locale + '/home/chat'} activeClassName="active" className={route_location == '/home/reviews' ? "link link--sm theme-royal-blue active" : "link link--sm theme-royal-blue"}>
                        <span><ChatbubblesOutline size="20px" /></span>
                        <I18n t="chat" />
                    </RouterNavLink>
                    <br />
                    <br />
                    <RouterNavLink to={'/' + locale + '/home/reviews'} activeClassName="active" className={route_location == '/home/reviews' ? "link link--sm theme-royal-blue active" : "link link--sm theme-royal-blue"}>
                        <span><ChatboxEllipsesOutline size="20px" /></span>
                        <I18n t="reviews" />
                    </RouterNavLink>
                    <br />
                    <br />
                    <RouterNavLink to={'/' + locale + '/home/branches'} activeClassName="active" className={route_location == '/home/branches' ? "link link--sm theme-royal-blue active" : "link link--sm theme-royal-blue"}>
                        <span><StorefrontOutline size="20px" /></span>
                        <I18n t="branches" />
                    </RouterNavLink>
                    <br />
                    <br />
                    <RouterNavLink to={'/' + locale + '/home/tracking'} activeClassName="active" className={route_location == '/home/tracking' ? "link link--sm theme-royal-blue active" : "link link--sm theme-royal-blue"}>
                        <span><MapOutline size="20px" /></span>
                        <I18n t="tracking" />
                    </RouterNavLink>
                </>
        }
    ]

    /* Sidebar Secondary Menu */
    const sidebarSecondaryMenu = <List lists={lists} />

    /* Sidebar Menu */
    const sidebarMenu = {
        primary: sidebarPrimaryMenu,
        secondary: sidebarSecondaryMenu
    }

    /* Sidebar */
    const sidebar = <Sidebar theme='royal-blue' variant='primary' menu={sidebarMenu} />

    return (
        <PanelTemplate
            sidebar={sidebar}
            >
            {logoutRedirect && <Redirect to='/' />}
            {children}
        </PanelTemplate>
    )
}


//export default Authorization(Index);
export default Index;