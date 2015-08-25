define(['text!views/home.html', 'text!views/gallery.html', '../utils/viewRenderer', './navigationController'],
    function (homeTemplate, galleryTemplate, viewRenderer, navigationController) {
    var MainController = {
        init: function () {
            // TODO: Check if there is a logged in user
            viewRenderer.render("#view", homeTemplate, {});

            $('.navbar').on('click', 'a', navigationController.clickHandler.bind(navigationController));
        }
    };

    return MainController;
});