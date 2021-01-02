import React, { Component } from 'react';
import HomeLayout from './Index';
import { useFetch, useAsync } from 'react-async';

const USERS_URL = '/api/v1/users?limit=0';

const Dashboard = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    const headers = { Accept: 'application/json' }

    const { data, error, isPending, run } = useFetch(USERS_URL, { headers })

    return(
        <HomeLayout
            locale={locale}
            route_location='/home/dashboards'
        >
            <div style={{marginTop: "50px", marginLeft: '134px'}} className="row">
                <div class="col-sm-12 col-md-6 col-lg-3">
                    <div className="card" style={{marginBottom: "2.2rem", border: "none", borderRadius: ".5rem", boxShadow: "0 4px 25px 0 rgba(0,0,0,.1)"}}>
                        <div style={{padding: "1.5rem"}}>
                            <div style={{width: '46px', height: '46px'}}>
                                <div style={{background: "rgba(115,103,240,.15)", borderRadius: "50%", cursor: "pointer", textAlign: "center", padding: ".5rem"}}>
                                    <div>
                                        <svg style={{color: "#7367f0"}} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="primary"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <div class="title-section">
                                <h2 style={{ marginBottom: ".25rem", marginTop: "1rem"}} className="typography theme-royal-blue">
                                    {(data) || (data != undefined) ? 
                                        ((data.pagination.count)/1000) + 'k'
                                        : 
                                        'Loading...'
                                    }
                                </h2>
                                <p class="typography theme-royal-blue" style={{margin: "0", color: "#626262"}}>Subscribers Gained</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}


export default Dashboard