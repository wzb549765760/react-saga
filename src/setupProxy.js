const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(
    proxy('/react-api', {
      target: 'http://192.168.8.39:3000',
      changeOrigin: true,
      pathRewrite: {
        '/react-api': ''
      }
    })
  )
}
