
{expect, fjs} = require './common'

sampleArr = [1, 2, 3]
sampleObj = {a: 1, b: 2}

describe 'collections', ->

  describe '#each', ->

    it 'should return nothing', ->
      res = fjs.each((-> 5), sampleArr)
      expect(res).to.be.undefined
      res = fjs.each((-> 5), sampleObj)
      expect(res).to.be.undefined

    it 'should apply fn to each item of an array', ->
      count = 0
      arr = [1, 2]

      fn = (v, k, coll) ->
        expect(v).to.eql arr[k]
        expect(coll).to.eql arr
        count += 1

      fjs.each(fn, arr)
      expect(count).to.eql 2

    it 'should apply fn to each item of an object', ->
      count = 0
      obj = { a: 1, b: 2 }

      fn = (v, k, coll) ->
        expect(v).to.eql coll[k]
        expect(coll).to.eql obj
        count += 1

      fjs.each(fn, obj)
      expect(count).to.eql 2

    it 'should apply fn to each item of an string', ->
      count = 0
      str = "Hola mundo"

      fn = (v, k, coll) ->
        expect(v).to.eql str[k]
        expect(coll).to.eql str
        count += 1

      fjs.each(fn, str)
      expect(count).to.eql 10


  describe '#map', ->

    it 'should return an array with the result of applying fn to the items of the array', ->
      res = fjs.map ((v, k, coll) -> v + 2), sampleArr
      expect(res.length).to.eql 3
      expect(res[0]).to.eql 3
      expect(res[1]).to.eql 4
      expect(res[2]).to.eql 5

    it 'should return an array with the result of applying fn to the items of the object', ->
      res = fjs.map ((v, k, coll) -> v + 2), sampleObj
      expect(res.length).to.eql 2
      expect(res[0]).to.eql 3
      expect(res[1]).to.eql 4

  describe '#reduce', ->

    it 'should apply fn with memo as a seed to through all items of the array', ->
      res = fjs.reduce ((m, v, k, c) ->
        m + v
      ), 0, sampleArr
      expect(res).to.eql 6

    it 'should apply fn with memo as a seed to through all items of the object', ->
      res = fjs.reduce ((m, v, k, c) ->
        m + v
      ), 0, sampleObj
      expect(res).to.eql 3

  describe '#fold', ->
    it 'should be an alias to reduce', ->
      expect(fjs.reduce).to.eql fjs.fold

  describe '#reduce1', ->

    it 'should apply fn through all items of the array using the first one as seed', ->
      res = fjs.reduce1 ((m, v, k, c) ->
        m + v
      ), sampleArr
      expect(res).to.eql 6

    it 'should apply fn through all items of the object with the first value as seed', ->
      res = fjs.reduce1 ((m, v, k, c) ->
        m + v
      ), sampleObj
      expect(res).to.eql 3

  describe '#fold1', ->
    it 'should be an alias to reduce1', ->
      expect(fjs.reduce1).to.eql fjs.fold1



describe 'functions', ->




describe 'utilities', ->

  describe '#typeOf', ->
    it 'should return Number for numbers', ->
      expect(fjs.typeOf(1)).to.eql 'Number'
    it 'should return Array for arrays', ->
      expect(fjs.typeOf([])).to.eql 'Array'
    it 'should return Objects for objects', ->
      expect(fjs.typeOf({})).to.eql 'Object'
    it 'should return String for strings', ->
      expect(fjs.typeOf("")).to.eql 'String'
    it 'should return Function for functions', ->
      expect(fjs.typeOf(->)).to.eql 'Function'
    it 'should return Boolean for booleans', ->
      expect(fjs.typeOf(true)).to.eql 'Boolean'

  describe '#isA', ->
    it 'should call typeOf and compare the string type with its result', ->
      expect(fjs.isA('Number', 1)).to.eql true
      expect(fjs.isA('Array', [])).to.eql true
      expect(fjs.isA('Object', {})).to.eql true
      expect(fjs.isA('String', "")).to.eql true
      expect(fjs.isA('Function', ->)).to.eql true
      expect(fjs.isA('Boolean', true)).to.eql true

  describe '#isNumber', ->
    it 'should return true for a Number', ->
      expect(fjs.isNumber(1)).to.eql true

  describe '#isArray', ->
    it 'should return true for a Array', ->
      expect(fjs.isArray([])).to.eql true

  describe '#isObject', ->
    it 'should return true for a Object', ->
      expect(fjs.isObject({})).to.eql true

  describe '#isString', ->
    it 'should return true for a String', ->
      expect(fjs.isString("")).to.eql true

  describe '#isFunction', ->
    it 'should return true for a Function', ->
      expect(fjs.isFunction(->)).to.eql true

  describe '#isBoolean', ->
    it 'should return true for a Boolean', ->
      expect(fjs.isBoolean(true)).to.eql true

