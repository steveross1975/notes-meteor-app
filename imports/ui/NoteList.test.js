import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { NoteList } from './NoteList';

Enzyme.configure({ adapter: new Adapter() });

const notes = [
  {
    _id: 'noteId1',
    title: 'test title',
    body: '',
    updatedAt: 0,
    userId: 'userId1'
  }, {
    _id: 'noteId2',
    title: '',
    body: 'Bodynote',
    updatedAt: 0,
    userId: 'userId2'
  }];

if(Meteor.isClient) {
  describe('NoteList', function () {
    it('should render NoteListItem for each note', function () {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteList notes={notes}/>
         </MemoryRouter>
      );

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });
    it('should render NoteListEmptyItem if no note', function () {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteList notes={[]}/>
         </MemoryRouter>
      );
      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);

    });
  });
}
