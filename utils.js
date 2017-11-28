function getShortCode() {
  const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  let s = ''
  while (s.length < 6) {
    s += charset[Math.floor(Math.random(0, 63) * 100) % 62]
  }
  return s
}

module.exports = {
  getShortCode,
}
