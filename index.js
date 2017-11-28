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

app.post('/shortenUrl', (req, res) => {
  const inputURL = req.body.url
  const shortCode = utils.getShortCode(inputURL)
  db.storeURL(inputURL, shortCode)
  res.send({ shortCode, inputURL })
})

app.get('/:hash', (req, res) => {
  const { hash } = req.params

  db.getURL(hash, (originalURL) => {
    res.redirect(307, originalURL)
  })
})

app.listen(8080, () =>
  console.log('listening on port 8080'))
