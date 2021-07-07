#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const dedent = require('dedent'); // 去掉前后的空格符
const pkg = require('../package.json');

const arg = hideBin(process.argv);
const cli = yargs(arg);
const argv = process.argv.slice(2);

const context = {
  bVersion: pkg.version,
};

cli
  .strict()
  .usage('Usage: $0 [commoand] <options>') // 用法
  .demandCommand(1, 'A command is required. Pass --help to see all available commands and options.') // 至少输入一个命令，不然会提示
  .recommendCommands() // 自动命令提醒
  .alias('h', 'help') // 别名
  .alias('v', 'version')
  .wrap(cli.terminalWidth()) // 修改宽度
  .epilogue(
    dedent`  Your own footer description  
  hi`,
  ) // 在结尾加上你想说的话 dedent`hi` 等价于 dedent(`hi`)
  .fail((err, msg) => {
    console.log('err:', err);
    // console.log('msg:', msg);
  })
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
  .command(
    'init [name]',
    'Do init a project',
    (yargs) => {
      yargs.option('name', {
        type: 'string',
        describe: 'Name of a project',
        alias: 'n',
      });
    },
    (argv) => {
      console.log(argv);
    },
  )
  .command({
    command: 'list',
    aliases: ['ls', 'la', 'll'],
    describe: 'List local packages',
    builder: (yargs) => {
      console.log(yargs);
    },
    handler: (argv) => {
      console.log(argv);
      console.log('start');
      setTimeout(() => {
        console.log('setTimeout');
      }, 0);
      new Promise(() => {
        let chain = Promise.resolve();
        chain.then(() => console.log('chain1'));
        chain.then(() => console.log('chain2'));
        chain.then(() => console.log('chain3'));
      });
      let chain = Promise.resolve();
      chain.then(() => console.log('chain4'));
      setTimeout(() => {
        let chain = Promise.resolve();
        chain.then(() => console.log('chain5'));
      }, 0);
      console.log('end');
      // start end chain1 chain2 chain3 chain4 setTimeout chain5
    },
  })
  .parse(argv, context);
