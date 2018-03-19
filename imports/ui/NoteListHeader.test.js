import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { NoteListHeader } from './NoteListHeader';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('NoteListHeader', function () {
    it('should call meteorCall on click', function () {
      const spy = expect.createSpy();
      // Here's how you mount the component:
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <NoteListHeader meteorCall={spy}/>
         </MemoryRouter>
      );
      wrapper.find('button').simulate('click');
      expect(spy.calls[0].arguments[0]).toEqual('notes.insert');
      //expect(spy).toHaveBeenCalledWith('notes.insert');

    });
  });
}
