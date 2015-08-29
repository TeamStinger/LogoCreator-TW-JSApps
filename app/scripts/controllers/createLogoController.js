define(['kendo'], function (kendo) {
    var preview,
        textPreview,
        id,
        imagePreview,
        itemList;

    var CreateLogoController = {
        init: function () {
            preview = $('#preview');
            textPreview = $('#textPreviewer');
            imagePreview=$('#imagePreviewer');
            itemList=$('#item-list');
            id=0;

            CreateLogoController.createTabStrip();
            CreateLogoController.createColorPicker();
            CreateLogoController.createSizeSliders();
            CreateLogoController.createFontSizeNumeric();
            CreateLogoController.createLogoTextColorPicker('#changeFontColor');
            CreateLogoController.attachAddTextHandler();
            CreateLogoController.attachAddImgHandler();
            CreateLogoController.attachListItemHandler();
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

        createLogoTextColorPicker: function (selector) {
            $(selector).kendoColorPicker({
                value: '#ffffff',
                buttons: false,
                select: CreateLogoController.changeFontColor
            });
        },

        /*createLogoTextColorPicker: function () {
            $('#changeFontColor').kendoColorPicker({
                value: '#ffffff',
                buttons: false,
                select: CreateLogoController.changeFontColor
            });
        },*/

        /*createLogoTextColorPickerPopOut: function () {
            $('#changeFontColorPopOut').kendoColorPicker({
                value: '#ffffff',
                buttons: false,
                select: CreateLogoController.changeFontColor
            });
        },*/

        attachAddTextHandler: function () {
            $('#addText').on('click', CreateLogoController.addTextClick);
        },

        attachAddImgHandler: function () {
            $('#addImage').on('click', CreateLogoController.addImageClick);
        },

        attachListItemHandler: function(){
            itemList.on('click', CreateLogoController.openEditMenu);
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
                .attr('data-id', (id-1))
                .appendTo(itemList);

            event.preventDefault();
        },

        addImageClick: function (event) {


            var image=$('<p>')
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

            var imageItem=$('<p>')
                .addClass('item')
                .css({
                    display: 'block'
                })
                .html("Image: picture"+(id-1))
                .attr('id', 'item-'+(id-1))
                .appendTo(itemList);

            event.preventDefault();

        },

        openEditMenu: function (event) {
            var that=$(event.target);

            if(that.hasClass('item')){
                var previewItemId=that.attr('data-id');

                var popOutMenu=$('<div>')
                    .html('<h3>Change font-size</h3><p><input id="changeFont" /></p><h3>Change font-color</h3>' +
                    '<p><input id="changeFontColorPopOut" /></p>' +
                    '<button class="btn btn-primary" id="addText">EditText</button>');
                popOutMenu.dialog();
                CreateLogoController.createLogoTextColorPickerPopOut('#changeFontColorPopOut');


                console.log(previewItemId);
                console.log('Context Menu');
            }
        },

        changeFontColor: function (event) {
            textPreview.css('color', event.value);
        }
    };

    return CreateLogoController;
});