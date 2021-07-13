'use strict';

const path = require('path');
const pkgDir = require('pkg-dir').sync;

const { isObject } = require('@best-cli/utils');
const formatPath = require('@best-cli/format-path');

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
  getRootFilePath() {
    /**
     * 1、获取package.json所在的目录 - pkg-dir
     * 2、读取package.json -> require()
     * 3、寻找main/lib - path
     * 4、路径的兼容(macOS/windows)  formatPath
     */
    const dir = pkgDir(this.targetPath);
    console.log('dir', dir);
    if (dir) {
      const pkgFile = require(path.resolve(dir, 'package.json'));
      console.log('pkgFile', pkgFile);
      if (pkgFile && pkgFile.main) {
        return formatPath(path.resolve(dir, pkgFile.main));
      }
    }
    return null;
  }
}

module.exports = Package;
