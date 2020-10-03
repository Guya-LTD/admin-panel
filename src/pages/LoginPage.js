import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { NavLink } from 'react-router-i18n';
import { IconContext } from "react-icons";
import { IoIosMail, IoIosLock } from "react-icons/io";
import { Redirect } from 'react-router-dom';

import LoginTemplate from '@bit/guya-ltd.gcss.templates.landing.login';
import Card from '@bit/guya-ltd.gcss.organisms.card';
import Logo from '@bit/guya-ltd.gcss.molecules.logo';
import Link from '@bit/guya-ltd.gcss.atoms.link';
import Formcontrol from '@bit/guya-ltd.gcss.organisms.formcontrol';
import Field from '@bit/guya-ltd.gcss.molecules.field';
import Button from '@bit/guya-ltd.gcss.atoms.button';

import Authorization from 'hocs/Authorization';
import I18n from 'I18n';

const { REACT_APP_GATEKEEPER_URL } = process.env;

const LOGIN_URL = REACT_APP_GATEKEEPER_URL + '/api/v1/sessions'

const Login = () => {
    /* Rest API Authenticator function */
    const auth = ([email, password], { signal }) => 
        fetch(LOGIN_URL, {
            method: "POST",
            //headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
            body: JSON.stringify({
                'identity': email,
                'password': password
            })
        }, signal)
        .then(response => {
            return response.json() 
        })
        .then(data => setEmail(data.token) );
    

    /* Async api call */
    const { isPending, error, run } = useAsync({ deferFn: auth })

    /* State hooks */
    const [email, setEmail] = useState("");

    /* State hooks */
    const [password, setPassword] = useState("");

    const handleLogin = event => {
        event.preventDefault();
        run(email, password);
        
    }

    /* Components */
    let loginHeader = <Logo href='/' src='/images/admin-panel-logo.png' size='lg' />

    let loginFooter = {
        left: null,
        right: 
            <div>
                <NavLink ignoreLocale to="/en/login">
                    English
                </NavLink>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <NavLink ignoreLocale to="/am/login">
                    አማርኛ
                </NavLink>
            </div>
    }

    return (
        <LoginTemplate 
            header={ loginHeader }
            footer={ loginFooter }>
            <Card>
                {error && <Redirect push to="/error?status_code=500&stack_trace=L1" />}
                {!isPending || '....'}
                <Formcontrol onSubmit={handleLogin}>
                    <Field
                        type='text'
                        label={ <I18n t="credential.email" /> }
                        placeholder='Email'
                        theme='royal-blue'
                        addon={ 
                            {
                                left: <IconContext.Provider value={{ className: "icon" }}>
                                        <div><IoIosMail /></div>
                                      </IconContext.Provider>,
                                right: '@guya.com'
                            } 
                        }
                        value={email} 
                        onChange={event => setEmail(event.target.value)}
                     />
                     <Field
                        type='password'
                        label={ <I18n t="credential.password" /> }
                        placeholder='Password'
                        theme='royal-blue'
                        addon={ 
                            {
                                left: <IconContext.Provider value={{ className: "icon" }}>
                                        <div><IoIosLock /></div>
                                      </IconContext.Provider>,
                                right: <Link theme='royal-blue'><I18n t="credential.forget_password" /></Link>
                            } 
                        }
                        value={password} 
                        onChange={event => setPassword(event.target.value)}
                     />
                    <Button type='submit' disable={isPending} block theme='royal-blue' variant='primary'><I18n t='form.login' /></Button>
                </Formcontrol>
            </Card>
	</LoginTemplate>
    )
}


export default Authorization(Login);