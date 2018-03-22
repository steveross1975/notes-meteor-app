import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    //Lines of code needed for test purpose in order to fed up the react router with the correct type of history: MemoryHistory (not BrowserHistory)
    if (process.env.NODE_ENV==='test') {
      import testHistory from '../testHistory';
      const history = testHistory;
    } else if (process.env.NODE_ENV!=='test') {
      import history from '../history';
    }
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title })
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body })
    this.props.call('notes.update', this.props.note._id, { body });
  }
  handleRemoval() {
    this.props.call('notes.remove', this.props.note._id);
    if (process.env.NODE_ENV==='test') {
      this.props.history.push('/dashboard');
    } else {
      const protoHistory = history.__proto__;
      protoHistory.pushState.call(history, null, null, '/dashboard');
      Session.set('selectedNoteId', '');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
  //Use cases:
    if (this.props.note) {
    //1 - We get a Note
      return (
        <div>
          <input value={this.state.title} placeholder="Your title Here" onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.state.body} placeholder="Your Note Here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button onClick={this.handleRemoval.bind(this)}>Delete Note</button>
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
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    Session,
    history
  };
})(Editor);
