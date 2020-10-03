import React from 'react';
import HttpError from '@bit/guya-ltd.gcss.templates.httperror';

import I18n from 'I18n';

const Error500Page = () => {
    return (
        <HttpError 
            status={ <I18n t="http.internal_server_error" /> }       
            status_code='500'
            description={ <I18n t="http.internal_server_error_description" /> } 
         />
    );
}


export default Error500Page;