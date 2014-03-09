module('options.url', {
  setup: function() {
    $(document).ready(function() {
      $('#qunit-fixture').
        append('<img class="empty">').
        append($('<img class="dot">').data('imadaem', QUnit.helper.dot));
    });
  }
});


asyncTest('undefined', function() {
  expect(1);

  $('img.empty').imadaem();

  QUnit.assert.srcEqual('img.empty', undefined, 'Url is undefined');
});


asyncTest('data uri', function() {
  expect(1);

  $('img.empty').imadaem({
    url: QUnit.helper.dot.url
  });

  QUnit.assert.srcEqualDot('img.empty');
});


asyncTest('callback without arguments', function() {
  expect(1);

  $('img.empty').imadaem({
    url: function() {
      return QUnit.helper.dot.url;
    }
  });

  QUnit.assert.srcEqualDot('img.empty');
});


asyncTest('callback with arguments', function() {
  expect(1);

  $('img.dot').imadaem({
    url: function(tags) {
      return tags.url;
    }
  });

  QUnit.assert.srcEqualDot('img.dot');
});
