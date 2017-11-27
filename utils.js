const uuidv4 = require('uuid/v4')

function getShortCode() {
  return uuidv4()
}

module.exports = {
  getShortCode,
}
