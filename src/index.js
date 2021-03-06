import chai, {expect as chaiExpect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { jsdom } from 'jsdom';

chai.use(sinonChai);

export class Expect {
    constructor(subject){
        if(subject && subject.spyProxy){
            this._subject = chaiExpect(subject.getSubject());
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

    toBeGreaterThan(expectation){
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

export function expect(arg){
    return new Expect(arg);
}

export function spy(...config){
    let sinonSpy = sinon.stub(...config);

    function spyProxy(...args){
        sinonSpy(...args);
    }

    spyProxy.and = spyProxy;
    spyProxy.spyProxy = true;

    spyProxy.getSubject = function(){
        return sinonSpy;
    };

    spyProxy.callThrough = function(){
        sinonSpy.restore();
        sinonSpy = sinon.spy(...config);
    };

    spyProxy.returnValue = function(obj){
        sinonSpy.returns(obj);
    };

    spyProxy.callFake = function(fake){
        sinonSpy.restore();
        sinonSpy = sinon.stub(config[0], config[1], fake);
    };

    return spyProxy;
}

export const dom = {
    exposedProperties: ['window', 'navigator', 'document'],
    create: () => {
        global.document = jsdom('');
        global.window = document.defaultView;
        Object.keys(document.defaultView).forEach((property) => {
            if (typeof global[property] === 'undefined') {
                dom.exposedProperties.push(property);
                global[property] = document.defaultView[property];
            }
        });

        global.navigator = {
            userAgent: 'node.js'
        };
    },
    destroy: () => {
        if (typeof global.window !== 'undefined') {
            global.window.close();
        }
        global.document = undefined;
        dom.exposedProperties.forEach((property) => {
            delete global[property];
        });
    },
    clear: () => {
        while(document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    }
};
