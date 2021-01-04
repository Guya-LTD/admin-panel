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
var alfaGeez = require('alfa-geez-node');

const PAYMENTS_URL = '/api/v1/payments';

  
const List = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;
    
    const [page, setPage] = useState(1);

    const headers = { Accept: 'application/json' }

    const { data, error, isPending, run } = useFetch(PAYMENTS_URL + '?limit=20&page=' + page, { headers })

    const columns = useMemo(
        () => [
            {
                Header: <I18n t="date" />,
                accessor: 'created_at.$date',
                Cell: ({ cell }) => {
                    const { value } = cell;
                    var new_date = new Date(value);

                    var alfaGeezDatetime = new alfaGeez.DateTime(new_date);

                    var eth_datetime = alfaGeezDatetime.convert(
                        alfaGeez.Local.ETHIOPIC,
                        alfaGeez.Language.AMHARIC
                    ); 

                    var formated_date = eth_datetime.day + '/' + eth_datetime.month + '/' + eth_datetime.year

                    return formated_date;
                }
            },
            {
                Header: <I18n t="invoice_number" />,
                accessor: 'invoice_number'
            },
            {
                Header: <I18n t="transaction_id" />,
                accessor: 'transaction_id'
            },
            {
                Header: <I18n t="transaction_date" />,
                accessor: 'transaction_date'
            },
            {
                Header: <I18n t="transaction_medium" />,
                accessor: 'transaction_medium'
            },
            {
                Header: <I18n t="email_status" />,
                accessor: 'email_status',
                Cell: ({ cell }) => {
                    const { value } = cell;
                    if(value == 'pending')
                        return <Tip theme="red" variant="yellow"><I18n t="pending" /></Tip>
                    else if(value == 'sent')
                        return <Tip theme="royal-blue" variant="green"><I18n t="sent" /></Tip>
                    else if(value == 'failed')
                        return <Tip theme="royal-blue" variant="red"><I18n t="failed" /></Tip>
                }
            },
            {
                Header: <I18n t="status" />,
                accessor: 'status',
                Cell: ({ cell }) => {
                    const { value } = cell;
                    if(value == 'pending')
                        return <Tip theme="red" variant="yellow"><I18n t="pending" /></Tip>
                    else if(value == 'complete')
                        return <Tip theme="royal-blue" variant="green"><I18n t="complete" /></Tip>
                    else if(value == 'failed')
                        return <Tip theme="royal-blue" variant="red"><I18n t="failed" /></Tip>
                }
            },
            {
                Header: <I18n t="approval_method" />,
                accessor: 'approval_method'
            },
            {
                Header: <SettingsOutline size="20px" />,
                accessor: '_id.$oid',
                Cell: ({ cell }) => {
                    const { value } = cell;
                    return <RouterLink to={'/' + locale + '/home/categories/' + value} ><CreateOutline size="20px" /></RouterLink>
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

    return ( 
        <HomeLayout locale={locale} route_location='/home/payments'>
            <PanelContainer>
                <PanelContainerView>
                    <div className="row">
                        {/* Top Header */}
                        <div className="row col-xs-12">
                            {/* Top Header Left */}
                            <div className="col-xs-8">
                                <Typography size='h3'><I18n t="payments_list" /></Typography>
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
                        {(data) || (data != undefined) ? <TableContainer columns={columns} data={data.data}/> : 'None'}
                        {/* End of Row Two */}
                        {/* Pagination */}
                        <div style={{marginTop: "35px"}}>
                            <div class="pagination">
                                { /*page >= 2 ?  <a class="pagination__control" href="#" onClick={pageBack}>&laquo;</a> : ''*/}
                                <a class="pagination__control" href="#" onClick={pageBack}>&laquo;</a>
                                <div class="pagination__pages">
                                    {/*<span class="pagination-ellipsis">&hellip;</span>*/}
                                    {(data) || (data != undefined) ? 
                                        <a href="#" className=''>
                                            Page {data.pagination.page} of {Math.ceil((data.pagination.count / data.pagination.limit))}
                                            &nbsp; | &nbsp; out of {data.pagination.count}
                                        </a> 
                                        : 
                                        ''
                                    }
                                </div>
                                <a class="pagination__control" href="#" onClick={nextPage}>&raquo;</a>
                            </div>
                        </div>
                        {/* End of Pagination */}
                    </div>
                </PanelContainerView>
            </PanelContainer>
        </HomeLayout>
    )
}

export default List;