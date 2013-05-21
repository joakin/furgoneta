
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

