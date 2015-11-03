# moccasin
United js test tools

Mocha is great but having asserts, spies and assert plugins as separate projects became frustrating
as soon as you have to setup all of those things together and jump around all of the different documentations later.

Moccasin try to solve that by:
- providing all of the mocha components together already setup
- simple and known jasmine expectations interface
- documentation for expectations/spies/tests in ONE place

Moccasin works as a wrapper around mocha, chai, sinon and chai-sinon.
