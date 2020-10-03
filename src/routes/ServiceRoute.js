import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import IndexPage from 'pages/IndexPage';
import LoginPage from 'pages/LoginPage';
import Error404Page from 'pages/Error404Page';

// Match locales with regular expression containing each locale separated by `|`
const base = '/:locale(en|am)?';

// <Route path='/home/dashboards/support' component={LoginPage} />
const ServiceRoute = () => (
    <Router>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path={`${base}/login`} component={LoginPage} />
          <Route path="/error" component={Error404Page} />
          <Route path="*" component={Error404Page} />
        </Switch>
    </Router>
);


export default ServiceRoute;