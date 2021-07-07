## 基于 lerna 重新设计简历

### 职业技能/简介

> 突出个人特长和优势

- 熟悉 yargs 脚手架开发框架
- 熟悉多 Package 管理工具 Lerna 的使用方法和实现原理
- 深入了解 Node.js 模块路径的解析流程

### 面试官问起细节如何回答？

#### 如何通过 yargs 构建脚手架？(面试)

- 脚手架的构成
  bin: package.json 中配置 bin 属性，npm link 本地安装；
  command：命令；
  options：参数；（boolean/string/number）；
  文件顶部增加 #!/usr/bin/env node

- 脚手架的初始化流程
  构造函数：Yargs();
  常用方法：.strict()、.usage()、.demandCommand()、.recommendCommands()、.alias()、.wrap()、.epilogue()、.options()、.option()、.group()、.command()、.parse()

- 脚手架参数的解析方法
  hideBin(process.argv) / Yargs.argv；
  Yargs.parse(argv,options);

- 命令注册的方法
  Yargs.command(command,desride,builder,handler);
  Yargs.command({command,desride,builder,handler})

#### Lerna 有什么用，如何实现多 Package 管理？

- Lerna 是基于 git + npm 的多 package 项目管理工具
- 实现原理
  1、通过 import-local 优先调用本地的 lerna 命令；
  2、通过 yargs 生成脚手架，先注册全局属性，再注册命令，最后通过 parse 方法解析参数；
  3、lerna 命令注册时需传入 builder 和 handler 两个方法；builder 用于注册命令专属的 options，handler 用来处理命令的业务逻辑；
  4、lerna 通过 npm 本地依赖的方式来进行本地开发，具体写法在 package.json 的依赖中写入：file:you-local-module-path,在 lerna publish 会自动将该路径替换。

#### 你对 node.js 模块路径解析的理解？

##### Node.js 项目模块路径解析是通过 `require.resolve` 方法来实现的

##### `require.resolve` 就是通过 `Module._resolveFileName` 方法实现的

##### `require.resolve`实现原理：

###### `Module._resolveFileName` 方法的核心流程有 3 点：

- 判断是否为内置模块
- 通过 `Module._resolveLookPaths` 方法生成 `node_modules` 可能存在的路径
- 通过 `Module._findPath` 查询模块的真实路径

###### `Module._findPath` 方法的核心流程有 4 点：

- 查询缓存（将 request 和 paths 通过 `\x00` 合并成 cacheKey）
- 遍历 paths, 将 path 与 request 组成文件路径 basePath
- 如果 basePath 存在则调用 `fs.realPathSync` 获取文件真实路径
- 将真实路径缓存到 `Module._pathCache` (key 就是前面生成的 cacheKey)

###### `fs.realPathSync` 方法的核心流程有 3 点：

- 查询缓存（缓存的 key 为 p，即 Module.\_findPath 生成的文件路径）
- 从左往右遍历路径字符串，查询到 `/` 时，拆分路径，判断路径是否为软链接，如果是软链接则查询真实链接，并生成新路径 p，然后继续往后遍历，这里有 1 个细节需要特别注意：（遍历过程中生成的子路径 base 缓存在 knownHard 和 cache 中，避免重复查询）
- 遍历完成得到模块对应的真实路径，此时会将原始的路径 original 作为 key，真实路径为 value，保存到缓存中

##### `require.resolve.paths` 等价于 `Module._resolveLookPaths`,该方法用于获取所有 node_modules 可能存在的路径

###### `require.resolve.paths`实现原理

- 如果路径为 `/`(根目录)，直接返回`['/node_modules']`
- 否则，将路径字符串从后往前遍历，查询到 `/` 时，拆分路径，在后面加上 node_modules,并传入一个 paths 数组，直至查询不到 `/` 后返回数组
