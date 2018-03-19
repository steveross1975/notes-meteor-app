import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';

export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={() => { props.meteorCall('notes.insert') }}>Add a Note</button>
    </div>
  )
}

NoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired
}

export default withTracker (() => {
  return {
    meteorCall: Meteor.call
  };
})(NoteListHeader);
