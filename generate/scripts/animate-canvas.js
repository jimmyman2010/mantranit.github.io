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

    this.cache = [];
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
    var objectData = [];
    var objectIndex = [];
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

        objectData = [];
        objectIndex = [];
        for (var k = 0; k < data.length; k++) {
            if (data[k].from <= i && i <= data[k].to) {
                objectData[objectData.length] = data[k];
                objectIndex[objectIndex.length] = k;
            }
        }

        //for variable json
        var jsonItem = {
            text: null,
            imageFace: null,
            imageFrame: 'frame_' + that.pad((i + 1), (that.frames.length).toString().length) + '.png'
        };

        image.onload = function(){

            // pre draw image to analyze.
            that.copy.clearRect(0, 0, frameWidth, frameHeight);
            that.copy.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            objectData.forEach(function(object, index){
                //if we have the image need to draw.
                if (object.type === 'image') {

                    var imgSrc = new Image();
                    imgSrc.src = object.src;

                    if(object.fix && that.cache[index] && typeof that.cache[index] === 'object'){
                        holeWidth = that.cache[index].holeWidth;
                        holeHeight = that.cache[index].holeHeight;
                        x = that.cache[index].x;
                        y = that.cache[index].y;
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
                        holeWidth = bound.right - bound.left + object.width;
                        holeHeight = holeWidth * imgSrc.height / imgSrc.width;
                        x = bound.left + (holeWidth / 2) + object.x;
                        y = bound.top + (holeHeight / 2) + object.y;
                    }

                    that.copy.translate(x, y);
                    that.copy.rotate(object.rotate * (Math.PI / 180));
                    that.copy.drawImage(imgSrc, -holeWidth / 2, -holeHeight / 2, holeWidth, holeHeight);

                    that.copy.rotate(-object.rotate * (Math.PI / 180));
                    that.copy.translate(-x, -y);
                    that.copy.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

                    //for variable json
                    var objImage = {};
                    objImage.src = 'face_' + (objectIndex[index] + 1) + '.jpg';
                    objImage.width = holeWidth;
                    objImage.height = holeHeight;
                    objImage.position = x + ',' + y;
                    objImage.opacity = 1;
                    objImage.order = 'back';
                    objImage.rotate = object.rotate;
                    objImage.start = object.from;
                    objImage.end = object.to;
                    objImage.id = (objectIndex[index] + 1);

                    if(jsonItem.imageFace === null){
                        jsonItem.imageFace = [];
                    }

                    jsonItem.imageFace[jsonItem.imageFace.length] = objImage;

                    if(object.fix && i > object.from && i < object.to - 1){
                        that.cache[index] = {};
                        that.cache[index].holeWidth = holeWidth;
                        that.cache[index].holeHeight = holeHeight;
                        that.cache[index].x = x;
                        that.cache[index].y = y;
                    } else {
                        that.cache[index] = false;
                    }

                }

                if (object.type === 'text') {

                    that.copy.font = object.fontSize + 'px/' + object.lineHeight + 'px ' + object.fontFamily;
                    alpha = 1;
                    if (object.fade === 'in') {
                        console.log(i, object.to, object.from);
                        alpha = (i - object.from) + 1 / ((object.to - object.from) + 1);
                    }
                    if (object.fade === 'out') {
                        alpha = 1 - ((i - object.from) + 1 / ((object.to - object.from) + 1));
                    }
                    that.copy.fillStyle = 'rgba(' + object.color.red + ',' + object.color.green + ',' + object.color.blue + ',' + alpha + ')';
                    if (object.gradient) {
                        var gradient = that.copy.createLinearGradient(0, 0, that.c2.width, 0);
                        for (var n = 0; n < object.gradient.length; n++) {
                            gradient.addColorStop(object.gradient[n].point, object.gradient[n].color);
                        }
                        that.copy.fillStyle = gradient;
                    }
                    that.copy.translate(object.x, object.y);
                    that.copy.rotate(object.rotate * (Math.PI / 180));
                    that.copy.fillText(object.src, 0, 0);
                    that.copy.rotate(-object.rotate * (Math.PI / 180));
                    that.copy.translate(-object.x, -object.y);

                    //for variable json
                    var objText = {};
                    objText.text = object.src;
                    objText.font = object.fontFamily;
                    objText.size = object.fontSize;
                    objText.position = object.x + ',' + object.y;
                    objText.opacity = alpha;
                    objText.color = that.rgbToHex(object.color.red, object.color.green, object.color.blue);
                    objText.order = 'front';
                    objText.rotate = object.rotate;
                    objText.lineHeight = object.lineHeight;
                    objText.start = object.from;
                    objText.end = object.to;
                    objText.maxW = object.width;

                    if(jsonItem.text === null){
                        jsonItem.text = [];
                    }
                    jsonItem.text[jsonItem.text.length] = objText;
                }
            });

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
