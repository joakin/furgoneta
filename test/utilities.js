
var expect = require('chai').expect
  , fjs    = require('../src')

describe('utilities', function() {

  describe('types', function() {

    describe('#typeOf', function() {
      it('should return Number for numbers', function() {
        expect(fjs.typeOf(1)).to.eql('Number')
      })
      it('should return Array for arrays', function() {
        expect(fjs.typeOf([])).to.eql('Array')
      })
      it('should return Objects for objects', function() {
        expect(fjs.typeOf({})).to.eql('Object')
      })
      it('should return String for strings', function() {
        expect(fjs.typeOf("")).to.eql('String')
      })
      it('should return Function for functions', function() {
        expect(fjs.typeOf(function() {})).to.eql('Function')
      })
      it('should return Boolean for booleans', function() {
        expect(fjs.typeOf(true)).to.eql('Boolean')
      })
    })

    describe('#isA', function() {
      it('should call typeOf and compare the string type with its result', function() {
        expect(fjs.isA('Number', 1)).to.eql(true)
        expect(fjs.isA('Array', [])).to.eql(true)
        expect(fjs.isA('Object', {})).to.eql(true)
        expect(fjs.isA('String', "")).to.eql(true)
        expect(fjs.isA('Function', function() {})).to.eql(true)
        expect(fjs.isA('Boolean', true)).to.eql(true)
      })
    })

    describe('#isNumber', function() {
      it('should return true for a Number', function() {
        expect(fjs.isNumber(1)).to.eql(true)
      })
    })

    describe('#isArray', function() {
      it('should return true for a Array', function() {
        expect(fjs.isArray([])).to.eql(true)
      })
    })

    describe('#isObject', function() {
      it('should return true for a Object', function() {
        expect(fjs.isObject({})).to.eql(true)
      })
    })

    describe('#isString', function() {
      it('should return true for a String', function() {
        expect(fjs.isString("")).to.eql(true)
      })
    })

    describe('#isFunction', function() {
      it('should return true for a Function', function() {
        expect(fjs.isFunction(function() {})).to.eql(true)
      })
    })

    describe('#isBoolean', function() {
      it('should return true for a Boolean', function() {
        expect(fjs.isBoolean(true)).to.eql(true)
      })
    })

  })

  describe('to functions', function() {
    describe('#objToFunc', function() {
      it('should convert array to function of its idxs', function() {
        expect(fjs.objToFunc([4, 5])(0)).to.eql(4)
        expect(fjs.objToFunc([4, 5])(1)).to.eql(5)
      })
      it('should convert object to function of its keys', function() {
        var sampleObj = { a: 1, b: 2 }
        expect(fjs.objToFunc(sampleObj)('a')).to.eql(1)
        expect(fjs.objToFunc(sampleObj)('b')).to.eql(2)
      })
    })
  })

})
