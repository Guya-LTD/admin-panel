import React, { useEffect, useState, useMemo } from 'react';
import HomeLayout from 'pages/home/Index';
import {
    PanelContainer,
    PanelContainerHeader,
    PanelContainerBody,
    PanelContainerFooter,
    PanelContainerView
} from '@bit/guya-ltd.gcss.templates.panel';
import {
    Search as SearchIcon,
    SettingsOutline,
    CreateOutline
} from 'react-ionicons-icon';
import Tip from '@bit/guya-ltd.gcss.atoms.tip';
import Search from '@bit/guya-ltd.gcss.atoms.search';
import Typography from '@bit/guya-ltd.gcss.atoms.typography';
import { useFetch, useAsync } from 'react-async';
import { Link as RouterLink } from "react-router-dom";
import I18n from 'I18n';
import TableContainer from 'pages/TableContainer';

const { REACT_APP_API_GATEWAY } = process.env;
const USERS_URL = REACT_APP_API_GATEWAY + '/api/v1/users';


const List = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;
    
    const [page, setPage] = useState(1);

    const headers = { Accept: 'application/json' }

    const { data, error, isPending, run } = useFetch(USERS_URL + '?limit=10&page=' + page, { headers })

    /*useEffect(() => {
        run()
    })*/

    const columns = useMemo(
        () => [
            {
                Header: <I18n t="date" />,
                accessor: 'created_at'
            },
            {
                Header: <I18n t="email" />,
                accessor: 'email'
            },
            {
                Header: <I18n t="name" />,
                accessor: 'name'
            },
            {
                Header: <I18n t="phone_number" />,
                accessor: 'pnum'
            },
            {
                Header: <I18n t="role" />,
                accessor: 'role.name'
            },
            {
                Header: <I18n t="status" />,
                accessor: 'credential.blocked',
                Cell: ({ cell }) => {
                    const { value } = cell;
                    if(value)
                        return <Tip theme="red" variant="red"><I18n t="blocked" /></Tip>
                    else
                        return <Tip theme="royal-blue" variant="green"><I18n t="active" /></Tip>
                }
            },
            {
                Header: <SettingsOutline size="20px" />,
                accessor: 'id',
                Cell: ({ cell }) => {
                    const { value } = cell;
                    return <RouterLink to={'/' + locale + '/home/users/' + value} ><CreateOutline size="20px" /></RouterLink>
                }
            }
        ]
    )

    const pageOne = event => {
        event.preventDefault();
        setPage(1);
        run();
    }

    const pageBack = event => {
        event.preventDefault();
        if(page >= 2) {
            setPage(page - 1);
            run();
        }
    }

    const nextPage = event => {
        event.preventDefault();
        setPage(page + 1);
        run()
    }

    const onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
            }
        }
    }

    return (
        <HomeLayout locale={locale} route_location='/home/users'>
            <PanelContainer>
                <PanelContainerView>
                    <div className="row">
                        {/* Top Header */}
                        <div className="row col-xs-12">
                            {/* Top Header Left */}
                            <div className="col-xs-8">
                                <Typography size='h3'><I18n t="vehicle_tracking" /></Typography>
                            </div>
                            {/* End of Top Header Left */}
                        </div>
                        {/* End of Top Header */}
                        <br /><br /><br /><br />
                        {/* Row Two */}
                        dsf
                    </div>
                </PanelContainerView>
            </PanelContainer>
        </HomeLayout>
    )
}

export default List;