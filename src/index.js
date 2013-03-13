
var fjs = {}

/*
 * FUNCTIONS
 */

var compose = fjs.compose = function() {
  var fns = toArray(arguments)
  return function() {
    console.log(first(fns).apply(this, arguments))
    reduce(function(m, v) {
      return v.apply(this, [m])
    }, first(fns).apply(this, arguments), rest(fns))
  }
}

var partial = fjs.partial = function(fn) {
  var args = rest(toArray(arguments))
  return function() {
    return fn.apply(this, args.concat(toArray(arguments)))
  }
}

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

var rest = fjs.rest = function(xs) { return xs.slice(1) }

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

module.exports = fjs
