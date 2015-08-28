define(['kendo'], function (kendo) {
    var preview;

    var CreateLogoController = {
        init: function () {
            preview = $("#preview");
            CreateLogoController.createTabStrip();
            CreateLogoController.createColorPicker();
        },

        createTabStrip: function () {
            $("#tabstrip").kendoTabStrip({
                animation:  {
                    open: {
                        effects: "fadeIn"
                    }
                }
            });
        },

        createColorPicker: function () {
            $("#background").kendoFlatColorPicker({
                preview: false,
                value: "#000",
                change: CreateLogoController.changeBackgroundColor
            });
        },

        changeBackgroundColor: function (event) {
            preview.css("background-color", event.value);
        }
    };

    return CreateLogoController;
});