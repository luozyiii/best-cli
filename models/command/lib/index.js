'use strict';

const semver = require('semver');
const colors = require('colors/safe');

const LOWEST_NODE_VERSION = '15.0.0';

class Command {
  constructor(argv) {
    console.log('Command constructor', argv);
    this._argv = argv;
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve();
      chain = chain.then(() => {
        this.checkNodeVersion();
      });
      chain.catch((err) => {
        console.log(err.message);
      });
    });
  }

  // 检查node版本
  checkNodeVersion() {
    /**
     * 1、获取当前Node版本号
     * 2、对比最低版本号
     */
    const curVersion = process.version;
    const lowestVersion = LOWEST_NODE_VERSION;
    if (!semver.gte(curVersion, lowestVersion)) {
      throw new Error(colors.red(`best-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`));
    }
  }

  init() {
    throw new Error('init必须实现');
  }

  exec() {
    throw new Error('exec必须实现');
  }
}
module.exports = Command;
