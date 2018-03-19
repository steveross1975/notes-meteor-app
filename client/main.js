import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { routes, onAuthChange } from '../imports/routes/routes';
import history from "./../imports/history.js";
import '../imports/startup/simple-schema-configuration.js';

window.browserHistory = history;

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  if(selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`);
  }
});

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined);
  ReactDOM.render(routes, document.getElementById('app'));
});
