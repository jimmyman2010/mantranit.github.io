/**
 * Created by MinhMan.Tran on 5/11/2017.
 */

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function escapeHtml(str) {
    console.log(str);
    var html = $('<div>' + str + '</div>');
    return html.text();
}

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
        var index = 0;
        $.each(response.pages, function(page, pageObject){

            var pageHtml = $('.od_page[data-page="' + page + '"]'),
            index = 0;

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
                                var n = 0;

                                $.each(rowObject.data, function(itemIndex, itemObject){

                                    $.get('templates/' + itemObject.template, function(html){

                                        var itemHtml = $(html);
                                        var itemId = page + '-en-box' + pad(++index, 2);
                                        var itemDesktop = page + '-d-box-' + (rowIndex + 1) + '-' + (itemIndex + 1);
                                        var itemMobile = page + '-m-box-' + (rowIndex + 1) + '-' + (itemIndex + 1);
                                        var itemContent = page + '-content-' + (rowIndex + 1) + '-' + (itemIndex + 1);

                                        itemHtml.find('.offer-item, .offer-item-no-expand').attr('id', itemId)
                                            .attr('data-content', itemContent)
                                            .attr('data-mobile', itemMobile)
                                            .attr('data-desktop', itemDesktop);

                                        itemHtml.find('.brand').html(itemObject.brandName);
                                        itemHtml.find('h4').html(itemObject.headline);
                                        itemHtml.find('p span:nth-child(1)').html(itemObject.leadIn);
                                        itemHtml.find('figure img:nth-child(1)')
                                            .attr('src', itemObject.imageDesktop)
                                            .attr('alt', escapeHtml(itemObject.headline))
                                            .attr('title', escapeHtml(itemObject.headline));
                                        if(!itemObject.imageMobile){
                                            itemObject.imageMobile = itemObject.imageDesktop
                                        }
                                        itemHtml.find('figure img:nth-child(2)')
                                            .attr('src', itemObject.imageMobile)
                                            .attr('alt', escapeHtml(itemObject.headline))
                                            .attr('title', escapeHtml(itemObject.headline));

                                        // No Expansion
                                        if(itemObject.externalLink) {
                                            itemHtml.find('a').attr('href', itemObject.externalLink).attr('title', escapeHtml(itemObject.headline));
                                        }
                                        if(itemObject.tip){
                                            itemHtml.find('h6 span').html(itemObject.tip);
                                        } else {
                                            itemHtml.find('h6').remove();
                                        }

                                        // Expansion



                                        rowHtml.find('.col-xs-12:nth-child(' + (itemIndex + 1) + ')').prepend(itemHtml.find('.offer-item, .offer-item-no-expand').get(0));
                                        rowHtml.find('.col-xs-12:nth-child(' + (itemIndex + 1) + ') .offer-detail-mobile').attr('id', itemMobile);
                                        rowHtml.find('.col-xs-12:nth-child(' + (rowObject.data.length + 1) + ') .offer-detail-desktop:nth-child(' + (itemIndex + 1) + ')').attr('id', itemDesktop);

                                        n++;
                                        if(n === rowObject.data.length){
                                            sectionHtml.append(rowHtml.get(0).innerHTML);
                                        }
                                    });

                                });

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