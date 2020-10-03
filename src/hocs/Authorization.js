import React from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

// Authorization HOC
const Authorization = (WrappedComponent) => 
    class WithAuthorization extends React.Component {
        render() {
            const cookies = new Cookies();

            if(cookies.get('loged_in') == 'true' && cookies.get('token') != null){
                return <WrappedComponent {...this.props} />
            } else {
                return <Redirect to='/' />
            }
        }
    }


export default Authorization;