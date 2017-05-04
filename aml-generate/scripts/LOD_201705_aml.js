(function() {
    'use strict';
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

var aml_od = {
    hash_timeout: 300,
    expanded: '',
    offset_wpt: 160,
    offset_anchor: 122,
    offset_expand_d: 200,
    offset_expand_m: 266,
    current_page: 'lod',
    page_section_scroll: null,
    waypoints_11: null,
    waypoints_12: null,
    waypoints_13: null,
    waypoints_21: null,
    waypoints_22: null,
    waypoints_23: null,
    waypoints_24: null,
    waypoints_25: null,
    init: function() {
        'use strict';
        
        // hash direct link
        var hash = window.location.hash;
        switch (hash) {
            case '#lod':
                aml_od.switch_page_lod();
                TweenLite.to(window, 0.3, {scrollTo:0, autoKill:false});
                Waypoint.refreshAll();
                break;

            case '#tod':
                aml_od.switch_page_tod();
                TweenLite.to(window, 0.3, {scrollTo:0, autoKill:false});
                Waypoint.refreshAll();
                break;

            case '#dining':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#lod-section-1", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#dining-1':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-1-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#dining-2':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-1-2").click();
                }, aml_od.hash_timeout);
                break;
            case '#dining-3':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-1-3").click();
                }, aml_od.hash_timeout);
                break;
            case '#dining-4':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-1-4").click();
                }, aml_od.hash_timeout);
                break;
            case '#dining-5':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-1-5").click();
                }, aml_od.hash_timeout);
                break;

            case '#retail':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#lod-section-2", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#retail-1':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-2-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#retail-2':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-2-2").click();
                }, aml_od.hash_timeout);
                break;
            case '#retail-3':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-2-3").click();
                }, aml_od.hash_timeout);
                break;
            case '#retail-4':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-2-4").click();
                }, aml_od.hash_timeout);
                break;
            case '#retail-5':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-2-5").click();
                }, aml_od.hash_timeout);
                break;

            case '#l-awards':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#lod-section-3", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#l-awards-1':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-3-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#l-awards-2':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-3-2").click();
                }, aml_od.hash_timeout);
                break;
            case '#l-awards-3':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-3-3").click();
                }, aml_od.hash_timeout);
                break;
            case '#l-awards-4':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-3-4").click();
                }, aml_od.hash_timeout);
                break;
            case '#l-awards-5':
                aml_od.switch_page_lod();
                setTimeout(function() {
                    $("#l-offer-3-5").click();
                }, aml_od.hash_timeout);
                break;

            case '#flights':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#tod-section-1", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#flights-1':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-1-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#flights-2':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-1-2").click();
                }, aml_od.hash_timeout);
                break;
            case '#flights-3':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-1-3").click();
                }, aml_od.hash_timeout);
                break;
            case '#flights-4':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-1-4").click();
                }, aml_od.hash_timeout);
                break;
            case '#flights-5':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-1-5").click();
                }, aml_od.hash_timeout);
                break;

            case '#hotels':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#tod-section-2", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#hotels-1':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-2-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#hotels-2':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-2-2").click();
                }, aml_od.hash_timeout);
                break;
            case '#hotels-3':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-2-3").click();
                }, aml_od.hash_timeout);
                break;
            case '#hotels-4':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-2-4").click();
                }, aml_od.hash_timeout);
                break;
            case '#hotels-5':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-2-5").click();
                }, aml_od.hash_timeout);
                break;

            case '#transport':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#tod-section-3", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#transport-1':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-3-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#transport-2':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-3-2").click();
                }, aml_od.hash_timeout);
                break;
            case '#transport-3':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-3-3").click();
                }, aml_od.hash_timeout);
                break;
            case '#transport-4':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-3-4").click();
                }, aml_od.hash_timeout);
                break;
            case '#transport-5':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-3-5").click();
                }, aml_od.hash_timeout);
                break;

            case '#t-leisure':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#tod-section-4", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#t-leisure-1':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-4-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#t-leisure-2':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-4-2").click();
                }, aml_od.hash_timeout);
                break;
            case '#t-leisure-3':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-4-3").click();
                }, aml_od.hash_timeout);
                break;
            case '#t-leisure-4':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-4-4").click();
                }, aml_od.hash_timeout);
                break;
            case '#t-leisure-5':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-4-5").click();
                }, aml_od.hash_timeout);
                break;

            case '#t-awards':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#tod-section-5", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout);
                break;
            case '#t-awards-1':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    $("#t-offer-5-1").click();
                }, aml_od.hash_timeout);
                break;
            case '#t-awards-2':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#t-offer-5-2", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout+1200);
                break;
            case '#t-awards-3':
                aml_od.switch_page_tod();
                setTimeout(function() {
                    TweenMax.to(window, 0.3, {scrollTo:{y: "#t-offer-5-3", offsetY: aml_od.offset_anchor, autoKill:false}});
                }, aml_od.hash_timeout+1200);
                break;
            default:
                aml_od.switch_page_lod();
        }

        aml_od.page_section_scroll = new IScroll('#selector-section-scroll', {eventPassthrough: true, scrollX: true, scrollY: false});

        $("#bk2top").on("click", function(e) {
            e.preventDefault();
            TweenLite.to(window, 0.3, {scrollTo:0, autoKill:false});
            Waypoint.refreshAll();
        });
        
        $(".nav-toggle").each(function(index) {
            $(this).click(function(e) {
                e.preventDefault();
                $(".nav-menu").addClass("show");
            });
        });

        $("h2.nav").find("a").each(function(index) {
            $(this).click(function(e) {
                e.preventDefault();
                $(this).siblings("a").removeClass("active");
                $(this).addClass("active");
                aml_od.switch_page();
            });
        });

        $(".btn-menu-close").each(function(index) {
            $(this).click(function(e) {
                e.preventDefault();
                $(".nav-menu").removeClass("show");
            });
        });

        $(".selector-section").find("a").each(function(index) {
            $(this).click(function(e) {
                e.preventDefault();
                $(".nav-menu").removeClass("show");
                var target = "#" + $(this).data("target");
                TweenMax.to(window, 0.3, {scrollTo:{y: target, offsetY: aml_od.offset_anchor, autoKill:false}});
            });
        });
        
        $(".offer-item").each(function(index) {
            $("#" + $(this).data("desktop")).html($("#" + $(this).data("content")).html());
            $("#" + $(this).data("mobile")).html($("#" + $(this).data("content")).html());

            $(this).on("click", function(e) {
                e.preventDefault();

                $(".offer-item").removeClass("shown");
                $(".offer-detail-desktop.shown").slideUp(200, function() {
                    $(this).removeClass("shown");
                    Waypoint.refreshAll();
                });
                $(".offer-detail-mobile.shown").slideUp(200, function() {
                    $(this).removeClass("shown");
                    Waypoint.refreshAll();
                });

                if ($(this).data('content') == aml_od.expanded) {
                    TweenMax.to(window, 0.3, {scrollTo:{y: this, offsetY: aml_od.offset_anchor, autoKill:false}});
                    aml_od.expanded = '';
                } else {
                    var desktop_target = "#" + $(this).data("desktop"),
                        mobile_target = "#" + $(this).data("mobile");

                    $("#" + $(this).data("desktop")).addClass("shown").slideDown(200, function() {
                        if ($(this).is(":visible")) {
                            TweenMax.to(window, 0.3, {scrollTo:{y: desktop_target, offsetY: aml_od.offset_expand_d, autoKill:false}});
                            Waypoint.refreshAll();
                        }
                    });
                    $("#" + $(this).data("mobile")).addClass("shown").slideDown(200, function() {
                        if ($(this).is(":visible")) {
                            TweenMax.to(window, 0.3, {scrollTo:{y: mobile_target, offsetY: aml_od.offset_expand_m, autoKill:false}});
                            Waypoint.refreshAll();
                        }
                    });

                    $(this).addClass("shown");
                    aml_od.expanded = $(this).data("content");
                }
            });
        });
        
        $(".btn-close").each(function(index) {
            $(this).on("click", function(e) {
                e.preventDefault();
                var scroll_target = "#" + $(this).data("target");
                $(this).parents(".shown").slideUp(200, function() {
                    $(this).removeClass("shown");
                    Waypoint.refreshAll();
                    TweenMax.to(window, 0.3, {scrollTo:{y: scroll_target, offsetY: aml_od.offset_anchor, autoKill:false}});
                    aml_od.expanded = '';
                });
            })
        });
        
        $(".link-tnc").each(function(index) {
            $(this).on("click", function(e) {
                e.preventDefault();
                $(this).parent().siblings(".offer-tnc").slideToggle(200, function() {
                    Waypoint.refreshAll();
                });
            });
        });

        $(".title-offer-hl").each(function(index) {
            $(this).on("click", function(e) {
                e.preventDefault();
                $(this).siblings(".offer-hl").slideToggle(200, function() {
                    Waypoint.refreshAll();
                });
            });
        });

    },
    switch_page: function() {
        Waypoint.destroyAll();
        $("#selector-section-scroll").fadeOut(100, function() {
            var current_page = $("h2.nav").find("a.active").data("type");
            $(".selector-section").find("li[data-page!='" + current_page + "']").hide();
            $(".od_page[data-page!='" + current_page + "']").hide();
            aml_od.current_page = current_page;

            $(".selector-section").find("li[data-page='" + current_page + "']").show();
            $(".od_page[data-page='" + current_page + "']").fadeIn(200, function(){
                aml_od.init_waypoints();
            });
            $("#selector-section-scroll").fadeIn(200, function(){
                if(aml_od.page_section_scroll) {
                    aml_od.page_section_scroll.refresh();
                }
            });
        });
    },
    switch_page_lod: function() {
        $(".tod_page_link").removeClass("active");
        $(".lod_page_link").addClass("active");
        aml_od.switch_page();
        aml_od.set_lang_links('#lod');

    },
    switch_page_tod: function() {
        $(".lod_page_link").removeClass("active");
        $(".tod_page_link").addClass("active");
        aml_od.switch_page();
        aml_od.set_lang_links('#tod');
    },
    set_lang_links: function(hash){
        var currentUrl, tmp;
        $('.lang_links').each(function(){
            currentUrl = $(this).attr('href');
            if(currentUrl.indexOf(hash) >= 0){
                //do nothing
            }
            else {
                tmp = currentUrl.split('#');
                $(this).attr('href', tmp[0] + hash);
            }
        });
    },
    init_waypoints: function() {
        'use strict';
        
        if (aml_od.current_page == 'lod') {
            aml_od.waypoints_11 = $("#lod-section-1").waypoint(function(direction) {
                if (direction === 'down') {
                    $("#content").addClass("scroll");
                    $("#bk2top").addClass("scroll");
                    $("header").addClass("scroll").find(".selector-section").find("a").removeClass("active");
                    $("header").find(".selector-section").find("a").eq(0).addClass("active");
                    setTimeout(function() {
                        $("header").addClass("show");
                    }, 300);
                    window.location.hash = "dining";
                } else {
                    $("header").removeClass("scroll show");
                    $("#content").removeClass("scroll");
                    $("#bk2top").removeClass("scroll");
                    window.location.hash = "lod";
                }
            }, {
              offset: aml_od.offset_wpt
            });

            aml_od.waypoints_12 = $("#lod-section-2").waypoint(function(direction) {
                $("header").find(".selector-section").find("a").removeClass("active");
                if (direction === 'down') {
                    $("header").find(".selector-section").find("a").eq(1).addClass("active");
                    window.location.hash = "retail";
                } else {
                    $("header").find(".selector-section").find("a").eq(0).addClass("active");
                    window.location.hash = "dining";
                }
            }, {
              offset: aml_od.offset_wpt
            });

            aml_od.waypoints_13 = $("#lod-section-3").waypoint(function(direction) {
                $("header").find(".selector-section").find("a").removeClass("active");
                if (direction === 'down') {
                    $("header").find(".selector-section").find("a").eq(2).addClass("active");
                    window.location.hash = "l-awards";
                } else {
                    $("header").find(".selector-section").find("a").eq(1).addClass("active");
                    window.location.hash = "retail";
                }
            }, {
              offset: aml_od.offset_wpt
            });
        } else if (aml_od.current_page == 'tod') {
            aml_od.waypoints_21 = $("#tod-section-1").waypoint(function(direction) {
                if (direction === 'down') {
                    $("#content").addClass("scroll");
                    $("#bk2top").addClass("scroll");
                    $("header").addClass("scroll").find(".selector-section").find("a").removeClass("active");
                    $("header").find(".selector-section").find("a").eq(3).addClass("active");
                    setTimeout(function() {
                        $("header").addClass("show");
                    }, 300);
                    window.location.hash = "flights";
                } else {
                    $("header").removeClass("scroll show");
                    $("#content").removeClass("scroll");
                    $("#bk2top").removeClass("scroll");
                    window.location.hash = "tod";
                }
            }, {
              offset: aml_od.offset_wpt
            });

            aml_od.waypoints_22 = $("#tod-section-2").waypoint(function(direction) {
                $("header").find(".selector-section").find("a").removeClass("active");
                if (direction === 'down') {
                    $("header").find(".selector-section").find("a").eq(4).addClass("active");
                    window.location.hash = "hotels";
                } else {
                    $("header").find(".selector-section").find("a").eq(3).addClass("active");
                    window.location.hash = "flights";
                }
            }, {
              offset: aml_od.offset_wpt
            });

            aml_od.waypoints_23 = $("#tod-section-3").waypoint(function(direction) {
                $("header").find(".selector-section").find("a").removeClass("active");
                if (direction === 'down') {
                    $("header").find(".selector-section").find("a").eq(5).addClass("active");
                    window.location.hash = "transport";
                } else {
                    $("header").find(".selector-section").find("a").eq(4).addClass("active");
                    window.location.hash = "hotels";
                }
            }, {
              offset: aml_od.offset_wpt
            });

            aml_od.waypoints_24 = $("#tod-section-4").waypoint(function(direction) {
                $("header").find(".selector-section").find("a").removeClass("active");
                if (direction === 'down') {
                    $("header").find(".selector-section").find("a").eq(6).addClass("active");
                    window.location.hash = "t-leisure";
                } else {
                    $("header").find(".selector-section").find("a").eq(5).addClass("active");
                    window.location.hash = "transport";
                }
            }, {
              offset: aml_od.offset_wpt
            });

            aml_od.waypoints_25 = $("#tod-section-5").waypoint(function(direction) {
                $("header").find(".selector-section").find("a").removeClass("active");
                if (direction === 'down') {
                    $("header").find(".selector-section").find("a").eq(7).addClass("active");
                    window.location.hash = "t-awards";
                } else {
                    $("header").find(".selector-section").find("a").eq(6).addClass("active");
                    window.location.hash = "t-leisure";
                }
            }, {
              offset: aml_od.offset_wpt
            });
        }
        Waypoint.refreshAll();
    }
};

$(function() {
    $('#content').imagesLoaded( function() {
        aml_od.init();
        setInterval(function () {Waypoint.refreshAll();}, 1000);
    });

    //change the href with hash tag
    $('.tod_page_link').on('click',function(){
        aml_od.set_lang_links('#tod');
        window.location.hash = 'tod';
    });

    $('.lod_page_link').on('click',function(){
        aml_od.set_lang_links('#lod');
        window.location.hash = 'lod';
    });

});

