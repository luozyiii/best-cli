const cp = require('child_process');
const path = require('path');

cp.exec(`sh ${path.resolve(__dirname, 'install.sh')}`, [], function (err, stdout, stderr) {
  console.log(err, stdout, stderr);
});
