
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
    name: 'modules',
    message: 'Which modules format do you want to use?',
    choices: utils.config.getChoices('modules'),
    default: utils.config.getDefaultChoice('modules')
  },
  {
    type: 'list',
    name: 'bundler',
    message: 'Which bundler do you want to use?',
    choices: utils.config.getChoices('bundler'),
    default: utils.config.getDefaultChoice('bundler')
  },
  {
    type: 'list',
    name: 'transpiler',
    message: 'Which transpiler do you want to use?',
    choices: utils.config.getChoices('transpiler'),
    default: utils.config.getDefaultChoice('transpiler')
  }
];
