# Mochaccino [![Build Status](https://travis-ci.org/pawelgalazka/mochaccino.svg?branch=master)](https://travis-ci.org/pawelgalazka/mochaccino) [![npm version](https://badge.fury.io/js/mochaccino.svg)](https://badge.fury.io/js/mochaccino)
United js test tools

Mocha is great but having asserts, assert plugins and spies spread out as separate projects is a bit frustrating,
especially when you have to jump around all of the different documentations or setup test environment.

Mochaccino goals:
- documentation for expectations/spies/tests in ONE place
- providing all of the mocha important components together already setup
- shallow learning curve, quick to start and work with

## Quick start

```
npm install -g mocha
npm install --save-dev mochaccino
npm install --save-dev babel@5
mkdir test
```

configure mocha with babel to use es6 syntax (`test/mocha.opts`):
```
--compilers js:babel/register
```

create your first test file as `test/index.js`:

```javascript
import {expect, spy} from 'mochaccino';

describe('mochaccino', () => {
  it('do basic expectations', () => {
    expect(true).toBeTruthy();
  });
  
  it('do spy expectations', () => {
    let s = spy();
    s(1, 2);
    expect(s).toHaveBeenCalledWith(1, 2);
  });
});
```
and then just run in the command line:

```
mocha
```

## Expectations

* expect(a).toBe(b)
* expect(a).toEqual(b)
* expect(a).toBeTruthy()
* expect(a).toBeFalsy()
* expect(a).toBeDefined()
* expect(a).toBeUndefined()
* expect(a).toBeNull()
* expect(a).toBeLessThan(b)
* expect(a).toBeGreaterThan(b)
* expect([1,2]).toContain(1)
* expect(f).toThrow()
* expect(f).toThrowError(ErrorType)
* expect(s).toMatch(regexp)

for spies:

* expect(s).toHaveBeenCalled()
* expect(s).toHaveBeenCalledWith(a1, a2)
* expect(s).toHaveBeenCalledTimes(n)

each expectation can be combined with `not` flag:

```javascript
expect(a).not.toBe(b)
```


## Spies

```javascript
import {spy} from 'mochaccino';
```

**spy(obj, 'funcName');** - spy on objects

```javascript
spy(obj, 'funcName');
obj.funcName();
expect(obj.funcName).toHaveBeenCalled();
```

**spy();** - create standalone spy

```javascript
let s = spy();
s();
expect(s).toHaveBeenCalled();
```

**spy(obj, 'funcName').and.callFake(func);** - spy on object and call given function instead original one

```javascript
spy(obj, 'funcName').and.callFake(() => {
  return 123;
});
expect(obj.funcName()).toEqual(123);
expect(obj.funcName).toHaveBeenCalled();
```

**spy(obj, 'funcName').restore();** - restore original behaviour by removing the spy

```javascript
spy(obj, 'funcName');
obj.funcName.restore();
```

**spy(obj, 'funcName').and.callThrough();** - spy on object but call original method

**spy(obj, 'funcName').and.returnValue(5);** - spy will return a value when called
