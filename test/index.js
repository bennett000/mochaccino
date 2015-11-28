/* eslint no-undef:0 */
import {expect, spy, dom} from '../lib/index';

describe('expectation', () => {
    it('toBe', () => {
        let a = [1, 2, 3],
            o = {a: 1, b: 2};

        expect(12).toBe(12);
        expect('abc').toBe('abc');
        expect(a).toBe(a);
        expect(o).toBe(o);
        expect(() => expect(o).toBe(a)).toThrow();
    });

    it('not.toBe', () => {
        let a = [1, 2, 3];
        expect('abc').not.toBe(12);
        expect(123).not.toBe('abc');
        expect([1, 2, 3]).not.toBe([1, 2, 3]);
        expect([1, 2, 3]).not.toBe([1, 2, 3, 4]);
        expect({a: 1, b: 2}).not.toBe({a: 1, b: 2, c: 3});
        expect(() => expect(a).not.toBe(a)).toThrow();
    });

    it('toEqual', () => {
        expect(12).toEqual(12);
        expect('abc').toEqual('abc');
        expect([1, 2, 3]).toEqual([1, 2, 3]);
        expect({a: 1, b: 2}).toEqual({a: 1, b: 2});
        expect(() => expect([1, 2]).toEqual([1])).toThrow();
    });

    it('not.toEqual', () => {
        expect('abc').not.toEqual(12);
        expect(123).not.toEqual('abc');
        expect([1, 2, 3]).not.toEqual([1, 2, 3, 4]);
        expect({a: 1, b: 2, c: 3}).not.toEqual({a: 1, b: 2});
        expect(() => expect([1]).not.toEqual([1])).toThrow();
    });

    it('toBeDefined', () => {
        expect(true).toBeDefined();
        expect({}).toBeDefined();
        expect(123).toBeDefined();
        expect(() => expect(undefined).toBeDefined()).toThrow();
    });

    it('not.toBeDefined', () => {
        expect(() => {
            expect(undefined).not.toBeDefined();
        }).toThrowError(Error);
    });

    it('toBeUndefined', () => {
        let u;
        expect(undefined).toBeUndefined();
        expect(u).toBeUndefined();
    });

    it('not.toBeUndefined', () => {
        expect(true).not.toBeUndefined();
        expect({}).not.toBeUndefined();
        expect(123).not.toBeUndefined();
    });

    it('toBeNull', () => {
        expect(null).toBeNull();
    });

    it('not.toBeNull', () => {
        expect(true).not.toBeNull();
        expect(false).not.toBeNull();
    });

    it('toBeTruthy', () => {
        expect(true).toBeTruthy();
    });

    it('not.toBeTruthy', () => {
        expect(false).not.toBeTruthy();
    });

    it('toBeFalsy', () => {
        expect(false).toBeFalsy();
    });

    it('not.toBeFalsy', () => {
        expect(true).not.toBeFalsy();
    });

    it('toHaveBeenCalledWith', () => {
        let cb = spy();
        cb('hello foo');
        expect(cb).toHaveBeenCalledWith('hello foo');
    });

    it('not.toHaveBeenCalledWith', () => {
        let cb = spy();
        expect(cb).not.toHaveBeenCalledWith('hello foo');
    });

    it('toHaveBeenCalledTimes', () => {
        let cb = spy();
        cb();
        cb();
        cb();
        expect(cb).toHaveBeenCalledTimes(3);
    });

    it('not.toHaveBeenCalledTimes', () => {
        let cb = spy();
        cb();
        cb();
        expect(cb).not.toHaveBeenCalledTimes(3);
    });

    it('toBeLessThan', () => {
        expect(5).toBeLessThan(6);
    });

    it('not.toBeLessThan', () => {
        expect(5).not.toBeLessThan(5);
        expect(5).not.toBeLessThan(4);
    });

    it('toBeGreaterThan', () => {
        expect(5).toBeGreaterThan(4);
    });

    it('not.toBeGreaterThan', () => {
        expect(5).not.toBeGreaterThan(6);
    });

    it('toContain', () => {
        expect([1, 2, 3]).toContain(3);
    });

    it('not.toContain', () => {
        expect([1, 2, 3]).not.toContain(4);
    });

    it('toThrow', () => {
        let bar = () => {
            throw 'test';
        };

        expect(bar).toThrow();
    });

    it('not.toThrow', () => {
        let foo = () => {
            return 1 + 2;
        };

        expect(foo).not.toThrow();
    });

    it('toThrowError', () => {
        let foo = () => {
            throw new TypeError('foo bar baz');
        };

        expect(foo).toThrowError('foo bar baz');
        expect(foo).toThrowError(/bar/);
        expect(foo).toThrowError(TypeError);
        expect(foo).toThrowError(TypeError, 'foo bar baz');
    });

    it('not.toThrowError', () => {
        let foo = () => {
            return 1 + 2;
        };

        let bar = () => {
            throw 'abc';
        };

        expect(foo).not.toThrowError('foo bar baz');
        expect(foo).not.toThrowError(/bar/);
        expect(foo).not.toThrowError(TypeError);
        expect(foo).not.toThrowError(TypeError, 'foo bar baz');
        expect(bar).not.toThrowError(TypeError);
    });

    it('toMatch', () => {
        let message = 'foo bar baz';
        expect(message).toMatch(/bar/);
        expect(message).toMatch('bar');
    });

    it('not.toMatch', () => {
        let message = 'foo bar baz';
        expect(message).not.toMatch(/quux/);
    });
});

