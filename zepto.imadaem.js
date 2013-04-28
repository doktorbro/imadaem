/*!
 * Imadaem — Daemon for Adaptive Images with Timthumb as Zepto Plugin
 * https://github.com/penibelst/imadaem-zepto
 * 
 * Copyright 2013 Anatol Broder
 * Released under the MIT license
 *
 * Dependencies
 *   – Zepto
 *     http://zeptojs.com/
 *   – Timthumb
 *     http://code.google.com/p/timthumb/
 * 
 * Version 0.1.0
 */

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

            adjustVerticalRhythm = function (element) {
                if (settings.verticalRhythm === "line-height") {
                    var lh, l;
                    lh = lineHeight(element);
                    if (lh) {
                        l = Math.max(1, Math.round($(element).height() / lh));
                        $(element).height(lh * l);
                    }
                }
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

                    if (ratio) {
                        $(this).height(Math.round($(this).width() / ratio));
                    } else if ($(heightGuide)) {
                        $(this).height($(heightGuide).height());
                    }

                    if (maxRatio) {
                        minHeight = Math.round($(this).width() / maxRatio);
                        $(this).height(Math.max(minHeight, $(this).height()));
                    }

                    adjustVerticalRhythm(this);

                    width = getNativeLength($(this).width());
                    height = getNativeLength($(this).height());

                    this.src = settings.timthumbPath +
                        "?src=" + encodeURIComponent(url) +
                        "&w=" + width +
                        "&h=" + height +
                        "&a=" + gravity;
                });
            };

        $(window).one("load", scale);
        $(window).on("resize", scale);
    };
})(Zepto);
