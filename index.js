const console = require('console')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()
const PORT = 8080

app.use(express.static('public'))
app.use(bodyParser.json())

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
  db.storeURL(inputURL, (err, hash, url) => {
    if (err) {
      // error handling
    } else {
      res.send({ hash, url })
    }
  })
})

app.post('/dostuff', (req, res) => {
  console.log('req', req.body)
})

app.listen(PORT, () =>
  console.log(`listening on port ${PORT}`))
