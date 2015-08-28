define([], function () {
    var GalleryController = {
        attachHandlers: function () {
            $('#dropdownMenu1').on('click', function () {
                $('#dropdown-menu-sort').toggle();
            });

            $('#grid-btn').on('click', function () {
                var $btn = $(this),
                    $btnIcon = $btn.children().first(),
                    $logos = $('.logos'),
                    $logoContainers = $('.thumbnail'),
                    $logosContent = $('.caption');


                if ($btnIcon.hasClass('glyphicon-th')) {
                    $btnIcon.removeClass('glyphicon-th');
                    $btnIcon.addClass('glyphicon-th-list');

                    $logos.removeClass('col-md-4');
                    $logos.addClass('col-md-12');

                    $logoContainers.removeClass('gallery-img-container-gridview');

                    $logosContent.removeClass('gallery-content-gridview');

                } else {
                    $btnIcon.removeClass('glyphicon-th-list');
                    $btnIcon.addClass('glyphicon-th');

                    $logos.removeClass('col-md-12');
                    $logos.addClass('col-md-4');

                    $logoContainers.addClass('gallery-img-container-gridview');

                    $logosContent.addClass('gallery-content-gridview');
                }

            });

            $('#dropdownMenu2').on('click', function () {
                $('#dropdown-menu-category').toggle();
            });
        }
    };

    return GalleryController;
});

