const pkgDir = require('pkg-dir');

(async () => {
  console.log('__filename:', __filename);
  console.log('__dirname:', __dirname);
  const rootDir = await pkgDir(__dirname);

  // 获取package.json 的上级目录
  console.log(rootDir);
  //=> /Users/luozhiyi/Work/project/best-cli/lerna-best
})();
