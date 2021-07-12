'use strict';

const { isObject } = require('@best-cli/utils');

class Package {
  constructor(options) {
    if (!options) {
      throw new Error('Package类的options参数不能为🈳️!');
    }
    if (!isObject(options)) {
      throw new Error('Package类的options参数必须为对象!');
    }
    // package 的路径
    this.targetPath = options.targetPath;
    // package 的存储路径
    this.storePath = options.storePath;
    // package name
    this.packageName = options.packageName;
    // package version
    this.packageVersion = options.packageVersion;
  }

  // 判断当前Package是否存在
  exists() {}

  // 安装Package
  install() {}

  // 更新Package
  update() {}

  // 获取入口文件的路径
  getRootFilePath() {}
}

module.exports = Package;
