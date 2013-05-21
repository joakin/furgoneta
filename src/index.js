
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

