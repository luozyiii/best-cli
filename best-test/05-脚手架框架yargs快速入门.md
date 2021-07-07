##

### yargs 安装

```javascript
yarn add -D yargs
```

### dedent

```javascript
yarn add -D dedent
```

### 基本用法

```javascript
#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const dedent = require('dedent'); // 去掉前后的空格符

const arg = hideBin(process.argv);
const cli = yargs(arg);

cli
  .usage('Usage: best-test [commoand] <options>') // 用法
  .demandCommand(1, 'A command is required. Pass --help to see all available commands and options.') // 至少输入一个命令，不然会提示
  .recommendCommands()
  .alias('h', 'help') // 别名
  .alias('v', 'version')
  .wrap(cli.terminalWidth()) // 修改宽度
  .epilogue(
    dedent`  Your own footer description  
  hi`,
  ) // 在结尾加上你想说的话 dedent`hi` 等价于 dedent(`hi`)

  .options({
    debug: {
      type: 'boolean',
      describe: 'Bootstrap debug mode',
      alias: 'd',
    },
  })
  .option('resgistry', {
    type: 'string',
    describe: 'Define global registry',
    alias: 'r',
  }) // 定义命令
  .group(['debug'], 'Dev Options') // 将命令分组
  .strict().argv;
```
