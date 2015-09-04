var Adapter = require('glint-adapter');
var Ajax = require('glint-adapter-ajax');

module.exports = function(o) {
  o = o || {};
  var adapter = o.adapter || Ajax(o);
  var db = o.db || 'glint';
  var type = o.type || 'i18n';

  return Adapter(adapter)
    .db(db)
    .type(type)

};
