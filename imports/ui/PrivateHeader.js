import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

export const PrivateHeader = (props) => {
  return(
    <div className="title-bar">
      <div className="title-bar__content">
        <h1 className="title-bar__title" >{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  ); //the handleLogout function here is used ONLY FOR TEST PURPOSES. In development and production environments, the call in the container component below will be used (export default withTracker call)
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired//used to handle the real logout function  in dev+prod environment and the "spied" one in test env.
}

export default withTracker(() => {
  return {
    handleLogout:  () => Accounts.logout()
  };
})(PrivateHeader);
