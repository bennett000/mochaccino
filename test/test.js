import chai, {expect} from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('moccasin', () => {
   it('do basic chai assert', () => {
      expect('s').to.be.a('string');
   });

   it('do basic sinon assert', () => {
      let cb = sinon.spy();
      cb('hello foo');
      expect(cb).to.have.been.calledWith("hello foo");
   });
});