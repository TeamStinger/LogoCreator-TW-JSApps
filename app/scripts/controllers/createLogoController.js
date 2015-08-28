define(['kendo'], function (kendo) {
    var preview,
        textPreview,
        id;

    var CreateLogoController = {
        init: function () {
            preview = $('#preview');
            textPreview = $('#textPreviewer');
            id=0;

            CreateLogoController.createTabStrip();
            CreateLogoController.createColorPicker();
            CreateLogoController.createSizeSliders();
            CreateLogoController.createFontSizeNumeric();
            CreateLogoController.createLogoTextColorPicker();
            CreateLogoController.attachAddTextHandler();
        },

        createTabStrip: function () {
            $('#tabstrip').kendoTabStrip({
                animation:  {
                    open: {
                        effects: 'fadeIn'
                    }
                }
            });
        },

        createColorPicker: function () {
            $('#background').kendoFlatColorPicker({
                preview: false,
                value: 'rgb(217, 89, 89)',
                change: CreateLogoController.changeBackgroundColor
            });
        },

        createSizeSliders: function () {
            $('#width').kendoSlider({
                min: 100,
                max: 500,
                value: 250,
                smallStep: 10,
                largeStep: 50,
                slide: CreateLogoController.changeWidth
            });

            $('#height').kendoSlider({
                min: 100,
                max: 500,
                value: 250,
                smallStep: 10,
                largeStep: 50,
                slide: CreateLogoController.changeHeight
            });
        },

        createFontSizeNumeric: function () {
            $('#changeFont').kendoNumericTextBox({
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

        addTextClick: function (event) {
            var text = $('#text');
            var itemList=$('#item-list');


            var textItem=$('<p>')
                .addClass('item')
                .css({
                    display: 'inline-block'
                })
                .draggable({
                    containment: '#preview'
                })
                .html(text.val())
                .attr('id', id++)
                .appendTo(textPreview);
            //textPreview.text(text.val());
            var textItem=$('<p>')
                .addClass('item')
                .css({
                    display: 'block'
                })
                .html("Text: '"+text.val()+"'")
                .attr('id', 'item-'+(id-1))
                .appendTo(itemList);

            event.preventDefault();
        },

        changeFontColor: function (event) {
            textPreview.css('color', event.value);
        }
    };

    return CreateLogoController;
});