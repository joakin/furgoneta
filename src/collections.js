
var types = require('./types')
  , obj = require('./objects')

var each = exports.each = function(fn, coll) {
  if (types.isObject(coll)) {
    each(function(key, i, ks) {
      return fn(coll[key], key, coll)
    }, obj.keys(coll))
  } else {
    for (var i = 0, len = coll.length; i < len; i += 1) {
      if (true === fn(coll[i], i, coll)) break
    }
  }
}

var eachRight = exports.eachRight = function(fn, coll) {
  if (types.isObject(coll)) {
    eachRight(function(key, i, ks) {
      fn(coll[key], key, coll)
    }, obj.keys(coll))
  } else {
    for (var i = coll.length-1; i >= 0; i -= 1) {
      fn(coll[i], i, coll)
    }
  }
}

exports.map = function(fn, coll) {
  var res = []
  each(function(x, idx, xs) {
    res.push(fn(x, idx, xs))
  }, coll)
  return res
}

var reduce = exports.reduce = function(fn, seed, coll) {
  var memo = seed
  each(function(value, key, coll1) {
    memo = fn(memo, value, key, coll1)
  }, coll)
  return memo
}
exports.fold = reduce

var reduce1 = exports.reduce1 = function(fn, coll) {
  var memo
  memo = null
  each(function(value, key, coll1) {
    if (memo !== null) {
      return memo = fn(memo, value, key, coll1)
    } else {
      return memo = value
    }
  }, coll)
  return memo
}
exports.fold1 = reduce1

var reduceRight = exports.reduceRight = function(fn, seed, coll) {
  var memo = seed
  eachRight(function(value, key, coll1) {
    memo = fn(memo, value, key, coll1)
  }, coll)
  return memo
}
exports.foldR = reduceRight

var reduceRight1 = exports.reduceRight1 = function(fn, coll) {
  var memo
  memo = null
  eachRight(function(value, key, coll1) {
    if (memo !== null) {
      return memo = fn(memo, value, key, coll1)
    } else {
      return memo = value
    }
  }, coll)
  return memo
}
exports.foldR1 = reduceRight1

var find = exports.find = function(fn, coll) {
  var res = null
  each(function(x, idx) {
    if (fn(x, idx, coll)) {
      res = x
      return true
    }
  }, coll)
  return res
}
exports.detect = find

var filter = exports.filter = function(fn, coll) {
  return reduce(function(acc, x, idx) {
    if (fn(x, idx, coll))
      acc.push(x)
    return acc
  }, [], coll)
}
exports.select = filter

var reject = exports.reject = function(fn, coll) {
  return reduce(function(acc, x, idx) {
    if (!fn(x, idx, coll))
      acc.push(x)
    return acc
  }, [], coll)
}

var every = exports.every = function(fn, coll) {
  var res = true
  each(function(x, idx, coll) {
    if(!fn(x, idx, coll)) {
      res = false
      return true
    }
  }, coll)
  return res
}
exports.all = every

var some = exports.some = function(fn, coll) {
  var res = false
  each(function(x, idx, coll) {
    if(fn(x, idx, coll)) {
      res = true
      return true
    }
  }, coll)
  return res
}
exports.any= some

