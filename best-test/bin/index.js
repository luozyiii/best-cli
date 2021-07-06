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
