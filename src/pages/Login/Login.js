import React, { useState } from 'react';
import { useAsync } from 'react-async';
import LoginTemplate from '@bit/guya-ltd.gcss.templates.landing.login';
import Card from '@bit/guya-ltd.gcss.organisms.card';


import Authorization from 'hocs/Authorization';
import I18n from 'I18n';

const Login = () => {
    /* Rest API Authenticator function */
    const auth = ([email, password], { signal }) => {
        // setEmail("");
        
    }

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

    return (
        <LoginTemplate 
            header={<h1><I18n t="app.name" /></h1>}
            footer={{right: <p>Right</p>, left: <p>Left</p>}}>
            <Card>
                <form onSubmit={handleLogin}>
                <input type='text' value={email} onChange={event => setEmail(event.target.value)} />
                <br />
                <input type='password' value={password} onChange={event => setPassword(event.target.value)} />
                <br />
                <button type='submit' disabled={isPending}>Login</button>
            </form>
            </Card>
	</LoginTemplate>
    )
}


export default Authorization(Login);