import React from 'react';

// Authorization HOC
const Authorization = (WrappedComponent) => 
    class WithAuthorization extends React.Component {
        render() {
            if(true){
                return <WrappedComponent {...this.props} />
            }
        }
    }


export default Authorization;