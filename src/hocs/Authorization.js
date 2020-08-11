import React from 'react';

// Authorization HOC
const Authorization = (WrappedComponent) => 
    class WithAuthorization extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }


export default Authorization;