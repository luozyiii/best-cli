# best-cli

前端自动化-前端脚手架

### 首先阅读[learn-cli](https://github.com/luozyiii/learn-cli)

### 常用命令

- best -h

  > 查看帮助

- best init
  > 项目初始化

```javascript
// 本地
best init --targetPath /Users/luozhiyi/Work/project/best-cli/commands/init test-project --debug --force
best init --targetPath /d/my/best-cli/commands/init test-project --debug --force
// 缓存
best init test-project --force --debug
```

### 环境变量配置默认请求 URL

```bash
vim ~/.env

# 添加内容
BEST_CLI_BASE_URL=http://127.0.0.1:7001
```
