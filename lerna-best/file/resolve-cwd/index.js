const resolveCwd = require('resolve-cwd');

console.log(__dirname);
//=> /Users/luozhiyi/Work/project/best-cli/lerna-best/file/resolve-cwd

console.log(process.cwd());
//=> /Users/luozhiyi/Work/project/best-cli/lerna-best

console.log(resolveCwd('./file/resolve-cwd/index.js'));
//=> 'D:\my\best-cli\lerna-best\file\resolve-cwd\index.js'
