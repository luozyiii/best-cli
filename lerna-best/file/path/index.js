const path = require('path');

// 相对路径转化成绝对路径
const rootDir = path.resolve('.');
console.log(rootDir); // => D:\my\best-cli\lerna-best

// 路径拼接
const fromFile = path.join(rootDir, 'file/path/index.js');
console.log(fromFile);
// => D:\my\best-cli\lerna-best\file\path\index.js
