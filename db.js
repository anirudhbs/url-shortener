const console = require('console')
const redis = require('redis')

const client = redis.createClient()

client.on('error', (err) => { console.log(`Error ${err}`) })

function storeURL(inputURL, shortCode) {
  client.set(shortCode, inputURL, redis.print)
}

function getURL(hash, cb) {
  client.get(hash, (err, reply) => {
    // error handling
    cb(reply)
  })
}


module.exports = {
  storeURL,
  getURL,
}
