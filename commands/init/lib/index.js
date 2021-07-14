'use strict';

const Command = require('@best-cli/command');
const log = require('@best-cli/log');

class InitCommand extends Command {
  init() {
    this.projectName = this._argv[0] || '';
    this.force = !!this._cmd.force;
    log.verbose('projectName:', this.projectName);
    log.verbose('force:', this.force);
  }
  exec() {
    // init 的业务逻辑
  }
}

function init(argv) {
  return new InitCommand(argv);
}

module.exports.InitCommand = InitCommand;
module.exports = init;
