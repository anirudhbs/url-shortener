const console = require('console')
const redis = require('redis')
const utils = require('./utils')

const client = redis.createClient()

client.on('error', (err) => { console.log(`Error ${err}`) })

function storeURL(url, cb) {
  let hash = ''
  while (true) {
    hash = utils.getShortCode()
    if (client.exists(hash)) break
  }
  client.set(hash, url, (err, reply) => {
    if (err) cb(new Error('Unable to store'))
    else cb(null, hash, url) 
  })
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
