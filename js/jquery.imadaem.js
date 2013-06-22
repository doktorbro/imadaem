/*! Imadaem v0.2.0 http://imadaem.penibelst.de/ */

(function ($, window) {
    "use strict";

    $.fn.imadaem = function(options) {
        var

            settings = $.extend({
                dataAttribute: "imadaem",
                timthumbPath: "/timthumb/timthumb.php",
                verticalRhythm: null
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

            getData = function (element) {
                var data = $(element).data(settings.dataAttribute);
                if ($.isPlainObject(data)) {
                    // ratio must be a number
                    data.ratio = parseFloat(data.ratio) || 0;
                    // ignore maxRatio if ratio is set
                    data.maxRatio = data.ratio ? 0 : parseFloat(data.maxRatio) || 0;
                    // gravity must be a combination of ["l", "r", "t", "b"]
                    data.gravity = data.gravity ? data.gravity.replace(/[^lrtb]/g, "").substr(0, 2) : "";
                } else {
                    data = {"url": data};
                }
                return data;
            },

            scale = function () {
                var
                    data,
                    timthumbParams,
                    height,
                    minHeight,
                    width;

                $("img[data-" + settings.dataAttribute + "]").each(function () {
                    data = getData(this);

                    width = $(this).innerWidth();
                    height = $(this).innerHeight();

                    if (data.ratio) {
                        height = Math.round(width / data.ratio);
                    } else if ($(data.heightGuide).length) {
                        height = $(data.heightGuide).innerHeight();
                    }

                    if (data.maxRatio) {
                        minHeight = Math.round(width / data.maxRatio);
                        height = Math.max(minHeight, height);
                    }

                    height = adjustVerticalRhythm(this, height);

                    // prevent blinking effects
                    $(this).height(height);

                    timthumbParams = {
                        src: data.url || "",
                        a: data.gravity || "",
                        w: getNativeLength(width),
                        h: getNativeLength(height)
                    };

                    this.src = settings.timthumbPath + "?" + $.param(timthumbParams);
                });
            };

        $(window).one("load", scale);
        $(window).on("resize", scale);
    };
})(jQuery, window);
