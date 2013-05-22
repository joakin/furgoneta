## fjs

Helper library to make functional programming in JS easier.

Disclaimer: **This is a work in progress and a personal project to learn
functional concepts, how are they implemented and to become familiar with
them. Despite all this, it is usable, tested and it works.**

## Contents

Next you will find a list of functions exported by fjs, classified by groups,
as they are in the source code.

On the samples, we will asume that we imported and are using the fjs library
with the variable `f` as if we had done:

```javascript
var f = require('fjs')
```

#### Documentation terms and reference

`...args` : refers to an indeterminate number of arguments, a variadic function
`idx`     : var name of an index or key
`x`       : var name usually used to indicate an item or value
`xs`      : var name of a sequence or collection

Note that along the docs, the examples' output will be noted in nearby comments.


### Arguments

Utilities and functions to work with arguments.

#### toArray(...args)

Converts an arguments variable into a JS array.

```javascript
(function() {
  console.log(f.toArray(arguments))  // > [ 1, 'Hello', 2 ]
})(1, 'Hello', 2)
```


### Arrays

Utilities and functions to work with javascript arrays.

#### first(xs)

Returns the first element of the array.

```javascript
f.first([ 1, 2, 3, 4 ]) // > 1
```

#### last(xs)

Returns the last element of the array.

```javascript
f.last([ 1, 2, 3, 4 ])  // > 4
```

#### rest(xs)

Returns the rest of elements of the array, that is all but the first one.

```javascript
f.rest([ 1, 2, 3, 4 ])  // > [ 2, 3, 4 ]
```

#### initial(xs)

Returns the initial elements of the array, that is all but the last one.

```javascript
f.initial([ 1, 2, 3, 4 ])  // > [ 1, 2, 3 ]
```


### Objects

Utilities and functions to work with javascript objects.

#### keys(obj)

Returns the keys of the object in an array.

```javascript
f.keys({ a: 1, b: 2 }) // > [ 'a', 'b' ]
```

#### extend(...args)

Extends all the objects passed as arguments from right to left into a new
object. For the moment it is not recursive so properties that are objects will
be copied by reference.

```javascript
var o = f.extend(
  { a: 1, b: 1 },
  { b: 2 },
  { c: 3 }
)
// > { a: 1, b: 2, c: 3 }
```


### Collections

We can consider collections to groups of items, and there are multiple
functions we can use to manipulate them. Any object or array will work with
this functions.

#### each(fn(x, idx, xs), xs)

Iterate through a collection from left to right calling fn.

```javascript
var logger = function(x, idx, xs) {
  console.log('Item: ', x, ', Idx: ', idx, ', Coll: ', xs)
}

// With arrays:

f.each(logger, [ 1, 2, 3 ])
// > Item: 1 , Idx: 0 , Coll: [ 1, 2, 3 ]
// > Item: 2 , Idx: 1 , Coll: [ 1, 2, 3 ]
// > Item: 3 , Idx: 2 , Coll: [ 1, 2, 3 ]

// With objects

f.each(logger, { a: 1, b: 2, c: 3 })
// > Item:  1 , Idx:  a , Coll:  { a: 1, b: 2, c: 3 }
// > Item:  2 , Idx:  b , Coll:  { a: 1, b: 2, c: 3 }
// > Item:  3 , Idx:  c , Coll:  { a: 1, b: 2, c: 3 }
```

#### eachRight(fn(x, idx, xs), xs)

Iterate through a collection from right to left calling fn.

```javascript
var logger = function(x, idx, xs) {
  console.log('Item: ', x, ', Idx: ', idx, ', Coll: ', xs)
}

// With arrays:

f.eachRight(logger, [ 1, 2, 3 ])
// > Item:  3 , Idx:  2 , Coll:  [ 1, 2, 3 ]
// > Item:  2 , Idx:  1 , Coll:  [ 1, 2, 3 ]
// > Item:  1 , Idx:  0 , Coll:  [ 1, 2, 3 ]

// With objects

f.eachRight(logger, { a: 1, b: 2, c: 3 })
// > Item:  3 , Idx:  c , Coll:  { a: 1, b: 2, c: 3 }
// > Item:  2 , Idx:  b , Coll:  { a: 1, b: 2, c: 3 }
// > Item:  1 , Idx:  a , Coll:  { a: 1, b: 2, c: 3 }
```

