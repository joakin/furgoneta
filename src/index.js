
var fjs = {}

var each = fjs.each = function(fn, coll) {
  map(fn, coll)
  return void 0
}

var map = fjs.map = function(fn, coll) {
  var k, v, _i, _len, _results, _results1
  if (isObject(coll)) {
    _results = []
    for (k in coll) {
      v = coll[k]
      _results.push(fn(v, k, coll))
    }
    return _results
  } else {
    _results1 = []
    for (k = _i = 0, _len = coll.length; _i < _len; k = ++_i) {
      v = coll[k]
      _results1.push(fn(v, k, coll))
    }
    return _results1
  }
}

var reduce = fjs.reduce = function(fn, seed, coll) {
  var memo
  memo = seed
  each((function(value, key, coll1) {
    return memo = fn(memo, value, key, coll1)
  }), coll)
  return memo
}
var fold = fjs.fold = reduce

var reduce1 = fjs.reduce1 = function(fn, coll) {
  var memo
  memo = null
  each((function(value, key, coll1) {
    if (memo !== null) {
      return memo = fn(memo, value, key, coll1)
    } else {
      return memo = value
    }
  }), coll)
  return memo
}
var fold1 = fjs.fold1 = reduce1

objToString = {}.toString

var typeOf = fjs.typeOf = function(it) {
  return objToString.call(it).slice(8, -1)
}

var isA = fjs.isA = function(type, it) {
  return type === typeOf(it)
}

var isNumber = fjs.isNumber = function(it) {
  return isA('Number', it)
}

var isArray = fjs.isArray = function(it) {
  return isA('Array', it)
}

var isObject = fjs.isObject = function(it) {
  return isA('Object', it)
}

var isString = fjs.isString = function(it) {
  return isA('String', it)
}

var isFunction = fjs.isFunction = function(it) {
  return isA('Function', it)
}

var isBoolean = fjs.isBoolean = function(it) {
  return isA('Boolean', it)
}

module.exports = fjs
