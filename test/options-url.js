module('empty', {
  setup: function() {
    $(document).ready(function() {
      $('#qunit-fixture').append('<img class="empty">');
    });
  }
});


asyncTest('options.url as undefined', function() {
  expect(1);

  $('img.empty').imadaem();

  QUnit.assert.srcEqual('img.empty', undefined, 'Url is undefined');
});


asyncTest('options.url as data uri', function() {
  expect(1);

  $('img.empty').imadaem({
    url: QUnit.helper.dot
  });

  QUnit.assert.srcEqualDot('img.empty');
});


asyncTest('options.url as callback without arguments', function() {
  expect(1);

  $('img.empty').imadaem({
    url: function() {
      return QUnit.helper.dot;
    }
  });

  QUnit.assert.srcEqualDot('img.empty');
});
