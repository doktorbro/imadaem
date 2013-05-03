/*! Imadaem v0.1.4 — Daemon for Responsive Images with Timthumb as Zepto Plugin http://git.io/AOys5A © 2013 by Anatol Broder under the MIT License */

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
                    url,
                    gravity,
                    ratio,
                    maxRatio,
                    height,
                    heightGuide,
                    minHeight,
                    width;

                $("img[data-" + settings.dataUrl + "]").each(function () {
                    url = $(this).data(settings.dataUrl) || "";
                    gravity = $(this).data("gravity") || "";
                    ratio = $(this).data("ratio") || 0;
                    heightGuide = $(this).data("height-guide") || "";
                    maxRatio = ratio ? 0 : $(this).data("max-ratio") || 0;

                    // offsetWidth can be less than clientWidth in chromium
                    width = Math.min(this.clientWidth, this.offsetWidth);
                    height =  Math.min(this.clientHeight, this.offsetHeight);

                    if (ratio) {
                        height = Math.round(width / ratio);
                    } else if ($(heightGuide)) {
                        height = $(heightGuide).height();
                    }

                    if (maxRatio) {
                        minHeight = Math.round(width / maxRatio);
                        height = Math.max(minHeight, height);
                    }

                    height = adjustVerticalRhythm(this, height);

                    // prevent blinking effects
                    $(this).height(height);

                    width = getNativeLength(width);
                    height = getNativeLength(height);

                    this.src = settings.timthumbPath + "?" + $.param({
                        "src": url,
                        "w": width,
                        "h": height,
                        "a": gravity
                    });
                });
            };

        $(window).one("load", scale);
        $(window).on("resize", scale);
    };
})(Zepto);
