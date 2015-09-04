/**
 * The function does not alter the input object.
 * It creates and returns a new array (table).
 *
 * defs object format:  {de: {a: 1, b: 2}, en: {a: 'one', b: 'two'}}
 * defs table  format:  [['', 'de', 'en'], ['a', 1, 'one'], ['b', 2, 'two']]
 * @param {Object} defs defs in the object format
 * @returns {Array}     defs in the table  format
 */
exports.toTable = function toTable(defs) {
  var arr = [];
  var lookup = {};
  var locales = Object.keys(defs);
  var rowLength = locales.length + 1;

  var headerRow = [''].concat(locales);

  // first iteration: locales like 'en','de'
  locales.forEach(function(locale, i) {
    var colNumber = i + 1;
    var definition = defs[locale];
    // second iteration: key,value definitions like {'hello': 'hallo'}
    Object.keys(definition).forEach(function(key) {
      var value = definition[key];
      // todo add rows (with fixed length locales.length+1) to arr
      if (typeof lookup[key] !== 'undefined') {
        // update existing row
        var rowNumber = lookup[key];
        arr[rowNumber][colNumber] = value;
      } else {
        // insert new row
        lookup[key] = arr.length;
        var row = new Array(rowLength);
        row[0] = key;
        row[colNumber] = value;
        arr.push(row);
      }
    })

  });

  arr.unshift(headerRow);

  return arr;
}

/**
 *
 * The function does not alter the input array (table).
 * It creates and returns a new object (based on the input table).
 *
 * defs object format:  {de: {a: 1, b: 2}, en: {a: 'one', b: 'two'}}
 * defs table  format:  [['', 'de', 'en'], ['a', 1, 'one'], ['b', 2, 'two']]
 * @param {Array} defs  defs in the table  format
 * @returns {Object}    defs in the object format
 */
exports.toObject = function toObject(defs) {
  var obj = {};
  // check defs format
  if (!defs) return defs;
  // rows
  if (!Array.isArray(defs) || defs.length === 0) return defs;
  // columns
  if (!Array.isArray(defs[0]) || defs[0].length === 0) return defs;

  // extract locale from header row
  var locales = defs[0].slice(1);
  locales.forEach(function(locale) {
    obj[locale] = {};
  });

  defs.forEach(function(row, i) {
    if (i == 0) return; // skip header row here
    var key = row[0];
    if (key) {
      row.slice(1).forEach(function(column, j) {
        var locale = locales[j];
        obj[locale][key] = column;
      })
    }

  });

  return obj;
}