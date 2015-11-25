# moccasin
United js test tools

Mocha is great but having asserts, spies and assert plugins spread out as separate projects is a bit frustrating,
especially when you have to jump around all of the different documentations or setup test environment.

Moccasin try to solve that by:
- providing all of the mocha components together already setup
- simple and predictable jasmine expectations interface
- documentation for expectations/spies/tests in ONE place

Moccasin works as a thin wrapper around mocha, chai, sinon and chai-sinon.

## Quick start

```
npm install -g mocha
npm install pawelgalazka/moccasin
mkdir test
```

Create your first test file as `test/index.js`:

```javascript
import {expect} from 'moccasin';

describe('test context', () => {
  it('test', () => {
    expect(true).toBeTruthy();
  });
});
```
and then just run in the command line:

```
mocha
```
