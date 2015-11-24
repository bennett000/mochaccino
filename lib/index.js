'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.expect = expect;
exports.spy = spy;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

_chai2['default'].use(_sinonChai2['default']);

var Expect = (function () {
    function Expect(subject) {
        _classCallCheck(this, Expect);

        if (subject instanceof Spy) {
            this._subject = (0, _chai.expect)(subject.subject);
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
            this._subject.to.be['true'];
        }
    }, {
        key: 'toBeFalsy',
        value: function toBeFalsy() {
            this._subject.to.be['false'];
        }
    }, {
        key: 'toBeLessThan',
        value: function toBeLessThan(expectation) {
            this._subject.to.be.below(expectation);
        }
    }, {
        key: 'toBeGreatherThan',
        value: function toBeGreatherThan(expectation) {
            this._subject.to.be.above(expectation);
        }
    }, {
        key: 'toThrow',
        value: function toThrow() {
            this._subject.to['throw']();
        }
    }, {
        key: 'toThrowError',
        value: function toThrowError(expectation) {
            this._subject.to['throw'](expectation);
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
})();

var Spy = (function () {
    function Spy() {
        _classCallCheck(this, Spy);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        this._args = args;
        this._subject = _sinon2['default'].stub.apply(_sinon2['default'], args);
    }

    _createClass(Spy, [{
        key: 'callThrough',
        value: function callThrough() {
            this._subject.restore();
            this._subject = _sinon2['default'].spy.apply(_sinon2['default'], _toConsumableArray(this._args));
        }
    }, {
        key: 'returnValue',
        value: function returnValue(obj) {
            this._subject.returns(obj);
        }
    }, {
        key: 'callFake',
        value: function callFake(fake) {
            this._subject.restore();
            this._subject = _sinon2['default'].stub(this._args[0], this._args[1], fake);
        }
    }, {
        key: 'and',
        get: function get() {
            return this;
        }
    }, {
        key: 'subject',
        get: function get() {
            return this._subject;
        }
    }]);

    return Spy;
})();

function expect(arg) {
    return new Expect(arg);
}

function spy() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new (_bind.apply(Spy, [null].concat(args)))();
}
