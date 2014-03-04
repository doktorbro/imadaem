QUnit.extend(QUnit, {
  helper: {
    dot: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
    twitter: 'https://pbs.twimg.com/media/A6j_dWXCcAAEOfR.jpg'
  }
});


QUnit.extend(QUnit.assert, {
  srcEqual: function(element, expected, message) {
    $(window).
      one('resize', function() {
        var result = $(element).attr('src') === expected;
        QUnit.push(result, $(element).attr('src'), expected, message);
        start();
      }).
      trigger('resize');
  },
  srcEqualDot: function(element) {
    this.srcEqual(element, QUnit.helper.dot, 'Image is a dot');
  }
});
