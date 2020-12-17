import React, { useState } from 'react';
import {
    PanelContainer,
    PanelContainerHeader,
    PanelContainerBody,
    PanelContainerFooter,
    PanelContainerView
} from '@bit/guya-ltd.gcss.templates.panel';
import {
    ChevronBackOutline
} from 'react-ionicons-icon';
import { Link as RouterLink } from "react-router-dom";
import Tip from '@bit/guya-ltd.gcss.atoms.tip';
import Avatar from '@bit/guya-ltd.gcss.atoms.avatar';
import Typography from '@bit/guya-ltd.gcss.atoms.typography';
import { useFetch, useAsync } from 'react-async';
import HomeLayout from 'pages/home/Index';
import I18n from 'I18n';

const { REACT_APP_API_GATEWAY } = process.env;
const USERS_URL = REACT_APP_API_GATEWAY + '/api/v1/users/';

const View = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    const headers = { Accept: 'application/json' }

    const { data, error, isPending, run } = useFetch(USERS_URL + props.match.params.id, { headers })

    return (
        <HomeLayout locale={locale} route_location={'/home/users/' + props.match.params.id}>
            <PanelContainer>
                <PanelContainerHeader>
                    <RouterLink to={'/' + locale + '/home/users'} className="link link--lg theme-royal-blue">
                        <span><ChevronBackOutline /></span>
                        <I18n t='user' /> - &nbsp; {(data) || (data != undefined) ? data.data.name : ''}
                    </RouterLink>
                </PanelContainerHeader>
            </PanelContainer>
            <div className="col-xs-2" />
            <PanelContainer>
                <div className="row">
                    <div className="col-xs-12">
                        <PanelContainerView>
                            <div className="row">
                                <div className="col-xs-12">
                                    <Typography size='h4' theme='royal-blue'><I18n t="account" /></Typography>
                                </div>
                                <br /> <br /><br />
                                <div className="col-xs-2">
                                    <img src={process.env.PUBLIC_URL + '/images/no-photo.svg'} />
                                </div>
                                <div className="col-xs-10">
                                    <div className="row">
                                        <div className="col-xs-1"><Typography size='sm' theme='royal-blue'><b><I18n t="identity" />:</b></Typography></div>
                                        <div className="col-xs-1">{(data) || (data != undefined) ? data.data.credential.identity : ''}</div>
                                        <div className="col-xs-3" />
                                        <div className="col-xs-2"><Typography size='sm' theme='royal-blue'><b><I18n t="status" />:</b></Typography></div>
                                        <div className="col-xs-1">{(data) || (data != undefined) ? data.data.credential.blocked ? <Tip theme="red" variant="red"><I18n t="blocked" /></Tip> : <Tip theme="royal-blue" variant="green"><I18n t="active" /></Tip> : ''}</div>
                                        <div className="col-xs-4" />{/* New Line */}
                                        <br /> <br />
                                        <div className="col-xs-1"><Typography size='sm' theme='royal-blue'><b><I18n t="name" />:</b></Typography></div>
                                        <div className="col-xs-1">{(data) || (data != undefined) ? data.data.name : ''}</div>
                                        <div className="col-xs-3" />
                                        <div className="col-xs-2"><Typography size='sm' theme='royal-blue'><b><I18n t="role" />:</b></Typography></div>
                                        <div className="col-xs-2">{(data) || (data != undefined) ? data.data.role.name : ''}</div>
                                        <div className="col-xs-3" />{/* New Line */}
                                        <br /> <br />
                                        <div className="col-xs-1"><Typography size='sm' theme='royal-blue'><b><I18n t="email" />:</b></Typography></div>
                                        <div className="col-xs-1">{(data) || (data != undefined) ? data.data.email : ''}</div>
                                        <div className="col-xs-3" />
                                        <div className="col-xs-2"><Typography size='sm' theme='royal-blue'><b><I18n t="phone_number" />:</b></Typography></div>
                                        <div className="col-xs-2">{(data) || (data != undefined) ? data.data.pnum : ''}</div>
                                    </div>
                                </div>
                            </div>
                        </PanelContainerView>
                    </div>
                </div>
            </PanelContainer>
        </HomeLayout>
    )
}

export default View;