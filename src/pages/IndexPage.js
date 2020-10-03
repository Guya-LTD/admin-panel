import React from 'react';
import { Redirect } from "react-router-dom";

class Index extends React.Component {
    render() {
        return (
            <Redirect to="/login" />
        )
    }
}


export default Index;