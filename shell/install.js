const cp = require('child_process');
const path = require('path');

cp.execFile(path.resolve(__dirname, 'install.sh'), [], function (err, stdout, stderr) {
  console.log(err, stdout, stderr);
});
