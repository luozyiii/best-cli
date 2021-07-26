const { request } = require('@best-cli/utils');

module.exports = function () {
  return request({
    url: '/project/template',
  });
};
