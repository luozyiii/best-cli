'use strict';

const Package = require('@best-cli/package');
const log = require('@best-cli/log');

// 配置表
const SETTINGS = {
  init: '@best-cli/init',
};

function exec() {
  /**
   * 1、targetPath -> modulePath
   * 2、modulePath -> Package(npm模块)
   * 3、Package.getRootFile(入口文件)
   * 4、Package.update / Package.install
   * 封装 -> 复用
   */
  const targetPath = process.env.CLI_TARGET_PATH;
  const homePath = process.env.CLI_HOME_PATH;
  log.verbose('targetPath', targetPath);
  log.verbose('homePath', homePath);
  // best init --targetPath /Users/luozhiyi/Work/project/best-cli/commands/init --debug
  // best init --targetPath /d/my/best-cli/commands/init --debug

  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  if (!targetPath) {
    targetPath = ''; // 生成缓存路径
  }

  const pkg = new Package({
    targetPath,
    packageName,
    packageVersion,
  });
  console.log(pkg.getRootFilePath());
}

module.exports = exec;
