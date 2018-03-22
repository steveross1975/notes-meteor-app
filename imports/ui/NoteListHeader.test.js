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
      expect(meteorCall.calls[0].arguments[0]).toEqual('notes.insert');
      // expect(meteorCall.calls[0].arguments[1]).toEqual('notes.insert');
      //expect(spy).toHaveBeenCalledWith('notes.insert');

    });
  });
}
