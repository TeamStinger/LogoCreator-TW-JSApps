define(['text!views/home.html', 'text!views/gallery.html', './navigationController'],
    function (homeTemplate, galleryTemplate, navigationController) {
    var MainController = {
        init: function () {
            // TODO: Check if there is a logged in user
            // TODO: This will use ViewRenderer class
            $('#view').html(homeTemplate);

            $('.navbar').on('click', 'a', navigationController.clickHandler.bind(navigationController));
        }
    };

    return MainController;
});