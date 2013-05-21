;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
(function(){
var fjs = require('./index')

if (!window.fjs) {
  window.fjs = fjs
} else {
  throw new Error('fjs global variable already defined')
}


})()
},{"./index":2}],2:[function(require,module,exports){

var obj = require('./objects')

module.exports = obj.extend(
    require('./arguments')
  , require('./arrays')
  , require('./collections')
  , require('./objects')
  , require('./functions')
  , require('./types')
  , require('./operators')
)


},{"./objects":3,"./arguments":4,"./arrays":5,"./collections":6,"./functions":7,"./types":8,"./operators":9}],4:[function(require,module,exports){

var _slice = [].slice

exports.toArray = function(args) {
  return _slice.call(args)
}


},{}],5:[function(require,module,exports){

exports.first = function(xs) { return xs[0] }

exports.last = function(xs) { return xs[xs.length-1] }

exports.rest = function(xs) { return xs.slice(1) }

exports.initial = function(xs) { return xs.slice(0, xs.length-1) }


},{}],8:[function(require,module,exports){

// Types conversion

exports.objToFunc = function(xs) {
  return function(idx){ return xs[idx] }
}

exports.prop = function(x) {
  return function(it) {
    return it[x]
  }
}

// Types detection

var objToString = {}.toString

var typeOf = exports.typeOf = function(it) {
  return objToString.call(it).slice(8, -1)
}

var isA = exports.isA = function(type, it) {
  return type === typeOf(it)
}

var makeIsA = function(type) {
  return function(it) {
    return isA(type, it)
  }
}

exports.isNumber   = makeIsA('Number')
exports.isArray    = makeIsA('Array')
exports.isObject   = makeIsA('Object')
exports.isString   = makeIsA('String')
exports.isFunction = makeIsA('Function')
exports.isBoolean  = makeIsA('Boolean')


},{}],9:[function(require,module,exports){

// OPERATORS as functions
// ----------------------

// MATH
exports.add = function(x, y) { return x + y }
exports.sub = function(x, y) { return x - y }
exports.mul = function(x, y) { return x * y }
exports.div = function(x, y) { return x / y }
exports.mod = function(x, y) { return x % y }

// CMP
exports.eq = function(x, y) { return x === y }
exports.eqc = function(x, y) { return x == y }
exports.neq = function(x, y) { return x !== y }
exports.neqc = function(x, y) { return x != y }
exports.gt = function(x, y) { return x > y }
exports.ge = function(x, y) { return x >= y }
exports.lt = function(x, y) { return x < y }
exports.le = function(x, y) { return x <= y }

// LOGIC
exports.not = function(x) { return !x }
exports.and = function(x, y) { return x && y }
exports.or = function(x, y) { return x || y }


},{}],3:[function(require,module,exports){

var args = require('./arguments')
  , coll = require('./collections')

exports.keys = Object.keys || function (obj) {
  var xs = []
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      xs.push(prop)
    }
  }
  return xs
}

exports.extend = function() {
  var res = {}
  coll.each(function(object) {
    coll.each(function(v, k) {
      res[k] = v
    }, object)
  }, args.toArray(arguments))
  return res
}


},{"./arguments":4,"./collections":6}],6:[function(require,module,exports){

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

},{"./types":8,"./objects":3}],7:[function(require,module,exports){

var args  = require('./arguments')
  , coll  = require('./collections')
  , arr   = require('./arrays')
  , types = require('./types')

exports.compose = function() {
  var fns = args.toArray(arguments)
  return function() {
    return coll.reduceRight(function(m, v) {
      return v.apply(this, [m])
    }, arr.last(fns).apply(this, arguments), arr.initial(fns))
  }
}

exports.partial = function(fn) {
  var argsArr = arr.rest(args.toArray(arguments))
  return function() {
    return fn.apply(this, argsArr.concat(args.toArray(arguments)))
  }
}

exports.id = function(x) { return x }

exports.functor = function(x) {
  if (types.isFunction(x))
    return x
  else
    return function() { return x }
}

},{"./arguments":4,"./collections":6,"./arrays":5,"./types":8}]},{},[1])
;