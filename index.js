const console = require('console')
const express = require('express')
const bodyParser = require('body-parser')

const { getUrl, storeUrl } = require('./models')

const app = express()
const PORT = 8080

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/:hash', (req, res) => {
  const { hash } = req.params
  getUrl(hash, (err, url) => {
    if (err) {
      res.status(404).json({
        error: 'Unable to redirect'
      })
    } else {
      link = url.includes('https') ? url : url.includes('http') ? url : `http://${url}`
      res.status(307).redirect(link)
    }
  })
})

app.post('/shorten', (req, res) => {
  const { url } = req.body
  storeUrl(url, (err, hash, _url) => {
    if (err) {
      // todo: add error handling
      res.status(500).send({
        error: 'Unable to shorten URL'
      })
    } else {
      res.json({ status: 'success',
        hash,
        _url
      })
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
