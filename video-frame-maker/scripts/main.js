/**
 * Created by MinhMan.Tran on 4/10/2017.
 */

$(function(){
    var uploadFrame = $('#upload-frame');
    var loading = $('#loading');
    var source = $('#source');
    var results = $('#results');
    var jsonView = $('#json-view');
    var error = '';

    var index = 0;

    var obj;
    $('#modalCanvas').modal({backdrop: 'static', keyboard: false});

    $('#init-canvas').on('click', function(){
        var width = parseInt($('input[name="canvasWidth"]').val(), 10),
            height = parseInt($('input[name="canvasHeight"]').val(), 10);

        obj = new AnimateCanvas(width, height);

        $('#modalCanvas').modal('hide');
    });


    uploadFrame.on('click', function(){
        var that = $(this);
        that.addClass('processing');
        if ( window.FileReader && window.File && window.FileList && window.Blob ) { } else {
            alert("Your browser do not support read image. Please update the new version.\n");

            that.removeClass('processing');
            return false;
        }

        var inputFrame = document.getElementById('input-frame');

        obj.readFrame('input-frame', {
            noFile: function(){
                alert('Please select your frames.');
                $('#input-frame').trigger('click');
                that.removeClass('processing');
                inputFrame.value = '';
            },
            begin: function(){
                source.empty();
            },
            item: function(index, src, fileName){
                source.append('<span><span class="number">' + index + '</span><img src="' + src + '" alt="' + fileName + '" title="frame_' + index + '" /></span>');
            },
            complete: function(){
                that.removeClass('processing');
                inputFrame.value = '';
                if(error){
                    alert(error);
                }
                $('.nav-tabs .active').removeClass('active');
                $('a[href="#preview"]').parent().addClass('active');

                $('.tab-content .active').removeClass('active').removeClass('in');
                $('#preview').addClass('active in');
            },
            errorFileSize: function(index, fileName){
                error += index + '. File size is larger than 500 KB (' + fileName + ')\n';
            },
            errorFileType: function(index, fileName){
                error += index + '. File type is not the PNG (' + fileName + ')\n';
            }
        });

    });

    $('#process').on('click', function(){
        var that = $(this);
        that.addClass('processing');

        $('#clear').trigger('click');

        if(obj.data.length > 0) {

            obj.createSequence({
                item: function(index, src, json){
                    results.append('<span><span class="number">' + index + '</span><img src="' + src + '" alt="frame_' + index + '" title="frame_' + index + '" /></span>');
                },
                complete: function(json, sequence){

                    jsonView.html(JSON.stringify(json, null, 2));

                    var a = document.getElementById("link");

                    var file = new Blob([JSON.stringify(json, null, 2)], {type: 'application/json;charset=UTF-8'});
                    a.href = URL.createObjectURL(file);
                    a.download = 'myFile.json';

                    $('.button-hide').show();
                    that.removeClass('processing');
                }
            });

        } else {
            alert('No data.');
            that.removeClass('processing');

            $('.nav-tabs .active').removeClass('active');
            $('a[href="#input-json"]').parent().addClass('active');

            $('.tab-content .active').removeClass('active').removeClass('in');
            $('#input-json').addClass('active in');
        }
    });

    $('#clear').on('click', function(){
        results.empty();
        jsonView.empty();
        $('.button-hide').hide();
    });

    $('#ok').on('click', function(){
        var objArray = [];
        $('.data').each(function(){
            objArray.push( toJSONString(this) );
        });

        obj.setData(objArray);

        $('#input-json-view').html(JSON.stringify(objArray, null, 2));

        $('#accordion [data-parent="#accordion"]').attr('aria-expanded', 'false');
        $('#accordion .in').removeClass('in');

        var body = $("html, body");
        body.stop().animate({scrollTop:0}, '500', 'swing', function() {
            $('.nav-tabs .active').removeClass('active');
            $('a[href="#input-json"]').parent().addClass('active');

            $('.tab-content .active').removeClass('active').removeClass('in');
            $('#input-json').addClass('active in');

            $('#clear').trigger('click');
        });
    });

    var width = $('input[name="faceWidth"]'),
        height = $('input[name="faceHeight"]'),
        grid = $('input[name="faceGrid"]'),
        dontAskAgain = $('input[name="dontAskAgain"]');

    $('#add-face').on('click', function(){

        if(dontAskAgain.get(0).checked){

            $('#create-face').trigger('click');

        } else {
            $("#modalFace").modal({backdrop: 'static', keyboard: false});
        }

    });

    $('#cancel-face').on('click', function(){
        dontAskAgain.get(0).checked = false;

        $("#modalFace").modal('hide');
    });

    $('#create-face').on('click', function(){
        index++;

        var template = $($('#template-face').html());
        var id = 'collapse-face-' + index;
        var image = obj.randomFace(parseInt(width.val(), 10), parseInt(height.val(), 10), parseInt(grid.val(), 10));

        template.find('#collapse-face').attr('id', id);
        template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html(index + '. Face');
        template.find('.face img').attr('src', image);
        template.find('.face input[name="src"]').val(image);

        $('#accordion [data-parent="#accordion"]').attr('aria-expanded', 'false');
        $('#accordion .in').removeClass('in');
        $('#accordion').append(template);

        $("#modalFace").modal('hide');
    });

    $('#add-text').on('click', function(){
        var template = $($('#template-text').html());
        var id = 'collapse-text-' + index;
        index++;
        template.find('#collapse-text').attr('id', id);
        template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html(index + '. Text');

        var fontCookieName = localStorage.getItem('fontCookieName') !== null ? JSON.parse(localStorage.getItem('fontCookieName')) : { data: [] };
        for(var i = 0; i < fontCookieName.data.length; i++){
            template.find('.font-family').append('<option>' + fontCookieName.data[i] + '</option>');
        }

        $('#accordion [data-parent="#accordion"]').attr('aria-expanded', 'false');
        $('#accordion .in').removeClass('in');
        $('#accordion').append(template);
    });

    $('#accordion').on('click', '.remove-panel', function(){
        $(this).parents('.panel').remove();
    });


    $('#play').on('click', function(){
        obj.playSequence('canvas', parseInt($('#fps').val(), 10));
    });

    $('#stop').on('click', function(){
        obj.stopSequence();
    });

    $('#import').on('click', function(){
        var input = $('#import-value');
        if(input.val() === '') {
            return false;
        }
        var json = JSON.parse('{"data": ' + input.val() + '}');

        $('#accordion').empty();
        var fontCookieName = localStorage.getItem('fontCookieName') !== null ? JSON.parse(localStorage.getItem('fontCookieName')) : { data: [] };

        var template, id;
        json.data.forEach(function(obj, index){
            if(obj.type === 'image'){
                template = $($('#template-face').html());
                id = 'collapse-face-' + index;

                template.find('#collapse-face').attr('id', id).removeClass('in');
                template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html((index + 1) + '. Face');
                template.find('.face img').attr('src', obj.src);
                template.find('.face input[name="src"]').val(obj.src);

                template.find('input[name="from"]').val(obj.from);
                template.find('input[name="to"]').val(obj.to);
                template.find('input[name="rotate"]').val(obj.rotate);
                template.find('input[name="width"]').val(obj.width);
                template.find('input[name="x"]').val(obj.x);
                template.find('input[name="y"]').val(obj.y);

                template.find('input[name="phpRotate"]').val(obj.phpRotate);
                template.find('input[name="phpWidth"]').val(obj.phpWidth);
                template.find('input[name="phpX"]').val(obj.phpX);
                template.find('input[name="phpY"]').val(obj.phpY);

                if(obj.fix){
                    template.find('input[name="fix"]').prop('checked', 'checked');
                }

                $('#accordion').append(template);
            }

            if(obj.type === 'text'){
                template = $($('#template-text').html());

                for(var i = 0; i < fontCookieName.data.length; i++){
                    template.find('.font-family').append('<option>' + fontCookieName.data[i] + '</option>');
                }
                id = 'collapse-text-' + index;

                template.find('#collapse-text').attr('id', id).removeClass('in');
                template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html((index + 1) + '. Text');

                template.find('input[name="src"]').val(obj.src);

                template.find('input[name="from"]').val(obj.from);
                template.find('input[name="to"]').val(obj.to);
                template.find('input[name="rotate"]').val(obj.rotate);
                template.find('input[name="width"]').val(obj.width);
                template.find('input[name="x"]').val(obj.x);
                template.find('input[name="y"]').val(obj.y);

                template.find('input[name="fontFamily"]').val(obj.fontFamily);
                template.find('select[name="fade"]').val(obj.fade.toString());
                template.find('input[name="fontSize"]').val(obj.fontSize);
                template.find('input[name="lineHeight"]').val(obj.lineHeight);
                template.find('input[name="color[red]"]').val(obj.color.red);
                template.find('input[name="color[green]"]').val(obj.color.green);
                template.find('input[name="color[blue]"]').val(obj.color.blue);
                template.find('input[name="gradient"]').val(obj.gradient);

                $('#accordion').append(template);
            }

        });

        input.val('');

        $('#ok').trigger('click');

        $('#modalImport').modal('hide');
    });

    var fontCookieName = localStorage.getItem('fontCookieName') !== null ? JSON.parse(localStorage.getItem('fontCookieName')) : { data: [] };
    var fontCookieSrc = localStorage.getItem('fontCookieSrc') !== null ? JSON.parse(localStorage.getItem('fontCookieSrc')) : { data: [] };
    for(var i = 0; i < fontCookieName.data.length; i++){
        var strStyle = '<style type="text/css">@font-face {font-family:"' + fontCookieName.data[i] + '";src:' + fontCookieSrc.data[i] + ';font-style:normal;font-weight:normal;}</style>';
        $(strStyle).appendTo('head');
        $('.font-family').append('<option>' + fontCookieName.data[i] + '</option>');
    }

    $('#upload-font').on('click', function(){

        $(this).addClass('processing');
        $('#input-font').trigger('click');
    });

    $('#input-font').on('change', function(){

        var that = this;
        var file, sFileName, sFileExtension, iFileSize, strStyle, fontSrc, fontName, fontCookieSrc, fontCookieName;

        var reader = new FileReader();

        readFile(0);

        function readFile(i) {

            if(i >= that.files.length){

                $('#upload-font').removeClass('processing');
                that.value = '';

                return false;
            }

            file = that.files[i];

            sFileName = file.name;
            sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
            iFileSize = file.size;

            fontName = sFileName.split('.')[0].replace(new RegExp(' ', 'g'), '_').toLowerCase();
            fontCookieName = localStorage.getItem('fontCookieName') !== null ? JSON.parse(localStorage.getItem('fontCookieName')) : { data: [] };
            fontCookieSrc = localStorage.getItem('fontCookieSrc') !== null ? JSON.parse(localStorage.getItem('fontCookieSrc')) : { data: [] };

            if(fontCookieName.data.indexOf(fontName) === -1) {

                if (sFileExtension === "ttf" || sFileExtension === "otf") { /// file type

                    if (iFileSize <= 104857.6) { /// 0.1 mb

                        reader.onloadend = function () {

                            if (sFileExtension === 'otf') {
                                fontSrc = 'url(data:font/opentype;charset=utf-8' + reader.result.replace('data:', '') + ')';
                            }

                            if (sFileExtension === 'ttf') {
                                fontSrc = 'url(data:font/truetype;charset=utf-8' + reader.result.replace('data:', '') + ')';
                            }
                            strStyle = '<style type="text/css">@font-face {font-family:"' + fontName + '";src:' + fontSrc + ';font-style:normal;font-weight:normal;}</style>';
                            $(strStyle).appendTo('head');

                            fontCookieName.data[fontCookieName.data.length] = fontName;
                            fontCookieSrc.data[fontCookieSrc.data.length] = fontSrc;
                            localStorage.setItem('fontCookieName', JSON.stringify(fontCookieName));
                            localStorage.setItem('fontCookieSrc', JSON.stringify(fontCookieSrc));

                            $('.font-family').append('<option>' + fontName + '</option>');

                            readFile(++i);

                        };
                        reader.readAsDataURL(file);

                    } else {

                        readFile(++i);
                    }

                } else {

                    readFile(++i);
                }
            } else {

                readFile(++i);
            }

        }

    });

});

function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if(element.type === 'checkbox') {
            obj[name] = element.checked;
        } else {
            if (name.indexOf('color') >= 0) {
                var c = name.replace('color[', '').replace(']', '');
                if (!obj.color) {
                    obj['color'] = {};
                }
                obj['color'][c] = parseInt(value, 10);
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

    return obj;
}

function setCookie(cname, cvalue, exdays, cpath) {
    var path = cpath || '/';
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + path;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
