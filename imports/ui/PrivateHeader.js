import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const PrivateHeader = (props) => {
  const navImageSrc = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
  return(
    <div className="title-bar">
      <div className="title-bar__content">
        <img className="header__nav-toggle" onClick={() => props.handleNavToggle()} src={navImageSrc} />
        <h1 className="title-bar__title" >{props.title}</h1>
        <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
      </div>
    </div>
  ); //the handleLogout function here is used ONLY FOR TEST PURPOSES. In development and production environments, the call in the container component below will be used (export default withTracker call)
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,//used to handle the real logout function  in dev+prod environment and the "spied" one in test env.
  handleNavToggle: PropTypes.func.isRequired,
  isNavOpen: PropTypes.bool.isRequired
}

export default withTracker(() => {
  return {
    handleLogout:  () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
})(PrivateHeader);
