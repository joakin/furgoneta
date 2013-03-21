
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
    describe('#prop', function() {
      it('should return a function that returns the access to param prop', function() {
        var length = fjs.prop('length')
        expect(length([1, 2])).to.eql(2)
      })
    })
  })

  describe('operators as functions', function(){
    describe('comparisons', function() {
      describe('#eq', function() {
        it('should perform strict comparison', function() {
          expect(fjs.eq(2, 3)).to.eql(false)
          expect(fjs.eq(2, 2)).to.eql(true)
          expect(fjs.eq(2, '2')).to.eql(false)
        })
      })
      describe('#eqc', function() {
        it('should perform cast comparison', function() {
          expect(fjs.eqc(2, 3)).to.eql(false)
          expect(fjs.eqc(2, 2)).to.eql(true)
          expect(fjs.eqc(2, '2')).to.eql(true)
        })
      })
      describe('#neq', function() {
        it('should perform negated strict comparison', function() {
          expect(fjs.neq(2, 3)).to.eql(true)
          expect(fjs.neq(2, 2)).to.eql(false)
          expect(fjs.neq(2, '2')).to.eql(true)
        })
      })
      describe('#neqc', function() {
        it('should perform cast comparison', function() {
          expect(fjs.neqc(2, 3)).to.eql(true)
          expect(fjs.neqc(2, 2)).to.eql(false)
          expect(fjs.neqc(2, '2')).to.eql(false)
        })
      })
      describe('#gt', function() {
        it('should perform cast comparison', function() {
          expect(fjs.gt(2, 3)).to.eql(false)
          expect(fjs.gt(2, 2)).to.eql(false)
          expect(fjs.gt(3, 2)).to.eql(true)
        })
      })
      describe('#ge', function() {
        it('should perform cast comparison', function() {
          expect(fjs.ge(2, 3)).to.eql(false)
          expect(fjs.ge(2, 2)).to.eql(true)
          expect(fjs.ge(3, 2)).to.eql(true)
        })
      })
      describe('#lt', function() {
        it('should perform cast comparison', function() {
          expect(fjs.lt(2, 3)).to.eql(true)
          expect(fjs.lt(2, 2)).to.eql(false)
          expect(fjs.lt(3, 2)).to.eql(false)
        })
      })
      describe('#le', function() {
        it('should perform cast comparison', function() {
          expect(fjs.le(2, 3)).to.eql(true)
          expect(fjs.le(2, 2)).to.eql(true)
          expect(fjs.le(3, 2)).to.eql(false)
        })
      })
    })
    describe('math', function() {
      describe('#add', function() {
        it('should add nums', function() {
          expect(fjs.add(1, 2)).to.eql(3)
        })
      })
      describe('#substract', function() {
        it('should substract 2 nums', function() {
          expect(fjs.sub(3, 1)).to.eql(2)
        })
      })
      describe('#multiply', function() {
        it('should multiply 2 nums', function() {
          expect(fjs.mul(3, 2)).to.eql(6)
        })
      })
      describe('#division', function() {
        it('should divide 2 nums', function() {
          expect(fjs.div(6, 2)).to.eql(3)
        })
      })
      describe('#mod', function() {
        it('should mod 2 nums', function() {
          expect(fjs.mod(3, 2)).to.eql(1)
        })
      })
    })
    describe('booleans', function() {
      describe('#not', function() {
        it('should negate its param and return it', function() {
          expect(fjs.not(false)).to.eql(true)
          expect(fjs.not(true)).to.eql(false)
        })
      })
      describe('#and', function() {
        it('should `and` its params', function() {
          expect(fjs.and(false, false)).to.eql(false)
          expect(fjs.and(false, true)).to.eql(false)
          expect(fjs.and(true, true)).to.eql(true)
        })
      })
      describe('#or', function() {
        it('should `or` its params', function() {
          expect(fjs.or(false, false)).to.eql(false)
          expect(fjs.or(false, true)).to.eql(true)
          expect(fjs.or(true, true)).to.eql(true)
        })
      })
    })
  })

})
