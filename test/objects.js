
var expect = require('chai').expect
  , fjs    = require('../src')

describe('Objects', function() {

  describe('#keys', function() {
    it('returns the keys of an object', function() {
      var keys = fjs.keys({a: 1, b: 2})
      expect(keys).length(2)
      expect(keys.indexOf('a')).to.be.above(-1)
    })
  })


})

