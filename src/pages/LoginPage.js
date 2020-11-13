import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { NavLink } from 'react-router-i18n';
import { IconContext } from "react-icons";
import { IoIosMail, IoIosLock } from "react-icons/io";
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

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

const { REACT_APP_GATEKEEPER_URL } = process.env;

const LOGIN_URL = REACT_APP_GATEKEEPER_URL + '/api/v1/sessions'

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
        })
        .then(data => { 
            // Save the token and redirect
            if(data.token != null) {
                cookies.set('loged_in', true, { path: '/', expires:  expires });
                cookies.set('token', data.token, { path: '/', expires:  expires });
                setLoginRedirect(true)
            } else 
                setLoginError(true)
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
                {error && <Redirect push to={`/${locale}/error?status_code=500&stack_trace=L1&message=${error.message}`} />}
                {!isPending || '....'}
                {loginError && <Blockquote
                                type='notification'
                                theme='royal-blue'
                                variant='danger'
                                header={ <I18n t="auth.login_failed" /> }
                                body={ <I18n t="auth.login_failed_description" /> }
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


export default LoginHoc(Login);