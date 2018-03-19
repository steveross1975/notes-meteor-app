import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import PropTypes from 'prop-types';

const NoteListItem = (props) => {
  return (
    <div>
      <h5>{ props.note.title || 'Untitled Note'}</h5>
      <p>{ moment(props.note.updatedAt).format('DD/M/YY') }</p>
    </div>
  );
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;
