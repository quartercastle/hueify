module.exports = global.localStorage = {
  store: {},
  setItem (key, value) {
    return (this.store[key] = value)
  },
  getItem (key) {
    return this.store[key] || null
  }
}
