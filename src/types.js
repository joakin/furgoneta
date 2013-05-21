
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