#### map(function(x, idx, xs), xs)

Apply fn through the items of a collection and return an array of the results.

```javascript
var double = function(x) { return x * x }

f.map(double, [ 1, 2, 3 ])
// > [ 1, 4, 9 ]

f.map(double, { a: 1, b: 2, c: 3 })
// > [ 1, 4, 9 ]
```

#### reduce(fn(memo, x, idx, xs), seed, coll) *Alias: fold*

Apply fn to each element of the collection passing an accumulator.

The return value of fn will be the accumulator for the next iteration, when
the collection is over the last memo will be returned by `reduce`.

The first time it is called, `memo` gets the value of the parameter `seed`.

```javascript
var scoreReducer = function(acc, x, idx, xs) {
  console.log('Total:', acc, 'Item:', x, ', Idx:', idx, ', Coll:', xs)
  return acc + x
}

f.reduce(scoreReducer, 10, [ 1, 2, 3 ])
// > Total: 10 Item: 1 , Idx: 0 , Coll: [ 1, 2, 3 ]
// > Total: 11 Item: 2 , Idx: 1 , Coll: [ 1, 2, 3 ]
// > Total: 13 Item: 3 , Idx: 2 , Coll: [ 1, 2, 3 ]
// > 16

f.reduce(scoreReducer, 0, { john: 5, mary: 8 })
// > Total: 0 Item: 5 , Idx: john , Coll: { john: 5, mary: 8 }
// > Total: 5 Item: 8 , Idx: mary , Coll: { john: 5, mary: 8 }
// > 13
```

#### reduce1(fn(memo, x, idx, xs), coll) *Alias: fold1*

Works like reduce but it uses as seed value the first element of the
collection.

```javascript
var scoreReducer = function(acc, x, idx, xs) {
  console.log('Total:', acc, 'Item:', x, ', Idx:', idx, ', Coll:', xs)
  return acc + x
}

f.reduce1(scoreReducer, [ 1, 2, 3 ])
// > Total: 1 Item: 2 , Idx: 1 , Coll: [ 1, 2, 3 ]
// > Total: 3 Item: 3 , Idx: 2 , Coll: [ 1, 2, 3 ]
// > 6

f.reduce1(scoreReducer, { john: 5, mary: 8 })
// > Total: 5 Item: 8 , Idx: mary , Coll: { john: 5, mary: 8 }
// > 13
```

#### reduceRight(fn(memo, x, idx, xs), seed, coll) *Alias: foldR*

Same as reduce but from right to left instead of left to right.

```javascript
var scoreReducer = function(acc, x, idx, xs) {
  console.log('Total:', acc, 'Item:', x, ', Idx:', idx, ', Coll:', xs)
  return acc + x
}

f.reduceRight(scoreReducer, 10, [ 1, 2, 3 ])
// > Total: 10 Item: 3 , Idx: 2 , Coll: [ 1, 2, 3 ]
// > Total: 13 Item: 2 , Idx: 1 , Coll: [ 1, 2, 3 ]
// > Total: 15 Item: 1 , Idx: 0 , Coll: [ 1, 2, 3 ]
// > 16

f.reduceRight(scoreReducer, 0, { john: 5, mary: 8 })
// > Total: 0 Item: 8 , Idx: mary , Coll: { john: 5, mary: 8 }
// > Total: 8 Item: 5 , Idx: john , Coll: { john: 5, mary: 8 }
// > 13
```

#### reduceRight1(fn(memo, x, idx, xs), coll) *Alias: foldR1*

Same as reduce1 but from right to left instead of left to right.

