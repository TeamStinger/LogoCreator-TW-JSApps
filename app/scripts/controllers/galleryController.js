define([], function () {
    var GalleryController = {
        attachHandlers: function () {
            $('#dropdownMenu1').on('click', GalleryController.sortMenuClick);
            $('#dropdownMenu2').on('click', GalleryController.categoryMenuClick);
            $('#grid-btn').on('click', GalleryController.gridButtonClick);
        },

        sortMenuClick: function () {
            $('#dropdown-menu-sort').toggle();
        },

        categoryMenuClick: function () {
            $('#dropdown-menu-category').toggle();
        },

        gridButtonClick: function () {
            var $btn = $(this),
                $btnIcon = $btn.children().first(),
                $logos = $('.logos'),
                $logoContainers = $('.thumbnail'),
                $logosContent = $('.caption');

            //Switch from grid view to list
            if ($btnIcon.hasClass('glyphicon-th')) {
                $btnIcon.removeClass('glyphicon-th');
                $btnIcon.addClass('glyphicon-th-list');

                $logos.hide();
                $logos.removeClass('col-md-4');
                $logos.addClass('col-md-12');
                $logos.fadeIn(800);

                $logoContainers.removeClass('gallery-img-container-gridview');

                $logosContent.removeClass('gallery-content-gridview');

                //Switch from list view to grid
            } else {
                $btnIcon.removeClass('glyphicon-th-list');
                $btnIcon.addClass('glyphicon-th');

                $logos.hide();
                $logos.removeClass('col-md-12');
                $logos.addClass('col-md-4');
                $logos.fadeIn(800);

                $logoContainers.addClass('gallery-img-container-gridview');

                $logosContent.addClass('gallery-content-gridview');
            }
        }
    };

    return GalleryController;
});

