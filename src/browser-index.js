
var furgoneta = require('./index')

if (!window.furgoneta) {
  window.furgoneta = furgoneta
} else {
  throw new Error('furgoneta global variable already defined')
}

