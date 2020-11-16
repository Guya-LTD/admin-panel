import React, { useState } from 'react';
import { useAsync } from 'react-async';
import { NavLink } from 'react-router-i18n';
import { Redirect } from 'react-router-dom';
import LoginTemplate from '@bit/guya-ltd.gcss.templates.landing.login';
import Card from '@bit/guya-ltd.gcss.organisms.card';
import Logo from '@bit/guya-ltd.gcss.molecules.logo';
import Link from '@bit/guya-ltd.gcss.atoms.link';
import FormControl from '@bit/guya-ltd.gcss.organisms.formcontrol';
import Field from '@bit/guya-ltd.gcss.molecules.field';
import Button from '@bit/guya-ltd.gcss.atoms.button';
import Blockquote from '@bit/guya-ltd.gcss.molecules.blockquote';
import{
    Send
}from 'react-ionicons-icon';
import LoginHoc from 'hocs/LoginHoc';
import I18n from 'I18n';

const Forget = (props) => {
    /* Localization */
    const locale = props.match.params.locale == null ? 'en' : props.match.params.locale;
   
    /* Rest API Authenticator function */
    const auth = ([email, password], { signal }) => 
        fetch("", {
            method: "POST",
            body: JSON.stringify({
                'identity': email,
                'password': password
            })
        }, signal)
        .then(response => {
            
        })
        .then(data => { 
            
        } );

    /* Async api call */
    const { isPending, error, run } = useAsync({ deferFn: auth })

    /* State hooks */
    const [identity, setIdentity] = useState("");

    /* Handle Forget password */
    const handleForget = event => {
        event.preventDefault();
    }

    /* Components */
    let templateHeader = <Logo href='/' src={process.env.PUBLIC_URL + '/images/admin-panel-logo.png'} size='lg' />

    /* Footer */
    let templateFooter = {
        left: null,
        right: 
            <div>
                <NavLink ignoreLocale to="/en/forget">
                    English
                </NavLink>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <NavLink ignoreLocale to="/am/forget">
                    አማርኛ
                </NavLink>
            </div>
    }

    return (
        <LoginTemplate header={ templateHeader } footer={ templateFooter } >
            <Card>
                <FormControl onSumbit={handleForget}>
                    <Field
                        type='text'
                        label={ <I18n t="credential.email_or_phone" /> }
                        placeholder='Email or Phone number'
                        theme='royal-blue'
                        addon={ 
                            {
                                left: <div className="icon icon--sm"><Send size="20px" /></div>,
                                right: null
                            } 
                        }
                        value={identity} 
                        onChange={event => setIdentity(event.target.value)}
                     />
                     <Button type='submit' disable={isPending} block theme='royal-blue' variant='primary'><I18n t='form.reset_password' /></Button>
                </FormControl>
            </Card>
        </LoginTemplate>
    )
}

export default Forget;