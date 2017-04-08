
/*
 AnimateCanvas
 id: id of canvas
 cW: canvas width
 cH: canvas height
 faceImgSrc: link to uploaded photo
 */

var AnimateCanvas = function(id, cW, cH, data) {
    // main canvas
    var c = document.getElementById(id);
    var ctx = c.getContext('2d');
    /*ctx.globalCompositeOperation = 'destination-over';*/
    c.width = cW;
    c.height = cH;

    // virutal canvas
    var c2 = document.createElement('canvas');
    var copy = c2.getContext('2d');
    c2.width = cW;
    c2.height = cH;
    /*copy.globalCompositeOperation = 'destination-over';*/

    this.cW = cW;
    this.cH = cH;
    this.c = c;
    this.ctx = ctx;
    this.c2 = c2;
    this.copy = copy;
    this.data = data ? data : [];
    this.json = null;
};

AnimateCanvas.prototype.loadImages = function(sources, callback) {
    var images = [];
    var loadedImages = 0;
    var numImages = sources.length;

    for (var k = 0; k < sources.length; k++) {
        images[k] = new Image();
        images[k].src = sources[k];
        images[k].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        }
    }
};

AnimateCanvas.prototype.createSequence = function(images) {
    var sequence = [];
    var bound = {
        left: null,
        top: null,
        bottom: null,
        right: null
    };
    var x, y;
    var that = this;
    var holeHeight, holeWidth;
    var frameWidth = this.cW;
    var frameHeight = this.cH;
    var data = this.data;
    var objectImage = null;
    var objectText = null;
    this.json = [];
    var indexImage = 0;
    var indexText = 0;
    var alpha = 1;

    for (var i = 0; i < images.length; i++) {
        objectImage = null;
        objectText = null;
        for (var k = 0; k < data.length; k++) {
            if(data[k].from <= i && i <= data[k].to){
                if(data[k].type === 'image'){
                    objectImage = data[k];
                    indexImage = k+1;
                }
                if(data[k].type === 'text'){
                    objectText = data[k];
                    indexText++;
                }
            }
        }

        var image = new Image();
        image.src = images[i].src;
        image = document.getElementById('frame' + i);

        //for variable json
        var jsonItem = {
            text: null,
            imageFace: null,
            imageFrame: 'frame_' + i
        };

        // pre draw image to analyze.
        this.copy.clearRect(0, 0, frameWidth, frameHeight);
        this.copy.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

        //if we have the image need to draw.
        if(objectImage !== null) {

            var imgSrc = new Image();
            imgSrc.src = objectImage.src;

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

            that.copy.translate(x, y);
            that.copy.rotate(objectImage.rotate * (Math.PI / 180));
            that.copy.drawImage(imgSrc, -holeWidth / 2, -holeHeight / 2, holeWidth, holeHeight);

            that.copy.rotate(-objectImage.rotate * (Math.PI / 180));
            that.copy.translate(-x, -y);
            that.copy.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            //for variable json
            jsonItem.imageFace = {};
            jsonItem.imageFace.src = 'face_' + indexImage;
            jsonItem.imageFace.width = holeWidth;
            jsonItem.imageFace.height = holeHeight;
            jsonItem.imageFace.position = x + ',' + y;
            jsonItem.imageFace.opacity = 1;
            jsonItem.imageFace.order = 'back';
            jsonItem.imageFace.rotate = objectImage.rotate;
            jsonItem.imageFace.start = objectImage.from;
            jsonItem.imageFace.end = objectImage.to;
            jsonItem.imageFace.id = indexImage;

        }
        if(objectText !== null) {

            this.copy.font = objectText.fontSize + 'px/' + objectText.lineHeight + 'px ' + objectText.fontFamily;
            alpha = 1;
            if(objectText.fade === 'in'){
                alpha = indexText / ((objectText.to - objectText.from) + 1);
            }
            if(objectText.fade === 'out'){
                alpha = 1 - (indexText / ((objectText.to - objectText.from) + 1));
            }
            this.copy.fillStyle = 'rgba(' + objectText.color.red + ',' + objectText.color.green + ',' + objectText.color.blue + ',' + alpha + ')';
            if(objectText.gradient) {
                var gradient = this.copy.createLinearGradient(0, 0, this.c2.width, 0);
                for(var n = 0; n < objectText.gradient.length; n++) {
                    gradient.addColorStop(objectText.gradient[n].point, objectText.gradient[n].color);
                }
                this.copy.fillStyle = gradient;
            }
            this.copy.fillText(objectText.src, objectText.x, objectText.y);

            //for variable json
            jsonItem.text = {};
            jsonItem.text.text = objectText.src;
            jsonItem.text.font = objectText.fontFamily;
            jsonItem.text.size = objectText.fontSize;
            jsonItem.text.position = objectText.x + ',' + objectText.y;
            jsonItem.text.opacity = alpha;
            jsonItem.text.color = this.rgbToHex(objectText.color.red, objectText.color.green, objectText.color.blue);
            jsonItem.text.order = 'front';
            jsonItem.text.rotate = objectText.rotate;
            jsonItem.text.lineHeight = objectText.lineHeight;
            jsonItem.text.start = objectText.from;
            jsonItem.text.end = objectText.to;
            jsonItem.text.maxW = objectText.width;
        }

        //for variable json
        this.json[this.json.length] = jsonItem;

        sequence.push(this.c2.toDataURL("image/jpeg"));
    }

    return sequence;
};

