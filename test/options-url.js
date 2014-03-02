test('empty callback', function() {
  expect(1);

  $('#qunit-fixture').append('<img class="empty">');

  var i = $('img.empty').imadaem({
    url: $.noop()
  });

  $(window).trigger('resize');

  equal(i.attr('src'), undefined, 'Url is undefined');
});


test('data url callback', function() {
  expect(2);
  var TINIEST_GIF = 'data:image/gif;base64,' +
    'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  $('#qunit-fixture').append('<img class="tiny">');

  var i = $('img.tiny').imadaem({
    url: function() {
      return TINIEST_GIF;
    }
  });

  equal(i.attr('src'), undefined, 'Url is undefined');

  $(window).trigger('resize');

  equal(i.attr('src'), TINIEST_GIF, 'Url is data');
});
