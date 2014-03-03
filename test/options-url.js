module('empty', {
  setup: function() {
    $(document).ready(function() {
      $('#qunit-fixture').append('<img class="empty">');
    });
  }
});


asyncTest('empty callback', function() {
  expect(1);

  $('img.empty').imadaem();

  $(window).
    one('resize', function() {
      equal($('img.empty').attr('src'), undefined, 'Url is undefined');
      start();
    }).
    trigger('resize');
});


asyncTest('data url callback', function() {
  expect(1);
  var TINIEST_GIF = 'data:image/gif;base64,' +
    'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

  $('img.empty').imadaem({
    url: function() {
      return TINIEST_GIF;
    }
  });

  $(window).
    one('resize', function() {
      equal($('img.empty').attr('src'), TINIEST_GIF, 'Url is the tiniest gif');
      start();
    }).
    trigger('resize');
});

