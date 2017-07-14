'use strict';

const _ = require('lodash');

let opts = require('./config_options.json');

/**
 * Get a setting
 * @param  {String} setting
 * @return {Mixed} setting or null if not found
 */
let getSetting = (setting) => {
  return opts[setting] !== undefined ? opts[setting] : null;
}

/**
 * Get choices for a given setting
 * @param  {String} setting
 * @return {Mixed} Result or null if nothing was found
 */
let getChoices = (setting) => {

  let config = getSetting(setting);
  return config && Array.isArray(config.options) ? config.options : null;
}

/**
 * Get the default choice for a config setting
 * @param  {String} setting
 * @return {Mixed}
 */
let getDefaultChoice = (setting) => {
  let config = getSetting(setting);
  return config && config.default !== undefined && config.default.length > 0 ? config.default : null;
}

/**
 * Get the default choice by key
 * @param  {String} setting
 * @param  {String} key
 * @return {Object}
 */
let getDefaultChoiceByKey = (setting, key) => {
  if (!setting.default) {
    return setting.default;
  }

  let choices = getChoices(setting);

  let result = null;
  for (let choice of choices) {
    if (Array.isArray(key)) {
      if(_.find(key, x => x === choice.name)) {
        const keys = _.takeRight(key, key.length - 1);
        result = keys.length > 0
          ? getDefaultChoiceByKey(choice, keys)
          : choice;

        break;
      }
    } else {
      if(choice.name === key) {
        result = choice.default;
        break;
      }
    }
  }

  return result;
}

/**
 * Get the wanted choice by key
 * @param  {String} setting
 * @param  {String} key
 * @return {Object}
 */
let getChoiceByKey = (setting, key) => {
  let choices = setting.values ? setting.values : getChoices(setting);
  if (!choices) {
    return null;
  }

  let result = null;
  for (let choice of choices) {
    if (Array.isArray(key)) {
      if(_.find(key, x => x === choice.name)) {
        const keys = _.takeRight(key, key.length - 1);
        result = keys.length > 0
          ? getChoiceByKey(choice, keys)
          : choice;

        break;
      }
    } else {
      if(choice.name === key) {
        result = choice;
        break;
      }
    }
  }

  return result;
}

module.exports = {
  getSetting,
  getChoices,
  getDefaultChoice,
  getDefaultChoiceByKey,
  getChoiceByKey
};
