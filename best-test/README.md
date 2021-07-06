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

### 发布 npm

### 全局安装执行

```javascript
npm install -g @leslie0403/best-test
best-test
```
