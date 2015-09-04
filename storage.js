var after = require('after');
var debug = require('debug')('glint:i18n-storage');

module.exports = function storage(adapter) {
  if (!adapter) throw new TypeError('adapter must be provided');

  function loadAll(locales, callback) {
    if (typeof locales === 'string') locales = locales.split(',');
    callback = callback || function noop() {
      };
    var definitions = {};
    var next = after(locales.length, callback);
    locales.forEach(function(locale) {
      // load all locale definitions via adapter.
      load(locale, function(err, result) {
        if (err) {
          debug('locale definition could not be loaded:', locale, err);
          if (err.code && err.code === 'ENOENT') {
            result = {};
            err = null;
          }
        }
        definitions[locale] = result;
        next(err, definitions);
      });
    });
  }

  function load(locale, callback) {
    callback = callback || function noop() {
      };
    adapter.load(locale, function(err, result) {
      debug('load locale', locale);
      callback(err, result);
    });
  }

  function saveAll(locales, definitions, callback) {
    if (typeof locales === 'string') locales = locales.split(',');
    callback = callback || function noop() {
      };
    var next = after(locales.length, callback);
    locales.forEach(function(locale) {
      // save all locale definitions via adapter.
      var definition = definitions[locale];
      if (!definition) {
        debug('no locale definition provided:', locale);
        definition = {};
      }

      save(locale, definition, function(err, result) {
        next(err, definitions);
      });

    });
  }

  function save(locale, definition, callback) {
    callback = callback || function noop() {
      };
    if (typeof definition !== 'object') {
      return debug('save locale failed. no valid definition provided.');
    }
    adapter.save(locale, definition, function(err, result) {
      debug('save locale', locale);
      callback(err, result);
    });
  }

  return {
    adapter: adapter,
    loadAll: loadAll,
    load: load,
    saveAll: saveAll,
    save: save
  }

};
