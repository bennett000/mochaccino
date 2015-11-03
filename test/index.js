import {expect, spy} from '../lib/index'

describe('moccasin', () => {
   it('do basic chai assert', () => {
      expect('s').toBe('s');
   });

   it('do basic sinon assert', () => {
      let cb = spy();
      cb('hello foo');
      expect(cb).toHaveBeenCalledWith("hello foo");
   });
});