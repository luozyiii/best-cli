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

/**
 * 1、查询缓存
 * 是 => 第5步
 * 否 => 继续执行
 * 2、遍历paths，合并path和request
 * 3、文件是否存在，否返回第二步，是-继续执行
 * 4、调用 toRealPath 生成真实路径，路径是否存在：否-返回第二步继续遍历，是-第5步
 * 5、直接返回结果end
 */
Module._findPaths();

/**
 * fs.realpathSync
 * 1、查询缓存；是-直接返回结果，否-第2步
 * 2、路径是否存在 / ;否-返回结果，是-第3步
 * 3、是否为软链接；是-第4步，否-第6步
 * 4、查询真实路径
 * 5、缓存软链接路径
 * 6、缓存当前路径和真实路径的映射，接着第2步
 */
toRealPath();
```
