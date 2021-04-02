const execSync = require('child_process').execSync

module.exports = {
  runExecSync: (cmd) => {
    return execSync(cmd, { stdio: [0, 1, 2] })
  }
}
