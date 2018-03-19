import React from 'react';
// import { Accounts } from 'meteor/accounts-base';
// import PropTypes from 'prop-types';
// import { withTracker } from 'meteor/react-meteor-data';

const NoteListEmptyItem = () => {
  return(
    <div>
      <h5>You have no notes</h5>
      <p>Create a note to get started</p>
    </div>
  ); //the handleLogout function here is used ONLY FOR TEST PURPOSES. In development and production environments, the call in the container component below will be used (export default withTracker call)
}
//
// PrivateHeader.propTypes = {
//   title: PropTypes.string.isRequired,
//   handleLogout: PropTypes.func.isRequired//used to handle the real logout function  in dev+prod environment and the "spied" one in test env.
// }
//
// export default withTracker(() => {
//   return {
//     handleLogout:  () => Accounts.logout()
//   };
// })(PrivateHeader);

export default NoteListEmptyItem;
