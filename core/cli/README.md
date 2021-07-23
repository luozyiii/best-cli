# `前端脚手架(@best-cli/core)`

> 自动化下载、安装项目/组件模板，简化项目搭建流程。

### 三种安装方式

```bash
# 一、使用npm
npm i @best-cli/core -g
npm uninstall @best-cli/core -g

# 二、使用cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 安装
cnpm i @best-cli/core -g
cnpm uninstall @best-cli/core -g

# 三、使用yarn
yarn global add @best-cli/core
yarn global remove @best-cli/core
```

### 项目初始化

```bash
best init # 需手动输入项目名称
best init [name] [options]

Options:

  -tp, --targetPath <targetPath>  指定本地调试文件路径
  -f,  --force                    是否强制初始化项目
  -d,  --debug                    开启调试模式: 打印调试信息
  -h,  --help                     输出用法信息
```

- 初始化一个 test-project 项目

```javascript
best init test-project
```

### 查看帮助

```bash
best -h
best --help
```

### 项目/组件 模板
