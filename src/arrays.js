
exports.first = function(xs) { return xs[0] }

exports.last = function(xs) { return xs[xs.length-1] }

exports.rest = function(xs) { return xs.slice(1) }

exports.initial = function(xs) { return xs.slice(0, xs.length-1) }

