const utils = require('./utils')

if (process.env.BUNDLE) {
  utils.runExecSync('IS_RELEASE=true npx webpack -p')
} else {
  utils.runExecSync('npx webpack-dev-server --open --hot --mode development')
}
