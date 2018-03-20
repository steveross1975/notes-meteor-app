import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { NoteListItem } from './NoteListItem';
import { notes } from '../fixtures/fixtures';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListItem', function () {
    let Session;

    beforeEach(() => {
      Session = {
        set: expect.createSpy()
      };
    });

    it('should render title and timestamp', function () {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListItem note={notes[0]} Session={Session}/>
         </MemoryRouter>
      );
      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('19/3/18');
    });
    it('should set default title if no title set', function () {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListItem note={notes[1]} Session={Session} />
         </MemoryRouter>
      );
      expect(wrapper.find('h5').text()).toBe('Untitled Note');
    });

    it('should call Session.set (the spy) on click', function () {
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListItem note={notes[1]} Session={Session} />
         </MemoryRouter>
      );
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[1]._id);
    });
  });
}
