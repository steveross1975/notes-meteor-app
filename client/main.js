import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppRouter, history, onAuthChange } from '../imports/routes/AppRouter';
//import history from "./../imports/history.js";
import '../imports/startup/simple-schema-configuration.js';

window.browserHistory = history;

// Tracker.autorun(() => {
//   const isAuthenticated = !!Meteor.userId();
//   onAuthChange(isAuthenticated);
// });

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  if(selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`);
    Session.set('isNavOpen', false);
  }
});

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  Session.set('isNavOpen', false);
  //ReactDOM.render(routes, document.getElementById('app'));
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});
