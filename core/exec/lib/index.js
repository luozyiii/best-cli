'use strict';

const Package = require('@best-cli/package');

function exec() {
  console.log(process.env.CLI_TARGET_PATH);
  console.log(process.env.CLI_HOME_PATH);
  /**
   * 1、targetPath -> modulePath
   * 2、modulePath -> Package(npm模块)
   * 3、Package.getRootFile(入口文件)
   * 4、Package.update / Package.install
   * 封装 -> 复用
   */
  const pkg = new Package();
  console.log(pkg);
}

module.exports = exec;
