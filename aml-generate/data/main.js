/**
 * Created by MinhMan.Tran on 5/11/2017.
 */

$(function(){
    $.getJSON('data/od_en.json', function(response){
        console.log(response);
        var head = $('head');
        head.find('title').html(response.title);
        head.find('link[rel="image_src"]').attr('href', response.ogImage);
        head.find('meta[name="title"]').attr('content', response.ogTitle);
        head.find('meta[property="og:title"]').attr('content', response.ogTitle);
        head.find('meta[property="og:image"]').attr('content', response.ogImage);
        head.find('meta[property="og:description"]').attr('content', response.ogDescription);

        var logo = $('.logo');
        logo.attr('href', response.logoUrl);
        logo.find('img').attr('src', response.logo).attr('alt', response.logoAlt);

        var lang = $('.selector-lang');
        $.each(response.url, function(idx, obj){
            lang.append('<li><a href="' + obj.url + '" class="lang_links">' + obj.txt + '</a></li>');
        });




        var selectorSection = $('.selector-section');
        $.each(response.pages, function(page, pageObject){

            var pageHtml = $('.od_page[data-page="' + page + '"]');

            $.get('templates/pageKV.html', function(html){
                var kvHtml = $(html);
                kvHtml.find('img').attr('src', pageObject.kv).attr('alt', pageObject.kvAlt).attr('title', pageObject.kvAlt);
                kvHtml.find('h3').html(pageObject.intro);
                kvHtml.appendTo(pageHtml);

                $.each(pageObject.sections, function(sectionIndex, sectionObject){
                    var id = page + '-section-' + (sectionIndex + 1);
                    selectorSection.append('<li data-page="' + page + '"><a href="#' + sectionObject.hash + '" data-target="' + id + '">' + sectionObject.name + '</a></li>');

                    $.get('templates/section.html', function(html){
                        var sectionHtml = $(html);
                        sectionHtml.attr('id', sectionObject.id);
                        sectionHtml.find('.col-xs-12').attr('id', id);
                        sectionHtml.find('.title-separator').html('<span><div class="circle-earn">' + sectionObject.prefix + '</div> ' + sectionObject.name + '</span>');

                        $.each(sectionObject.rows, function(rowIndex, rowObject){

                            $.get('templates/' + rowObject.template, function(html){
                                var rowHtml = $(html);

                                rowHtml.find('div:nth-child(1)');
                                console.log(rowHtml.get(0));
                            });

                        });

                        sectionHtml.appendTo(pageHtml);
                    });
                });
            });
        });

    });
});








$('#selector-section-scroll').show();

$(window).on('load scroll', function(){
    lazyLoad();
});
function lazyLoad() {
    var top = $(window).scrollTop(),
        height = $(window).height();


    $('.offer-item-image img').each(function(){
        var that = $(this),
            papa = that.parent();

        if(that.is(':visible') && that.data('src') && (that.offset().top <= (top + height + 100))) {
            if (papa.hasClass('loaded') || papa.hasClass('loading')) {
                //do nothing
            } else {
                (function() {
                    var img = new Image();
                    img.onload = function () {
                        that.attr('src', img.src);
                        papa.removeClass('loading').addClass('loaded');
                    };
                    img.src = that.data('src');
                    papa.addClass('loading');
                })();
            }
        }
    });

}