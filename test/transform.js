var test = require('tape');
var equal = require('deep-equal');
var transform = require('../transform');

test('table should have three rows (including title) and three columns', function(t) {
  var obj = {de: {a: 1, b: 2}, en: {a: 'one', b: 'two'}}
  var expected = [['', 'de', 'en'], ['a', 1, 'one'], ['b', 2, 'two']];

  var arr = transform.toTable(obj);
  console.log('arr', arr, expected);

  t.equal(arr.length, 3);
  t.equal(arr[0].length, 3);
  t.equal(arr[1].length, 3);
  t.true(equal(arr, expected));
  t.end();

});

test('table should not be messed up with missing elements', function(t) {
  var obj = {de: {a: 1, b: 2, c: 4}, en: {a: 'one', b: 'two', d: 'fife'}}
  var expected = [['', 'de', 'en'],
      ['a', 1, 'one'],
      ['b', 2, 'two'],
      ['c', 4,],
      ['d', , 'fife']];

  var arr = transform.toTable(obj);
  console.log('arr', arr, expected);

  t.equal(arr.length, 5);
  t.equal(arr[0].length, 3);
  t.equal(arr[1].length, 3);
  t.true(equal(arr, expected));
  t.end();

});

test('object should contain all locales and locale definitions', function(t){
  var table = [['', 'de', 'en'], ['a', 1, 'one'], ['b', 2, 'two']];
  var expected = {de: {a: 1, b: 2}, en: {a: 'one', b: 'two'}}
  var obj = transform.toObject(table);

  t.true(obj.de);
  t.true(obj.en);
  t.true(equal(obj, expected));
  t.end();

});

test('array (table) must not be altered, with toObject.', function(t){
  var table = [['', 'de', 'en'], ['a', 1, 'one'], ['b', 2, 'two']];
  var expected = {de: {a: 1, b: 2}, en: {a: 'one', b: 'two'}}
  var obj = transform.toObject(table);
  obj = transform.toObject(table);

  t.true(obj.de);
  t.true(obj.en);
  t.true(equal(table, [['', 'de', 'en'], ['a', 1, 'one'], ['b', 2, 'two']]));
  t.true(equal(obj, expected));
  t.end();

});
