# best-cli

前端自动化-脚手架快速入门

## 脚手架-创建项目

- 标准模板创建
- 自定义规则创建
- 创建组件库
- 自动安装和启动

### 简单入门(best-test)

目录 /best-test

```javascript
cd best-test
yarn init -y

// bin/index.js
#!/usr/bin/env node

console.log('best-test');

// package.json 增加bin 命令
"bin": {
  "best-test": "bin/index.js"
},
```

### 发布到 npm

```javascript
// 获取当前npm包镜像地址
npm get registry

// 设置回官方地址
npm config set registry https://registry.npmjs.org/

// 设置淘宝镜像地址
npm config set registry http://registry.npm.taobao.org/

// 登录
npm login

// 发布包
npm publish

// 发布私有域的包
npm publish --access=public

// 24小时内可撤销包；删除已在 npm 发布的同名包，需要在24小时后才能重新发布
npm unpublish --force
```

## 脚手架-发布项目

- Git 自动化
- 云构建
- 项目自动发布
- 组件自动发布
