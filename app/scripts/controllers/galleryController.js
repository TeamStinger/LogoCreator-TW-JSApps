define([], function () {
    var GalleryController = {
        attachHandlers: function () {
            $('#dropdownMenu1').on('click', function () {
                $('#dropdown-menu-sort').toggle();
            });

            $('#grid-btn').on('click', function () {
                var $btn = $(this),
                    $icon = $btn.children().first(),
                    $logos = $('.logos');

                if ($icon.hasClass('glyphicon-th')) {
                    $icon.removeClass('glyphicon-th');
                    $icon.addClass('glyphicon-th-list');
                    $logos.removeClass('col-md-4');
                    $logos.addClass('col-md-12');

                } else {
                    $icon.removeClass('glyphicon-th-list');
                    $icon.addClass('glyphicon-th');
                    $logos.removeClass('col-md-12');
                    $logos.addClass('col-md-4');
                }

            });

            $('#dropdownMenu2').on('click', function () {
                $('#dropdown-menu-category').toggle();
            });
        }
    };

    return GalleryController;
});

