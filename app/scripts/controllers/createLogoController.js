define(['kendo'], function (kendo) {
    var preview;

    var CreateLogoController = {
        init: function () {
            preview = $('#preview');
            CreateLogoController.createTabStrip();
            CreateLogoController.createColorPicker();
            CreateLogoController.createSizeSliders();
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

        changeBackgroundColor: function (event) {
            preview.css('background-color', event.value);
        },

        changeWidth: function (event) {
            preview.css('width', event.value);
        },

        changeHeight: function (event) {
            preview.css('height', event.value);
        }
    };

    return CreateLogoController;
});