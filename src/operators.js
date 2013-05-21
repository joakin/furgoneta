
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

