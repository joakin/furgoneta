
var expect = require('chai').expect
  , f      = require('../src')

var sampleArr = [1, 2, 3]
  , sampleObj = { a: 1, b: 2 }

describe('collections', function() {

  describe('#each', function() {
    it('should return nothing', function() {
      var res = f.each(function() { return 5 }, sampleArr)
        , res2 = f.each(function() { return 5 }, sampleObj)
      expect(res).to.be.undefined
      expect(res2).to.be.undefined
    })
    it('should apply fn to each item of an array', function() {
      var count = 0
        , arr = [1, 2]
        , fn = function(v, k, coll) {
            expect(v).to.eql(arr[k])
            expect(coll).to.eql(arr)
            count += 1
          }
      f.each(fn, arr)
      expect(count).to.eql(2)
    })
    it('should apply fn to each item of an object', function() {
      var count = 0
        , obj = { a: 1, b: 2 }
        , fn = function(v, k, coll) {
            expect(v).to.eql(coll[k])
            expect(coll).to.eql(obj)
            count += 1
          }
      f.each(fn, obj)
      expect(count).to.eql(2)
    })
    it('should apply fn to each item of an string', function() {
      var count = 0
        , str = "Hola mundo"
        , fn = function(v, k, coll) {
            expect(v).to.eql(str[k])
            expect(coll).to.eql(str)
            count += 1
          }
      f.each(fn, str)
      expect(count).to.eql(10)
    })
    it('should stop iterating an array when fn returns true', function() {
      var count = 0
      f.each(function(x, idx) {
        count += 1
        if (idx === 1) return true
      }, sampleArr)
      expect(count).to.eql(2)
    })
    it('should stop iterating an object when fn returns true', function() {
      var count = 0
      f.each(function(x, idx) {
        count += 1
        if (idx === 'a') return true
      }, sampleObj)
      expect(count).to.eql(1)
    })
  })

  describe('#eachRight', function() {
    it('should return nothing', function() {
      var res = f.eachRight(function() { return 5 }, sampleArr)
        , res2 = f.eachRight(function() { return 5 }, sampleObj)
      expect(res).to.be.undefined
      expect(res2).to.be.undefined
    })
    it('should apply fn to each item of an array in reverse order', function() {
      var count = 0
        , arr = [1, 2]
        , fn = function(v, k, coll) {
            expect(v).to.eql(arr[k])
            expect(coll).to.eql(arr)
            count += 1
          }
      f.eachRight(fn, arr)
      expect(count).to.eql(2)
    })
    it('should apply fn to each item of an object in reverse order', function() {
      var count = 0
        , obj = { a: 1, b: 2 }
        , fn = function(v, k, coll) {
            expect(v).to.eql(coll[k])
            expect(coll).to.eql(obj)
            count += 1
          }
      f.eachRight(fn, obj)
      expect(count).to.eql(2)
    })
    it('should apply fn to each item of an string in reverse', function() {
      var count = 0
        , str = "Hola mundo"
        , fn = function(v, k, coll) {
            expect(v).to.eql(str[k])
            expect(coll).to.eql(str)
            count += 1
          }
      f.eachRight(fn, str)
      expect(count).to.eql(10)
    })
  })

  describe('#map', function() {
    it('should return an array with the result of applying fn to the items of the array', function() {
      var res = f.map(function(v, k, coll) { return v + 2 }, sampleArr)
      expect(res.length).to.eql(3)
      expect(res[0]).to.eql(3)
      expect(res[1]).to.eql(4)
      expect(res[2]).to.eql(5)
    })
    it('should return an array with the result of applying fn to the items of the object', function() {
      var res = f.map((function(v, k, coll) { return v + 2 }), sampleObj)
      expect(res.length).to.eql(2)
      expect(res[0]).to.eql(3)
      expect(res[1]).to.eql(4)
    })
  })

  describe('#reduce', function() {
    it('should apply fn with memo as a seed to through all items of the array', function() {
      var res = f.reduce((function(m, v, k, c) { return m + v }), 0, sampleArr)
      expect(res).to.eql(6)
    })
    it('should apply fn with memo as a seed to through all items of the object', function() {
      var res = f.reduce((function(m, v, k, c) { return m + v }), 0, sampleObj)
      expect(res).to.eql(3)
    })
  })

  describe('#fold', function() {
    it('should be an alias to reduce', function() {
      expect(f.reduce).to.eql(f.fold)
    })
  })

  describe('#reduce1', function() {
    it('should apply fn through all items of the array using the first one as seed', function() {
      var res = f.reduce1((function(m, v, k, c) { return m + v }), sampleArr)
      expect(res).to.eql(6)
    })
    it('should apply fn through all items of the object with the first value as seed', function() {
      var res = f.reduce1((function(m, v, k, c) { return m + v }), sampleObj)
      expect(res).to.eql(3)
    })
  })

  describe('#fold1', function() {
    it('should be an alias to reduce1', function() {
      expect(f.reduce1).to.eql(f.fold1)
    })
  })

  describe('#reduceRight', function() {
    it('should apply fn with memo as a seed to through all items of the array in reverse order', function() {
      var res = f.reduceRight((function(m, v) { return m / v }), 6, sampleArr)
      expect(res).to.eql(1)
    })
    it('should apply fn with memo as a seed to through all items of the object in reverse order', function() {
      var res = f.reduceRight((function(m, v) { return m / v }), 4, sampleObj)
      expect(res).to.eql(2)
    })
  })

  describe('#foldR', function() {
    it('should be an alias to reduceRight', function() {
      expect(f.foldR).to.eql(f.reduceRight)
    })
  })

  describe('#reduceRight1', function() {
    it('should apply fn with memo as a seed to through all items of the array in reverse order', function() {
      var res = f.reduceRight1((function(m, v) { return m / v }), sampleArr)
      expect(res).to.eql(1.5)
    })
    it('should apply fn with memo as a seed to through all items of the object in reverse order', function() {
      var res = f.reduceRight1((function(m, v) { return m / v }), sampleObj)
      expect(res).to.eql(2)
    })
  })

  describe('#foldR1', function() {
    it('should be an alias to reduceRight1', function() {
      expect(f.foldR1).to.eql(f.reduceRight1)
    })
  })

  describe('#find', function() {
    it('should return null when no item passed the truth test', function() {
      var res = f.find(function(x) { return false }, sampleArr)
        , res1 = f.find(function(x) { return false }, sampleObj)
      expect(res).to.be.falsy
      expect(res1).to.be.falsy
    })
    it('should return the element found if truth test passes', function() {
      var res = f.find(function(x) { return x===2 }, sampleArr)
        , res1 = f.find(function(x) { return x===2 }, sampleObj)
      expect(res).to.eql(2)
      expect(res1).to.eql(2)
    })
  })

  describe('#detect', function() {
    it('should be an alias to #find', function() {
      expect(f.detect).to.eql(f.find)
    })
  })

  describe('#filter', function() {
    it('should return all the items that pass the truth test in the array', function() {
      var res = f.filter(f.functor(true), sampleArr)
        , res2 = f.filter(function(x) { return x % 2 }, sampleArr)
      expect(res.length).to.eql(sampleArr.length)
      expect(res2.length).to.eql(2)
    })
    it('should return all the items that pass the truth test in the object', function() {
      var res = f.filter(f.functor(true), sampleObj)
        , res2 = f.filter(function(x) { return x % 2 }, sampleObj)
      expect(res.length).to.eql(f.keys(sampleObj).length)
      expect(res2.length).to.eql(1)
    })
  })

  describe('#select', function() {
    it('should be an alias to #filter', function() {
      expect(f.select).to.eql(f.filter)
    })
  })


})
