/*! Imadaem v0.4.0 http://imadaem.penibelst.de/ */

(function($, window) {
  'use strict';

  $.fn.imadaem = function(options) {
    var
      $elements = this,

      settings = $.extend({
        dataAttribute: 'imadaem',
        overflowDefined: 'hidden',
        url: $.noop,
        windowEvents: 'resize orientationchange'
      }, options),

      getNativeLength = function(cssLength) {
        var density = window.devicePixelRatio || 1;
        return Math.round(cssLength * density);
      },

      getData = function($element) {
        var data = $element.data(settings.dataAttribute);

        if ($.isPlainObject(data)) {
          // gravity must be a combination of ['l', 'r', 't', 'b']
          data.gravity = data.gravity ?
            data.gravity.replace(/[^lrtb]/g, '').substr(0, 2) :
            '';
        } else {
          data = {url: data};
        }

        return $.extend({
          url: '',
          gravity: ''
        }, data);
      },

      setSrc = function($element, newSrc) {
        if (!newSrc) {
          return;
        }

        var
          oldSrc = $element.attr('src'),
          errors = 0;

        $element.
          on('error', function() {
            // fall back to the previous src once
            if (!errors) {
              errors += 1;
              $(this).attr('src', oldSrc);
            }
          }).
          attr('src', newSrc);
      },

      getStyle = function($element) {
        return {
          size: {
            width: getNativeLength($element.innerWidth()),
            height: getNativeLength($element.innerHeight())
          },
          defined: {
            width: $element.css('overflow-x') === settings.overflowDefined,
            height: $element.css('overflow-y') === settings.overflowDefined
          }
        };
      },

      scale = function() {
        var $this, properties;

        $elements.each(function() {
          $this = $(this);

          properties = $.extend({
            url: '',
            gravity: '',
            size: { width: 0, height: 0 },
            defined: { width: false, height: false }
          },
          getData($this),
          getStyle($this));

          if ($.isFunction(settings.url)) {
            setSrc($this, settings.url(properties));
          } else {
            setSrc($this, settings.url);
          }
        });
      };

    $(window).
      one('load', scale).
      on(settings.windowEvents, scale);

    return this;
  };
}(jQuery, window));
