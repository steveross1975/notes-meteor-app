import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';


export const NoteList = (props) => {
  const renderNoteListItem = props.notes.map((note) => {
    return (
      <NoteListItem key={note._id} note={note}/>
    );
  });

  return (
    <div>
      <NoteListHeader/>
      {props.notes.length === 0 ? <NoteListEmptyItem/> : undefined}
      {renderNoteListItem}
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
