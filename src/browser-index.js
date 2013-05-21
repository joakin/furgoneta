
var fjs = require('./index')

if (!window.fjs) {
  window.fjs = fjs
} else {
  throw new Error('fjs global variable already defined')
}

