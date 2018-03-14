import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from './users';

if(Meteor.isServer) {
  describe('users', function () {
    it('should allow valid email address', function () {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      };
      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });
    it('should reject an invalid email', function () {
      const testUser = {
        emails: [
          {
            address: 'testexamplecom'
          }
        ]
      };
      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    });
  });
}

// const add = (a, b) => {
//   if (typeof b !== 'number') {
//     return a + a;
//   }
//   return a + b;
// }
//
// const square = (a) => a*a;
//
// describe('add', function () {
//   it('should add two numbers', function () {
//     const res = add(4, 6);
//
//     expect(res).toBe(10);
//   });
//
//   it('should double a single number', function () {
//     const res = add(44);
//     expect(res).toBe(88);
//   });
// });
//
// describe('square', function () {
//   it('should square a number', function () {
//     const res = square(24);
//     expect(res).toBe(576);
//   });
// });
