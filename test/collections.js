
var expect = require('chai').expect
  , fjs    = require('../src')

var sampleArr = [1, 2, 3]
  , sampleObj = { a: 1, b: 2 }

describe('collections', function() {

  describe('#each', function() {
    it('should return nothing', function() {
      var res = fjs.each(function() { return 5 }, sampleArr)
        , res2 = fjs.each(function() { return 5 }, sampleObj)
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
      fjs.each(fn, arr)
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
      fjs.each(fn, obj)
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
      fjs.each(fn, str)
      expect(count).to.eql(10)
    })
  })

  describe('#eachRight', function() {
    it('should return nothing', function() {
      var res = fjs.eachRight(function() { return 5 }, sampleArr)
        , res2 = fjs.eachRight(function() { return 5 }, sampleObj)
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
      fjs.eachRight(fn, arr)
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
      fjs.eachRight(fn, obj)
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
      fjs.eachRight(fn, str)
      expect(count).to.eql(10)
    })
  })

  describe('#map', function() {
    it('should return an array with the result of applying fn to the items of the array', function() {
      var res = fjs.map(function(v, k, coll) { return v + 2 }, sampleArr)
      expect(res.length).to.eql(3)
      expect(res[0]).to.eql(3)
      expect(res[1]).to.eql(4)
      expect(res[2]).to.eql(5)
    })
    it('should return an array with the result of applying fn to the items of the object', function() {
      var res = fjs.map((function(v, k, coll) { return v + 2 }), sampleObj)
      expect(res.length).to.eql(2)
      expect(res[0]).to.eql(3)
      expect(res[1]).to.eql(4)
    })
  })

  describe('#reduce', function() {
    it('should apply fn with memo as a seed to through all items of the array', function() {
      var res = fjs.reduce((function(m, v, k, c) { return m + v }), 0, sampleArr)
      expect(res).to.eql(6)
    })
    it('should apply fn with memo as a seed to through all items of the object', function() {
      var res = fjs.reduce((function(m, v, k, c) { return m + v }), 0, sampleObj)
      expect(res).to.eql(3)
    })
  })

  describe('#fold', function() {
    it('should be an alias to reduce', function() {
      expect(fjs.reduce).to.eql(fjs.fold)
    })
  })

  describe('#reduce1', function() {
    it('should apply fn through all items of the array using the first one as seed', function() {
      var res = fjs.reduce1((function(m, v, k, c) { return m + v }), sampleArr)
      expect(res).to.eql(6)
    })
    it('should apply fn through all items of the object with the first value as seed', function() {
      var res = fjs.reduce1((function(m, v, k, c) { return m + v }), sampleObj)
      expect(res).to.eql(3)
    })
  })

  describe('#fold1', function() {
    it('should be an alias to reduce1', function() {
      expect(fjs.reduce1).to.eql(fjs.fold1)
    })
  })

  describe('#reduceRight', function() {
    it('should apply fn with memo as a seed to through all items of the array in reverse order', function() {
      var res = fjs.reduceRight((function(m, v) { return m / v }), 6, sampleArr)
      expect(res).to.eql(1)
    })
    it('should apply fn with memo as a seed to through all items of the object in reverse order', function() {
      var res = fjs.reduceRight((function(m, v) { return m / v }), 4, sampleObj)
      expect(res).to.eql(2)
    })
  })

  describe('#foldR', function() {
    it('should be an alias to reduceRight', function() {
      expect(fjs.foldR).to.eql(fjs.reduceRight)
    })
  })

  describe('#reduceRight1', function() {
    it('should apply fn with memo as a seed to through all items of the array in reverse order', function() {
      var res = fjs.reduceRight1((function(m, v) { return m / v }), sampleArr)
      expect(res).to.eql(1.5)
    })
    it('should apply fn with memo as a seed to through all items of the object in reverse order', function() {
      var res = fjs.reduceRight1((function(m, v) { return m / v }), sampleObj)
      expect(res).to.eql(2)
    })
  })

  describe('#foldR1', function() {
    it('should be an alias to reduceRight1', function() {
      expect(fjs.foldR1).to.eql(fjs.reduceRight1)
    })
  })


})
