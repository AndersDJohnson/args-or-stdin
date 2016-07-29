var getStdin = require('get-stdin')

module.exports = function (options) {
  options = options || {}
  return new Promise(function (resolve, reject) {
    var args = process.argv.slice(2)
    if (!args.length) {
      getStdin().then(str => {
        if (!str && !options.allowEmpty) {
          reject("need args or stdin")
          return
        }
        if (!options.multi) {
          resolve(str)
          return
        }
        args = str.match(/[^\s]+/gm)
        resolve(args)
        return
      })
      return
    }
    resolve(args)
  })
}
