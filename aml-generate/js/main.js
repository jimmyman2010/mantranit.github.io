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

    $('select[name="selectContentType"]').on('change', function(){
        if($(this).val() === 'expansion'){
            $('#modalContent .show-expansion').show();
            $('#modalContent .show-no-expansion').hide();
        } else {
            $('#modalContent .show-expansion').hide();
            $('#modalContent .show-no-expansion').show();
        }
    });

    $('#offerAndJoin').summernote({
        minHeight: 200
    });

    $('#bodyMore').summernote({
        minHeight: 100
    });

    $('#hotelHighlight').summernote({
        minHeight: 100
    });

    $('#termAndConditions').summernote({
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
                if(objRow.data[1]) {
                    tplRow.find('.col-md-6:last-child .note').html(objRow.data[1].note);
                }

                tplSection.find('.panel-body--section').append(tplRow);

            });

            sectionHtml.append(tplSection);
        });
    }

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