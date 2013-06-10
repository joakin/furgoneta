
var expect = require('chai').expect
  , f      = require('../src')

describe('Objects', function() {

  describe('#keys', function() {
    it('returns the keys of an object', function() {
      var keys = f.keys({a: 1, b: 2})
      expect(keys).length(2)
      expect(keys.indexOf('a')).to.be.above(-1)
    })
  })

  describe('#extend', function() {
    it('merges all the objects passed onto a new one', function() {
      var o = f.extend(
        { a: 1 },
        { b: 2 },
        { c: 3 }
      )
      expect(o.a).to.eql(1)
      expect(o.b).to.eql(2)
      expect(o.c).to.eql(3)
    })
    it('merges the objects from right to left into a new one', function() {
      var o = f.extend(
        { a: 1 },
        { a: 2 },
        { a: 3 }
      )
      expect(o.a).to.eql(3)
    })
  })


})

