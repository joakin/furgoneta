
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
