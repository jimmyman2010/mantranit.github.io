/**
 * Created by MinhMan.Tran on 5/3/2017.
 */

$(function(){
    var siteData;
    var source = $('#source');
    $('#one-column').on('click', function(){
        $.get('templates/moduleContentOne.html', function(result){
            source.append(result);
        });
    });

    $('#two-columns').on('click', function(){
        $.get('templates/moduleContentTwo.html', function(result){
            source.append(result);
        });
    });

    source.on('click', '.add-content', function(){
        var that = $(this),
            papa = that.parent();

        $('#modalContent').modal('show');
    });

    $('.summernote').summernote({
        minHeight: 200
    });

    $('#ok').on('click', function(){
        localStorage.setItem('siteData', JSON.stringify(siteData));
    });

    $('#fill').on('click', function(){
        if(!siteData){
            $.getJSON('data/od_en.json', function(response){
                fillData(response);
            });
        } else {
            fillData(JSON.parse(siteData));
        }
    });

    function fillData(response){

        $('#formMain input[name="title"]').val(response.title);

        $('#formMain input[name="logo"]').val(response.logo);
        $('#formMain input[name="logoUrl"]').val(response.logoUrl);
        $('#formMain input[name="logoAlt"]').val(response.logoAlt);

        $('#formMain input[name="urlEN"]').val(response.urlEN);
        $('#formMain input[name="urlTC"]').val(response.urlTC);
        $('#formMain input[name="urlSC"]').val(response.urlSC);

        $('#formMain input[name="ogTitle"]').val(response.ogTitle);
        $('#formMain input[name="ogImage"]').val(response.ogImage);
        $('#formMain input[name="ogDescription"]').val(response.ogDescription);

        $('#formMain input[name="od"]').val(response.od);
        $('#formMain input[name="odAlt"]').val(response.odAlt);
        $('#formMain input[name="defaultPage"]').val(response.defaultPage);

        $('#formMain input[name="kv"]').val(response.pages[response.defaultPage].kv);
        $('#formMain input[name="kvAlt"]').val(response.pages[response.defaultPage].kvAlt);
        $('#formMain input[name="intro"]').val(response.pages[response.defaultPage].intro);

        $('#formMain input[name="beforeQr"]').val(response.pages[response.defaultPage].beforeQr);
        $('#formMain input[name="qrCode"]').val(response.pages[response.defaultPage].qrCode);
        $('#formMain input[name="afterQr"]').val(response.pages[response.defaultPage].afterQr);

        var sectionHtml = $('#section-html');
        $.each(response.pages[response.defaultPage].sections, function(idxSection, objSection){
            var tplSection = $($('#section').html());
            tplSection.find('input[name="name"]').val(objSection.name);
            tplSection.find('input[name="prefix"]').val(objSection.prefix);
            tplSection.find('input[name="id"]').val(objSection.id);
            tplSection.find('input[name="hash"]').val(objSection.hash);

            $.each(objSection.rows, function(idxRow, objRow){

                var tplRow = $($('#row-1').html());
                if(objRow.template === 'moduleContentTwo.html'){
                    tplRow = $($('#row-2').html());
                }
                tplRow.find('.col-md-6:first-child .note, .col-md-12 .note').html(objRow.data[0].note);
                tplRow.find('.col-md-6:first-child .data-item, .col-md-12 .data-item').val(JSON.stringify(objRow.data[0]));
                if(objRow.data[1]) {
                    tplRow.find('.col-md-6:last-child .note').html(objRow.data[1].note);
                    tplRow.find('.col-md-6:last-child .data-item').val(JSON.stringify(objRow.data[1]));
                }

                tplSection.find('.panel-body--section').append(tplRow);

            });

            sectionHtml.append(tplSection);
        });
    }

    $('#modalContent select[name="template"]').on('change', function(){
        if($(this).val() === 'contentExpansion.html'){
            $('#modalContent .show-expansion').show();
            $('#modalContent .show-no-expansion').hide();
        } else {
            $('#modalContent .show-expansion').hide();
            $('#modalContent .show-no-expansion').show();
        }
    });

    $('#design').on('click', '.edit-item', function(){
        var itemObject = JSON.parse($(this).siblings('.data-item').val());
        console.log(itemObject);

        var modal = $('#modalContent');

        modal.find('[name="template"]').val(itemObject.template).trigger('change');
        modal.find('[name="note"]').val(itemObject.note);
        modal.find('[name="brandName"]').val(itemObject.brandName);
        modal.find('[name="headline"]').val(itemObject.headline);
        modal.find('[name="imageDesktop"]').val(itemObject.imageDesktop);
        modal.find('[name="imageMobile"]').val(itemObject.imageMobile);
        modal.find('[name="leadIn"]').val(itemObject.leadIn);
        modal.find('[name="tip"]').val(itemObject.tip);
        modal.find('[name="externalLink"]').val(itemObject.externalLink);

        if(!itemObject.externalLink) {

            if (itemObject.gallery[0]) {
                modal.find('[name="image1"]').val(itemObject.gallery[0]);
            }
            if (itemObject.gallery[1]) {
                modal.find('[name="image2"]').val(itemObject.gallery[1]);
            }
            if (itemObject.gallery[2]) {
                modal.find('[name="image3"]').val(itemObject.gallery[2]);
            }

            modal.find('[name="logo"]').val(itemObject.logo);
            modal.find('[name="logoUrl"]').val(itemObject.logoUrl);

            modal.find('[name="cta"]').val(itemObject.cta);
            modal.find('[name="ctaUrl"]').val(itemObject.ctaUrl);

            modal.find('[name="tandcUrl"]').val(itemObject.tandcUrl);

            $('#period').summernote('code', itemObject.period);
            $('#offerBody').summernote('code', itemObject.offerBody);
            $('#extraBody').summernote('code', itemObject.extraBody);
            $('#hotelHighlight').summernote('code', itemObject.hotelHighlight);
            $('#tandcBody').summernote('code', itemObject.tandcBody);
        }

        $('#modalContent').modal('show');
    });

});

function slugify(text)
{
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}