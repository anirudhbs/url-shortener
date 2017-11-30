const console = require('console')
const redis = require('redis')
const utils = require('./utils')

const client = redis.createClient()

client.on('error', (err) => { console.log(`Error ${err}`) })

function storeURL(url, cb) {
  let hash = null
  while (true) {
    hash = utils.getShortCode()
    if (client.exists(hash, redis.print)) break
  }
  client.set(hash, url, redis.print)
  cb(hash, url)
}

function getURL(hash, cb) {
  client.get(hash, (err, reply) => {
    if (err || reply === null) {
      cb(new Error('Key not found'))
    } else {
      cb(null, reply)
    }
  })
}

module.exports = {
  storeURL,
  getURL,
}
