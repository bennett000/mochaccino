import {expect, spy} from '../lib/index'

describe('moccasin', () => {
   it('do basic chai assert', () => {
      expect('s').to.be.a('string');
   });

   it('do basic sinon assert', () => {
      let cb = spy();
      cb('hello foo');
      expect(cb).to.have.been.calledWith("hello foo");
   });
});