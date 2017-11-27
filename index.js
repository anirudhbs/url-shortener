const console = require('console')
const express = require('express')

const app = express()

app.get('/', (req, res) =>
  res.send('Hello world'))

app.post('/shorten', (req, res) =>
  res.send('shorten url'))

app.get('/:hash', (req, res) =>
  res.send('get complete url'))

app.listen(3000, () => console.log('listening on port 3000'))
