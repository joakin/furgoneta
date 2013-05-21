
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

  describe('#extend', function() {
    it('merges all the objects passed onto a new one', function() {
      var o = fjs.extend(
        { a: 1 },
        { b: 2 },
        { c: 3 }
      )
      expect(o.a).to.eql(1)
      expect(o.b).to.eql(2)
      expect(o.c).to.eql(3)
    })
  })


})

