import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe  ('notes', function () {

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'My Body',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Title 2',
      body: 'My Body 2',
      updatedAt: 0,
      userId: 'testUserId2'
    };

    beforeEach(function () {
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });
    //methods test
    it('should insert new note', function () {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});
      expect(Notes.findOne({ _id, userId })).toBeTruthy();
    });

    it('should not insert a note if not authenticated', function () {
      expect(() =>{
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('should remove note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
      expect(Notes.findOne({_id: noteOne._id})).toBeFalsy();
    });

    it('should not remove note if not authenticated', function () {
      expect(() =>{
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not remove note if invalid _id', function () {
      expect(() =>{
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId});
      }).toThrow();
    });

    it('should update note', function () {
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).toBeGreaterThan(noteOne.updatedAt);
      expect(note).toInclude({
        title,
        body: noteOne.body
      });
    });
    it('should throw error if extra updates', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: noteOne.userId
        }, [
          noteOne._id,
          { noteCreator: 'Pippo' }
        ]);
      }).toThrow();
    });
    it('should not update note if user was not creator', function () {
      const title = 'This is an updated title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'testId'
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);
      expect(note).toInclude(noteOne);
    });

    it('should not update note if not authenticated', function () {
      expect(() =>{
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('should not update note if invalid _id', function () {
      expect(() =>{
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId});
      }).toThrow();
    });
    //publications test
    it('should return a users note', function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId});
      const notes = res.fetch();
      expect(notes.length).toBe(1);
      expect(notes[0]).toEqual(noteOne);
    });

    it('should return 0 notes for user that has none', function () {
      const res = Meteor.server.publish_handlers.notes.apply({userId: 'user3'});
      const notes = res.fetch();
      expect(notes.length).toBe(0);
    });
  });
}
