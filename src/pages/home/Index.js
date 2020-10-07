import React, { Component } from 'react';
import Sidebar from '@bit/guya-ltd.gcss.molecules.sidebar';
import PanelTemplate from '@bit/guya-ltd.gcss.templates.home.panel';
import Logo from '@bit/guya-ltd.gcss.molecules.logo';
import { IoIosArrowDown, IoIosArrowUp, IoIosTrendingUp } from "react-icons/io";
import { IconContext } from "react-icons";

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

    const toggleCollapseListItems = event => {
        alert("hello")
    }

    /* Sidebar Secondary Menu */
    const sidebarSecondaryMenu = 
        <ul className='list list--nav'>             
            <li className='list__item list__collapse' onClick={toggleCollapseListItems}>
                <span className='list__collapse__faciliter'>
                    <span className='list__collapse__faciliter__icon'>
                        <IconContext.Provider value={{ className: "icon" }}>
                            <IoIosTrendingUp />
                        </IconContext.Provider>
                    </span>
                    <span className='list__collapse__faciliter__text'><I18n t="menu.dashboard"/></span>
                    <span className='list__collapse__faciliter__icon list__collapse__faciliter__icon--open'>
                        <IconContext.Provider value={{ className: "icon" }}>
                            <IoIosArrowDown />
                        </IconContext.Provider>
                    </span>
                    <span className='list__collapse__faciliter__icon list__collapse__faciliter__icon--close'>
                        <IconContext.Provider value={{ className: "icon" }}>
                            <IoIosArrowUp />
                        </IconContext.Provider>
                    </span>
                </span>
            </li>
            <ul className='list__collapse__itmes'>
                <li className='list__item'><svg role="img" height='13px' widht='13px' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>KaiOS icon</title><path d="M4.47 0a2.81 2.81 0 0 0-2.84 2.78v18.43A2.8 2.8 0 0 0 4.47 24a2.8 2.8 0 0 0 2.85-2.78V2.78A2.83 2.83 0 0 0 4.47 0zm9.4 8.54a2.8 2.8 0 0 0-3.89-.66 2.68 2.68 0 0 0-.68 3.8l8 11.15a2.81 2.81 0 0 0 3.88.66 2.68 2.68 0 0 0 .74-3.72l-.06-.09-7.98-11.14zm3.65-1.18a3.71 3.71 0 0 0 3.74-3.67A3.71 3.71 0 0 0 17.52.02a3.71 3.71 0 0 0-3.75 3.67 3.71 3.71 0 0 0 3.75 3.67z"/></svg>
                    Apple
                    </li>
                <li className='list__item'>Orange</li>
                <li className='list__item'>Banana</li>
            </ul>
            <li className='list__item'> <svg role="img" height='13px' widht='13px' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>KaiOS icon</title><path d="M4.47 0a2.81 2.81 0 0 0-2.84 2.78v18.43A2.8 2.8 0 0 0 4.47 24a2.8 2.8 0 0 0 2.85-2.78V2.78A2.83 2.83 0 0 0 4.47 0zm9.4 8.54a2.8 2.8 0 0 0-3.89-.66 2.68 2.68 0 0 0-.68 3.8l8 11.15a2.81 2.81 0 0 0 3.88.66 2.68 2.68 0 0 0 .74-3.72l-.06-.09-7.98-11.14zm3.65-1.18a3.71 3.71 0 0 0 3.74-3.67A3.71 3.71 0 0 0 17.52.02a3.71 3.71 0 0 0-3.75 3.67 3.71 3.71 0 0 0 3.75 3.67z"/></svg> Apple</li>
            <li className='list__item active'><svg role="img" height='13px' widht='13px' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>KaiOS icon</title><path d="M4.47 0a2.81 2.81 0 0 0-2.84 2.78v18.43A2.8 2.8 0 0 0 4.47 24a2.8 2.8 0 0 0 2.85-2.78V2.78A2.83 2.83 0 0 0 4.47 0zm9.4 8.54a2.8 2.8 0 0 0-3.89-.66 2.68 2.68 0 0 0-.68 3.8l8 11.15a2.81 2.81 0 0 0 3.88.66 2.68 2.68 0 0 0 .74-3.72l-.06-.09-7.98-11.14zm3.65-1.18a3.71 3.71 0 0 0 3.74-3.67A3.71 3.71 0 0 0 17.52.02a3.71 3.71 0 0 0-3.75 3.67 3.71 3.71 0 0 0 3.75 3.67z"/></svg> Orange</li>
            <li className='list__item'>Banana</li>
        </ul>

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


export default Index;