
var IUL = (function(){
    'use strict';
    var variables;
    var currentZoom, originZoom;
    var currentDegree, originDegree;
    var imgCrop, imageSrc;
    var methods = {
        getBoundWindow: function(){
            var heightWindow = document.documentElement.clientHeight;
            var widthWindow = document.documentElement.clientWidth;
            var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (iOS) {
                var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                heightWindow = window.innerHeight * zoomLevel;
                widthWindow = window.innerWidth * zoomLevel;
            }
            return {width: widthWindow, height: heightWindow};
        },
        trigger: function(){
            variables.mask.on('click', function(){
                variables.file.trigger('click');

                variables.selectImageCallback(this);
            });

            variables.editMask.on('click', function(){
                var tempImg = new Image();
                tempImg.src = $(this).parent().find('.raw-image').val();

                methods.initCrop(tempImg);

                variables.editImageCallback(this);
            });
        },
        readImage: function(){
            'use strict';
            variables.file.on('change', function(){
                var file = this.files[0];
                var sFileName = file.name;
                var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                var iFileSize = file.size;

                /// OR together the accepted extensions and NOT it. Then OR the size cond.
                /// It's easier to see this way, but just a suggestion - no requirement.
                if (!(sFileExtension === "jpg" ||
                    sFileExtension === "png" ||
                    sFileExtension === "jpeg")) { /// file type
                    alert("Vui lòng chọn hình đúng định dạng (.jpeg, .png, .jpg).\n");
                    return false;
                }

                if (iFileSize > 5242880) { /// 5 mb
                    alert("Hình của bạn vượt quá 5 MB dung lượng cho phép. Vui lòng chọn hình có kích thước nhỏ hơn.\n");
                    return false;
                }

                methods.initialFile(this.files[0]);

            });
        },
        initialFile: function(file){
            'use strict';
            if ( window.FileReader && window.File && window.FileList && window.Blob ) {
                var reader = new FileReader();
                reader.onloadend = function () {
                    var tempImg = new Image();
                    tempImg.src = reader.result;

                    methods.initCrop(tempImg);
                };
                reader.readAsDataURL(file);
            } else {
                alert("Trình duyệt không hỗ trợ tải ảnh, vui lòng cập nhật phiên bản mới.\n");
                return false;
            }
        },
        initCrop: function(tempImg){
            'use strict';
            tempImg.onload = function() {
                'use strict';

                var MAX_WIDTH = tempImg.width;
                var MAX_HEIGHT = tempImg.height;
                if(MAX_WIDTH < variables.width || MAX_HEIGHT < variables.height) {
                    alert("Vui lòng chọn hình có kích thước lớn hơn (" + variables.width + 'px x ' + variables.height + "px).\n");
                    return false;
                }

                variables.beforeInitCropCallback(tempImg);

                if(tempImg.width > variables.maxWidth) {
                    MAX_WIDTH = variables.maxWidth;
                }
                if(tempImg.height > variables.maxHeight) {
                    MAX_HEIGHT = variables.maxHeight;
                }

                if(methods.getBoundWindow().width < 768) {
                    if(tempImg.width > variables.maxWidthMobile) {
                        MAX_WIDTH = variables.maxWidthMobile;
                    }
                    if(tempImg.height > variables.maxHeightMobile) {
                        MAX_HEIGHT = variables.maxHeightMobile;
                    }
                }

                //imageSrc = methods.resizeAndCropImage(tempImg, MAX_WIDTH, MAX_HEIGHT);

                variables.image.attr('src', tempImg.src);

                methods.editImage();

                originZoom = 1;
                variables.zoomControl.slider({
                    range: "min",
                    animate: true,
                    min: 0,
                    max: 100,
                    value: 1,
                    slide: function(event, ui){
                        currentZoom = ui.value - originZoom;
                        originZoom = ui.value;
                        variables.image.cropper('zoom', currentZoom / 60 );
                    }
                });
                originDegree = 36;
                variables.rotateControl.slider({
                    range: "min",
                    animate: true,
                    min: 0,
                    max: 72,
                    value: 36,
                    slide: function(event, ui){
                        currentDegree = ui.value - originDegree;
                        originDegree = ui.value;
                        variables.image.cropper('rotate',currentDegree * 5 );
                    }
                });

                $('#left-rotate').off('click').on('click', function(){
                    var current = parseInt(variables.rotateControl.slider('value'), 10);
                    if(current > 0 && current <= 72) {
                        variables.rotateControl.slider('value', current - 1);

                        currentDegree = (current - 1) - originDegree;
                        originDegree = (current - 1);
                        variables.image.cropper('rotate', currentDegree * 5);
                    }
                });

                $('#right-rotate').off('click').on('click', function(){
                    var current = parseInt(variables.rotateControl.slider('value'), 10);
                    if(current >= 0 && current < 72) {
                        variables.rotateControl.slider('value', current + 1);

                        currentDegree = (current + 1) - originDegree;
                        originDegree = (current + 1);
                        variables.image.cropper('rotate', currentDegree * 5);
                    }
                });


                $('#left-zoom').off('click').on('click', function(){
                    var current = parseInt(variables.zoomControl.slider('value'), 10);
                    if(current > 0 && current <= 100) {
                        variables.zoomControl.slider('value', current - 1);

                        currentZoom = (current-1) - originZoom;
                        originZoom = (current-1);
                        variables.image.cropper('zoom', currentZoom / 60 );
                    }
                });

                $('#right-zoom').off('click').on('click', function(){
                    var current = parseInt(variables.zoomControl.slider('value'), 10);
                    if(current >= 0 && current < 100) {
                        variables.zoomControl.slider('value', current + 1);

                        currentZoom = (current+1) - originZoom;
                        originZoom = (current+1);
                        variables.image.cropper('zoom', currentZoom / 60 );
                    }
                });

                variables.afterInitCropCallback();
            }
        },
        resizeAndCropImage: function(tempImg, MAX_WIDTH, MAX_HEIGHT){
            'use strict';

            var canvas = document.createElement('canvas');
            canvas.width = MAX_WIDTH;
            canvas.height = MAX_HEIGHT;
            var ctx = canvas.getContext("2d");

            var tempW = tempImg.width;
            var tempH = tempImg.height;

            if(tempW > MAX_WIDTH || tempH > MAX_HEIGHT) {
                if ((tempW * MAX_HEIGHT / tempH) >= MAX_WIDTH) {
                    tempW *= MAX_HEIGHT / tempH;
                    tempH = MAX_HEIGHT;
                } else {
                    tempH *= MAX_WIDTH / tempW;
                    tempW = MAX_WIDTH;
                }
            }

            var x = -(tempW - MAX_WIDTH)/2;
            var y = -(tempH - MAX_HEIGHT)/2;

            var orientation;
            EXIF.getData(tempImg, function() {
                orientation = EXIF.getTag(tempImg, 'Orientation');
            });
            if (orientation && orientation <= 8 && orientation >= 2) {
                switch (orientation) {
                    case 2:
                        // horizontal flip
                        ctx.translate(tempW, 0);
                        ctx.scale(-1, 1);
                        break;
                    case 3:
                        // 180 rotate left
                        ctx.translate(tempW, tempH);
                        ctx.rotate(Math.PI);
                        break;
                    case 4:
                        // vertical flip
                        ctx.translate(0, tempH);
                        ctx.scale(1, -1);
                        break;
                    case 5:
                        // vertical flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);

                        x = -(tempW - MAX_HEIGHT)/2;
                        y = (tempH - MAX_WIDTH)/2;
                        break;
                    case 6:
                        // 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -(tempH));

                        x = -(tempW - MAX_HEIGHT)/2;
                        y = (tempH - MAX_WIDTH)/2;
                        break;
                    case 7:
                        // horizontal flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(tempW, -(tempH - 50));
                        ctx.scale(-1, 1);

                        x = -(tempW - MAX_HEIGHT)/2;
                        y = (tempH - MAX_WIDTH)/2;
                        break;
                    case 8:
                        // 90 rotate left
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-tempW, 0);

                        x = -(tempW - MAX_HEIGHT)/2;
                        y = (tempH - MAX_WIDTH)/2;
                        break;
                }
            }

            ctx.drawImage(tempImg, x, y, tempW, tempH);

            //var img = document.createElement('img');
            //img.src= canvas.toDataURL("image/jpeg", 0.8);
            //document.body.appendChild(img);

            return canvas.toDataURL("image/jpeg", 0.8);
        },
        editImage: function(){
            'use strict';
            if(imgCrop) {
                imgCrop.cropper('destroy');
            }
            var bound = methods.getBoundWindow();
            var minWidth = variables.containerWidth;
            var minHeight = variables.containerHeight;

            var boxWidth = variables.width;
            var boxHeight = variables.height;
            if(bound.width < 768) {
                minWidth = variables.containerWidthMobile;
                minHeight = variables.containerHeightMobile;

                boxWidth = variables.widthMobile;
                boxHeight = variables.heightMobile;
                /*boxTop = 'auto';
                boxLeft = 'auto';*/
            }
            imgCrop = variables.image.cropper({
                //viewMode: 1,
                aspectRatio: boxWidth/boxHeight,
                minCropBoxWidth: boxWidth,
                minCropBoxHeight: boxHeight,
                minContainerWidth: minWidth,
                minContainerHeight: minHeight,
                dragMode: 'move',
                cropBoxMovable: false,
                cropBoxResizable: false,
                zoomOnWheel: true,
                built: function(){
                    /*if(bound.width >= 768) {
                        variables.image.cropper("setCropBoxData", {
                            left: boxLeft,
                            top: boxTop,
                            width: boxWidth,
                            height: boxHeight
                        });
                    }*/
                }
            });
        },
        toDataURL: function(){
            'use strict';

            var canvas = variables.image.cropper('getCroppedCanvas');

            return canvas.toDataURL("image/jpeg", 0.8);

        },
        init: function(options){
            'use strict';

            variables = {
                file: $('#file-input'),
                mask: $('.upload-mask'),
                editMask: $('.edit-mask'),
                image: $('#image-cropper'),
                zoomControl: $('#slider-zoom'),
                rotateControl: $('#slider-rotate'),
                width: 230,
                height: 230,
                containerWidth: 400,
                containerHeight: 340,
                widthMobile: 230,
                heightMobile: 230,
                containerWidthMobile: 280,
                containerHeightMobile: 280,
                maxWidth: 2048,
                maxHeight: 2048,
                maxWidthMobile: 1024,
                maxHeightMobile: 1024,
                editImageCallback: function(ele){ },
                selectImageCallback: function(ele){ },
                beforeInitCropCallback: function(tempImg){ },
                afterInitCropCallback: function(){ }
            };

            if(typeof options === 'object') {
                variables = $.extend(variables, options);
            }

            methods.trigger();
            methods.readImage();
        }
    };
    return {
        init: methods.init,
        toDataURL: methods.toDataURL,
        resizeAndCropImage: methods.resizeAndCropImage
    }
})();


