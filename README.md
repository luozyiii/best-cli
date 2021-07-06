# best-cli

前端自动化-脚手架快速入门

## 脚手架-创建项目

- 标准模板创建
- 自定义规则创建
- 创建组件库
- 自动安装和启动

### 原生开发脚手架-简单入门(best-test)

目录 /best-test

```javascript
cd best-test
yarn init -y

// package.json 增加bin 命令
"bin": {
  "best-test": "bin/index.js"
},
```

bin/index.js

```javascript
#!/usr/bin/env node

// 注册一个命令 best-test init 和 best-test init --name
let commandList = {
  init: (option, param) => {
    console.log(`执行init流程:${option}=${param}`);
  },
};
const argv = require('process').argv;
const command = argv[2]; // 接收第二个参数
const options = argv.slice(3); // options
if (options.length > 1) {
  let [option, param] = options;
  option = option.replace('--', '');

  if (command) {
    if (commandList[command]) {
      commandList[command](option, param);
    } else {
      console.log('请输入正确的命令');
    }
  } else {
    console.log('请输入命令');
  }
}

// 实现参数解析 --version 和 -V
if (command && (command.startsWith('--') || command.startsWith('-'))) {
  const globalOption = command.replace(/--|-/g, '');
  if (globalOption === 'version' || globalOption === 'V') {
    console.log('1.0.0');
  }
}
console.log('best-test');
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

### 脚手架本地调试

```javascript
// 源npm包安装到本地;在工具库根目录执行
yarn link
// 在npm目录下卸载
yarn unlink

// 在项目中使用 npm 包
yarn link "@leslie0403/best-test"
// 在项目中卸载 npm 包
yarn unlink "@leslie0403/best-test"
```

### 脚手架框架搭建（lerna-best）

## 脚手架-发布项目

- Git 自动化
- 云构建
- 项目自动发布
- 组件自动发布
