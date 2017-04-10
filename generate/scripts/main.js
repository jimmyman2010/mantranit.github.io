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
    var WIDTH = 640,
        HEIGHT = 480;

    var obj = new AnimateCanvas(WIDTH, HEIGHT);

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

        var body = $("html, body");
        body.stop().animate({scrollTop:0}, '500', 'swing', function() {
            $('.nav-tabs .active').removeClass('active');
            $('a[href="#input-json"]').parent().addClass('active');

            $('.tab-content .active').removeClass('active').removeClass('in');
            $('#input-json').addClass('active in');

            $('#clear').trigger('click');
        });
    });

    $('#add-face').on('click', function(){
        index++;

        var template = $($('#template-face').html());
        var id = 'collapse-face-' + index;
        var image = 'images/' + obj.getRandomInt(1,7) + '.png';

        template.find('#collapse-face').attr('id', id);
        template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html(index + '. Face');
        template.find('.face img').attr('src', image);
        template.find('.face input[name="src"]').val(image);

        $('#accordion [data-parent="#accordion"]').attr('aria-expanded', 'false');
        $('#accordion .in').removeClass('in');
        $('#accordion').append(template);
    });

    $('#add-text').on('click', function(){
        var template = $($('#template-text').html());
        var id = 'collapse-text-' + index;
        index++;
        template.find('#collapse-text').attr('id', id);
        template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html(index + '. Text');

        $('#accordion [data-parent="#accordion"]').attr('aria-expanded', 'false');
        $('#accordion .in').removeClass('in');
        $('#accordion').append(template);
    });

    $('#accordion').on('click', '.remove-panel', function(){
        $(this).parents('.panel').remove();
    });


    $('#play').on('click', function(){
        obj.play('canvas', parseInt($('#fps').val(), 10));
    });

    $('#stop').on('click', function(){
        obj.stop();
    });

    $('#import').on('click', function(){
        var json = JSON.parse('{"data": ' + $('#import-value').val() + '}');

        json.data.forEach(function(obj, index){
            if(obj.type === 'image'){

            }
        });
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
