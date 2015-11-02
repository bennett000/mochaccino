import chai, {expect as chaiExpect} from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

export function expect(arg){
    return chaiExpect(arg);
}

export function spy(){
    return sinon.spy();
}