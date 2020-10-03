import React from 'react';
import HttpError from '@bit/guya-ltd.gcss.templates.httperror';

import I18n from 'I18n';

const Error404 = () => {
    return (
        <HttpError 
            status={ <I18n t="http.page_not_found" /> }       
            status_code='404'
            description={ <I18n t="http.page_not_found_description" /> } 
         />
    );
}


export default Error404;