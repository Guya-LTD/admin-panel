import React, { useEffect, useState } from 'react';
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
import Cookies from 'universal-cookie';
import Search from '@bit/guya-ltd.gcss.atoms.search';
import Typography from '@bit/guya-ltd.gcss.atoms.typography';
import { useFetch, useAsync } from 'react-async';
import { Link as RouterLink } from "react-router-dom";
import I18n from 'I18n';
import TableContainer from 'pages/TableContainer';
// Chat Elemetns
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import {
	ChatList,
	MessageList,
	Input,
	Button,
} from 'react-chat-elements';

import io from "socket.io-client";
const ENDPOINT = 'http://127.0.0.1:60004/';

let socket;


const { REACT_APP_API_GATEWAY } = process.env;
const USERS_URL = REACT_APP_API_GATEWAY + '/api/v1/users';
const CHAT_URL = REACT_APP_API_GATEWAY + '/api/v1/chat';


const List = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    const cookies = new Cookies();

    const [supportCount, setSupportCount] = useState(0);

    const [isOnline, setIsOnline] = useState(false);

    const [totalOnlineClients, setTotalOnlineClients] = useState(0);

    const [totalWaitingClients, setTotalWaitingClients] = useState(0);

    const [supportDetails, setSupportDetails] = useState({});
    
    const selectChat = (chat, index) => {
        console.log(chat);
		//event.preventDefault();
		setUserChat(allChatHistory)
	}

	/** State Hooks */
	const [userChat, setUserChat] = useState([])

    const [userChatHistory, setUserChatHistory] = useState(false);
    
    useEffect(() => {
        var userQuery = 'name=' + cookies.get('name') + '&type=support'; 
        socket = io('http://127.0.0.1:60004/', {query: userQuery})

        socket.emit('support:connection:count', (error) => {
            if(error) console.log(error);
        });

        socket.emit('support:connection:join', (error) => {
            if(error) console.log(error);
        })

        socket.emit('support:details:get', (error) => {
            if(error) console.log(error);
        })
        
    })

    useEffect(() => {
        socket.on('disconnect', message => {
            setIsOnline(false);
        })

        socket.on('support:connection:count', message => {
            setSupportCount(message);
        })

        socket.on('support:details:list', message => {
            var allChatLists = [];
            console.log(message);
            message.rooms.forEach(function (item, index) {
                allChatLists.push({
                    id: item,
                    avatar: process.env.PUBLIC_URL + '/images/no-photo.svg',
                    alt: '',
                    title: 'Customer ' + index,
                    subtitle: '',
                    date: new Date(),
                    unread: 0
                })
            })
            setAllChatList(allChatLists);
        })

        socket.on('support:customers:count:notify', message => {
            setIsOnline(true);
        })
    })


	const [allChatHistory, setAllChatHistory] = useState([
		{
            id: 80,
			position: 'right',
			type: 'text',
			text: 'sfsdfsdf 80 ipsum dolor sit amet, consectetur adipisicing elit',
			date: new Date(),
		},
		{
            id: 82,
			position: 'left',
			type: 'text',
			text: 'Lorem ipsum dolor 82 sit amet, consectetur adipisicing elit',
			date: new Date(),
		},
	]);
	
	const [allChatList, setAllChatList] = useState([]);

    return (
        <HomeLayout locale={locale} route_location='/home/chat'>
            <PanelContainer>
                <PanelContainerView>
                    <div className="row">
                        {/* Top Header */}
                        <div className="row col-xs-12">
                            {/* Top Header Left */}
                            <div className="col-xs-3">
                                <Typography size='h3'><I18n t="customer_support" />
                                </Typography>
                            </div>
                            <div className="col-xs-2">
                                <br />
                                {isOnline ? <Tip theme="royal-blue" variant="green"><I18n t="online" /></Tip> : <Tip theme="royal-blue" variant="red"><I18n t="ofline" /></Tip> }
                            </div>
                            {/* End of Top Header Left */}
                        </div>
                        {/* End of Top Header */}
                        <br /><br /><br /><br />
                        {/* Row Two */}
                        <div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-4">
                                <ChatList
                                    className='chat-list'
                                    onClick={selectChat}
                                    dataSource={allChatList} />
                            </div>
                            <div className="col-xs-8" style={{border: "1px solid #e6e6e6"}}>
                                <MessageList
                                    className='message-list'
                                    lockable={true}
                                    toBottomHeight={'100%'}
                                    dataSource={userChat} />
                            </div>
                            <div className="col-xs-4"></div>
                            <div className="col-xs-6">
                                <Input
                                    placeholder="Type here..."
                                    multiline={true}
                                    autofocus={true}
                                    className="input theme-royal-blue"
                                    rightButtons={
                                    <Button
                                        color='white'
                                        className="button button--md button--primary theme-royal-blue"
                                        backgroundColor='black'
                                        text='Send'/>
                                    }/>
                            </div>
                        </div>
                        </div>
                        {/* End of Row Two */}
                    </div>
                </PanelContainerView>
            </PanelContainer>
        </HomeLayout>
    )
}

export default List;