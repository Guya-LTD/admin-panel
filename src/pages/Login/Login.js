import React, { useState } from 'react';
import { useAsync } from 'react-async';


import Authorization from 'hocs/Authorization';

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
        <form onSubmit={handleLogin}>
            <input type='text' value={email} onChange={event => setEmail(event.target.value)} />
            <br />
            <input type='password' value={password} onChange={event => setPassword(event.target.value)} />
            <br />
            <button type='submit' disabled={isPending}>Login</button>
        </form>
    )
}


export default Authorization(Login);