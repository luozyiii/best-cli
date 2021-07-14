const cp = require('child_process');
const path = require('path');

cp.execFile(path.resolve(__dirname, 'clean.sh'), [], function (err, stdout, stderr) {
  console.log(err, stdout, stderr);
});
