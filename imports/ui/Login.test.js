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
    it('should call loginWithPassword with form data', function () {
      const email = 'andrew@test.com';
      const password = 'password123';
      const spy = expect.createSpy();
      // Here's how you mount the component:
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <Login loginWithPassword={spy} />
         </MemoryRouter>
      );
      //Begin Setting the form values
      wrapper.find('input[name="email"]').instance().value = email;
      wrapper.find('input[name="password"]').instance().value = password;
      //End Setting the form values

      //Submit form simulation
      wrapper.find('form').simulate('submit');
      //assertion: I want to check that the first argument of the first spy call contains the email I have set above
      expect(spy.calls[0].arguments[0]).toEqual({ email });
      expect(spy.calls[0].arguments[1]).toBe(password);

    });
    it('should set loginWithPassword callback errors', function () {
      const spy = expect.createSpy();
      const wrapper = mount(
         <MemoryRouter initialEntries={['/']} initialIndex={0}>
             <Login loginWithPassword={spy} />
         </MemoryRouter>
      );
      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[2]({error: 'Error'});
      expect(wrapper.find(Login).instance().state).toNotEqual({});
      spy.calls[0].arguments[2]();
      expect(wrapper.find(Login).instance().state).toEqual({error: ''});
    });
  });
}
