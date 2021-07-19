'use strict';

const fs = require('fs');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const semver = require('semver');

const Command = require('@best-cli/command');
const log = require('@best-cli/log');

const getProjectTemplate = require('./getProjectTemplate');

const TYPE_PROJECT = 'project';
const TYPE_COMPONENT = 'component';

class InitCommand extends Command {
  init() {
    this.projectName = this._argv[0] || '';
    this.force = !!this._cmd.force;
    log.verbose('projectName:', this.projectName);
    log.verbose('force:', this.force);
  }
  async exec() {
    // 业务逻辑
    try {
      // 0、判断项目模板是否存在
      const template = await getProjectTemplate();
      if (!template || template.length === 0) {
        throw new Error('项目模板不存在');
      }
      this.template = template;
      // 1、准备阶段
      const projectInfo = await this.prepare();
      if (projectInfo) {
        // 2、下载模版
        log.verbose('projectInfo:', projectInfo);
        this.projectInfo = projectInfo;
        this.downLoadTemplate();
        // 3、安装模版
      }
    } catch (e) {
      log.error(e.message);
    }
  }
  async prepare() {
    // 1、判断当前目录是否为空
    const localPath = process.cwd();
    if (!this.IsDirEmpty(localPath)) {
      let ifContinue = false;
      if (!this.force) {
        // 1.1 是否继续创建
        ifContinue = (
          await inquirer.prompt({
            type: 'confirm',
            name: 'ifContinue',
            default: false,
            message: '当前文件夹不为空，是否继续创建项目？',
          })
        ).ifContinue;
        if (!ifContinue) return;
      }

      // 2、是否强制更新
      if (ifContinue || this.force) {
        // 给用户做二次确认
        const { confirmDelete } = await inquirer.prompt({
          type: 'confirm',
          name: 'confirmDelete',
          default: false,
          message: '是否确认清空当前目录下的文件？',
        });
        // 清空当前目录
        confirmDelete && fse.emptyDirSync(localPath);
      }
    }
    return this.getProjectInfo();
  }

  async getProjectInfo() {
    let projectInfo = {};
    // 1、选择创建项目或组件
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: '请选择初始化类型',
      default: TYPE_PROJECT,
      choices: [
        {
          name: '项目',
          value: TYPE_PROJECT,
        },
        {
          name: '组件',
          value: TYPE_COMPONENT,
        },
      ],
    });
    log.verbose('type:', type);
    if (type === TYPE_PROJECT) {
      // 2、获取项目基本信息
      const project = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: '请输入项目名称',
          default: '',
          validate: function (v) {
            var done = this.async();
            setTimeout(function () {
              if (!/^[a-zA-Z]+[a-zA-Z0-9_-]*$/.test(v)) {
                done('请输入合法的项目名称（首字符必须是字母,只能输入字母数字,下划线_,中划线-）');
                return;
              }
              done(null, true);
            }, 0);
          },
          filter: function (v) {
            return v;
          },
        },
        {
          type: 'input',
          name: 'projectVersion',
          message: '请输入项目版本号',
          default: '1.0.0',
          validate: function (v) {
            var done = this.async();
            setTimeout(function () {
              if (!!!semver.valid(v)) {
                done('请输入合法的版本号');
                return;
              }
              done(null, true);
            }, 0);
          },
          filter: function (v) {
            if (!!semver.valid(v)) {
              return semver.valid(v);
            } else {
              return v;
            }
          },
        },
        {
          type: 'list',
          name: 'projectTemplate',
          message: '请选择项目模板',
          choices: this.createTemplateChoice(),
        },
      ]);
      projectInfo = {
        type,
        ...project,
      };
    } else if (type === TYPE_COMPONENT) {
    }
    // return 项目基本信息(object)
    return projectInfo;
  }

  downLoadTemplate() {
    /**
     * 1. 通过项目模版API获取项目模版信息
     * 1.1 通过egg.js 搭建一个后端系统
     * 1.2 通过npm存储项目模版
     * 1.3 将项目模版信息存储在mongodb数据库中
     * 1.4 通过egg.js 获取mongodb中的数据并且通过API返回
     */
    console.log(this.projectInfo, this.template);
  }

  IsDirEmpty(localPath) {
    let fileList = fs.readdirSync(localPath);
    // 文件过滤的逻辑
    fileList.filter((file) => !file.startsWith('.') && ['node_modules'].indexOf(file) < 0);
    return !fileList || fileList.length <= 0;
  }

  createTemplateChoice() {
    return this.template.map((item) => ({
      value: item.npmName,
      name: item.name,
    }));
  }
}

function init(argv) {
  return new InitCommand(argv);
}

module.exports.InitCommand = InitCommand;
module.exports = init;
