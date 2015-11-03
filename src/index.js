import chai, {expect as chaiExpect} from 'chai'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

export function expect(arg){
    return new Expect(arg);
}

export function spy(){
    return sinon.spy();
}

class Expect {
    constructor(expected){
        this._expectation = chaiExpect(expected);
    }

    get not(){
        this._expectation = this._expectation.not;
        return this;
    }

    toBe(arg){
        this._expectation.to.equal(arg);
    }

    toContain(){

    }

    toEqual(){

    }

    toHaveBeenCalled(){

    }

    toHaveBeenCalledWith(...args){
        this._expectation.to.have.been.calledWith(...args);
    }

    toBeDefined(){

    }

    toBeUndefined(){

    }

    toBeNull(){

    }

    toBeTruthy(){

    }

    toBeFalsy(){

    }

    toBeLessThan(){

    }

    toBeGreatherThan(){

    }

    toThrow(){

    }

    toThrowError(){

    }

    toMatch(){

    }
}