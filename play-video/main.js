const AnimateCanvas = function (selector, width, height) {
    const opt = {
        width: width || 300,
        height: height || 200
    };
    this.opt = opt;
    this.board = null;
    this.element = document.querySelector(selector);
    if (!this.element) {
        alert('Can not file element with selector: ' + selector);
        return;
    }

    this.imageList = this.element.querySelectorAll('img');
    if (this.imageList.length === 0) {
        alert('You need to define at least one image in element with selector: ' + selector);
        return;
    }
    if (this.hasCanvas()) {
        this.board = this.initCanvas();
        // init first image.
        this.board.drawImage(this.imageList[0], 0, 0, opt.width, opt.height);
    } else {
        // fallback to first image.
        this.imageList[0].style.display = 'block';
    }
};
AnimateCanvas.prototype.play = function (fps, loop) {
    if (!this.board || !this.element || !this.imageList) {
        return;
    }
    const opt = Object.assign({
        loop: loop || false,
        fps: fps || 24
    }, this.opt);
    const board = this.board;
    const imageList = this.imageList;
    const requestAnimationFrame = this.reqAnimFrame();

    this.imageLoaded(function () {
        requestAnimationFrame(frame);

        let i = 0,
            wait = 0,
            delay = 60 / opt.fps;
        function frame() {
            if (!wait) {
                board.clearRect(0, 0, opt.width, opt.height);
                board.drawImage(imageList[i], 0, 0, opt.width, opt.height);
                i += 1;
            }
            wait = (wait + 1) % delay;
            if (i < imageList.length) {
                requestAnimationFrame(frame);
            } else {
                if (opt.loop) {
                    i = 0;
                    requestAnimationFrame(frame);
                }
            }
        }
    });
};
AnimateCanvas.prototype.imageLoaded = function (callback) {
    const element = this.element;
    element.classList.add('loading');

    const imageList = element.querySelectorAll('img');
    let i = 0;
    for (const image of imageList) {
        image.onload = function () {
            i += 1;
            if (i === imageList.length) {
                element.classList.remove('loading');
                element.classList.add('loaded');
                callback();
            }
        }
    }
};
AnimateCanvas.prototype.reqAnimFrame = function () {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function(callback) {
            return setTimeout(callback, 1000 / 60);
        };
};
AnimateCanvas.prototype.hasCanvas = function () {
    const elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
};
AnimateCanvas.prototype.initCanvas = function () {
    const canvas = document.createElement('canvas');
    canvas.width = this.opt.width;
    canvas.height = this.opt.height;
    canvas.classList.add('animate-canvas');

    this.element.appendChild(canvas);

    return canvas.getContext('2d');
};
