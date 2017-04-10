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
                callbacks.complete(that.json, that.sequence);
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
