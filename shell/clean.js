const cp = require('child_process');
const path = require('path');

cp.exec(`sh ${path.resolve(__dirname, 'clean.sh')}`, [], function (err, stdout, stderr) {
  console.log(err, stdout, stderr);
});
