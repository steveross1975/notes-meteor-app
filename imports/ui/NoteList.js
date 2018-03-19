import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
  const renderNoteListitem = props.notes.map((note) => {
    if(props.notes.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Note Found</p>
        </div>
      );
    } else {
      return (
        <NoteListItem key={note._id} note={note}/>
      );
    }
  });

  return (
    <div>
      <NoteListHeader/>
      {renderNoteListitem}
      NoteList: {props.notes.length};
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default withTracker(() => {
  //subscription to the publication made in notes.js
  Meteor.subscribe('notes');
  return {
    notes: Notes.find().fetch()
  };
})(NoteList);
