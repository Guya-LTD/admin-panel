import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

// Lgin Hoc
const LoginHoc = (WrappedComponent) =>
    class WithAuthorization extends React.Component {
        render() {
            /* Localization */
            let locale = this.props.match.params.locale == null ? 'en' : this.props.match.params.locale;

            const cookies = new Cookies();

            if(cookies.get('loged_in') == 'true' && cookies.get('token') != null){
                // If loged in
                return <Redirect to={`/${locale}/home/dashboards`} />
            } else {
                return <WrappedComponent {...this.props} />
            }
        }
    }

export default LoginHoc;