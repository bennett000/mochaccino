import {expect, spy} from '../lib/index'

describe('expectations', () => {
   it('should do toBe expectation', () => {
      expect(12).toBe(12);
      expect('abc').toBe('abc');
   });

   it('should do not.toBe expectation', () => {
      expect('abc').not.toBe(12);
      expect(123).not.toBe('abc');
   });

   it('should do toBeDefined expectation', () => {
      expect(true).toBeDefined();
      expect({}).toBeDefined();
      expect(123).toBeDefined();
   });

   it('should do not.toBeDefined expectation', () => {
      let u;
      expect(undefined).not.toBeDefined();
      expect(u).not.toBeDefined();
   });

   it('should do toBeUndefined expectation', () => {
      let u;
      expect(undefined).toBeUndefined();
      expect(u).toBeUndefined();
   });

   it('should do not.toBeUndefined expectation', () => {
      expect(true).not.toBeUndefined();
      expect({}).not.toBeUndefined();
      expect(123).not.toBeUndefined();
   });

   it('should do toHaveBeenCalledWith expectation', () => {
      let cb = spy();
      cb('hello foo');
      expect(cb).toHaveBeenCalledWith("hello foo");
   });

   it('should do not.toHaveBeenCalledWith expectation', () => {
      let cb = spy();
      expect(cb).not.toHaveBeenCalledWith("hello foo");
   });

   it('should do toHaveBeenCalledTimes expectation', () => {
      let cb = spy();
      cb();
      cb();
      cb();
      expect(cb).toHaveBeenCalledTimes(3);
   });

   it('should do not.toHaveBeenCalledTimes expectation', () => {
      let cb = spy();
      cb();
      cb();
      expect(cb).not.toHaveBeenCalledTimes(3);
   });
});