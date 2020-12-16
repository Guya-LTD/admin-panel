import React, { Component } from 'react';
import HomeLayout from 'pages/home/Index';
import {
    PanelContainer,
    PanelContainerHeader,
    PanelContainerBody,
    PanelContainerFooter,
    PanelContainerView
} from '@bit/guya-ltd.gcss.templates.panel';
import I18n from 'I18n';

const View = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    return (
        <HomeLayout
            locale={locale}
            route_location='/home/reviews'
        >
            
                Review
            
        </HomeLayout>
    )
}


export default View;