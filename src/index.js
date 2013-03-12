
fjs = {}


# Functions
# =========

# Collections
# ===========

fjs.each = each = (fn, coll) ->
  map fn, coll
  undefined

fjs.map = map = (fn, coll) ->
  if isObject coll
    fn(v, k, coll) for k, v of coll
  else
    fn(v, k, coll) for v, k in coll

fjs.reduce = reduce = fjs.fold = fold = (fn, seed, coll) ->
  memo = seed
  each ((value, key, coll1) ->
    memo = fn(memo, value, key, coll1)
  ), coll
  memo

fjs.reduce1 = reduce1 = fjs.fold1 = fold1 = (fn, coll) ->
  memo = null
  each ((value, key, coll1) ->
    if memo isnt null
      memo = fn(memo, value, key, coll1)
    else
      memo = value
  ), coll
  memo


# Utilities
# =========

# Types
# -----

objToString = {}.toString

fjs.typeOf = typeOf = (it) ->
  objToString.call(it).slice(8, -1)

fjs.isA = isA = (type, it) -> type is typeOf it

fjs.isNumber   = isNumber   = (it) -> isA 'Number',   it
fjs.isArray    = isArray    = (it) -> isA 'Array',    it
fjs.isObject   = isObject   = (it) -> isA 'Object',   it
fjs.isString   = isString   = (it) -> isA 'String',   it
fjs.isFunction = isFunction = (it) -> isA 'Function', it
fjs.isBoolean  = isBoolean  = (it) -> isA 'Boolean',  it



module.exports = fjs
