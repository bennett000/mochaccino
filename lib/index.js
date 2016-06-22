'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dom = exports.Expect = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.expect = expect;
exports.spy = spy;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _jsdom = require('jsdom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_chai2.default.use(_sinonChai2.default);

var Expect = exports.Expect = function () {
    function Expect(subject) {
        _classCallCheck(this, Expect);

        if (subject && subject.spyProxy) {
            this._subject = (0, _chai.expect)(subject.getSubject());
        } else {
            this._subject = (0, _chai.expect)(subject);
        }
        this._not = false;
    }

    _createClass(Expect, [{
        key: 'toBe',
        value: function toBe(arg) {
            this._subject.to.equal(arg);
        }
    }, {
        key: 'toContain',
        value: function toContain(expectation) {
            this._subject.to.include(expectation);
        }
    }, {
        key: 'toEqual',
        value: function toEqual(arg) {
            this._subject.to.eql(arg);
        }
    }, {
        key: 'toHaveBeenCalled',
        value: function toHaveBeenCalled() {
            this._subject.to.have.been.called;
        }
    }, {
        key: 'toHaveBeenCalledWith',
        value: function toHaveBeenCalledWith() {
            var _subject$to$have$been;

            (_subject$to$have$been = this._subject.to.have.been).calledWith.apply(_subject$to$have$been, arguments);
        }
    }, {
        key: 'toHaveBeenCalledTimes',
        value: function toHaveBeenCalledTimes(callCount) {
            this._subject.to.have.been.callCount(callCount);
        }
    }, {
        key: 'toBeDefined',
        value: function toBeDefined() {
            if (this._not) {
                throw new Error('toBeDefined assertion cannot be used with \'not\' flag');
            } else {
                this._subject.not.to.be.an('undefined');
            }
        }
    }, {
        key: 'toBeUndefined',
        value: function toBeUndefined() {
            this._subject.to.be.an('undefined');
        }
    }, {
        key: 'toBeNull',
        value: function toBeNull() {
            this._subject.to.be.a('null');
        }
    }, {
        key: 'toBeTruthy',
        value: function toBeTruthy() {
            this._subject.to.be.true;
        }
    }, {
        key: 'toBeFalsy',
        value: function toBeFalsy() {
            this._subject.to.be.false;
        }
    }, {
        key: 'toBeLessThan',
        value: function toBeLessThan(expectation) {
            this._subject.to.be.below(expectation);
        }
    }, {
        key: 'toBeGreaterThan',
        value: function toBeGreaterThan(expectation) {
            this._subject.to.be.above(expectation);
        }
    }, {
        key: 'toThrow',
        value: function toThrow() {
            this._subject.to.throw();
        }
    }, {
        key: 'toThrowError',
        value: function toThrowError(expectation) {
            this._subject.to.throw(expectation);
        }
    }, {
        key: 'toMatch',
        value: function toMatch(expectation) {
            if (typeof expectation === 'string') {
                this._subject.to.have.string(expectation);
            } else {
                this._subject.to.match(expectation);
            }
        }
    }, {
        key: 'not',
        get: function get() {
            this._subject = this._subject.not;
            this._not = true;
            return this;
        }
    }]);

    return Expect;
}();

function expect(arg) {
    return new Expect(arg);
}

function spy() {
    for (var _len = arguments.length, config = Array(_len), _key = 0; _key < _len; _key++) {
        config[_key] = arguments[_key];
    }

    var sinonSpy = _sinon2.default.stub.apply(_sinon2.default, config);

    function spyProxy() {
        sinonSpy.apply(undefined, arguments);
    }

    spyProxy.and = spyProxy;
    spyProxy.spyProxy = true;

    spyProxy.getSubject = function () {
        return sinonSpy;
    };

    spyProxy.callThrough = function () {
        sinonSpy.restore();
        sinonSpy = _sinon2.default.spy.apply(_sinon2.default, config);
    };

    spyProxy.returnValue = function (obj) {
        sinonSpy.returns(obj);
    };

    spyProxy.callFake = function (fake) {
        sinonSpy.restore();
        sinonSpy = _sinon2.default.stub(config[0], config[1], fake);
    };

    return spyProxy;
}

var dom = exports.dom = {
    create: function create() {
        var exposedProperties = ['window', 'navigator', 'document'];

        global.document = (0, _jsdom.jsdom)('');
        global.window = document.defaultView;
        Object.keys(document.defaultView).forEach(function (property) {
            if (typeof global[property] === 'undefined') {
                exposedProperties.push(property);
                global[property] = document.defaultView[property];
            }
        });

        global.navigator = {
            userAgent: 'node.js'
        };
    },
    clear: function clear() {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    }
};