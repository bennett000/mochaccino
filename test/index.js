import {expect, spy} from '../lib/index'

describe('expect', () => {
   it('toBe', () => {
      expect(12).toBe(12);
      expect('abc').toBe('abc');
   });

   it('not.toBe', () => {
      expect('abc').not.toBe(12);
      expect(123).not.toBe('abc');
   });

   it('toBeDefined', () => {
      expect(true).toBeDefined();
      expect({}).toBeDefined();
      expect(123).toBeDefined();
   });

   it.skip('not.toBeDefined', () => {
      let u;
      expect(undefined).not.toBeDefined();
      expect(u).not.toBeDefined();
   });

   it('toBeUndefined', () => {
      let u;
      expect(undefined).toBeUndefined();
      expect(u).toBeUndefined();
   });

   it('not.toBeUndefined', () => {
      expect(true).not.toBeUndefined();
      expect({}).not.toBeUndefined();
      expect(123).not.toBeUndefined();
   });

   it('toBeNull', () => {
      expect(null).toBeNull();
   });

   it('not.toBeNull', () => {
      expect(true).not.toBeNull();
      expect(false).not.toBeNull();
   });

   it('toBeTruthy', () => {
      expect(true).toBeTruthy();
   });

   it('not.toBeTruthy', () => {
      expect(false).not.toBeTruthy();
   });

   it('toBeFalsy', () => {
      expect(false).toBeFalsy();
   });

   it('not.toBeFalsy', () => {
      expect(true).not.toBeFalsy();
   });

   it('toHaveBeenCalledWith', () => {
      let cb = spy();
      cb('hello foo');
      expect(cb).toHaveBeenCalledWith("hello foo");
   });

   it('not.toHaveBeenCalledWith', () => {
      let cb = spy();
      expect(cb).not.toHaveBeenCalledWith("hello foo");
   });

   it('toHaveBeenCalledTimes', () => {
      let cb = spy();
      cb();
      cb();
      cb();
      expect(cb).toHaveBeenCalledTimes(3);
   });

   it('not.toHaveBeenCalledTimes', () => {
      let cb = spy();
      cb();
      cb();
      expect(cb).not.toHaveBeenCalledTimes(3);
   });
});