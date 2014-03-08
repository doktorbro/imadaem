module('resizer-twitter', {
  setup: function() {
    $(document).ready(function() {

      $('<img class="twitter">').
        data('imadaem', QUnit.helper.twitter).
        attr('src', QUnit.helper.twitter + ':thumb').
        appendTo('#qunit-fixture').
        imadaem({
          url: function(tags) {
            var suffix = (tags.size.width > 100) ? 'large' : 'thumb';
            return QUnit.helper.twitter.url + ':' + suffix;
          }
        });
    });
  }
});


asyncTest('hundred-width', function() {
  expect(1);

  $('img.twitter').css({'width': 100});

  QUnit.assert.srcEqual('img.twitter',
    QUnit.helper.twitter.url + ':thumb',
    'Url is thumb');
});


asyncTest('thousand-width', function() {
  expect(1);

  $('img.twitter').css({'width': 1000});

  QUnit.assert.srcEqual('img.twitter',
    QUnit.helper.twitter.url + ':large',
    'Url is large');
});


module('resizer-google', {
  setup: function() {
    $(document).ready(function() {

      $('<img class="google">').
        data('imadaem', QUnit.helper.google).
        attr('src', QUnit.helper.google.url + 'w100/').
        appendTo('#qunit-fixture').
        imadaem({
          url: function(tags) {
            return tags.url + 'w' + tags.size.width + '/';
          }
        });
    });
  }
});


asyncTest('thousand-width', function() {
  expect(1);

  $('img.google').css({'width': 1000});

  QUnit.assert.srcEqual('img.google',
    QUnit.helper.google.url + 'w1000/',
    'Url is half-year');
});


module('resizer-flickr', {
  setup: function() {
    $(document).ready(function() {

      $('<img class="flickr">').
        data('imadaem', QUnit.helper.flickr).
        attr('src', QUnit.helper.flickr.url.replace('.jpg', '_t.jpg')).
        appendTo('#qunit-fixture').
        imadaem({
          url: function(tags) {
            var suffix = (tags.size.width > 100) ? 'b' : 't';
            return QUnit.helper.flickr.url.
              replace('.jpg', '_' + suffix + '.jpg');
          }
        });
    });
  }
});


asyncTest('hundred-width', function() {
  expect(1);

  $('img.flickr').css({'width': 100});

  QUnit.assert.srcEqual('img.flickr',
    QUnit.helper.flickr.url.replace('.jpg', '_t.jpg'),
    'Url is thousand');
});


asyncTest('thousand-width', function() {
  expect(1);

  $('img.flickr').css({'width': 1000});

  QUnit.assert.srcEqual('img.flickr',
    QUnit.helper.flickr.url.replace('.jpg', '_b.jpg'),
    'Url is thousand');
});
