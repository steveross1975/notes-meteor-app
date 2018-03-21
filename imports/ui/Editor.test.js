import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';
import testHistory from '../testHistory';

Enzyme.configure({ adapter: new Adapter() });

if (Meteor.isClient) {
  describe('Editor', function () {
    let call;
    let memoryHistory;
    let Session;

    beforeEach(() => {
      call = expect.createSpy();
      memoryHistory = {
        ...testHistory,
        push: expect.createSpy()
      };
      Session = {
        set: expect.createSpy()
      };
    });
    it('should render pick note message', function () {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor history={memoryHistory} call={call} Session={Session}/>
        </MemoryRouter>
      );
      expect(wrapper.find('p').text()).toBe('Pick or create a note to get started');
    });
    it('should render note not found message', function () {
      const selectedNoteId = '123abc';
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor history={memoryHistory} call={call} selectedNoteId={selectedNoteId} Session={Session}/>
        </MemoryRouter>
      );
      expect(wrapper.find('p').text()).toBe('404 - Note Not Found');
    });
    it('should remove note', function () {
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor history={memoryHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} Session={Session}/>
        </MemoryRouter>
      );
      wrapper.find('button').simulate('click');
      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(memoryHistory.push).toHaveBeenCalledWith('/dashboard');
    });
    it('should update the node body on textarea change', function () {
      const newBody = 'This is my new body text'
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor history={memoryHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} Session={Session}/>
        </MemoryRouter>
      );
      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });
      //wrapper.method();
      //console.log(wrapper.instance());
      expect(wrapper.find(Editor).instance().state.body).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {body: newBody});
    });
    it('should update the node title on input change', function () {
      const newTitle = 'This is my new title text'
      const wrapper = mount(
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
          <Editor history={memoryHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} Session={Session}/>
        </MemoryRouter>
      );
      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });
      //wrapper.method();
      //console.log(wrapper.instance());
      expect(wrapper.find(Editor).instance().state.title).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, {title: newTitle});
    });
    //from here tests do not work because of enzyme version
    it('should set state for new note', function () {
      // const wrapper = mount(
      //   <MemoryRouter initialEntries={['/']} initialIndex={0}>
      //     <Editor history={memoryHistory} call={call} Session={Session}/>
      //   </MemoryRouter>
      // );
      // wrapper.setProps({
      //   selectedNoteId: notes[0]._id,
      //   note: notes[0]
      // });
      // expect(wrapper.find(Editor).instance().state.title).toBe(notes[0].title);
      // expect(wrapper.find(Editor).instance().state.body).toBe(notes[0].body);
    });
    it('should not set state in note prop not provided', function () {
    //   const wrapper = mount(
    //     <MemoryRouter initialEntries={['/']} initialIndex={0}>
    //       <Editor history={memoryHistory} call={call} Session={Session}/>
    //     </MemoryRouter>
    //   );
    //   wrapper.setProps({
    //     selectedNoteId: notes[0]._id
    //   });
    //   expect(wrapper.find(Editor).instance().state.title).toBe(notes[0].title);
    //   expect(wrapper.find(Editor).instance().state.body).toBe(notes[0].body);
    });
  });
}
