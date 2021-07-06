# 基于 lerna 搭建脚手架框架

### 常用命令

```javascript
// 进入目录
cd lerna-best

// 安装 lerna
yarn add -D lerna

// 全局也安装一下 lerna
cnpm install -g lerna

// learn 初始化
lerna init

// 添加依赖
lerna add @leslie0403/utils
// 为指定package添加依赖
lerna add @leslie0403/utils packages/core/

// 清除依赖
lerna clean

// 重新安装依赖
lerna bootstrap

// 链接依赖
lerna link

// lerna exec 执行 shell 脚本
lerna exec -- rm -rf node_modules/
lerna exec --scope @lerna-best/utils  rm -rf node_modules/ // 指定package

// 执行 npm 命令
lerna run test
lerna run --scope @lerna-best/utils test // 指定package

// 版本
lerna version
// 查看上版本以来所有的变更
lerna changed
// 查看 diff
lerna diff
// 项目发布 后，git会打包生成tag
lerna publish
```

#### 发布注意事项：

```javascript
// package.json 添加
"publishConfig": {
  "access": "public"
}
// 添加 LICENSE.md
```
