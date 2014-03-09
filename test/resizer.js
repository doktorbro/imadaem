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
    'Url is thousand');
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
    'Url is thumb');
});


asyncTest('thousand-width', function() {
  expect(1);

  $('img.flickr').css({'width': 1000});

  QUnit.assert.srcEqual('img.flickr',
    QUnit.helper.flickr.url.replace('.jpg', '_b.jpg'),
    'Url is big');
});


module('resizer-lorempixel', {
  setup: function() {
    $(document).ready(function() {

      $('<img class="lorempixel">').
        data('imadaem', QUnit.helper.lorempixel).
        attr('src', QUnit.helper.lorempixel.url + '100/100/').
        appendTo('#qunit-fixture').
        imadaem({
          url: function(tags) {
            return tags.url + tags.size.width + '/' + tags.size.height + '/';
          }
        });
    });
  }
});


asyncTest('thousand', function() {
  expect(1);

  $('img.lorempixel').css({'width': 1000, 'height': 1000});

  QUnit.assert.srcEqual('img.lorempixel',
    QUnit.helper.lorempixel.url + '1000/1000/',
    'Url is thousand');
});


module('resizer-gravatar', {
  setup: function() {
    $(document).ready(function() {

      $('<img class="gravatar">').
        data('imadaem', QUnit.helper.gravatar).
        attr('src', QUnit.helper.gravatar.url).
        appendTo('#qunit-fixture').
        imadaem({
          url: function(tags) {
            return tags.url + '?s=' + tags.size.width;
          }
        });
    });
  }
});


asyncTest('hundred', function() {
  expect(1);

  $('img.gravatar').css({'width': 100});

  QUnit.assert.srcEqual('img.gravatar',
    QUnit.helper.gravatar.url + '?s=100',
    'Url is hundred');
});
