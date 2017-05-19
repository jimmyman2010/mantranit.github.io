/**
 * Created by MinhMan.Tran on 5/3/2017.
 */

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

$(function(){

    var urlVars = getUrlVars();

    if(urlVars.length > 0 && urlVars['data']){

        var d = new Date();
        var url = 'data/' + urlVars['data'] + '?time=' + d.getTime();
        $.getJSON(url, function (response) {

            $('#section-html').empty();

            fillData(response);
        });
    }

    $('#selectData').on('change', function(){
        var url = $(this).val();
        if(url) {
            var d = new Date();
            window.open('/aml-generate/?data=' + url + '&t=' + d.getTime());
        }
    });

    function fillData(response){

        $('#formMain [name="fileName"]').val(response.fileName);
        $('#formMain [name="title"]').val(response.title);

        $('#formMain [name="gaKey"]').val(response.gaKey);
        $('#formMain [name="toTop"]').val(response.toTop);
        $('#formMain [name="fileJs"]').val(response.fileJs);

        $('#formMain [name="facebookImage"]').val(response.facebookImage);
        $('#formMain [name="weiboImage"]').val(response.weiboImage);
        $('#formMain [name="wechatImage"]').val(response.wechatImage);

        $('#formMain [name="logo"]').val(response.logo);
        $('#formMain [name="logoUrl"]').val(response.logoUrl);
        $('#formMain [name="logoAlt"]').val(response.logoAlt);

        $('#formMain [name="urlEN"]').val(response.urlEN);
        $('#formMain [name="urlTC"]').val(response.urlTC);
        $('#formMain [name="urlSC"]').val(response.urlSC);

        $('#formMain [name="ogTitle"]').val(response.ogTitle);
        $('#formMain [name="ogImage"]').val(response.ogImage);
        $('#formMain [name="ogDescription"]').val(response.ogDescription);

        $('#formMain [name="od"]').val(response.od);
        $('#formMain [name="odAlt"]').val(response.odAlt);
        $('#formMain [name="defaultPage"]').val(response.defaultPage);
        $('#formMain [name="defaultIcon"]').val(response.defaultIcon);

        $('#formMain [name="defaultImage"]').val(response.pages[response.defaultPage].defaultImage);

        $('#formMain [name="kvDesktop"]').val(response.pages[response.defaultPage].kvDesktop);
        $('#formMain [name="kvMobile"]').val(response.pages[response.defaultPage].kvMobile);
        $('#formMain [name="kvAlt"]').val(response.pages[response.defaultPage].kvAlt);
        $('#formMain [name="intro"]').val(response.pages[response.defaultPage].intro);

        $('#formMain [name="beforeQr"]').val(response.pages[response.defaultPage].beforeQr);
        $('#formMain [name="qrCode"]').val(response.pages[response.defaultPage].qrCode);
        $('#formMain [name="afterQr"]').val(response.pages[response.defaultPage].afterQr);

        var sectionHtml = $('#section-html');
        $.each(response.pages[response.defaultPage].sections, function(idxSection, objSection){
            var tplSection = $($('#section').html());
            tplSection.find('[name="name"]').val(objSection.name);
            tplSection.find('[name="prefix"]').val(objSection.prefix);
            tplSection.find('[name="id"]').val(objSection.id);
            tplSection.find('[name="hash"]').val(objSection.hash);

            $.each(objSection.rows, function(idxRow, objRow){

                var tplRow = $($('#row-1').html());
                if(objRow.template === 'moduleContentTwo'){
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

        initSortable();
    }

    $('#modalContent select[name="template"]').on('change', function(){
        if($(this).val() !== 'contentNoExpansion'){
            $('#modalContent .show-expansion').show();
            $('#modalContent .show-no-expansion').hide();
        } else {
            $('#modalContent .show-expansion').hide();
            $('#modalContent .show-no-expansion').show();
        }
    });

    $('#design').on('click', '.edit-item-general', function(){
        var dataStore = $(this).siblings('.data-item');

        $('#design .data-item').removeClass('current');
        dataStore.addClass('current');

        var modal = $('#modalContentGeneral');
        modal.find('.modal-title span').empty();
        document.getElementById('form-item-general').reset();

        if(dataStore.val()) {
            var itemObject = JSON.parse(dataStore.val());
            if(itemObject.hasOwnProperty('note')){
                modal.find('.modal-title span').html(itemObject.note);
            }

            modal.find('[name="template"]').val(itemObject.template).trigger('change');
            modal.find('[name="note"]').val(itemObject.note);
            modal.find('[name="brandName"]').val(itemObject.brandName);
            modal.find('[name="headline"]').val(itemObject.headline);
            modal.find('[name="imageDesktop"]').val(itemObject.imageDesktop);
            modal.find('[name="imageMobile"]').val(itemObject.imageMobile);
            modal.find('[name="leadIn"]').val(itemObject.leadIn);
            modal.find('[name="tip"]').val(itemObject.tip);
            modal.find('[name="externalLink"]').val(itemObject.externalLink);

            modal.find('[name="cta"]').val(itemObject.cta);
            modal.find('[name="ctaUrl"]').val(itemObject.ctaUrl);
        }

        modal.modal('show');
    });

    $('#input-json-general').on('click', function(){

        var itemObject = toJSONString(document.getElementById('form-item-general'));

        var curHtml = $('#design .data-item.current');

        var currentObject = curHtml.val() ? JSON.parse(curHtml.val()) : {};

        curHtml.siblings('.note').html(itemObject.note);

        curHtml.val(JSON.stringify($.extend(currentObject, itemObject))).removeClass('current');

        $('#modalContentGeneral').modal('hide');
    });




    $('#design').on('click', '.edit-item-logo', function(){
        var dataStore = $(this).siblings('.data-item');

        $('#design .data-item').removeClass('current');
        dataStore.addClass('current');

        var modal = $('#modalContentLogo');
        modal.find('.modal-title span').empty();
        document.getElementById('form-item-logo').reset();

        if(dataStore.val()) {
            var itemObject = JSON.parse(dataStore.val());
            if(itemObject.hasOwnProperty('note')){
                modal.find('.modal-title span').html(itemObject.note);
            }

            var i;
            for(i = 0; i < 3; i++){
                if (itemObject.period && itemObject.period[i]) {
                    modal.find('[name="periodName' + i + '"]').val(itemObject.period[i].name);
                    modal.find('[name="periodValue' + i + '"]').val(itemObject.period[i].value);
                }
            }
            $('#period').val(itemObject.period);

            for(i = 0; i < 3; i++) {
                if (itemObject.gallery && itemObject.gallery[i]) {
                    modal.find('[name="galleryImage' + i + '"]').val(itemObject.gallery[i].src);
                    modal.find('[name="galleryAlt' + i + '"]').val(itemObject.gallery[i].alt);
                }
            }

            modal.find('[name="logo"]').val(itemObject.logo);
            modal.find('[name="logoUrl"]').val(itemObject.logoUrl);
        }

        modal.modal('show');
    });

    $('#input-json-logo').on('click', function(){

        var itemObject = toJSONString(document.getElementById('form-item-logo'));

        var curHtml = $('#design .data-item.current');

        var currentObject = curHtml.val() ? JSON.parse(curHtml.val()) : {};

        curHtml.val(JSON.stringify($.extend(currentObject, itemObject))).removeClass('current');

        $('#modalContentLogo').modal('hide');
    });

    $('.summernote').ckeditor();

    $('#design').on('click', '.edit-item-offer', function(){
        var dataStore = $(this).siblings('.data-item');

        $('#design .data-item').removeClass('current');
        dataStore.addClass('current');

        var modal = $('#modalContentOffer');
        modal.find('.modal-title span').empty();

        if(dataStore.val()) {
            var itemObject = JSON.parse(dataStore.val());
            if(itemObject.hasOwnProperty('note')){
                modal.find('.modal-title span').html(itemObject.note);
            }

            $('#offerBody').val(itemObject.offerBody);
            if(itemObject.offerText){
                $('#offerText').prop('checked', true);
            } else {
                $('#offerText').prop('checked', false);
            }
        }

        modal.modal('show');
    });

    $('#input-json-offer').on('click', function(){

        var curHtml = $('#design .data-item.current');

        var currentObject = curHtml.val() ? JSON.parse(curHtml.val()) : {};

        curHtml.val(JSON.stringify($.extend(currentObject, {
            offerText: $('#offerText').get(0).checked,
            offerBody: $('#offerBody').val()
        }))).removeClass('current');

        $('#offerBody').val('');

        $('#modalContentOffer').modal('hide');
    });



    $('#design').on('click', '.edit-item-tandc', function(){
        var dataStore = $(this).siblings('.data-item');

        $('#design .data-item').removeClass('current');
        dataStore.addClass('current');

        var modal = $('#modalContentTandc');
        modal.find('.modal-title span').empty();

        if(dataStore.val()) {
            var itemObject = JSON.parse(dataStore.val());
            if(itemObject.hasOwnProperty('note')){
                modal.find('.modal-title span').html(itemObject.note);
            }

            $('#tandcUrl').val(itemObject.tandcUrl);
            $('#tandcBody').val(itemObject.tandcBody);
        }

        modal.modal('show');
    });

    $('#input-json-tandc').on('click', function(){

        var curHtml = $('#design .data-item.current');

        var currentObject = curHtml.val() ? JSON.parse(curHtml.val()) : {};

        curHtml.val(JSON.stringify($.extend(currentObject, {
            tandcUrl: $('#tandcUrl').val(),
            tandcBody: $('#tandcBody').val()
        }))).removeClass('current');

        $('#tandcUrl').val('');
        $('#tandcBody').val('');

        $('#modalContentTandc').modal('hide');
    });




    $('#design').on('click', '.edit-item-other', function(){
        var dataStore = $(this).siblings('.data-item');

        $('#design .data-item').removeClass('current');
        dataStore.addClass('current');

        var modal = $('#modalContentOther');
        modal.find('.modal-title span').empty();

        if(dataStore.val()) {
            var itemObject = JSON.parse(dataStore.val());
            if(itemObject.hasOwnProperty('note')){
                modal.find('.modal-title span').html(itemObject.note);
            }

            $('#extraBody').val(itemObject.extraBody);
            $('#hotelHighlight').val(itemObject.hotelHighlight);
        }

        modal.modal('show');
    });

    $('#input-json-other').on('click', function(){

        var curHtml = $('#design .data-item.current');

        var currentObject = curHtml.val() ? JSON.parse(curHtml.val()) : {};

        curHtml.val(JSON.stringify($.extend(currentObject, {
            extraBody: $('#extraBody').val(),
            hotelHighlight: $('#hotelHighlight').val()
        }))).removeClass('current');

        $('#extraBody').val('');
        $('#hotelHighlight').val('');

        $('#modalContentOther').modal('hide');
    });


    $('#add-section').on('click', function(){

        var sectionHtml = $('#section-html');

        var tplSection = $($('#section').html());

        sectionHtml.append(tplSection);

        initSortable();
    });

    $('#design').on('click', '.delete-section', function(){
        if(confirm('Are you sure you want to delete this section?') == true) {
            $(this).parents('.type-section').remove();
        }
    });

    $('#design').on('click', '.delete-row', function(){
        if(confirm('Are you sure you want to delete this row?') == true) {
            $(this).parents('.type-row').remove();
        }
    });

    $('#design').on('click', '.add-row-2', function(){
        var tplRow = $($('#row-2').html());

        $(this).parents('.type-section').find('.panel-body--section').append(tplRow);

        initSortable();
    });

    $('#design').on('click', '.add-row-1', function(){
        var tplRow = $($('#row-1').html());

        $(this).parents('.type-section').find('.panel-body--section').append(tplRow);

        initSortable();
    });

    $('#design').on('click', '.toggle-button', function(){
        $(this).parent().toggleClass('toggle-close');
    });

    $('#ok').on('click', function(){

        var siteData = toJSONString(document.getElementById('formMain'));

        console.log(siteData);

        siteData.pages[siteData.defaultPage]['sections'] = [];

        $('#section-html .formSection').each(function(iS, eS){

            var sectionData = toJSONString(eS);

            $(eS).find('.type-row').each(function(iR, eR){

                var itemHtml = $(eR).find('.data-item');
                var rowObject = {
                    template: 'moduleContentOne'
                };
                if(itemHtml.length == 2){
                    rowObject.template = 'moduleContentTwo';
                }
                itemHtml.each(function(iA, eA){
                    if(!rowObject.data){
                        rowObject.data = [];
                    }

                    rowObject.data[rowObject.data.length] = JSON.parse($(eA).val());
                });

                if(!sectionData.rows){
                    sectionData.rows = [];
                }
                sectionData.rows[sectionData.rows.length] = rowObject;
            });

            siteData.pages[siteData.defaultPage]['sections'][siteData.pages[siteData.defaultPage]['sections'].length] = sectionData;
        });

        // Send the request
        $.post('save.php', {"data": JSON.stringify(siteData)}, function(response) {
            if(response.data) {
                var d = new Date();
                window.open('/aml-generate/?data=' + response.data + '&t=' + d.getTime());
            } else {
                alert('No data');
            }
        }, 'json');

    });

    var main = $('#previewMain'),
        other = $('#previewOther');
    $('#preview').on('click', function(){

        if(main.val() && other.val()) {
            var d = new Date();
            window.open('od_' + $('#previewLang').val() + '.php?main=' + main.val() + '&other=' + other.val() + '&t=' + d.getTime());
            $('#modalPreview').modal('hide');
        } else {
            alert('Please select data.');
        }
    });

    main.on('change', function(){
        var value = $(this).val();
        if(value){
            var page = value.substr(0, 2);
            other.find('option').each(function(i,e){
                if($(this).html().indexOf(page) === 0){
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
            other.removeAttr('disabled');
        } else {
            other.val('').attr('disabled', 'disabled');
        }
    });

    function initSortable() {
        $('#section-html').sortable({
            handle: ".type-section > .panel-heading"
        });
        $('.panel-body--section').sortable({
            handle: " > .panel-heading"
        });
    }


    $(document).bind('keydown', 'ctrl+s', function(event){

        var modal = $('.modal.in');
        if(modal.length > 0) {
            modal.each(function () {
                $(this).find('.modal-footer button').trigger('click');
            });
        } else {

            $('#ok').trigger('click');

        }


        event.preventDefault();
        return false;
    });

    $('body *').bind('keydown', 'ctrl+s', function(event){

        var modal = $('.modal.in');
        if(modal.length > 0) {
            modal.each(function () {
                $(this).find('.modal-footer button').trigger('click');
            });
        } else {

            $('#ok').trigger('click');

        }

        event.preventDefault();
        return false;
    });

});


function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if(name && name !== 'files') {
            if(element.type === 'checkbox') {
                obj[name] = element.checked;
            } else {

                var od = ['defaultImage', 'kvDesktop', 'kvMobile', 'kvAlt', 'intro', 'beforeQr', 'qrCode', 'afterQr'];

                if(od.indexOf(name) >= 0){
                    if(!obj.pages){
                        obj.pages = {};
                    }
                    if(!obj.pages[obj.defaultPage]){
                        obj.pages[obj.defaultPage] = {};
                    }
                    obj.pages[obj.defaultPage][name] = value;
                } else if (name.indexOf('galleryImage') >= 0) {

                    if (!obj.gallery) {
                        obj['gallery'] = [];
                    }
                    if (value) {
                        if (typeof obj['gallery'][parseInt(name[name.length - 1], 10)] !== 'object') {
                            obj['gallery'][parseInt(name[name.length - 1], 10)] = {};
                        }
                        obj['gallery'][parseInt(name[name.length - 1], 10)]['src'] = value;
                        obj['gallery'][parseInt(name[name.length - 1], 10)]['alt'] = '';
                    }
                } else if (name.indexOf('galleryAlt') >= 0) {
                    if (value) {
                        obj['gallery'][parseInt(name[name.length - 1], 10)]['alt'] = value;
                    }
                } else if (name.indexOf('periodName') >= 0) {

                    if (!obj.period) {
                        obj['period'] = [];
                    }
                    if (value) {
                        if (typeof obj['period'][parseInt(name[name.length - 1], 10)] !== 'object') {
                            obj['period'][parseInt(name[name.length - 1], 10)] = {};
                        }
                        obj['period'][parseInt(name[name.length - 1], 10)]['name'] = value;
                        obj['period'][parseInt(name[name.length - 1], 10)]['value'] = '';
                    }

                } else if (name.indexOf('periodValue') >= 0) {
                    if (value) {
                        obj['period'][parseInt(name[name.length - 1], 10)]['value'] = value;
                    }
                } else {
                    obj[name] = value;
                    if (value && !isNaN(value)) {
                        obj[name] = parseInt(value, 10);
                    }
                    if (value && value === 'false') {
                        obj[name] = false;
                    }
                }
            }
        }
    }

    return obj;
}

