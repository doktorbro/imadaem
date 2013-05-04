/*! Imadaem v0.1.5 git.io/OF8Q3A */

(function ($) {
    "use strict";

    $.fn.imadaem = function(options) {
        var

            settings = $.extend({
                "dataUrl": "url",
                "timthumbPath": "/timthumb/timthumb.php",
                "verticalRhythm": null
            }, options),

            getNativeLength = function (cssLength) {
                var density = window.devicePixelRatio || 1;
                return Math.round(cssLength * density);
            },

            lineHeight = function (element) {
                var v = parseFloat($(element).css("line-height"));
                return isNaN(v) ? 0 : v;
            },

            adjustVerticalRhythm = function (element, height) {
                if (settings.verticalRhythm === "line-height") {
                    var lh, l;
                    lh = lineHeight(element);
                    if (lh) {
                        l = Math.max(1, Math.round(height / lh));
                        height = lh * l;
                    }
                }
                return height;
            },

            scale = function () {
                var
                    timthumbParams = {},
                    ratio,
                    maxRatio,
                    height,
                    heightGuide,
                    minHeight,
                    width;

                $("img[data-" + settings.dataUrl + "]").each(function () {
                    timthumbParams.src = $(this).data(settings.dataUrl) || "";
                    timthumbParams.a = $(this).data("gravity") || "";
                    ratio = $(this).data("ratio") || 0;
                    heightGuide = $(this).data("height-guide") || "";
                    maxRatio = ratio ? 0 : $(this).data("max-ratio") || 0;

                    width = $(this).innerWidth();
                    height = $(this).innerHeight();

                    if (ratio) {
                        height = Math.round(width / ratio);
                    } else if ($(heightGuide)) {
                        height = $(heightGuide).innerHeight();
                    }

                    if (maxRatio) {
                        minHeight = Math.round(width / maxRatio);
                        height = Math.max(minHeight, height);
                    }

                    height = adjustVerticalRhythm(this, height);

                    // prevent blinking effects
                    $(this).height(height);

                    timthumbParams.w = getNativeLength(width);
                    timthumbParams.h = getNativeLength(height);

                    this.src = settings.timthumbPath + "?" + $.param(timthumbParams);
                });
            };

        $(window).one("load", scale);
        $(window).on("resize", scale);
    };
})(jQuery);
