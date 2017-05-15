/**
 * Created by MinhMan.Tran on 5/11/2017.
 */

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function escapeHtml(str) {
    var html = $('<div>' + str + '</div>');
    return html.text();
}

function process(response){

    console.log(response);

    var head = $('head');
    head.find('title').html(response.title);
    head.find('link[rel="image_src"]').attr('href', response.ogImage);
    head.find('meta[name="title"]').attr('content', response.ogTitle);
    head.find('meta[property="og:title"]').attr('content', response.ogTitle);
    head.find('meta[property="og:image"]').attr('content', response.ogImage);
    head.find('meta[property="og:description"]').attr('content', response.ogDescription);

    console.log(response);

    var logo = $('.logo');
    logo.attr('href', response.logoUrl);
    logo.find('img').attr('src', response.logo).attr('alt', response.logoAlt);

    $('.selector-lang li:nth-child(1) a').attr('href', response.urlEN);
    $('.selector-lang li:nth-child(2) a').attr('href', response.urlTC);
    $('.selector-lang li:nth-child(3) a').attr('href', response.urlSC);




    var selectorSection = $('.selector-section');
    var odExpansions = $('#od_expansions');
    var indexPage = 0;
    $.each(response.pages, function(page, pageObject){

        var pageHtml = $('.od_page[data-page="' + page + '"]'),
            indexPage = 0;

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

                    var nSection = 0;

                    $.each(sectionObject.rows, function(rowIndex, rowObject){

                        $.get('templates/' + rowObject.template, function(html){
                            var rowHtml = $(html);
                            var nFlag = 0;

                            $.each(rowObject.data, function(itemIndex, itemObject){

                                $.get('templates/' + itemObject.template, function(html){

                                    var itemHtml = $(html);
                                    var itemId = page + '-en-box' + pad(++indexPage, 2);
                                    var itemIdDesktop = page + '-d-box-' + (sectionIndex + 1) + '-' + (++nSection);
                                    var itemIdMobile = page + '-m-box-' + (sectionIndex + 1) + '-' + (nSection);
                                    var itemIdContent = page + '-content-' + (sectionIndex + 1) + '-' + (nSection);
                                    var itemIdCta = page + '-cta-' + (sectionIndex + 1) + '-' + (nSection);

                                    var itemBeforeExpansion = itemHtml.find('.offer-item, .offer-item-no-expand');
                                    itemBeforeExpansion.attr('id', itemId)
                                        .attr('data-content', itemIdContent)
                                        .attr('data-mobile', itemIdMobile)
                                        .attr('data-desktop', itemIdDesktop);

                                    itemBeforeExpansion.find('.brand').html(itemObject.brandName);
                                    itemBeforeExpansion.find('h4').html(itemObject.headline);
                                    itemBeforeExpansion.find('p span:nth-child(1)').html(itemObject.leadIn);
                                    itemBeforeExpansion.find('figure img:nth-child(1)')
                                        .attr('src', itemObject.imageDesktop)
                                        .attr('alt', escapeHtml(itemObject.headline))
                                        .attr('title', escapeHtml(itemObject.headline));
                                    if(!itemObject.imageMobile){
                                        itemObject.imageMobile = itemObject.imageDesktop
                                    }
                                    itemBeforeExpansion.find('figure img:nth-child(2)')
                                        .attr('src', itemObject.imageMobile)
                                        .attr('alt', escapeHtml(itemObject.headline))
                                        .attr('title', escapeHtml(itemObject.headline));

                                    // No Expansion
                                    if(itemObject.template === 'contentNoExpansion.html') {
                                        itemBeforeExpansion.find('a').attr('href', itemObject.externalLink).attr('title', escapeHtml(itemObject.headline));
                                    }
                                    if(itemObject.tip){
                                        itemBeforeExpansion.find('h6 span').html(itemObject.tip);
                                    } else {
                                        itemBeforeExpansion.find('h6').remove();
                                    }

                                    // Expansion
                                    var itemAfterExpansion = itemHtml.find('.offer-expansion');
                                    if(itemAfterExpansion.length > 0) {
                                        itemAfterExpansion.attr('id', itemIdContent);
                                        itemAfterExpansion.find('.btn-close').attr('data-target', itemId);
                                        itemAfterExpansion.find('.offer-logo li:first-child a')
                                            .attr('href', itemObject.logoUrl)
                                            .attr('title', escapeHtml(itemObject.brandName));
                                        itemAfterExpansion.find('.offer-logo li:first-child img')
                                            .attr('src', itemObject.logo)
                                            .attr('alt', escapeHtml(itemObject.brandName));
                                        itemAfterExpansion.find('.offer-logo li:last-child').html(itemObject.period);

                                        if (itemObject.gallery && itemObject.gallery.length > 0) {
                                            $.each(itemObject.gallery, function (i, v) {
                                                itemAfterExpansion.find('.offer-gallery').append('<li><img src="' + v + '" alt="' + itemObject.brandName + '" title="' + itemObject.brandName + ' class="img-responsive"/></li>');
                                            });
                                        } else {
                                            itemAfterExpansion.find('.col-md-4.pull-right-md').remove();
                                        }

                                        itemAfterExpansion.find('.col-md-8').prepend(itemObject.offerBody);

                                        itemAfterExpansion.find('.btn-aml')
                                            .html(itemObject.cta)
                                            .attr('href', itemObject.ctaUrl)
                                            .attr('id', itemIdCta);

                                        if(itemObject.tandcUrl){
                                            itemAfterExpansion.find('.link-tnc')
                                                .attr('href', itemObject.tandcUrl)
                                                .addClass('link-tnc-no-expand').removeClass('link-tnc');

                                            itemAfterExpansion.find('.offer-tnc').remove();
                                        } else {
                                            itemAfterExpansion.find('.offer-tnc')
                                                .html(itemObject.tandcBody);
                                        }

                                        if(itemObject.hotelHighlight){
                                            itemAfterExpansion.find('.offer-hl')
                                                .html(itemObject.hotelHighlight);
                                        } else {
                                            itemAfterExpansion.find('.title-offer-hl, .offer-hl, h5.hidden-xs.hidden-sm').remove();
                                            itemAfterExpansion.find('.col-md-8').append(itemObject.extraBody);
                                        }

                                        console.log(itemAfterExpansion.get(0));
                                        odExpansions.append(itemAfterExpansion.get(0));
                                    }

                                    rowHtml.find('.col-xs-12:nth-child(' + (itemIndex + 1) + ')').prepend(itemBeforeExpansion.get(0));
                                    rowHtml.find('.col-xs-12:nth-child(' + (itemIndex + 1) + ') .offer-detail-mobile').attr('id', itemIdMobile);
                                    rowHtml.find('.col-xs-12:nth-child(' + (rowObject.data.length + 1) + ') .offer-detail-desktop:nth-child(' + (itemIndex + 1) + ')').attr('id', itemIdDesktop);

                                    nFlag++;
                                    if(nFlag === rowObject.data.length){
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
}

$(function(){
    var siteDataPreview = localStorage.getItem('siteData');

    if(!siteDataPreview) {
        $.getJSON('data/od_en.json', function (response) {
            process(response);
        });
    } else {
        process(JSON.parse(siteDataPreview));
    }
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