
'use strict';

const utils = require('../../utils/all');

module.exports = [
  {
    type: 'input',
    name: 'appName',
    message: 'Please choose your application name',
    default: utils.yeoman.getAppName()
  },
  {
    type: 'list',
    name: 'compiler',
    message: 'Which compiler do you want to use?',
    choices: utils.config.getChoices('compiler'),
    default: utils.config.getDefaultChoice('compiler')
  }
];
