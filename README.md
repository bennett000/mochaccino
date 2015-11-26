# Mochaccino
United js test tools

Mocha is great but having asserts, spies and assert plugins spread out as separate projects is a bit frustrating,
especially when you have to jump around all of the different documentations or setup test environment.

Mochaccino try to solve that by:
- providing all of the mocha components together already setup
- simple and predictable jasmine-like expectations interface
- documentation for expectations/spies/tests in ONE place

Mochaccino works as a thin wrapper around mocha, chai, sinon and chai-sinon.

## Quick start

```
npm install -g mocha
npm install mochaccino
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

describe('mochaccino quick start', () => {
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

```
expect(a).not.toBe(b)
```


## Spies

```
import {spy} from 'mochaccino';
```

**spy(obj, 'funcName');** - spy on objects

```
spy(obj, 'funcName');
obj.funcName();
expect(obj.funcName).toHaveBeenCalled();
```

**spy();** - create standalone spy

```
let s = spy();
s();
expect(s).toHaveBeenCalled();
```

**spy(obj, 'funcName').and.callFake(func);** - spy on object and call given function instead original one

```
spy(obj, 'funcName').and.callFake(() => {
  return 123;
});
expect(obj.funcName()).toEqual(123);
expect(obj.funcName).toHaveBeenCalled();
```

**spy(obj, 'funcName').and.callThrough();** - spy on object but call original method

**spy(obj, 'funcName').and.returnValue(5);** - spy will return a value when called
