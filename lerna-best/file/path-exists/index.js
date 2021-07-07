const pathExists = require('path-exists');

(async () => {
  console.log(await pathExists('01-lerna.md'));
  //=> true
})();
