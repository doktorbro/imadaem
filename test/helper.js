QUnit.extend(QUnit, {
  helper: {
    dot: {
      url: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
      size: {
        width: 1,
        height: 1
      },
      description: 'The Tiniest GIF Ever. By Paul Bonser'
    },
    twitter: {
      url: 'https://pbs.twimg.com/media/A6j_dWXCcAAEOfR.jpg',
      size: {
        width: 1024,
        height: 768
      },
      description: 'Walter Greiner. By Anatol Broder'
    },
    google: {
      url: 'https://lh3.googleusercontent.com' +
        '/-jd6gBLqQmpo/UUe4dmT5L6I/AAAAAAAAMXU/613uVeYlj6Y/',
      size: {
        width: 1920,
        height: 2560
      },
      description: 'Snow Tree. By Linus Torvalds'
    },
    flickr: {
      url: 'https://farm8.staticflickr.com/7397/12383552194_3c25c47d76.jpg',
      size: {
        width: 1024,
        height: 614
      },
      description: 'Roman Forum. By Jamie Frith'
    },
    lorempixel: {
      url: 'http://lorempixel.com/',
      size: {
        width: 1920,
        height: 1920
      },
      description: 'Dummy Image. By Holler Moritz'
    },
    gravatar: {
      url: 'https://gravatar.com/avatar/d43bb4e348b0d3e41503731eb5072bb1',
      size: {
        width: 512,
        height: 512
      },
      description: 'Anatol Broder. By himself'
    }
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
    this.srcEqual(element, QUnit.helper.dot.url, 'Image is a dot');
  }
});
