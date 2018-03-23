import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { NoteListHeader } from './NoteListHeader';

import { notes } from '../fixtures/fixtures';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    let meteorCall;
    let Session;

    beforeEach(function () {
      meteorCall = expect.createSpy();
      Session = {
        set: expect.createSpy()
      }
    });
    it('should call meteorCall on click', function () {
      // Here's how you mount the component:
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListHeader meteorCall={meteorCall} Session={Session}/>
         </MemoryRouter>
      );
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](undefined, notes[0]._id);
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
    });
    it('should call not Set Session for failed insert', function () {
      // Here's how you mount the component:
      const error = 'Generic Error';
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListHeader meteorCall={meteorCall} Session={Session}/>
         </MemoryRouter>
      );
      wrapper.find('button').simulate('click');
      meteorCall.calls[0].arguments[1](error, undefined);
      expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}
