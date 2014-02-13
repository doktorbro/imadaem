/*! Imadaem v0.4.0 http://imadaem.penibelst.de/ */

(function ($, window) {
    "use strict";

    $.fn.imadaem = function(options) {
        var
            $elements = this,

            settings = $.extend({
                dataAttribute: "imadaem",
                timthumbPath: "/timthumb/timthumb.php",
                verticalRhythm: null,
                windowEvents: "resize orientationchange"
            }, options),

            getNativeLength = function (cssLength) {
                var density = window.devicePixelRatio || 1;
                return Math.round(cssLength * density);
            },

            lineHeight = function ($element) {
                var lh = parseFloat($element.css("line-height"));
                return isNaN(lh) ? 0 : lh;
            },

            adjustVerticalRhythm = function ($element, height) {
                if (settings.verticalRhythm === "line-height") {
                    var lh, l;
                    lh = lineHeight($element);
                    if (lh) {
                        l = Math.max(1, Math.round(height / lh));
                        height = lh * l;
                    }
                }
                return height;
            },

            getData = function ($element) {
                var data = $element.data(settings.dataAttribute);

                if ($.isPlainObject(data)) {
                    // ratio must be a number
                    data.ratio = parseFloat(data.ratio) || 0;
                    // ignore maxRatio if ratio is set
                    data.maxRatio = data.ratio ? 0 : parseFloat(data.maxRatio) || 0;
                    // gravity must be a combination of ["l", "r", "t", "b"]
                    data.gravity = data.gravity ? data.gravity.replace(/[^lrtb]/g, "").substr(0, 2) : "";
                } else {
                    data = {url: data};
                }

                return $.extend({
                    url: "",
                    gravity: "",
                    ratio: 0,
                    maxRatio: 0,
                    heightGuide: ""
                }, data);
            },

            setSrc = function ($element, newSrc) {
                var
                    oldSrc = $element.attr("src"),
                    errors = 0;

                $element
                    .on("error", function() {
                        // fall back to the previous src once
                        if (!errors) {
                            errors += 1;
                            $(this).attr("src", oldSrc);
                        }
                    })
                    .attr("src", newSrc);
            },

            scale = function () {
                var
                    $this,
                    data,
                    timthumbParams,
                    height,
                    minHeight,
                    width;

                $elements.each(function () {
                    $this = $(this);

                    data = getData($this);
                    if (!data.url) {
                        return;
                    }

                    width = $this.innerWidth();
                    height = $this.innerHeight();

                    if (data.ratio) {
                        height = Math.round(width / data.ratio);
                    } else if ($(data.heightGuide).length) {
                        height = $(data.heightGuide).innerHeight();
                    }

                    if (data.maxRatio) {
                        minHeight = Math.round(width / data.maxRatio);
                        height = Math.max(minHeight, height);
                    }

                    height = adjustVerticalRhythm($this, height);

                    // prevent blinking effects
                    $this.height(height);

                    timthumbParams = {
                        src: data.url || "",
                        a: data.gravity || "",
                        w: getNativeLength(width),
                        h: getNativeLength(height)
                    };

                    setSrc($this, settings.timthumbPath + "?" + $.param(timthumbParams));
                });
            };

        $(window)
            .one("load", scale)
            .on(settings.windowEvents, scale);

        return this;
    };
})(jQuery, window);
