# best-cli

前端自动化-前端脚手架

### 首先阅读[learn-cli](https://github.com/luozyiii/learn-cli)

### 安装

```bash
# 使用cnpm
npm install -g cnpm --registry=https://registry.npm.taobao.org
# 全局安装
cnpm i @best-cli/core -g
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
  -f,  --force                    是否强制初始化项目
  -d,  --debug                    开启调试模式: 打印调试信息
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

```javascript
// 模板接口返回示例
[
  {
    name: 'vue3标准模板',
    npmName: 'best-cli-template-vue3',
    version: '1.0.3',
    type: 'normal',
    installCommand: 'yarn install',
    startCommand: 'yarn serve',
    tag: ['project'],
    ignore: ['public/**', 'yarn.lock'],
  },
  {
    name: 'vue-element-admin管理后台模板',
    npmName: 'best-cli-template-vue-element-admin',
    version: '1.0.0',
    type: 'normal',
    tag: ['component'],
  },
  {
    name: 'vue3自定义标准模板',
    npmName: 'best-cli-template-custom-vue3',
    version: '1.0.0',
    type: 'custom',
    installCommand: 'yarn install',
    startCommand: 'yarn serve',
    tag: ['project'],
    ignore: ['public/**', 'yarn.lock'],
  },
];
```
