import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import IndexPage from 'pages/Index';
import LoginPage from 'pages/Login';
import Error404Page from 'pages/Error404';

// <Route path='/home/dashboards/support' component={LoginPage} />
const ServiceRoute = () => (
    <Router>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="*" component={Error404Page} />
        </Switch>
    </Router>
);


export default ServiceRoute;