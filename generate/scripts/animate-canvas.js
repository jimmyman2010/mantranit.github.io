/*
 AnimateCanvas
 id: id of canvas
 cW: canvas width
 cH: canvas height
 data: link to uploaded photo
 */
var AnimateCanvas = function(cW, cH) {

    var c2 = document.createElement('canvas');
    var copy = c2.getContext('2d');
    c2.width = cW;
    c2.height = cH;

    this.cW = cW;
    this.cH = cH;
    this.c2 = c2;
    this.copy = copy;
    this.data = [];
    this.json = [];
    this.frames = [];
    this.sequence = [];
    this.pause = false;
    this.currentPlay = 0;
    this.timer = false;

    this.cacheX = -1;
    this.cacheY = -1;
    this.cacheHoleWidth = 0;
    this.cacheHoleHeight = 0;
};

AnimateCanvas.prototype.extend = function(defaults, options){
    if(typeof options === 'object') {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                defaults[key] = options[key];
            }
        }
    }
    return defaults;
};

AnimateCanvas.prototype.setData = function(data){
    this.data = data;
};

AnimateCanvas.prototype.setFrame = function(selector){
    var that = this;

    if(selector) {
        that.frames = [];
        document.querySelectorAll(selector).forEach(function (image) {
            that.frames[that.frames.length] = image.src;
        });
    }
};

AnimateCanvas.prototype.requestTimeout = function (fn, delay) {
    var requestAnimFrame = (function () {
            return window.requestAnimationFrame || function (callback, element) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })(),
        start = new Date().getTime(),
        handle = {};
    function loop() {
        var current = new Date().getTime(),
            delta = current - start;
        if (delta >= delay) {
            fn.call();
        } else {
            handle.value = requestAnimFrame(loop);
        }
    }
    handle.value = requestAnimFrame(loop);
    return handle;
};

AnimateCanvas.prototype.clearRequestTimeout = function (handle) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(handle.value);
    } else {
        window.clearTimeout(handle);
    }

};

AnimateCanvas.prototype.play = function(id, framesPerSecond){
    var that = this;

    var canvas = document.getElementById(id);
    canvas.width = that.cW;
    canvas.height = that.cH;

    var context = canvas.getContext("2d"),
        frameWidth = that.cW,
        frameHeight = that.cH;
    var image = new Image();
    var fps = framesPerSecond || 24;

    if(that.pause){
        that.pause = false;
        that.currentPlay--;
    } else {
        that.currentPlay = 0;
    }

    if(that.timer) {
        that.clearRequestTimeout(that.timer);
    }
    that.timer = that.requestTimeout(loopImage, 0);

    function loopImage(){

        if(that.currentPlay >= that.sequence.length) {
            return false;
        }

        image.onload = function() {

            //context.clearRect(0, 0, frameWidth, frameHeight);
            context.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            that.timer = that.requestTimeout(loopImage, 1000/fps);

        };
        image.src = that.sequence[that.currentPlay];
        that.currentPlay++;
    }
};

AnimateCanvas.prototype.stop = function(){
    if(this.timer){
        this.clearRequestTimeout(this.timer);
        this.pause = true;
    }
};

AnimateCanvas.prototype.readFrame = function(input, options){
    var that = this;

    var inputFrame = document.getElementById(input);
    var callbacks = that.extend({
        noFile: function(){},
        begin: function(){},
        item: function(index, src, fileName){},
        complete: function(){},
        errorFileType: function(index, fileName){},
        errorFileSize: function(index, fileName){}
    }, options);

    if(inputFrame.files.length === 0){
        if(typeof callbacks.noFile === 'function'){
            callbacks.noFile();
        }
        return false;
    }
    var file, sFileName, sFileExtension, iFileSize;

    var reader = new FileReader();
    that.frames = [];

    if(typeof callbacks.begin === 'function'){
        callbacks.begin();
    }

    readFile(0);

    function readFile(i) {

        if(i >= inputFrame.files.length){

            if(typeof callbacks.complete === 'function'){
                callbacks.complete();
            }

            return false;
        }

        file = inputFrame.files[i];

        sFileName = file.name;
        sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
        iFileSize = file.size;

        if (sFileExtension === "png") { /// file type

            if (iFileSize <= 524288) { /// 0.5 mb

                reader.onloadend = function () {

                    if(typeof callbacks.item === 'function'){
                        callbacks.item(i, reader.result, sFileName);
                    }

                    //push to frames
                    that.frames[that.frames.length] = reader.result;

                    readFile(++i);

                };
                reader.readAsDataURL(file);

            } else {
                if(typeof callbacks.errorFileSize === 'function'){
                    callbacks.errorFileSize(i, sFileName);
                }
                readFile(++i);
            }

        } else {
            if(typeof callbacks.errorFileType === 'function'){
                callbacks.errorFileType(i, sFileName);
            }
            readFile(++i);
        }

    }
};

