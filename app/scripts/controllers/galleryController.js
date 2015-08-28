define([], function () {
    var GalleryController = {
        attachHandlers: function () {
            $('.dropdown').on('click', function () {
                $('.dropdown-menu').toggle();
            });
        }
    };

    return GalleryController;
});
