import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { Login } from './Login';

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
  describe('Login', function () {
    it('should show error messages', function () {
      const error = 'This is an awful error';
      const wrapper = shallow(<Login loginWithPassword={() => {}}/>);
      wrapper.setState({ error });
      const errorParagraph = wrapper.find('p').text();
      expect(errorParagraph).toBe(error);
      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).toBe(0);
    });
  });
}
