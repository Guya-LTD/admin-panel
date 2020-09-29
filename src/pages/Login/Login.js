import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { NavLink } from 'react-router-i18n';
import { IconContext } from "react-icons";
import { IoIosMail, IoIosLock } from "react-icons/io";

import LoginTemplate from '@bit/guya-ltd.gcss.templates.landing.login';
import Card from '@bit/guya-ltd.gcss.organisms.card';
import Logo from '@bit/guya-ltd.gcss.molecules.logo';
import Link from '@bit/guya-ltd.gcss.atoms.link';
import Formcontrol from '@bit/guya-ltd.gcss.organisms.formcontrol';
import Field from '@bit/guya-ltd.gcss.molecules.field';
import Button from '@bit/guya-ltd.gcss.atoms.button';

import Authorization from 'hocs/Authorization';
import I18n from 'I18n';

const LOGIN_URL = (process.env.GATEKEEPERS_URL || 'http://127.0.0.1:3000') + '/api/sessions'

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
        .then(response => response.json())
        .then(data => console.log(data));
    

    /* Async api call */
    const { isPending, error, run, data } = useAsync({ deferFn: auth })

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
        left: <I18n t="login.forget_password" />,
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
                {error && <p>{error.message}</p>}
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
                                right: <Link theme='royal-blue'>Forget?</Link>
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