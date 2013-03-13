

var expect = require('chai').expect
  , fjs    = require('../src')

var sampleArr = [1, 2, 3, 4]
var sampleArr2 = [7, 8, 9]

describe('Arrays', function() {

  describe('#first', function() {
    it('should return array from 1 to the end', function() {
      var res = fjs.first(sampleArr)
      expect(res).to.eql(1)
    })
  })

  describe('#rest', function() {
    it('should return array from 1 to the end', function() {
      var res = fjs.rest(sampleArr)
      expect(res.length).to.eql(3)
      expect(res[0]).to.eql(2)
    })
  })

  describe('#last', function() {
    it('should return the last element of the array', function() {
      expect(fjs.last(sampleArr)).to.eql(4)
    })
  })

  describe('#initial', function() {
    it('should return the elements of the array but the last one', function() {
      var initialArr = fjs.initial(sampleArr)
      expect(initialArr.length).to.eql(3)
      expect(initialArr[0]).to.eql(1)
      expect(initialArr[initialArr.length-1]).to.eql(3)
    })
  })

  describe('#concat', function() {
    it('should concat two arrays', function() {
      var res = fjs.concat(sampleArr, sampleArr2)
      expect(res.length).to.eql(7)
      expect(res[0]).to.eql(1)
      expect(res[res.length-1]).to.eql(9)
    })
  })


})

