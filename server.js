var debug = require('debug')('glint-i18n');
var Locale = require('connect-locale');

exports = module.exports = function i18n(o) {
  return Locale(o);
};