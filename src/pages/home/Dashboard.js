import React, { Component } from 'react';
import HomeLayout from './Index';

const Dashboard = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    /* Props */
    const {} = props;

    /* Dashboard Header */
    const header = <p>Dahboard Header</p>

    /* Dashbaord body */
    const body = <p>Dashboar Body</p>

    /* Dashboard footer */
    const footer = <p>Dahboard Footer</p>

    return(
        <HomeLayout
            header={header}
            footer={footer}
            locale={locale}
            route_location='/home/dashboards'
        >
            {body}
        </HomeLayout>
    )
}


export default Dashboard