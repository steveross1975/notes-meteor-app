import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { NoteList } from './NoteList';
import { notes } from '../fixtures/fixtures';

Enzyme.configure({ adapter: new Adapter() });

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
