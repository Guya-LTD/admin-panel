import React, { Component } from 'react';
import HomeLayout from './Index';

const Dashboard = (props) => {
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
            body={body}
            footer={footer}
        />
    )
}


export default Dashboard