const Spinner = require('cli-spinner').Spinner;

module.exports = function (msg = 'loading', spinnerString = '|/-\\') {
  const spinner = new Spinner(`${msg}... %s`);
  spinner.setSpinnerString(spinnerString);
  spinner.start();
  return spinner;
};