$(function() {
    var imageWidth = 230,
        imageHeight = 230;
    IUL.init({
        width: imageWidth,
        height: imageHeight,
        mask: $('.upload-item .upload'),
        editMask: $('.upload-item .edit'),
        selectImageCallback: function(ele){
            $('.upload-item').removeClass('active');
            $(ele).parent().addClass('active');
        },
        editImageCallback: function(ele){
            $('.upload-item').removeClass('active');
            $(ele).parent().addClass('active');

            $.magnificPopup.open({
                items: {
                    src: $('#edit-image')
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeOnBgClick: false,

                closeBtnInside: true,
                preloader: true,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            }, 0);
        },
        beforeInitCropCallback: function(tempImg){
            $('.upload-item.active .raw-image').val(tempImg.src);

            $.magnificPopup.open({
                items: {
                    src: $('#edit-image')
                },
                type: 'inline',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeOnBgClick: false,

                closeBtnInside: true,
                preloader: true,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            }, 0);

        },
        afterInitCropCallback: function(){
            document.getElementById('form-upload').reset();
        }
    });

    $('#edit-image .button--end').on('click', function(e){
        e.preventDefault();
        //$('.upload-item.active .thumb').attr('src', );

        var tempImg = new Image();
        tempImg.src = IUL.toDataURL();
        tempImg.onload = function(){
            var src = tempImg.src;
            if(tempImg.width > imageWidth) {
                src = IUL.resizeAndCropImage(tempImg, imageWidth, imageHeight);
            }
            $('.upload-item.active .thumb').attr('src', src);

            $('.upload-item.active').addClass('upload-item--uploaded');
        };
        $.magnificPopup.close();
    });

    $('.upload-item .delete').on('click', function(e){
        e.preventDefault();
        $('.upload-item').removeClass('active');
        $(this).parent().addClass('active');

        $.magnificPopup.open({
            items: {
                src: $('#confirm-delete')
            },
            type: 'inline',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            closeOnBgClick: false,

            closeBtnInside: true,
            preloader: true,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        }, 0);
    });

    $('#confirm-delete .btn').on('click', function(e){
        e.preventDefault();
        $.magnificPopup.close();
        if($(this).hasClass('button--delete')) {
            $('.upload-item.active').removeClass('upload-item--uploaded');
        }
    });

});