AnimateCanvas.prototype.rgbToHex = function(r, g, b){
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

AnimateCanvas.prototype.exportJSON = function(frames, callback) {
    var that = this;
    if(that.json === null){
        that.loadImages(frames, function(images) {
            that.createSequence(images);
            if(typeof callback === 'function'){
                callback(that.json);
            }
        });
    } else {
        if(typeof callback === 'function'){
            callback(that.json);
        }
    }
};


$(function(){
    var uploadFrame = $('#upload-frame');
    var loading = $('#loading');
    var source = $('#source');
    var jsonView = $('#json-view');
    var errorView = $('#error-view');
    var frames = [];
    var index = 0;
    var WIDTH = 640,
        HEIGHT = 480,

        data = [];

    var obj = new AnimateCanvas('canvas', WIDTH, HEIGHT, data);

    uploadFrame.on('click', function(){
        var that = $(this);
        that.addClass('processing');
        if ( window.FileReader && window.File && window.FileList && window.Blob ) { } else {
            alert("Trình duyệt không hỗ trợ tải ảnh, vui lòng cập nhật phiên bản mới.\n");

            that.removeClass('processing');
            return false;
        }


        var inputFrame = document.getElementById("input-frame");
        if(inputFrame.files.length === 0){
            alert('Please select your frames.');
            $(inputFrame).trigger('click');
            that.removeClass('processing');
            inputFrame.value = '';

            return false;
        }

        var file, sFileName, sFileExtension, iFileSize;

        var tempImg = new Image();
        var reader = new FileReader();
        frames = [];
        source.empty();

        for (var i = 0; i < inputFrame.files.length; i++) {
            file = inputFrame.files[i];

            (function(file, i, inputFrame, tempImg, reader) {
                sFileName = file.name;
                sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                iFileSize = file.size;

                if ((sFileExtension === "jpg" ||
                    sFileExtension === "png" ||
                    sFileExtension === "jpeg")) { /// file type

                    if (iFileSize <= 524288) { /// 0.5 mb

                        reader = new FileReader();
                        reader.onloadend = function () {
                            tempImg = new Image();
                            tempImg.src = reader.result;
                            tempImg.id = 'frame' + i;
                            tempImg.alt = 'frame' + i;
                            tempImg.title = 'frame' + i;

                            source.append(tempImg);

                            //push to frames
                            frames[i] = tempImg.src;

                            // check hide loading
                            if(i === inputFrame.files.length-1){
                                that.removeClass('processing');
                                inputFrame.value = '';
                            }
                        };
                        reader.readAsDataURL(file);

                    } else {
                        errorView.append('<p>Dung lượng quá 500 KB (' + sFileName + ' - ' + i + ')</p>');

                        // check hide loading
                        if(i === inputFrame.files.length-1){
                            setTimeout(function(){
                                that.removeClass('processing');
                                inputFrame.value = '';
                            }, 10000);
                        }
                    }

                } else {
                    errorView.append('<p>Định dạng không đúng (' + sFileName + ' - ' + i + ')</p>');

                    // check hide loading
                    if(i === inputFrame.files.length-1){
                        setTimeout(function(){
                            that.removeClass('processing');
                            inputFrame.value = '';
                        }, 10000);
                    }
                }

            })(file, i, inputFrame, tempImg, reader);
        }

    });

    $('#process').on('click', function(){
        var that = $(this);
        that.addClass('processing');

        obj.loadImages(frames, function(images) {
            var imagesCombined = obj.createSequence(images);

            $.each(imagesCombined, function(i, e){
                $('#results').append('<img src="' + e + '" alt="frame' + i + '" title="frame' + i + '" />');
            });

            jsonView.html(JSON.stringify(obj.json, null, 2));

            var a = document.getElementById("link");
            obj.exportJSON(frames, function(json){
                var file = new Blob([JSON.stringify(json, null, 2)], {type: 'application/json;charset=UTF-8'});
                a.href = URL.createObjectURL(file);
                a.download = 'myFile.json';

                a.style.display = 'inline-block';
                that.removeClass('processing');
            });
        });
    });

    $('#clear').on('click', function(){
        source.empty();
        jsonView.empty();
        $('#link').hide();
    });

    $('#sort').on('click', function(){
        var that = $(this);
        that.addClass('processing');

        sortUsingNestedText(source, "img");

        that.removeClass('processing');
    });

    $('#ok').on('click', function(){
        var objArray = [];
        $('.data').each(function(){
            objArray.push( toJSONString(this) );
        });

        $('#input-json-view').html(JSON.stringify(objArray, null, 2));
        data = objArray;
    });

    $('#add-face').on('click', function(){
        index++;

        var template = $($('#template-face').html());
        var id = 'collapse-face-' + index;
        var image = 'images/' + getRandomInt(1,7) + '.png';

        template.find('#collapse-face').attr('id', id);
        template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html(index + '. Face');
        template.find('.face img').attr('src', image);
        template.find('.face input[name="src"]').val(image);

        $('#accordion').append(template);
    });

    $('#add-text').on('click', function(){
        var template = $($('#template-text').html());
        var id = 'collapse-text-' + index;
        index++;
        template.find('#collapse-text').attr('id', id);
        template.find('a[data-toggle="collapse"]').attr('href', '#' + id).html(index + '. Text');

        $('#accordion').append(template);
    });

    $('#accordion').on('click', '.remove-panel', function(){
        $(this).parents('.panel').remove();
    });

});

function sortUsingNestedText(parent, childSelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = parseInt($(a).attr('id').replace('frame', ''), 10);
        var vB = parseInt($(b).attr('id').replace('frame', ''), 10);
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    parent.append(items);
}

function toJSONString( form ) {
    var obj = {};
    var elements = form.querySelectorAll( "input, select, textarea" );
    for( var i = 0; i < elements.length; ++i ) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if( name ) {
            if(name.indexOf('color') >= 0){
                var c = name.replace('color[', '').replace(']', '');
                if(!obj.color) {
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}