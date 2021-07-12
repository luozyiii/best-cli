'use strict';

module.exports = core;

/**
 * require支撑加载的类型: .js/.json/.node
 * .js => module.exports/exports
 * .json => JSON.parse
 * .node => C++
 * any => .js
 */
const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
const userHome = require('user-home');
const pathExists = require('path-exists');
const commander = require('commander');
const log = require('@best-cli/log');

const pkg = require('../package.json');
const constant = require('./const');
const init = require('@best-cli/init');
const exec = require('@best-cli/exec');

const program = new commander.Command();
async function core() {
  try {
    await prepare();
    registerCommand();
  } catch (e) {
    log.error(e.message);
  }
}

// 脚手架启动阶段
async function prepare() {
  checkPkgVersion();
  checkNodeVersion();
  // checkRoot();
  checkUserHome();
  // checkInputArgs();
  await checkEnv();
  checkGlobalUpdate();
}

// 注册命令
function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '');

  program.command('init [projectName]').option('-f, --force', '是否强制初始化项目').action(exec);

  // 开启 debug 模式
  program.on('option:debug', function () {
    if (program.opts().debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
  });

  log.verbose('debug', 'test debug log'); // 开启debug模式后可打印这句

  // 指定targetPath
  program.on('option:targetPath', function () {
    process.env.CLI_TARGET_PATH = program.opts().targetPath;
  });

  // 对未知命令的监听
  program.on('command:*', function (obj) {
    console.error('未知的命令:', obj[0]);
    const availableCommmands = program.commands.map((cmd) => cmd.name());
    if (availableCommmands.length > 0) {
      console.log('可用命令:', availableCommmands.join(','));
    }
  });

  program.parse(process.argv);

  if (program.args && program.args.length < 1) {
    program.outputHelp();
    console.log('');
  }
}

async function checkGlobalUpdate() {
  /**
   * 1、获取当前版本号和模块名
   * 2、调用npm api,获取所有版本号
   * 3、提取所有版本号，比对哪些版本号是大于当前版本号
   * 4、获取最新版本号，提示用户更新到该版本
   */
  const curVersion = pkg.version;
  const npmName = pkg.name;
  const { getNpmSemverVersion } = require('@best-cli/get-npm-info');
  const lastVersion = await getNpmSemverVersion(curVersion, npmName);
  if (lastVersion && semver.gt(lastVersion, curVersion)) {
    log.warn(
      colors.yellow(`更新提示: 请手动更新
      当前版本: v${curVersion}, 最新版本:v${lastVersion}
      更新命令: npm install -g ${npmName}`),
    );
  }
}

// 环境变量检查
const checkEnv = async () => {
  const dotenv = require('dotenv');
  const dotenvPath = path.resolve(userHome, '.env');
  if (await pathExists(dotenvPath)) {
    dotenv.config({
      path: dotenvPath,
    });
  }
  createDefaultConfig();
  // log.verbose('环境变量(process.env.CLI_HOME_PATH)', process.env.CLI_HOME_PATH);
};

function createDefaultConfig() {
  const cliConfig = {
    home: userHome,
  };
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
  } else {
    cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_HOME);
  }
  process.env.CLI_HOME_PATH = cliConfig['cliHome'];
}

// 入参检查和debug模式启动 (best --debug)
function checkInputArgs() {
  const minimist = require('minimist');
  const args = minimist(process.argv.slice(2));
  checkArgs(args);
}

function checkArgs(args) {
  if (args.debug) {
    process.env.LOG_LEVEL = 'verbose';
  } else {
    process.env.LOG_LEVEL = 'info';
  }
  log.level = process.env.LOG_LEVEL;
}

// 用户主目录检查功能
const checkUserHome = async () => {
  if (!userHome || !(await pathExists(userHome))) {
    throw new Error(colors.red('当前登录用户主目录不存在!'));
  }
};

// root 账号启动检查和自动降级 window 报错
function checkRoot() {
  const rootCheck = require('root-check');
  rootCheck();
  console.log(process.geteuid());
}

function checkNodeVersion() {
  /**
   * 1、获取当前Node版本号
   * 2、对比最低版本号
   */
  const curVersion = process.version;
  const lowestVersion = constant.LOWEST_NODE_VERSION;
  if (!semver.gte(curVersion, lowestVersion)) {
    throw new Error(colors.red(`best-cli 需要安装 v${lowestVersion} 以上版本的 Node.js`));
  }
}

// 检查版本号
function checkPkgVersion() {
  log.info(`v${pkg.version}`);
  // log.success('success test');
}
