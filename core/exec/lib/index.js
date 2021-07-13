'use strict';

const path = require('path');

const Package = require('@best-cli/package');
const log = require('@best-cli/log');

// 配置表
const SETTINGS = {
  init: '@best-cli/init',
};

const CACHE_DIR = 'dependencies';

async function exec() {
  /**
   * 1、targetPath -> modulePath
   * 2、modulePath -> Package(npm模块)
   * 3、Package.getRootFile(入口文件)
   * 4、Package.update / Package.install
   * 封装 -> 复用
   */
  let targetPath = process.env.CLI_TARGET_PATH;
  let homePath = process.env.CLI_HOME_PATH;
  let storeDir = '';
  let pkg;
  log.verbose('targetPath', targetPath);
  log.verbose('homePath', homePath);

  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  if (!targetPath) {
    targetPath = path.resolve(homePath, CACHE_DIR); // 生成缓存路径
    storeDir = path.resolve(targetPath, 'node_modules');
    log.verbose('targetPathEnd', targetPath);
    log.verbose('homePathEnd', homePath);

    pkg = new Package({
      targetPath,
      storeDir,
      packageName,
      packageVersion,
    });

    if (pkg.exists()) {
      // 更新package
      pkg.update();
    } else {
      // 安装package
      await pkg.install();
    }
  } else {
    pkg = new Package({
      targetPath,
      packageName,
      packageVersion,
    });
  }
  const rootFile = pkg.getRootFilePath();
  if (rootFile) {
    require(rootFile).apply(null, arguments);
  }

  // best init --targetPath /Users/luozhiyi/Work/project/best-cli/commands/init --debug
  // best init --targetPath /d/my/best-cli/commands/init --debug
  // best init test-project --force --debug
}

module.exports = exec;
