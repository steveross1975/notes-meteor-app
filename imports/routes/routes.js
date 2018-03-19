import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import history from "./../history.js";
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

window.browserHistory = history;

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/dashboard'];

function onEnterPublicPage() {
  if(Meteor.userId()) {
    return true;
  } else {
    return false;
  }
}

function onEnterPrivatePage() {
  if(!Meteor.userId()) {
    return true;
  } else {
    return false;
  }
}

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/dashboard');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
}
export const routes = (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" render={() => {
          return onEnterPublicPage() ? <Redirect to="/dashboard"/> : <Login />
        }}/>
        <Route path="/signup" render={() => {
          return onEnterPublicPage() ? <Redirect to="/dashboard"/> : <Signup />
        }}/>
        <Route path="/dashboard"  render={() => {
          return onEnterPrivatePage() ? <Redirect to="/" /> : <Dashboard />
        }}/>
        <Route path="/dashboard/:id"  render={() => {
          return onEnterPrivatePage() ? <Redirect to="/" /> : <Dashboard />
        }}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  </Router>
);