describe('spy', () => {
    it('should create a standalone spy', () => {
        let sp = spy();
        expect(sp).not.toHaveBeenCalled();
        sp();
        expect(sp).toHaveBeenCalled();
    });

    describe('on object', () => {
        let funcCalled, obj;

        beforeEach(() => {
            funcCalled = false;
            obj = {
                f: () => {
                    funcCalled = true;
                    return true;
                }
            };
        });

        it('should not call original function by default', () => {
            spy(obj, 'f');
            expect(obj.f).not.toHaveBeenCalled();
            obj.f();
            expect(funcCalled).toBeFalsy();
            expect(obj.f).toHaveBeenCalled();
        });

        it('should allow to call original function', () => {
            spy(obj, 'f').and.callThrough();
            obj.f();
            expect(obj.f).toHaveBeenCalled();
            expect(funcCalled).toBeTruthy();
        });

        it('should allow to restore original object', () => {
            spy(obj, 'f');
            expect(obj.f).not.toHaveBeenCalled();
            obj.f.restore();
            expect(() => {
                expect(obj.f).not.toHaveBeenCalled();
            }).toThrow();
        });

        it('should allow to set return value', () => {
            spy(obj, 'f').and.returnValue('abc');
            expect(obj.f()).toEqual('abc');
            expect(obj.f).toHaveBeenCalled();
        });

        it('should allow to provide fake function', () => {
            spy(obj, 'f').and.callFake(() => {
                funcCalled = true;
                return 'def';
            });
            expect(obj.f()).toEqual('def');
            expect(funcCalled).toBeTruthy();
            expect(obj.f).toHaveBeenCalled();
        });
    });
});

describe('dom testing', () => {
    beforeEach(() => {
        dom.create();
    });

    afterEach(() => {
        dom.destroy();
    });

    it('should append a child to the body', () => {
        let par = document.createElement('P');
        let text = document.createTextNode('some text');
        par.appendChild(text);
        document.body.appendChild(par);
        let parCount = document.getElementsByTagName('P');

        expect(document.body.innerHTML).toBeDefined();
        expect(parCount.length).toEqual(1);
    });

    it('should not find the previously appended child', () => {
        let parCount = document.getElementsByTagName('P');

        expect(document.body.innerHTML).toEqual('');
        expect(parCount.length).toEqual(0);
    });
});
