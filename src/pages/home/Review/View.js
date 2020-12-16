import React, { Component } from 'react';
import HomeLayout from 'pages/home/Index';
import {
    PanelContainer,
    PanelContainerHeader,
    PanelContainerBody,
    PanelContainerFooter,
    PanelContainerView
} from '@bit/guya-ltd.gcss.templates.home.panel';
import I18n from 'I18n';

const View = () => {
    /* Users View Header */
    const header = <p>Users view header</p>

    /* Users View Body */
    const body = <p> Users body</p>

    /* Users View Footer */
    const footer = <p>Users Footer</p>
    
    return (
        <HomeLayout
            header={header}
            footer={footer}
        >
            Review
        </HomeLayout>
    )
}


export default View;