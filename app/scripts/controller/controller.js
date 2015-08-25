define(['text!views/home.html'], function (homeTemplate) {
    var Controller = {
        init: function () {
            $("#view").html(homeTemplate);
        }
    };

    return Controller;
});