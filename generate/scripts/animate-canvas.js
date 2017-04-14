/**
 * AnimateCanvas
 * @param cW canvas width
 * @param cH canvas height
 * @param data array of object
 * @param frames array of image source
 * @constructor
 */
var AnimateCanvas = function(cW, cH, data, frames) {

    var c2 = document.createElement('canvas');
    var copy = c2.getContext('2d');
    c2.width = cW;
    c2.height = cH;

    this.cW = cW;
    this.cH = cH;
    this.c2 = c2;
    this.copy = copy;

    this.data = data || [];
    this.frames = frames || [];
    this.json = [];
    this.sequence = [];

    this.player = {
        pause: false,
        current: 0,
        timer: false
    };

    this.cache = [];
};

/**
 * combine object
 * @param settings
 * @param options
 * @returns {*}
 */
AnimateCanvas.prototype.extend = function(settings, options){
    if(typeof options === 'object') {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                settings[key] = options[key];
            }
        }
    }
    return settings;
};

AnimateCanvas.prototype.setData = function(data){
    this.data = data;
};

/**
 * @param selector as css selector
 */
AnimateCanvas.prototype.setFrame = function(selector){
    var that = this;

    if(selector) {
        that.frames = [];
        document.querySelectorAll(selector).forEach(function (image) {
            that.frames[that.frames.length] = image.src;
        });
    }
};

/**
 * former setTimeout
 * @param fn
 * @param delay
 * @returns {{}}
 */
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

/**
 * former clearTimeout
 * @param handle
 */
AnimateCanvas.prototype.clearRequestTimeout = function (handle) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(handle.value);
    } else {
        window.clearTimeout(handle);
    }

};

/**
 * @param id of canvas element
 * @param framesPerSecond
 * @param options object of callback functions
 */
AnimateCanvas.prototype.playSequence = function(id, framesPerSecond, options){
    var that = this;

    var settings = that.extend({
        fps: framesPerSecond || 24,
        begin: function(player){},
        buffering: function(player){},
        playing: function(player){},
        complete: function(player){}
    }, options);

    var canvas = document.getElementById(id);
    canvas.width = that.cW;
    canvas.height = that.cH;

    var context = canvas.getContext("2d"),
        frameWidth = that.cW,
        frameHeight = that.cH;
    var image = new Image();

    if(that.player.pause){
        that.player.pause = false;
        that.player.current--;
    } else {
        that.player.current = 0;
    }

    if(that.player.timer) {
        that.clearRequestTimeout(that.player.timer);
    }

    if(typeof settings.begin === 'function'){
        settings.begin();
    }
    that.player.timer = that.requestTimeout(loopImage, 0);

    function loopImage(){

        if(that.player.current >= that.sequence.length) {
            if(typeof settings.complete === 'function'){
                settings.complete(that.player);
            }
            return false;
        }

        image.onload = function() {

            //context.clearRect(0, 0, frameWidth, frameHeight);

            if(typeof settings.playing === 'function'){
                settings.playing(that.player);
            }
            context.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            that.player.timer = that.requestTimeout(loopImage, 1000/settings.fps);

        };
        image.src = that.sequence[that.player.current];

        if(typeof settings.buffering === 'function'){
            settings.buffering(that.player);
        }
        that.player.current++;
    }

};

AnimateCanvas.prototype.stopSequence = function(callback){
    if(this.player.timer){
        this.clearRequestTimeout(this.player.timer);
        this.player.pause = true;

        if(typeof callback === 'function'){
            callback(this.player);
        }
    }
};

/**
 * @param input id of input file
 * @param options object of callback functions
 * @returns {boolean}
 */
AnimateCanvas.prototype.readFrame = function(input, options){
    var that = this;

    var inputFrame = document.getElementById(input);
    var settings = that.extend({
        noFile: function(){},
        begin: function(){},
        item: function(index, src, fileName){},
        complete: function(){},
        errorFileType: function(index, fileName){},
        errorFileSize: function(index, fileName){}
    }, options);

    if(inputFrame.files.length === 0){
        if(typeof settings.noFile === 'function'){
            settings.noFile();
        }
        return false;
    }
    var file, sFileName, sFileExtension, iFileSize;

    var reader = new FileReader();
    that.frames = [];

    if(typeof settings.begin === 'function'){
        settings.begin();
    }

    readFile(0);

    function readFile(i) {

        if(i >= inputFrame.files.length){

            if(typeof settings.complete === 'function'){
                settings.complete();
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

                    if(typeof settings.item === 'function'){
                        settings.item(i, reader.result, sFileName);
                    }

                    //push to frames
                    that.frames[that.frames.length] = reader.result;

                    readFile(++i);

                };
                reader.readAsDataURL(file);

            } else {
                if(typeof settings.errorFileSize === 'function'){
                    settings.errorFileSize(i, sFileName);
                }
                readFile(++i);
            }

        } else {
            if(typeof settings.errorFileType === 'function'){
                settings.errorFileType(i, sFileName);
            }
            readFile(++i);
        }

    }
};

/**
 * add leading zero for the number
 * @param num
 * @param size
 * @returns {string}
 */
AnimateCanvas.prototype.pad = function(num, size) {
    var s = num.toString();
    while (s.length < size) s = '0' + s;
    return s;
};

