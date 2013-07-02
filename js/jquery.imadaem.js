/*! Imadaem v0.4.0 http://imadaem.penibelst.de/ */

(function ($, window) {
    "use strict";

    $.fn.imadaem = function(options) {
        var
            $elements = this,

            settings = $.extend({
                dataAttribute: "imadaem",
                overflowFixed: "hidden",
                timthumbPath: "/timthumb/timthumb.php",
                windowEvents: "resize orientationchange"
            }, options),

            getNativeLength = function (cssLength) {
                var density = window.devicePixelRatio || 1;
                return Math.round(cssLength * density);
            },

            getData = function ($element) {
                var data = $element.data(settings.dataAttribute);

                if ($.isPlainObject(data)) {
                    // gravity must be a combination of ["l", "r", "t", "b"]
                    data.gravity = data.gravity ? data.gravity.replace(/[^lrtb]/g, "").substr(0, 2) : "";
                } else {
                    // data attribute contains the url string
                    data = {url: data};
                }

                return data;
            },

            getStyle = function ($element) {
                return {
                    width: getNativeLength($element.innerWidth()),
                    height: getNativeLength($element.innerHeight()),
                    widthIsFixed: $element.css("overflow-x") === settings.overflowFixed,
                    heightIsFixed: $element.css("overflow-y") === settings.overflowFixed
                };
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

            buildTimthumbUrl = function (resizeParameters) {
                var
                    timthumbParameters = {
                        src: resizeParameters.url,
                        a: resizeParameters.gravity,
                        w: (resizeParameters.heightIsFixed && !resizeParameters.widthIsFixed) ? 0 : resizeParameters.width,
                        h: (resizeParameters.widthIsFixed && !resizeParameters.heightIsFixed) ? 0 : resizeParameters.height,
                        // zoom_crop
                        // 1: fill out, 3: fill in
                        zc: (resizeParameters.widthIsFixed || resizeParameters.heightIsFixed) ? 1 : 3
                    };

                return settings.timthumbPath + "?" + $.param(timthumbParameters);
            },

            resize = function () {
                var
                    $this,
                    resizeParameters;

                $elements.each(function () {
                    $this = $(this);

                    resizeParameters = $.extend(
                        {
                            url: "",
                            gravity: "",
                            width: 0,
                            height: 0,
                            widthIsFixed: false,
                            heightIsFixed: false
                        },
                        // from HTML
                        getData($this),
                        // from CSS and window
                        getStyle($this)
                    );

                    if (!resizeParameters.url) {
                        return;
                    }

                    setSrc($this, buildTimthumbUrl(resizeParameters));
                });
            };

        $(window)
            .one("load", resize)
            .on(settings.windowEvents, resize);

        return this;
    };
})(jQuery, window);
