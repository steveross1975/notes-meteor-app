import React from 'react';
import { Session } from 'meteor/session';

import PrivateHeader from './PrivateHeader';
import Editor from './Editor';
import NoteList from './NoteList';

export default class Dashboard extends React.Component {
  constructor (props) {
    super(props);
  }
  componentWillMount() {
    Session.set('selectedNoteId', this.props.match.params.id);
  }
  render(props) {
    return (
      <div>
        <PrivateHeader title="Notes App" />
        <div className="wrapper">
          <div className="wrapper__sidebar">
            <NoteList/>
          </div>
          <div className="wrapper__main">
            <Editor/>
          </div>
        </div>
      </div>
    );
  }
}
