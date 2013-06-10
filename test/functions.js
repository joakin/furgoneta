
var expect = require('chai').expect
  , f      = require('../src')

var add = function(a, b) { return a + b }
var subs = function(a, b) { return a - b }
var by = function(a, b) { return a * b }

describe('Functions', function() {

  describe('#compose', function() {
    it('should return a function', function() {
      var composed = f.compose(function(){}, function(){})
      expect(composed).to.be.a('function')
    })
    it('should compose functions arguments in the correct order', function() {
      var by2 = f.partial(by, 2)
        , add2 = f.partial(add, 2)
        , cfn = f.compose(by2, add2)
        , res = cfn(2)
      expect(res).to.eql(8)
    })
  })

  describe('#partial', function() {
    it('should return a function', function() {
      var add2 = f.partial(add, 2)
      expect(add2).to.be.a('function')
    })
    it('should apply the partial to the arguments passed', function() {
      var add2 = f.partial(add, 2)
      expect(add2(2)).to.eql(4)
    })
  })

  describe('#id', function() {
    it('should return what comes in', function() {
      expect(f.id(1)).to.eql(1)
    })
  })

  describe('#functor', function() {
    it('should return a lambda that returns the param if param is not a func', function() {
      var x = { random: 'stuff' }
      expect(f.functor(x)()).to.eql(x)
    })
    it('should return param if it is a function', function() {
      var fn = function() { return 5; }
      expect(f.functor(fn)).to.eql(fn)
    })
  })

})

