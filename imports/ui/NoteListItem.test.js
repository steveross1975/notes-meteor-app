import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import NoteListItem from './NoteListItem';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    it('should render title and timestamp', function () {
      const title = 'My title is a String';
      const updatedAt = 1521465364953;
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListItem note={{title, updatedAt}} />
         </MemoryRouter>
      );
      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('19/3/18');
    });
    it('should set default title if no title set', function () {
      const title = '';
      const updatedAt = 1521465364953;
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListItem note={{title, updatedAt}} />
         </MemoryRouter>
      );
      expect(wrapper.find('h5').text()).toBe('Untitled Note');
    })
  });
}
