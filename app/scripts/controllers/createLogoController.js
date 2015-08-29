define(['../utils/viewRenderer', 'text!views/logoTextPreview.html', 'text!views/logoImagePreview.html', 'text!views/logoImage.html', 'text!views/itemList.html', '../models/logos', 'kendo'],
    function (viewRenderer, logoTextPreviewTemplate, logoImagePreviewTemplate, logoImageTemplate, itemListTemplate, logos) {
        var preview,
            id,
            textPreview,
            imagePreview,
            itemList,
            selectedPreviewImage;

        var CreateLogoController = {
            init: function () {
                preview = $('#preview');
                textPreview = $('#textPreviewer');
                imagePreview = $('#imagePreviewer');
                itemList = $('#itemList');
                id = 0;

                CreateLogoController.createTabStrip();
                CreateLogoController.createColorPicker();
                CreateLogoController.createSizeSliders();
                CreateLogoController.createFontSizeNumeric();
                CreateLogoController.createLogoTextColorPicker();
                CreateLogoController.createImageGallery();
                CreateLogoController.createImageResizeSlider();
                CreateLogoController.attachImagePreviewHandler();
                CreateLogoController.attachAddTextHandler();
                CreateLogoController.attachAddImageHandler();
                CreateLogoController.attachDeleteHandler();
            },

            createTabStrip: function () {
                $('#tabstrip').kendoTabStrip({
                    animation: {
                        open: {
                            effects: 'fadeIn'
                        }
                    }
                });
            },

            createColorPicker: function () {
                $('#backgroundPicker').kendoFlatColorPicker({
                    preview: false,
                    value: 'rgb(217, 89, 89)',
                    change: CreateLogoController.changeBackgroundColor
                });
            },

            createSizeSliders: function () {
                $('#widthSlider').kendoSlider({
                    min: 100,
                    max: 500,
                    value: 250,
                    smallStep: 10,
                    largeStep: 50,
                    slide: CreateLogoController.changeWidth
                });

                $('#heightSlider').kendoSlider({
                    min: 100,
                    max: 500,
                    value: 250,
                    smallStep: 10,
                    largeStep: 50,
                    slide: CreateLogoController.changeHeight
                });
            },

            createFontSizeNumeric: function () {
                $('#changeFontNumeric').kendoNumericTextBox({
                    format: '#px',
                    min: 10,
                    max: 40,
                    step: 1,
                    value: 16,
                    spin: CreateLogoController.changeFontSize
                });
            },

            createLogoTextColorPicker: function () {
                $('#changeFontColor').kendoColorPicker({
                    value: '#ffffff',
                    buttons: false,
                    select: CreateLogoController.changeFontColor
                });
            },

            createImageGallery: function () {
                viewRenderer.render("#imageGallery", logoImageTemplate, logos);
            },

            createImageResizeSlider: function () {
                var slider = $("#imageResizeSlider").kendoSlider({
                    min: 10,
                    max: 460,
                    smallStep: 10,
                    largeStep: 50,
                    slide: CreateLogoController.changeImageSize
                });
            },

            attachImagePreviewHandler: function () {
                imagePreview.on('click', 'img', CreateLogoController.imagePreviewClick);
            },

            attachAddTextHandler: function () {
                $('#addText').on('click', CreateLogoController.addTextClick);
            },

            attachAddImageHandler: function () {
                $('#imageGallery').on('click', 'a', CreateLogoController.addImageClick);
            },

            attachDeleteHandler: function () {
                $('#itemList').on('click', '.badge', CreateLogoController.deleteItemClick);
            },

            changeBackgroundColor: function (event) {
                preview.css('background-color', event.value);
            },

            changeWidth: function (event) {
                preview.css('width', event.value);
            },

            changeHeight: function (event) {
                preview.css('height', event.value);
            },

            changeFontSize: function () {
                textPreview.css('font-size', this.value());
            },

            changeFontColor: function (event) {
                textPreview.css('color', event.value);
            },

            changeImageSize: function (event) {
                var size = event.value;

                $(selectedPreviewImage).css({
                    width: size + 'px',
                    height: size + 'px'
                });
            },

            imagePreviewClick: function (event) {
                selectedPreviewImage = event.target;

                event.preventDefault();
            },

            addTextClick: function (event) {
                var textInput = $('#textInput'),
                    textId = 'text-' + id;

                //Add text to the preview
                viewRenderer.appendToDOM('#textPreviewer', logoTextPreviewTemplate, {
                    id: textId,
                    text: textInput.val()
                });

                //Add text to the list
                viewRenderer.appendToDOM('#itemList', itemListTemplate, {
                    itemName: textId
                });

                CreateLogoController.makeDraggable('#' + textId, '#preview');

                id++;

                event.preventDefault();
            },

            addImageClick: function (event) {
                var imageSrc = event.currentTarget.href,
                    imageId = 'image-' + id;

                $('#changeImageSizePanel').show();

                //Add image to the preview
                viewRenderer.appendToDOM('#imagePreviewer', logoImagePreviewTemplate, {
                    id: imageId,
                    src: imageSrc
                });

                //Add image to the list
                viewRenderer.appendToDOM('#itemList', itemListTemplate, {
                    itemName: imageId
                });

                CreateLogoController.makeDraggable('#' + imageId, '#preview');

                id++;

                event.preventDefault();
            },

            deleteItemClick: function (event) {
                var deleteButton = $(event.target),
                    targetId = deleteButton.data('id');

                deleteButton.parent('.list-group-item').remove();
                $('#' + targetId).remove();

                event.preventDefault();
            },

            makeDraggable: function (selector, container) {
                $(selector).draggable({
                    containment: container
                });
            }
        };

        return CreateLogoController;
    });
