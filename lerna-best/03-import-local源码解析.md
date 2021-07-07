# import-local 源码解析

### 作用

当全局 node_modules 和本地 node_modules 中，存在相同的库，则优先加载本地 node_modules 中的库

### lerna 入口文件 /cli.js

```javascript
#!/usr/bin/env node

'use strict';

/* eslint-disable import/no-dynamic-require, global-require */
const importLocal = require('import-local');

if (importLocal(__filename)) {
  require('npmlog').info('cli', 'using local version of lerna');
} else {
  require('.')(process.argv.slice(2));
}
```

### import-local/index.js 文件

```javascript
'use strict';
const path = require('path');
const resolveCwd = require('resolve-cwd');
const pkgDir = require('pkg-dir');

module.exports = (filename) => {
  const globalDir = pkgDir.sync(path.dirname(filename));
  const relativePath = path.relative(globalDir, filename);
  const pkg = require(path.join(globalDir, 'package.json'));
  const localFile = resolveCwd.silent(path.join(pkg.name, relativePath));
  const localNodeModules = path.join(process.cwd(), 'node_modules');
  const filenameInLocalNodeModules = !path.relative(localNodeModules, filename).startsWith('..');

  // Use `path.relative()` to detect local package installation,
  // because __filename's case is inconsistent on Windows
  // Can use `===` when targeting Node.js 8
  // See https://github.com/nodejs/node/issues/6624
  return !filenameInLocalNodeModules && localFile && path.relative(localFile, filename) !== '' && require(localFile);
};
```

### 执行 lerna 命令的流程

在本地 lerna 源文件目录 lerna 下执行`lerna ls`的流程分析

```bash
# 执行lerna 命令
> lerna ls
# 实际是通过which找到lerna的文件路径
> which lerna
/usr/local/bin/lerna # lerna软链接
> ll /usr/local/bin/lerna
# 软链接对应的真实地址 ：/usr/local/lib/node_modules/lerna/cli.js
lrwxr-xr-x  1 song  admin    32B 12 30 21:34 /usr/local/bin/lerna -> ../lib/node_modules/lerna/cli.js
# 所以执行 lerna ls 实际是执行下面的命令
> node /usr/local/lib/node_modules/lerna/cli.js ls
```
