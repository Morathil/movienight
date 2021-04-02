const utils = require('./utils')
const fs = require('fs')

const cordovaBasePath = 'cordova/movienight'

try {
  utils.runExecSync('cd cordova && mkdir movienight')
} catch (e) { }

fs.copyFileSync('cordova/config.xml', `${cordovaBasePath}/config.xml`)

try {
  utils.runExecSync(`rm -rf ${cordovaBasePath}/www`)
} catch (e) { }
utils.runExecSync(`cd ${cordovaBasePath} && mkdir www`)

try {
  if (process.env.RELEASE) {
    utils.runExecSync('IS_NATIVE=true npx webpack -p')
  } else {
    utils.runExecSync('IS_NATIVE=true npx webpack --mode development')
  }
} catch (e) {
  console.log(e)
}

// utils.runExecSync('adb connect 192.168.0.248:5555')

utils.runExecSync(`cd ${cordovaBasePath} && cordova prepare android`)
utils.runExecSync(`cd ${cordovaBasePath} && cordova run android`)
