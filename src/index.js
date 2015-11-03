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
    constructor(subject){
        this._subject = chaiExpect(subject);
    }

    get not(){
        this._subject = this._subject.not;
        return this;
    }

    toBe(arg){
        this._subject.to.equal(arg);
    }

    toContain(){

    }

    toEqual(){

    }

    toHaveBeenCalled(){

    }

    toHaveBeenCalledWith(...args){
        this._subject.to.have.been.calledWith(...args);
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