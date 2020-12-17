import React, { useState } from 'react';
import Search from '@bit/guya-ltd.gcss.atoms.search';
import Typography from '@bit/guya-ltd.gcss.atoms.typography';
import Tip from '@bit/guya-ltd.gcss.atoms.tip';
import {
    PanelContainer,
    PanelContainerHeader,
    PanelContainerBody,
    PanelContainerFooter,
    PanelContainerView
} from '@bit/guya-ltd.gcss.templates.panel';
import {
    Search as SearchIcon,
} from 'react-ionicons-icon';
import HomeLayout from 'pages/home/Index';
import I18n from 'I18n';
import Async, { useAsync } from 'react-async';

const { REACT_APP_API_GATEWAY } = process.env;

const USERS_URL = REACT_APP_API_GATEWAY + '/api/v1/users';


const asyncRetriveUsersList = async({ page }, { signal }) => {
    const res = await fetch(USERS_URL + '?limit=20&' + 'page=' + page, { signal })
    if(!res.ok) throw new Error(res.statusText)
    alert(page)
    return res.json()
}

const asyncRetriveUsersListPage = ([page], { signal }) => {
    const res = fetch(USERS_URL + '?limit=20&', { signal })
    if(!res.ok) throw new Error(res.statusText)
    console.log(res)
    return res.json()
}


const View = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    const [page, setPage] = useState(1);

    return (
        <HomeLayout
            locale={locale}
            route_location='/home/users'
        >
            <PanelContainer>
                <PanelContainerView>
                    <div className="row">
                        {/* Top Header */}
                        <div className="row col-xs-12">
                            {/* Top Header Left */}
                            <div className="col-xs-8">
                                <Typography size='h3'><I18n t="users_list" /></Typography>
                            </div>
                            {/* End of Top Header Left */}
                            {/* Top Header Right */}
                            <div className="col-xs-4 end-xs">
                                <div className="col-xs-5">
                                    <Search
                                            theme="royal-blue"
                                            size="sm"
                                            icon={
                                                <SearchIcon size="15px" />
                                            }
                                        />
                                </div>
                            </div>
                            {/* End of Top Header Right */}
                        </div>
                        {/* End of Top Header */}
                        <br /><br /><br /><br />
                        {/* Row Two */}
                        <Async promiseFn={asyncRetriveUsersList} deferFn={asyncRetriveUsersListPage} page={page}>
                                {({data, error, isPending, run }) => {
                                    if(isPending) return "Loading..."
                                    if(error) {console.log("Price Error: " + error.message); return "Error load again!";}
                                    if(data)
                                        return (
                                            <>
                                                <div className="row col-xs-12">
                                                    <table class="table table--hoverable theme-royal-blue">
                                                            <thead>
                                                                <tr>
                                                                    <th><I18n t="date" /></th>
                                                                    <th><I18n t="email" /></th>
                                                                    <th><I18n t="name" /></th>
                                                                    <th><I18n t="phone_number" /></th>
                                                                    <th><I18n t="role" /></th>
                                                                    <th><I18n t="status" /></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {data.data.map(function(user, index) {
                                                                    return (
                                                                        <tr>
                                                                            <td>{user.created_at}</td>
                                                                            <td>{user.email}</td>
                                                                            <td>{user.name}</td>
                                                                            <td>{user.pnum}</td>
                                                                            <td>{user.role.name}</td>
                                                                            <td>
                                                                                {user.credential.blocked && <Tip theme="red" variant="red"><I18n t="blocked" /></Tip>}
                                                                                {!user.credential.blocked && <Tip theme="royal-blue" variant="green"><I18n t="active" /></Tip>}
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                </div>
                                                {/* End of Row Two */}
                                                {/* Pagination */}
                                                <div style={{marginTop: "35px"}}>
                                                    <div class="pagination">
                                                        <a class="pagination__control" href="#">&laquo;</a>
                                                        <div class="pagination__pages">
                                                            <a href="#" className={page == 1 ? 'active' : ''}>1</a>
                                                            {/*<span class="pagination-ellipsis">&hellip;</span>*/}
                                                            <a href="#" onClick={() => {
                                                                    run(2)
                                                                    }} >{(data.pagination.count / data.pagination.limit)}</a>
                                                        </div>
                                                        <a class="pagination__control" href="#">&raquo;</a>
                                                    </div>
                                                </div>
                                                {/* End of Pagination */}
                                            </>
                                        )
                                }}
                        </Async>
                    </div>
                </PanelContainerView>
            </PanelContainer>
        </HomeLayout>
    )
}


export default View;