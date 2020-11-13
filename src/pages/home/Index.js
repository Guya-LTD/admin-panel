import React, { Component } from 'react';
import List from '@bit/guya-ltd.gcss.molecules.list';
import Sidebar from '@bit/guya-ltd.gcss.molecules.sidebar';
import PanelTemplate from '@bit/guya-ltd.gcss.templates.home.panel';
import Logo from '@bit/guya-ltd.gcss.molecules.logo';
import Link from '@bit/guya-ltd.gcss.atoms.link';
import { IconContext } from "react-icons";
import { 
    IoIosArrowDown, 
    IoIosArrowUp, 
    IoIosTrendingUp, 
    IoIosRadioButtonOff } from "react-icons/io";

import Authorization from 'hocs/Authorization';
import I18n from 'I18n';

const Index = (props) => {
    /* Props */
    const {header, body, footer} = props;

    /* Sidebar logo */
    const sidebarPrimaryMenuLogo = <Logo src='/images/admin-panel-logo-outline.png' size='xs' />

    /* Sidebar Top */
    const sidebarPrimaryMenuTop = null

    /* Sidebar Bottom */
    const sidebarPrimaryMenuBottom = null

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
                icon: <IconContext.Provider value={{ className: "icon icon--sm" }}> <IoIosTrendingUp /> </IconContext.Provider>,
                open: <IconContext.Provider value={{ className: "icon icon--sm" }}> <IoIosArrowDown /> </IconContext.Provider>,
                close: <IconContext.Provider value={{ className: "icon icon--sm" }}> <IoIosArrowUp /> </IconContext.Provider>
            }
        },
        {
            type: 'collapse',
            collapse: [
                <Link size='sm' theme='royal-blue'> <I18n t='menu.all' /> </Link>,
                <Link size='sm' theme='royal-blue'> <I18n t='menu.sales' /> </Link>
            ]
        },
        
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
            header={header}
            footer={footer}
            >
            {body}
        </PanelTemplate>
    )
}


export default Authorization(Index);