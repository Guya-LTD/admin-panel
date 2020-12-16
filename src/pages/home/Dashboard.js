import React, { Component } from 'react';
import HomeLayout from './Index';

const Dashboard = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    /* Props */
    const {} = props;

    /* Dashbaord body */
    const body = <p>Dashboar Body</p>

    return(
        <HomeLayout
            locale={locale}
            route_location='/home/dashboards'
        >
            {body}
        </HomeLayout>
    )
}


export default Dashboard