module('resizer-twitter', {
  setup: function() {
    $(document).ready(function() {

      $('<img class="twitter">').
        data('imadaem', {
          url: QUnit.helper.twitter
        }).
        attr('src', QUnit.helper.twitter + ':thumb').
        appendTo('#qunit-fixture').
        imadaem({
          url: function(tags) {
            var suffix = '';
            if (tags.size.width >= 1024) {
              suffix = ':large';
            } else if (tags.size.width >= 600) {
              suffix = ':medium';
            } else if (tags.size.width >= 340) {
              suffix = ':small';
            } else {
              suffix = ':thumb';
            }
            return tags.url + suffix;
          }
        });
    });
  }
});


asyncTest('small', function() {
  expect(1);

  $('img.twitter').css({'width': 599});

  QUnit.assert.srcEqual('img.twitter',
    QUnit.helper.twitter + ':small',
    'Url is small');
});
