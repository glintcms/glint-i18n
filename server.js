var Locale = require('connect-locale');
var debug = require('debug')('glint:i18n');

exports = module.exports = function i18n(o) {
  return Locale(o);
};