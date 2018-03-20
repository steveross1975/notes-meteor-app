import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';


export const NoteListItem = (props) => {
  return (
    <div onClick={() => {
      props.Session.set('selectedNoteId', props.note._id);
    }}>
      <h5>{ props.note.title || 'Untitled Note'}</h5>
      { props.note.selected ? 'selected' : undefined }
      <p>{ moment(props.note.updatedAt).format('DD/M/YY') }</p>
    </div>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default withTracker(() => {
  return { Session };
})(NoteListItem);
