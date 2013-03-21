
var fjs = {}

/*
 * FUNCTIONS
 */

var compose = fjs.compose = function() {
  var fns = toArray(arguments)
  return function() {
    return reduceRight(function(m, v) {
      return v.apply(this, [m])
    }, last(fns).apply(this, arguments), initial(fns))
  }
}

var partial = fjs.partial = function(fn) {
  var args = rest(toArray(arguments))
  return function() {
    return fn.apply(this, args.concat(toArray(arguments)))
  }
}

var id = fjs.id = function(x) { return x }

/*
 * COLLECTIONS
 */

var each = fjs.each = function(fn, coll) {
  if (isObject(coll)) {
    each(function(key, i, ks) {
      fn(coll[key], key, coll)
    }, keys(coll))
  } else {
    for (var i = 0, len = coll.length; i < len; i += 1) {
      fn(coll[i], i, coll)
    }
  }
}

var eachRight = fjs.eachRight = function(fn, coll) {
  if (isObject(coll)) {
    eachRight(function(key, i, ks) {
      fn(coll[key], key, coll)
    }, keys(coll))
  } else {
    for (var i = coll.length-1; i >= 0; i -= 1) {
      fn(coll[i], i, coll)
    }
  }
}

var map = fjs.map = function(fn, coll) {
  var res = []
  each(function(x, idx, xs) {
    res.push(fn(x, idx, xs))
  }, coll)
  return res
}

var reduce = fjs.reduce = function(fn, seed, coll) {
  var memo = seed
  each((function(value, key, coll1) {
    memo = fn(memo, value, key, coll1)
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

var reduceRight = fjs.reduceRight = function(fn, seed, coll) {
  var memo = seed
  eachRight(function(value, key, coll1) {
    memo = fn(memo, value, key, coll1)
  }, coll)
  return memo
}
var foldR = fjs.foldR = reduceRight

var reduceRight1 = fjs.reduceRight1 = function(fn, coll) {
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
var foldR1 = fjs.foldR1 = reduceRight1

var find = fjs.find = function(fn, coll) {
  var res = null
  each(function(x, idx) {
    if (!res && fn(x, idx)) res = x
  }, coll)
  return res
}


/*
 * OBJECTS
 */

var keys = fjs.keys = Object.keys || function (obj) {
  var xs = []
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      xs.push(prop)
    }
  }
  return xs
}

/*
 * ARRAYS
 */

var first = fjs.first = function(xs) { return xs[0] }

var last = fjs.last = function(xs) { return xs[xs.length-1] }

var rest = fjs.rest = function(xs) { return xs.slice(1) }

var initial = fjs.initial = function(xs) { return xs.slice(0, xs.length-1) }

var concat = fjs.concat = function() {
  var args = toArray(arguments)
  return reduce1(function(m, x, idx, xs) {
    return m.concat(x)
  }, args)
}


/*
 * UTILITIES
 * =========
 */


// TYPES
// -----

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

// ARGUMENTS
// ---------

var _slice = [].slice

var toArray = function(args) {
  return _slice.call(args)
}

// TO FUNCTION

var objToFunc = fjs.objToFunc = function(xs) {
  return function(idx){ return xs[idx] }
}

module.exports = fjs
