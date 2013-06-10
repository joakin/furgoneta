
var expect = require('chai').expect
  , f      = require('../src')

describe('utilities', function() {

  describe('types', function() {

    describe('#typeOf', function() {
      it('should return Number for numbers', function() {
        expect(f.typeOf(1)).to.eql('Number')
      })
      it('should return Array for arrays', function() {
        expect(f.typeOf([])).to.eql('Array')
      })
      it('should return Objects for objects', function() {
        expect(f.typeOf({})).to.eql('Object')
      })
      it('should return String for strings', function() {
        expect(f.typeOf("")).to.eql('String')
      })
      it('should return Function for functions', function() {
        expect(f.typeOf(function() {})).to.eql('Function')
      })
      it('should return Boolean for booleans', function() {
        expect(f.typeOf(true)).to.eql('Boolean')
      })
    })

    describe('#isA', function() {
      it('should call typeOf and compare the string type with its result', function() {
        expect(f.isA('Number', 1)).to.eql(true)
        expect(f.isA('Array', [])).to.eql(true)
        expect(f.isA('Object', {})).to.eql(true)
        expect(f.isA('String', "")).to.eql(true)
        expect(f.isA('Function', function() {})).to.eql(true)
        expect(f.isA('Boolean', true)).to.eql(true)
      })
    })

    describe('#isNumber', function() {
      it('should return true for a Number', function() {
        expect(f.isNumber(1)).to.eql(true)
      })
    })

    describe('#isArray', function() {
      it('should return true for a Array', function() {
        expect(f.isArray([])).to.eql(true)
      })
    })

    describe('#isObject', function() {
      it('should return true for a Object', function() {
        expect(f.isObject({})).to.eql(true)
      })
    })

    describe('#isString', function() {
      it('should return true for a String', function() {
        expect(f.isString("")).to.eql(true)
      })
    })

    describe('#isFunction', function() {
      it('should return true for a Function', function() {
        expect(f.isFunction(function() {})).to.eql(true)
      })
    })

    describe('#isBoolean', function() {
      it('should return true for a Boolean', function() {
        expect(f.isBoolean(true)).to.eql(true)
      })
    })

  })

  describe('to functions', function() {
    describe('#objToFunc', function() {
      it('should convert array to function of its idxs', function() {
        expect(f.objToFunc([4, 5])(0)).to.eql(4)
        expect(f.objToFunc([4, 5])(1)).to.eql(5)
      })
      it('should convert object to function of its keys', function() {
        var sampleObj = { a: 1, b: 2 }
        expect(f.objToFunc(sampleObj)('a')).to.eql(1)
        expect(f.objToFunc(sampleObj)('b')).to.eql(2)
      })
    })
    describe('#prop', function() {
      it('should return a function that returns the access to param prop', function() {
        var length = f.prop('length')
        expect(length([1, 2])).to.eql(2)
      })
    })
  })

  describe('operators as functions', function(){
    describe('comparisons', function() {
      describe('#eq', function() {
        it('should perform strict comparison', function() {
          expect(f.eq(2, 3)).to.eql(false)
          expect(f.eq(2, 2)).to.eql(true)
          expect(f.eq(2, '2')).to.eql(false)
        })
      })
      describe('#eqc', function() {
        it('should perform cast comparison', function() {
          expect(f.eqc(2, 3)).to.eql(false)
          expect(f.eqc(2, 2)).to.eql(true)
          expect(f.eqc(2, '2')).to.eql(true)
        })
      })
      describe('#neq', function() {
        it('should perform negated strict comparison', function() {
          expect(f.neq(2, 3)).to.eql(true)
          expect(f.neq(2, 2)).to.eql(false)
          expect(f.neq(2, '2')).to.eql(true)
        })
      })
      describe('#neqc', function() {
        it('should perform cast comparison', function() {
          expect(f.neqc(2, 3)).to.eql(true)
          expect(f.neqc(2, 2)).to.eql(false)
          expect(f.neqc(2, '2')).to.eql(false)
        })
      })
      describe('#gt', function() {
        it('should perform cast comparison', function() {
          expect(f.gt(2, 3)).to.eql(false)
          expect(f.gt(2, 2)).to.eql(false)
          expect(f.gt(3, 2)).to.eql(true)
        })
      })
      describe('#ge', function() {
        it('should perform cast comparison', function() {
          expect(f.ge(2, 3)).to.eql(false)
          expect(f.ge(2, 2)).to.eql(true)
          expect(f.ge(3, 2)).to.eql(true)
        })
      })
      describe('#lt', function() {
        it('should perform cast comparison', function() {
          expect(f.lt(2, 3)).to.eql(true)
          expect(f.lt(2, 2)).to.eql(false)
          expect(f.lt(3, 2)).to.eql(false)
        })
      })
      describe('#le', function() {
        it('should perform cast comparison', function() {
          expect(f.le(2, 3)).to.eql(true)
          expect(f.le(2, 2)).to.eql(true)
          expect(f.le(3, 2)).to.eql(false)
        })
      })
    })
    describe('math', function() {
      describe('#add', function() {
        it('should add nums', function() {
          expect(f.add(1, 2)).to.eql(3)
        })
      })
      describe('#substract', function() {
        it('should substract 2 nums', function() {
          expect(f.sub(3, 1)).to.eql(2)
        })
      })
      describe('#multiply', function() {
        it('should multiply 2 nums', function() {
          expect(f.mul(3, 2)).to.eql(6)
        })
      })
      describe('#division', function() {
        it('should divide 2 nums', function() {
          expect(f.div(6, 2)).to.eql(3)
        })
      })
      describe('#mod', function() {
        it('should mod 2 nums', function() {
          expect(f.mod(3, 2)).to.eql(1)
        })
      })
    })
    describe('booleans', function() {
      describe('#not', function() {
        it('should negate its param and return it', function() {
          expect(f.not(false)).to.eql(true)
          expect(f.not(true)).to.eql(false)
        })
      })
      describe('#and', function() {
        it('should `and` its params', function() {
          expect(f.and(false, false)).to.eql(false)
          expect(f.and(false, true)).to.eql(false)
          expect(f.and(true, true)).to.eql(true)
        })
      })
      describe('#or', function() {
        it('should `or` its params', function() {
          expect(f.or(false, false)).to.eql(false)
          expect(f.or(false, true)).to.eql(true)
          expect(f.or(true, true)).to.eql(true)
        })
      })
    })
  })

})
