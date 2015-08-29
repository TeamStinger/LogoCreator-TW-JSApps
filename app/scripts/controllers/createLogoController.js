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
            CreateLogoController.createFontSizeNumeric('#changeFont');
            CreateLogoController.createLogoTextColorPicker('#changeFontColor');
            CreateLogoController.attachAddTextHandler();
            CreateLogoController.attachAddImgHandler();
            CreateLogoController.attachListItemHandler();
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


        createFontSizeNumeric: function (selector) {
            $(selector).kendoNumericTextBox({
                format: '#px',
                min: 10,
                max: 40,
                step: 1,
                value: 16,
                spin: CreateLogoController.changeFontSize
            });
        },
       /* createFontSizeNumeric: function () {
            $('#changeFont').kendoNumericTextBox({
                format: '#px',
                min: 10,
                max: 40,
                step: 1,
                value: 16,
                spin: CreateLogoController.changeFontSize
            });
        },*/

        createLogoTextColorPicker: function (selector) {
            $(selector).kendoColorPicker({
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

            CreateLogoController.makeDraggable('#' + textId, '#preview');



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

            var imageItem=$('<p>')
                .addClass('item')
                .css({
                    display: 'block'
                })
                .html("Image: picture" + (id - 1))
                .attr('id', 'item-' + (id - 1))
                .appendTo(itemList);

            event.preventDefault();
        },

        openEditMenu: function (event) {
            var that=$(event.target);

            if(that.hasClass('item')){
                var previewItemId=that.attr('data-id');

                var popOutMenu=$('<div>');


                //re use text tab as popuot menu
                var body=$('#textTab');

                popOutMenu
                    .html(' <h3>Type Text</h3><p><input type="text" class="form-control border-box" id="text-popOut" /></p>' +
                    '<h3>Change font-size</h3><p><input id="changeFont-popOut" /></p><h3>Change font-color</h3>' +
                    '<p><input id="changeFontColor-popOut" /></p>' +
                    '<button class="btn btn-primary" id="edit-text">EditText</button>');
                popOutMenu.dialog();

                var button=$('#edit-text')
                    .on('click',function(){
                        var item=$('#'+previewItemId);
                        var text=$('#text-popOut').val();
                        var color=$('#changeFontColor-popOut').val();
                        var fontSize= $('#changeFont-popOut').val();
                        item.html(text);
                        item.css({
                            color: color,
                            fontSize: fontSize
                        });
                        var itemListText="Text: '"+text+"'";
                        that.html(itemListText);

                        popOutMenu.dialog('close');
                    });


                CreateLogoController.createLogoTextColorPicker('#changeFontColor-popOut');
                CreateLogoController.createFontSizeNumeric('#changeFont-popOut');


                console.log(previewItemId);
                console.log('Context Menu');
            }
        },

        changeFontColor: function (event) {
            textPreview.css('color', event.value);
        },

        makeDraggable: function (selector, area) {
            $(selector).draggable({
                containment: area
            })

        }
    };

    return CreateLogoController;
});