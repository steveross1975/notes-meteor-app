import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PrivateHeader from './PrivateHeader';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('PrivateHeader', function () {
    it('should set button text to logout', function () {
      const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> );
      const buttonText = wrapper.find('button').text();

      expect(buttonText).toBe('Logout');
    });
    it('should set title to the one provided as h1 text', function () {
      const title = 'Pick your title';
      const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> );
      const titleFromPH = wrapper.find('h1').text();
      expect(titleFromPH).toBe(title);
    });
    it('should call the function', function() {
      const spy = expect.createSpy();
      spy(4, 6, 5);
      spy('Lippo');
      expect(spy).toHaveBeenCalledWith('Lippo');
    });
    it('should call handleLogout on click', function () {
      const title = 'Pick your title';
      const spy = expect.createSpy();
      const wrapper = mount( <PrivateHeader title={title} handleLogout={spy}/> );
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
}
