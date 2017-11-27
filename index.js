const console = require('console')
const express = require('express')
const bodyParser = require('body-parser')
const utils = require('./utils')
const db = require('./db')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>
  res.send('Hello world'))

app.post('/shorten', (req, res) => {
  const inputURL = req.body.url
  const shortCode = utils.getShortCode()
  db.storeURL(inputURL, shortCode)
  res.send({ shortCode, inputURL })
})

app.get('/:hash', (req, res) => {
  const originalURL = db.getURL(req.path.slice(1))
  console.log(`get method ${originalURL}`)
  res.send({ test: originalURL })
})

app.listen(3000, () =>
  console.log('listening on port 3000'))
