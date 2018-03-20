import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  render() {
  //Use cases:
    if (this.props.note) {
    //1 - We get a Note
      return (
        <div>
          <input value={this.props.note.title} placeholder="Your title Here" onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.props.note.body} placeholder="Your Note Here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delete Note</button>
        </div>
      );
    } else {
    //3 - We get nothing: a dummy text is rendered instead
      return (
        <p>
          {this.props.selectedNoteId ? '404 - Note Not Found' : 'Pick or create a note to get started'}
        </p>
      );
    }
  }
};

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
})(Editor);
