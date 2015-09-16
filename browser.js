var debug = require('debug')('glint-i18n');
var defaults = require('defaults');
var c = require('./config');
var Translate = require('./translate');

module.exports = function i18n(o) {
  window.context = window.context || {};

  // get options right
  o = defaults(o, c);
  var properties = o.properties;
  properties = Array.isArray(properties) ? properties : properties.split(',');

  var translate = Translate(o);


  properties.forEach(function(property) {
    Object.defineProperty(exports, property, {
      value: window.context[property],
      configurable: true
    });
  });

  var i18n = window.context.i18n;
  if (i18n) {
    exports.translate = exports.t = exports.__ = i18n.translate = translate.bind(i18n, i18n.defs, i18n.locales, exports.locale);
  }

  return i18n;

};
