define(['text!views/home.html', 'text!views/gallery.html', '../utils/viewRenderer'],
    function (homeTemplate, galleryTemplate, viewRenderer) {
    var NavigationController = {
        clickHandler: function (event) {
            var viewName = $(event.target).data('href');

            this[viewName + 'Click']();

            event.preventDefault();
        },

        homeClick: function () {
            viewRenderer.render('#view', homeTemplate, {});
        },

        galleryClick: function () {
            viewRenderer.render('#view', galleryTemplate, {});
        }
    };

    return NavigationController;
});