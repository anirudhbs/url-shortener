const console = require('console')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) =>
  res.send('Hello world'))

app.post('/shorten', (req, res) => {
  const inputURL = req.body.url
  console.log(`url is ${inputURL}`)
  res.send('shorten url')
})

app.get('/:hash', (req, res) =>
  res.send('get complete url'))

app.listen(3000, () =>
  console.log('listening on port 3000'))