```javascript
var scoreReducer = function(acc, x, idx, xs) {
  console.log('Total:', acc, 'Item:', x, ', Idx:', idx, ', Coll:', xs)
  return acc + x
}

f.reduceRight1(scoreReducer, [ 1, 2, 3 ])
// > Total: 3 Item: 2 , Idx: 1 , Coll: [ 1, 2, 3 ]
// > Total: 5 Item: 1 , Idx: 0 , Coll: [ 1, 2, 3 ]
// > 6

f.reduceRight1(scoreReducer, { john: 5, mary: 8 })
// > Total: 8 Item: 5 , Idx: john , Coll: { john: 5, mary: 8 }
// > 13
```

#### find(fn(x, idx, coll), xs) *Alias: detect*

Return the first element that passes the truth test `fn`.

```javascript
var even = function(x) { return !(x % 2) }
var odd = f.compose(f.not, even)

f.find(even, [ 1, 2, 3 ])
// > 2

f.find(odd, { a: 4, b: 5, c: 6 })
// > 5
```

#### filter(fn(x, idx, coll), xs) *Alias: select*

Return all the elements that pass the truth test `fn`.

```javascript
var even = function(x) { return !(x % 2) }
var odd = f.compose(f.not, even)

f.filter(odd, [ 1, 2, 3 ])
// > [ 1, 3 ]

f.filter(even, { a: 4, b: 5, c: 6 })
// > [ 4, 6 ]
```


### Functions

#### compose(...args)

Creates a new function that is the composition of the argument functions. So:

  compose(f, g)(x) <-> f(g(x))

```javascript
var even = function(x) { return !(x % 2) }
var not = function(x) { return !x }

var odd = f.compose(not, even)

// So now odd(3) <-> not(even(3))
console.log(odd(3), not(even(3)))
// > true true
```

#### partial(fn, ...args)

Creates a function that is fn with bound arguments. You could say that it has
pre-filled arguments.

```javascript
// A simple example
var add = function(x, y) { return x + y }
var add5 = f.partial(add, 5)
// So add5 = f.add(5, ???)

add5(3)
// > 8

// Another example

var even = function(x) { return !(x % 2) }

var evenNumbers = f.partial(f.filter, even)
// So evenNumbers = f.filter(even, ???)

evenNumbers([ 1, 2, 3, 4, 5, 6 ])
// > [ 2, 4, 6 ]
```

#### id(x)

Identity function. Returns `x` as it comes in.

```javascript
f.id(5)
// > 5
```

#### functor(x)

Identity functor, returns a function that returns `x`. If `x` is a function,
then `functor(f) === f`

```javascript
// Basic behaviour

// For *not functions* it returns a function that returns the value
var gimme5 = f.functor(5)

gimme5()
// > 5

// For functions, it returns the function as it is (so this sample is useless)
var now = f.functor(function() { return Date.now() })

now()
// > 1369228597829

// A more complex example:
// Using a functor to make a function able to take both vars and functions as
// arguments

// `getter` is a function which receives a prop and returns a function that
// gets that property from its parameter obj. It is a getter creator.
// To make the `getter` function able to accept property as a value or a
// function that returns a value we can use the functor to normalize the
// behaviour and make all values behave as functions that return its values.
var getter = function(prop) {
  var getKey = f.functor(prop)
  return function(obj) {
    return obj[getKey()]
  }
}

var getName = getter('name')
var getAge = getter(function() { return 'age' })

getName({ age: 21, name: 'John' })
// > 'John'
getAge({ age: 21, name: 'John' })
// > 21
```


### Operators

`fjs` includes some operators as functions to ease its usage through your
functional code.

#### Math

#### add(x, y)

Equivalent to the infix operator `+`

```javascript
f.add(6, 2)
// > 8
```

#### sub(x, y)

Equivalent to the infix operator `-`

```javascript
f.sub(6, 2)
// > 4
```

#### mul(x, y)

Equivalent to the infix operator `*`

```javascript
f.mul(6, 2)
// > 12
```

#### div(x, y)

Equivalent to the infix operator `/`

```javascript
f.div(6, 2)
// > 3
```

#### mod(x, y)

Equivalent to the infix operator `%`

```javascript
f.mod(6, 2)
// > 0
```

