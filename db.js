const console = require('console')
const redis = require('redis')

const client = redis.createClient()

client.on('error', (err) => { console.log(`Error ${err}`) })

function storeURL(inputURL, shortCode) {
  client.set(shortCode, inputURL, redis.print)
}

function getURL(hash) {
  let originalURL = '/'
  client.get(hash, (err, reply) => {
    originalURL = reply
    console.log(`geturl ${originalURL}`)
    return originalURL
  })
  return originalURL
}


module.exports = {
  storeURL,
  getURL,
}