AnimateCanvas.prototype.createSequence = function(options) {
    var that = this;

    var settings = that.extend({
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
    var objTmp = {};
    var alpha = 1;
    var bcX, bcY, abX, abY, acX, acY, ahX, ahY, addX, addY;
    var pixels, n, j, k, imgSrc, gradient;
    that.json = [];
    that.sequence = [];

    var image = new Image();

    if(typeof settings.begin === 'function'){
        settings.begin();
    }

    loopFile(0);

    function loopFile(i){

        if(i >= that.frames.length) {
            if(typeof settings.complete === 'function'){
                settings.complete(that.json, that.sequence);
            }
            return false;
        }

        objectData = [];
        objectIndex = [];
        for (k = 0; k < data.length; k++) {
            if (data[k].from <= i && i <= data[k].to) {
                objectData[objectData.length] = data[k];
                objectIndex[objectIndex.length] = k;
            }
        }

        //for variable json
        var jsonItem = {
            text: null,
            imageFace: null,
            //imageFrame: 'frame_' + that.pad((i + 1), (that.frames.length).toString().length) + '.png'
            imageFrame: '\'.$frame_url.\'frame_' + that.pad((i + 1), (that.frames.length).toString().length) + '.png'
        };

        image.onload = function(){

            // pre draw image to analyze.
            that.copy.clearRect(0, 0, frameWidth, frameHeight);
            that.copy.drawImage(image, 0, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

            objectData.forEach(function(object, index){
                //if we have the image need to draw.
                if (object.type === 'image') {

                    imgSrc = new Image();
                    imgSrc.src = object.src;

                    if(object.fix && that.cache[index] && typeof that.cache[index] === 'object'){
                        holeWidth = that.cache[index].holeWidth;
                        holeHeight = that.cache[index].holeHeight;
                        x = that.cache[index].x;
                        y = that.cache[index].y;
                    } else {

                        pixels = that.copy.getImageData(0, 0, frameWidth, frameHeight);

                        bound = {
                            left: null,
                            top: null,
                            bottom: null,
                            right: null
                        };

                        for (j = 0; j < pixels.data.length; j += 4) {
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
                        bound.right += 1;
                        bound.bottom += 1;

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
                    objTmp = {};
                    //objTmp.src = 'face_' + (objectIndex[index] + 1) + '.jpg';
                    objTmp.src = '\'.$photo' + (objectIndex[index] + 1) + '.\'';
                    objTmp.width = holeWidth + 8;
                    objTmp.height = holeHeight + 8;
                    objTmp.position = (x - holeWidth/2 - 4) + ',' + (y - holeHeight/2 + - 4);
                    objTmp.opacity = 1;
                    objTmp.order = 'back';
                    objTmp.rotate = object.rotate;
                    if(object.rotate > 0) {
                        objTmp.rotate = object.rotate - 1;
                    }
                    if(object.rotate < 0) {
                        objTmp.rotate = object.rotate + 1;
                    }
                    objTmp.start = object.from;
                    objTmp.end = object.to;
                    objTmp.id = (objectIndex[index] + 1);

                    if(jsonItem.imageFace === null){
                        jsonItem.imageFace = [];
                    }

                    jsonItem.imageFace[jsonItem.imageFace.length] = objTmp;

                    if(object.fix && i >= object.from && i < object.to){
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
                        alpha = (i - object.from + 1) / (object.to - object.from);
                    }
                    if (object.fade === 'out') {
                        alpha = 1 - ((i - object.from + 1) / (object.to - object.from));
                    }
                    that.copy.fillStyle = 'rgba(' + object.color.red + ',' + object.color.green + ',' + object.color.blue + ',' + alpha + ')';
                    if (object.gradient) {
                        gradient = that.copy.createLinearGradient(0, 0, that.c2.width, 0);
                        for (n = 0; n < object.gradient.length; n++) {
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
                    objTmp = {};
                    objTmp.text = object.src;
                    //objTmp.font = object.fontFamily;
                    objTmp.font = '\'.$font_url.\'';
                    objTmp.size = object.fontSize;
                    objTmp.position = object.x + ',' + object.y;
                    objTmp.opacity = alpha;
                    objTmp.color = that.rgbToHex(object.color.red, object.color.green, object.color.blue);
                    objTmp.order = 'front';
                    objTmp.rotate = object.rotate;
                    objTmp.lineHeight = object.lineHeight;
                    objTmp.start = object.from;
                    objTmp.end = object.to;
                    objTmp.maxW = object.width;

                    if(jsonItem.text === null){
                        jsonItem.text = [];
                    }
                    jsonItem.text[jsonItem.text.length] = objTmp;
                }
            });

            //for variable json
            that.json[that.json.length] = jsonItem;

            that.sequence[that.sequence.length] = that.c2.toDataURL("image/jpeg");

            if(typeof settings.item === 'function'){
                settings.item(i, that.c2.toDataURL("image/jpeg"), jsonItem);
            }

            loopFile(++i);
        };

        image.src = that.frames[i];
    }

};

AnimateCanvas.prototype.rgbToHex = function(r, g, b){
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

/**
 * @param min
 * @param max
 * @returns {*}
 */
AnimateCanvas.prototype.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};