AnimateCanvas.prototype.pad = function(num, size) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
};

AnimateCanvas.prototype.createSequence = function(options) {
    var that = this;

    var callbacks = that.extend({
        name: 0,
        begin: function(){},
        item: function(index, src, json){},
        complete: function(json){}
    }, options);

    var bound = {
        left: null,
        top: null,
        bottom: null,
        right: null
    };
    var x, y;
    var holeHeight, holeWidth;
    var frameWidth = that.cW;
    var frameHeight = that.cH;
    var data = that.data;
    var objectImage = null;
    var objectText = null;
    var indexImage = 0;
    var indexText = 0;
    var alpha = 1;
    that.json = [];
    that.sequence = [];

    var image = new Image();

    if(typeof callbacks.begin === 'function'){
        callbacks.begin();
    }

    loopFile(0);

    function loopFile(i){

        if(i >= that.frames.length) {
            if(typeof callbacks.complete === 'function'){
                callbacks.complete(that.json);
            }
            return false;
        }

        objectImage = null;
        objectText = null;
        for (var k = 0; k < data.length; k++) {
            if (data[k].from <= i && i <= data[k].to) {
                if (data[k].type === 'image') {
                    objectImage = data[k];
                    indexImage = k + 1;
                }
                if (data[k].type === 'text') {
                    objectText = data[k];
                    indexText++;
                }
            }
        }

        image.onload = function(){

            //for variable json
            var jsonItem = {
                text: null,
                imageFace: null,
                imageFrame: 'frame_' + that.pad((i + 1), (that.frames.length).toString().length) + '.png'
            };

            // pre draw image to analyze.
            that.copy.clearRect(0, 0, frameWidth, frameHeight);
            that.copy.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            //if we have the image need to draw.
            if (objectImage !== null) {

                var imgSrc = new Image();
                imgSrc.src = objectImage.src;

                if(objectImage.fix && that.cacheX >= 0 && that.cacheY >= 0){
                    holeWidth = that.cacheHoleWidth;
                    holeHeight = that.cacheHoleHeight;
                    x = that.cacheX;
                    y = that.cacheY;
                } else {
                    var pixels = that.copy.getImageData(0, 0, frameWidth, frameHeight);
                    var l = pixels.data.length;

                    bound = {
                        left: null,
                        top: null,
                        bottom: null,
                        right: null
                    };

                    for (var j = 0; j < l; j += 4) {
                        if (pixels.data[j + 3] == 0) {
                            x = (j / 4) % frameWidth;
                            y = ~~((j / 4) / frameWidth);

                            if (bound.top === null) {
                                bound.top = y;
                            }

                            if (bound.left === null) {
                                bound.left = x;
                            } else if (x < bound.left) {
                                bound.left = x;
                            }

                            if (bound.right === null) {
                                bound.right = x;
                            } else if (bound.right < x) {
                                bound.right = x;
                            }

                            if (bound.bottom === null) {
                                bound.bottom = y;
                            } else if (bound.bottom < y) {
                                bound.bottom = y;
                            }
                        }
                    }

                    // set area to draw
                    holeWidth = bound.right - bound.left + objectImage.width;
                    holeHeight = holeWidth * imgSrc.height / imgSrc.width;
                    x = bound.left + (holeWidth / 2) + objectImage.x;
                    y = bound.top + (holeHeight / 2) + objectImage.y;
                }

                that.copy.translate(x, y);
                that.copy.rotate(objectImage.rotate * (Math.PI / 180));
                that.copy.drawImage(imgSrc, -holeWidth / 2, -holeHeight / 2, holeWidth, holeHeight);

                that.copy.rotate(-objectImage.rotate * (Math.PI / 180));
                that.copy.translate(-x, -y);
                that.copy.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

                //for variable json
                jsonItem.imageFace = {};
                jsonItem.imageFace.src = 'face_' + indexImage + '.jpg';
                jsonItem.imageFace.width = holeWidth;
                jsonItem.imageFace.height = holeHeight;
                jsonItem.imageFace.position = x + ',' + y;
                jsonItem.imageFace.opacity = 1;
                jsonItem.imageFace.order = 'back';
                jsonItem.imageFace.rotate = objectImage.rotate;
                jsonItem.imageFace.start = objectImage.from;
                jsonItem.imageFace.end = objectImage.to;
                jsonItem.imageFace.id = indexImage;

                if(objectImage.fix && i > objectImage.from && i < objectImage.to - 1){
                    that.cacheHoleWidth = holeWidth;
                    that.cacheHoleHeight = holeHeight;
                    that.cacheX = x;
                    that.cacheY = y;
                } else {
                    that.cacheHoleWidth = 0;
                    that.cacheHoleHeight = 0;
                    that.cacheX = -1;
                    that.cacheY = -1;
                }

            }
            if (objectText !== null) {

                that.copy.font = objectText.fontSize + 'px/' + objectText.lineHeight + 'px ' + objectText.fontFamily;
                alpha = 1;
                if (objectText.fade === 'in') {
                    alpha = indexText / ((objectText.to - objectText.from) + 1);
                }
                if (objectText.fade === 'out') {
                    alpha = 1 - (indexText / ((objectText.to - objectText.from) + 1));
                }
                that.copy.fillStyle = 'rgba(' + objectText.color.red + ',' + objectText.color.green + ',' + objectText.color.blue + ',' + alpha + ')';
                if (objectText.gradient) {
                    var gradient = that.copy.createLinearGradient(0, 0, that.c2.width, 0);
                    for (var n = 0; n < objectText.gradient.length; n++) {
                        gradient.addColorStop(objectText.gradient[n].point, objectText.gradient[n].color);
                    }
                    that.copy.fillStyle = gradient;
                }
                that.copy.translate(objectText.x, objectText.y);
                that.copy.rotate(objectText.rotate * (Math.PI / 180));
                that.copy.fillText(objectText.src, 0, 0);
                that.copy.rotate(-objectText.rotate * (Math.PI / 180));
                that.copy.translate(-objectText.x, -objectText.y);

                //for variable json
                jsonItem.text = {};
                jsonItem.text.text = objectText.src;
                jsonItem.text.font = objectText.fontFamily;
                jsonItem.text.size = objectText.fontSize;
                jsonItem.text.position = objectText.x + ',' + objectText.y;
                jsonItem.text.opacity = alpha;
                jsonItem.text.color = that.rgbToHex(objectText.color.red, objectText.color.green, objectText.color.blue);
                jsonItem.text.order = 'front';
                jsonItem.text.rotate = objectText.rotate;
                jsonItem.text.lineHeight = objectText.lineHeight;
                jsonItem.text.start = objectText.from;
                jsonItem.text.end = objectText.to;
                jsonItem.text.maxW = objectText.width;
            }

            //for variable json
            that.json[that.json.length] = jsonItem;

            that.sequence[that.sequence.length] = that.c2.toDataURL("image/jpeg");

            if(typeof callbacks.item === 'function'){
                callbacks.item(i, that.c2.toDataURL("image/jpeg"), jsonItem);
            }

            loopFile(++i);
        };

        image.src = that.frames[i];
    }

};

AnimateCanvas.prototype.rgbToHex = function(r, g, b){
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

AnimateCanvas.prototype.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

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
            alert("Trình duyệt không hỗ trợ tải ảnh, vui lòng cập nhật phiên bản mới.\n");

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
                complete: function(json){

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
