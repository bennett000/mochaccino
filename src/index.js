import chai, {expect as chaiExpect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

class Expect {
    constructor(subject){
        if(subject instanceof Spy){
            this._subject = chaiExpect(subject.subject);
        } else {
            this._subject = chaiExpect(subject);
        }
        this._not = false;
    }

    get not(){
        this._subject = this._subject.not;
        this._not = true;
        return this;
    }

    toBe(arg){
        this._subject.to.equal(arg);
    }

    toContain(expectation){
        this._subject.to.include(expectation);
    }

    toEqual(arg){
        this._subject.to.eql(arg);
    }

    toHaveBeenCalled(){
        this._subject.to.have.been.called;
    }

    toHaveBeenCalledWith(...args){
        this._subject.to.have.been.calledWith(...args);
    }

    toHaveBeenCalledTimes(callCount){
        this._subject.to.have.been.callCount(callCount);
    }

    toBeDefined(){
        if(this._not){
            throw new Error('toBeDefined assertion cannot be used with \'not\' flag');
        }
        else {
            this._subject.not.to.be.an('undefined');
        }
    }

    toBeUndefined(){
        this._subject.to.be.an('undefined');
    }

    toBeNull(){
        this._subject.to.be.a('null');
    }

    toBeTruthy(){
        this._subject.to.be.true;
    }

    toBeFalsy(){
        this._subject.to.be.false;
    }

    toBeLessThan(expectation){
        this._subject.to.be.below(expectation);
    }

    toBeGreatherThan(expectation){
        this._subject.to.be.above(expectation);
    }

    toThrow(){
        this._subject.to.throw();
    }

    toThrowError(expectation){
        this._subject.to.throw(expectation);
    }

    toMatch(expectation){
        if(typeof expectation === 'string'){
            this._subject.to.have.string(expectation);
        }
        else {
            this._subject.to.match(expectation);
        }
    }
}

class Spy {
    constructor(...args){
        this._args = args;
        this._subject = sinon.stub(...args);
    }

    get and(){
        return this;
    }

    get subject(){
        return this._subject;
    }

    callThrough(){
        this._subject.restore();
        this._subject = sinon.spy(...this._args);
    }

    returnValue(obj){
        this._subject.returns(obj);
    }

    callFake(fake){
        this._subject.restore();
        this._subject = sinon.stub(this._args[0], this._args[1], fake);
    }
}


export function expect(arg){
    return new Expect(arg);
}

export function spy(...args){
    return new Spy(...args);
}
