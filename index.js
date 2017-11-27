const console = require('console')
const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis')
const utils = require('./utils')

const client = redis.createClient()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))

client.on('error', (err) => {
  console.log(`Error ${err}`)
})

app.get('/', (req, res) =>
  res.send('Hello world'))

app.post('/shorten', (req, res) => {
  const inputURL = req.body.url
  const shortCode = utils.getShortCode()
  client.set(shortCode, inputURL, redis.print)
  res.send({ shortCode, inputURL })
})

app.get('/:hash', (req, res) =>
  res.send('get complete url'))

app.listen(3000, () =>
  console.log('listening on port 3000'))
