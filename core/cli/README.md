# `前端脚手架(best)`

> 前端自动化

### 安装

```bash
npm i @best-cli/core -g
```

### 查看帮助

```bash
best -h
best --help
```

### 项目初始化

```bash
best init # 需手动输入项目名称
best init [name] [options]

Options:

  -tp, --targetPath <targetPath>  指定本地调试文件路径
  -f,  --force  <force>           强制在当前目录安装模版
  -d,  --debug <debug>            开启调试模式: 打印调试信息
  -h,  --help                     输出用法信息
```

例子

```javascript
// 本地
best init test-project --targetPath /Users/luozhiyi/Work/project/best-cli/commands/init --debug --force
best init test-project --targetPath /d/my/best-cli/commands/init --debug --force

// 缓存
best init test-project --force --debug
```

### 环境变量配置默认请求 URL

```bash
vim ~/.env

# 添加内容
BEST_CLI_BASE_URL=http://127.0.0.1:7001
```
