define(['text!views/home.html', 'text!views/gallery.html'], function (homeTemplate, galleryTemplate) {
    var NavigationController = {
        clickHandler: function (event) {
            var viewName = $(event.target).data('href');

            this[viewName + 'Click']();

            event.preventDefault();
        },

        homeClick: function () {
            // TODO: This will use ViewRenderer class
            $('#view').html(homeTemplate);
        },

        galleryClick: function () {
            // TODO: This will use ViewRenderer class
            $('#view').html(galleryTemplate);
        }
    };

    return NavigationController;
});