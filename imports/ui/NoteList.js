import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }
  setSearchTitle (e) {
    Session.set('searchTitle', e.target.value);
  }
  // renderFilteredNotes ()
  // {
  //   this.props.filteredNotes.map((note) => {
  //     return (
  //       <NoteListItem key={note._id} note={note}/>
  //     );
  //   });
  // }
  // renderNoteListItem ()
  // {
  //   this.props.notes.map((note) => {
  //     return (
  //       <NoteListItem key={note._id} note={note}/>
  //     );
  //   });
  // }
  render() {
    return (
      <div className="item-list">
        <NoteListHeader/>
        <input type="search" placeholder="search in notes" onChange={this.setSearchTitle.bind(this)}/>
        {this.props.notes.length === 0 ? <NoteListEmptyItem/> : undefined}
        {Session.get('searchTitle') !== '' ? this.props.filteredNotes.map((note) => <NoteListItem key={note._id} note={note}/>) : this.props.notes.map((note) => <NoteListItem key={note._id} note={note}/>)}
      </div>
    );
  }
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  filteredNotes: PropTypes.array.isRequired
};

export default withTracker(() => {
  const title = Session.get('searchTitle');
  const selectedNoteId = Session.get('selectedNoteId');
  //subscription to the publication made in notes.js
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({}, {sort: {updatedAt: -1}}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    }),
    filteredNotes: Notes.find({title: {$regex: new RegExp(".*" + title + ".*", "i")}}, {sort: {updatedAt: -1}}).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
})(NoteList);
