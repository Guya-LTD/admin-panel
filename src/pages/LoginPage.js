import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { NavLink } from 'react-router-i18n';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
    Mail,
    LockClosed
}from 'react-ionicons-icon';

import LoginTemplate from '@bit/guya-ltd.gcss.templates.landing.login';
import Card from '@bit/guya-ltd.gcss.organisms.card';
import Logo from '@bit/guya-ltd.gcss.molecules.logo';
import Link from '@bit/guya-ltd.gcss.atoms.link';
import Formcontrol from '@bit/guya-ltd.gcss.organisms.formcontrol';
import Field from '@bit/guya-ltd.gcss.molecules.field';
import Button from '@bit/guya-ltd.gcss.atoms.button';
import Blockquote from '@bit/guya-ltd.gcss.molecules.blockquote';

import LoginHoc from 'hocs/LoginHoc';
import I18n from 'I18n';

const { REACT_APP_API_GATEWAY } = process.env;

const LOGIN_URL = REACT_APP_API_GATEWAY + '/api/v1/sessions';

const Login = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;

    const cookies = new Cookies();

    const EXPIRE_DATE = 30; // 30 Days

    const expires = new Date(Date.now() + EXPIRE_DATE * 24 * 60 * 60 * 1000)

    /* Rest API Authenticator function */
    const auth = ([email, password], { signal }) => 
        fetch(LOGIN_URL, {
            method: "POST",
            body: JSON.stringify({
                'identity': email,
                'password': password
            })
        }, signal)
        .then(response => {
            if(response.status == 201)
                // Resturn stream response data
                return response.json()
            else
                setLoginError(true)

            // Alway return decoded data
            setPassword("");
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Save the token and redirect
            if(error != undefined){
                if(data.token != null) {
                    cookies.set('loged_in', true, { path: '/', expires:  expires });
                    cookies.set('token', data.token, { path: '/', expires:  expires });
                    setLoginRedirect(true)
                } else {
                    setLoginError(true);
                }
            }else {

            }
        } );
    

    /* Async api call */
    const { isPending, error, run } = useAsync({ deferFn: auth })

    /* State hooks */
    const [email, setEmail] = useState("");

    /* State hooks */
    const [password, setPassword] = useState("");

    /* Login Erro */
    const [loginError, setLoginError] = useState(false);

    /* Login Redirect */
    const [loginRedirect, setLoginRedirect] = useState(false);
    
    /* Empty fields */
    const [loginEmpty, setLoginEmpty] = useState(false);

    const handleLogin = event => {
        event.preventDefault();
        // Reste Errors
        setLoginEmpty(false);

        if(email == "" || password == "")
            setLoginEmpty(true);
        else
            run(email, password);
    }

    /* Components */
    let loginHeader = <Logo href='/' src={process.env.PUBLIC_URL + '/images/admin-panel-logo.png'} size='lg' />

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
                {error && console.log(error)}
                {error &&  <Redirect push to={`/${locale}/error?status_code=500&stack_trace=L1&message=${error.message}`} />}
                {loginError && <Blockquote
                                type='notification'
                                theme='royal-blue'
                                variant='danger'
                                header={ <I18n t="auth.login_failed" /> }
                                body={ <I18n t="auth.login_failed_description" /> }
                              />
                }
                {loginEmpty && <Blockquote
                                type='notification'
                                theme='royal-blue'
                                variant='danger'
                                header={ <I18n t="auth.login_field_empty" /> }
                                body={ <I18n t="auth.login_field_empty_description" /> }
                              />
                }
                {loginRedirect && <Redirect to={`/${locale}/home/dashboards`} />}
                <Formcontrol onSubmit={handleLogin}>
                    <Field
                        type='text'
                        label={ <I18n t="credential.email" /> }
                        placeholder='Email'
                        theme='royal-blue'
                        addon={ 
                            {
                                left: <div className="icon icon--sm"><Mail size="20px" /></div>,
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
                                left: <div className="icon icon--sm"><LockClosed size="20px" /></div>,
                                right: <Link theme='royal-blue' href="forget"><I18n t="credential.forget_password" /></Link>
                            } 
                        }
                        value={password} 
                        onChange={event => setPassword(event.target.value)}
                     />
                    {!isPending &&
                        <Button type='submit' disable={isPending} block theme='royal-blue' variant='primary'><I18n t='form.login' /></Button>
                    }
                    {!isPending || 
                        <Button block theme='royal-blue' variant='primary'>
                            <svg width="25px" height="25px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                            </svg>
                        </Button>
                    }
                </Formcontrol>
            </Card>
	</LoginTemplate>
    )
}


export default LoginHoc(Login);