#### Comparison

#### eq(x, y)

Equivalent to the infix operator `===`

```javascript
f.eq(6, '6')
// > false
```

#### eqc(x, y)

Equivalent to the infix operator `==`

```javascript
f.eqc(6, '6')
// > true
```

#### neq(x, y)

Equivalent to the infix operator `!==`

```javascript
f.neq(6, 2)
// > true
```

#### neqc(x, y)

Equivalent to the infix operator `!=`

```javascript
f.neqc(6, '6')
// > false
```

#### gt(x, y)

Equivalent to the infix operator `>`

```javascript
f.gt(6, 2)
// > true
```

#### ge(x, y)

Equivalent to the infix operator `>=`

```javascript
f.ge(6, 2)
// > true
```

#### lt(x, y)

Equivalent to the infix operator `<`

```javascript
f.lt(6, 2)
// > false
```

#### le(x, y)

Equivalent to the infix operator `<=`

```javascript
f.le(6, 2)
// > false
```

#### Logic

#### not(x)

Equivalent to the operator `!`

```javascript
f.not(6)
// > false
f.not(true)
// > false
```

#### and(x, y)

Equivalent to the infix operator `&&`

```javascript
f.and(true, null)
// > false
```

#### or(x, y)

Equivalent to the infix operator `||`

```javascript
f.or(true, null)
// > true
```


### Types

There are several functions to help with typing conversion and detection.

#### Conversion

#### objToFunc(x)

Converts an object into a function of its keys. Works both with arrays and
objects.

```javascript
var participant = f.objToFunc({ name: 'John', age: 25, country: 'ES' })

participant('name')
// > 'John'

var participantStuff = f.map(participant, [ 'name', 'age' ])
console.log(participantStuff)
// > [ 'John', 25 ]
```

#### prop(x)

Converts a property into a function that takes an object and gets that
property.

```javascript
var people = [
  { name: 'Johnny', age: '23' },
  { name: 'Anthony', age: '32' },
  { name: 'Mary', age: '28' }
]

var names = f.map(f.prop('name'), people)
console.log(names)
// > [ 'Johnny', 'Anthony', 'Mary' ]
```

#### typeOf(x)

Function that returns a string with the type from the {}.toString method. That
is:

```javascript
f.typeOf('hello')
// > 'String'

f.typeOf(6)
// > 'Number'

f.typeOf(true)
// > 'Boolean'

f.typeOf(function() {})
// > 'Function'

f.typeOf([1, 2, 3])
// > 'Array'

f.typeOf({ a: 1, b: 2 })
// > 'Object'
```

#### isA(type, x)

Truth tests a type string with the type of x.

```javascript
f.isA('String', 'hello')
// > true
f.isA('Object', { a: 1 })
// > true
f.isA('Boolean', 2)
// > false
```

#### isNumber(x)
```javascript
isNumber(4)
// > true
```
#### isArray(x)
```javascript
isArray([1])
// > true
```
#### isObject(x)
```javascript
isObject({})
// > true
```
#### isString(x)
```javascript
isString('asdf')
// > true
```
#### isFunction(x)
```javascript
isFunction(function() {})
// > true
```
#### isBoolean(x)
```javascript
isBoolean(false)
// > true
```


## Usage

The requireable module returns a var `fjs` containing all functions inside it.
In the case of using the browser version, a `window.fjs` var will be created.

## Development
To get the dependencies do a `npm install`

Source is on the `src` folder.

Tests on the `test` folder.

Make actions:
* All: `make`
* Build browser: `make build-browser`
* Test: `make test`
* Tests watcher: `make test-w`

On the folder `docs` there are pdfs of the three sites that I want to use as
inspiration.

## Inspiration

This library is inspired and influenced by various libraries and languages:

  * [Clojure's core library](http://richhickey.github.io/clojure/clojure.core-api.html)
  * [underscore.js](http://underscorejs.org/)
  * [culljs](https://github.com/culljs/culljs)
  * [prelude.ls](http://gkz.github.io/prelude-ls/)


