import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import IndexPage from 'pages/IndexPage';
import LoginPage from 'pages/LoginPage';
import ForgetPage from 'pages/ForgetPage';
import Error404Page from 'pages/Error404Page';
import Error500Page from 'pages/Error500Page';
import HomeDashboard from 'pages/home/Dashboard';
import HomeUsersList from 'pages/home/Users/List';
import HomeUserView from 'pages/home/Users/View';
import HomeReviewView from 'pages/home/Review/View';

// Match locales with regular expression containing each locale separated by `|`
const base = '/:locale(en|am)?';

// <Route path='/home/dashboards/support' component={LoginPage} />
// {`${base}/login`}
const ServiceRoute = () => (
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route path="/:locale(en|am)?/login" component={LoginPage} />
          <Route path="/:locale(en|am)?/forget" component={ForgetPage} />
          <Route exact path='/:locale(en|am)?/home/dashboards' component={HomeDashboard} />
          <Route exact path='/:locale(en|am)?/home/users' component={HomeUsersList} />
          <Route exact path='/:locale(en|am)?/home/users/:id' component={HomeUserView} />
          <Route exact path='/:locale(en|am)?/home/reviews' component={HomeReviewView} />
          <Route path="/:locale(en|am)?/error" component={Error500Page} />
          <Route path="*" component={Error404Page} />
        </Switch>
    </Router>
);


export default ServiceRoute;