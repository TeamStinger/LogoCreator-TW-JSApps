define(['../utils/viewRenderer', 'text!views/logoText.html', 'kendo'], function (viewRenderer, logoTextTemplate) {
    var preview,
        id,
        textPreview,
        imagePreview,
        itemList;

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
            CreateLogoController.attachAddTextHandler();
            CreateLogoController.attachAddImgHandler()
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

        attachAddTextHandler: function () {
            $('#addText').on('click', CreateLogoController.addTextClick);
        },

        attachAddImgHandler: function () {
            $('#addImage').on('click', CreateLogoController.addImageClick);
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

        addTextClick: function (event) {
            var textInput = $('#textInput'),
                textId = 'text-' + id;

            viewRenderer.appendToDOM('#textPreviewer', logoTextTemplate, {
                id: textId,
                text: textInput.val()
            });

            CreateLogoController.makeDraggable('#' + textId, '#preview');

            id++;

            event.preventDefault();
        },

        addImageClick: function (event) {
            var image = $('<p>')
                .addClass('item')
                .css({
                    display: 'inline-block'
                })
                .draggable({
                    containment: '#preview'
                })
                .html('picture')
                .attr('id', id++)
                .appendTo(imagePreview);
            //textPreview.text(text.val());
            var imageItem = $('<p>')
                .addClass('item')
                .css({
                    display: 'block'
                })
                .html("Image: picture" + (id - 1))
                .attr('id', 'item-' + (id - 1))
                .appendTo(itemList);

            event.preventDefault();
        },

        makeDraggable: function (selector, area) {
            $(selector).draggable({
                containment: area
            })
        }
    };

    return CreateLogoController;
});