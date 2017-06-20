'use strict';

const _ = require('underscore.string');

/**
 * Get the base directory
 * @return {String}
 */
let getBaseDir = (baseName) => {
  return baseName;
};

/**
 * Get a js friendly application name
 * @param  {String} appName The input application name [optional]
 * @return {String}
 */
let getAppName = (appName) => {

  // If appName is not given, use the current directory
  if(appName === undefined) {
    appName = getBaseDir();
  }

  return _.slugify(_.humanize(appName));
};

module.exports = {
  getBaseDir,
  getAppName
};
