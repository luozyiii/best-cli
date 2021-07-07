const locatePath = require('locate-path');

const files = [
  'rainbow.png',
  '01-lerna.md', // Only this one actually exists on disk
  'pony.png',
];

(async () => {
  console.log(await locatePath(files));
  //=> '01-lerna.md'
})();
