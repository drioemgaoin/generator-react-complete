'use strict';

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

module.exports = {
  getSetting,
  getChoices,
  getDefaultChoice
};
