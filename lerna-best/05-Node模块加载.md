### [require() 源码解读](http://www.ruanyifeng.com/blog/2015/05/require.html)

### Module

```javascript
const Module = require('module');

/**
 * 生成node_modules可能的路径
 * 路径是否为 / (根路径) : 是 => 返回 ['/node_modules']
 * 否： => 遍历各级目录，在目录后添加node_modules,并存储到paths
 */
Module._nodeModulePaths();

/**
 * 解析模块的真实路径
 * 是否为内置模块 是 => end
 * 否 => Module.resolveLookupPaths 将paths 和环境变量 node_modules 合并 => Module.findPath 在paths中解析模块的真实路径
 */
Module._resolveFilename();
```
