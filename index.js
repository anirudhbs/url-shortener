const console = require('console')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const path = require('path')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')))

app.get('/:hash', (req, res) => {
  const { hash } = req.params
  db.getURL(hash, (err, url) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.redirect(307, url)
    }
  })
})

app.post('/shortenUrl', (req, res) => {
  const inputURL = req.body.url
  db.storeURL(inputURL, (hash, url) => {
    res.send({ hash, url })
  })
})

app.listen(8080, () =>
  console.log('listening on port 8080'))
