const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  // ...You can now register proxies as you wish!
  app.use(
    proxy('/react-api', {
      // target: 'http://192.168.8.29:8001/oms',/*周伟伟*/
      target: 'http://192.168.9.65:8001/oms',/*吕华强*/
      changeOrigin: true,
      pathRewrite: {
        '/react-api': ''
      }
    })
  )
}
