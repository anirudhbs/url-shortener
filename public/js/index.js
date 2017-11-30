function getShortUrl () {
  const url = document.getElementById('url').value
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText)
      document.getElementById('display-hash').innerHTML = window.location.href.slice(7) + response.hash
    }
  }
  xhr.open('POST', 'shorten', true)
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  xhr.send(JSON.stringify({ url }))
}
