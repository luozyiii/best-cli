'use strict';

const log = require('./log');
const request = require('./request');
const npm = require('./npm');
const formatPath = require('./formatPath');
const spinner = require('./spinner');

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function sleep(timeout = 1000) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

// 兼容windows
function exec(command, args, options) {
  const win32 = process.platform === 'win32';
  const cmd = win32 ? 'cmd' : command;
  const cmdArgs = win32 ? ['/c'].concat(command, args) : args;
  return require('child_process').spawn(cmd, cmdArgs, options || {});
}

function execAsync(command, args, options) {
  return new Promise((resolve, reject) => {
    const p = exec(command, args, options);
    p.on('error', (e) => {
      reject(e);
    });
    p.on('exit', (c) => {
      resolve(c);
    });
  });
}

module.exports = { log, request, npm, formatPath, spinner, isObject, sleep, exec, execAsync };
