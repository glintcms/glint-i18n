var defaults = require('defaults');
var debug = require('debug')('glint:i18n-translate');

var c = require('./config');

module.exports = function(o) {
  // get options right
  o = defaults(o, c);

  function resolveString(str) {
    if (str.indexOf(o.prefix) === 0) {
      return str.substr(o.prefix.length);
    }
    return str;
  }

  function humanizeString(str) {
    str = resolveString(str);
    return str.replace(/[-_]/g, ' ');
  }

  function translateSingle(defs, locales, locale, str, fallback) {
    str = resolveString(str);
    var humanized = humanizeString(str);
    debug('translate', locale, str);
    if (!defs) return humanized;
    var def = defs[locale];
    if (def) {
      if (def[str]) return def[str];
      if (def[humanized]) return def[humanized];
    }

    if (!locales) return humanized;
    if (typeof fallback !== 'undefined' && fallback === false) return humanized;

    var fallbackLocale = false;
    locales.some(function(supportedLocale) {
      def = defs[supportedLocale];
      if (def && def[str]) return fallbackLocale = def[str];
    })
    return fallbackLocale || humanized;
  }

  function translate(defs, locales, locale, text, fallback) {
    // match i18n-* strings
    var i18nString = text.match(o.match);

    // translate i18n-* strings
    if (!i18nString) return text;
    i18nString.forEach(function(str) {
      var replacement = translateSingle(defs, locales, locale, str, fallback);
      text = text.replace(str, replacement);
    });

    return text;
  }

  translate.single = translate.string = translateSingle;

  return translate;

};
