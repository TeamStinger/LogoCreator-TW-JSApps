define(['../models/logo', '../utils/notifier'], function (logo, notifier) {
    var GalleryController = {
        attachHandlers: function () {
            $('#dropdownMenu1').on('click', GalleryController.sortMenuClick);
            $('#dropdownMenu2').on('click', GalleryController.categoryMenuClick);
            $('#grid-btn').on('click', GalleryController.gridButtonClick);
        },

        attachDeleteButtonHandler: function () {
            $('.sub-container').on('click', '.btn-danger', GalleryController.deleteButtonClick);
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
                $logosContent = $('.caption'),
                $logoImg = $('.logo-img');

            //Switch from grid view to list
            if ($btnIcon.hasClass('glyphicon-th')) {
                $btnIcon.removeClass('glyphicon-th');
                $btnIcon.addClass('glyphicon-th-list');

                $logos.hide();
                $logos.removeClass('col-md-4');
                $logos.addClass('col-md-12');
                $logos.fadeIn(800);

                $logoContainers.removeClass('gallery-img-container-gridview');
                $logoContainers.addClass('gallery-img-container-listview');

                $logosContent.removeClass('gallery-content-gridview');
                $logosContent.addClass('gallery-content-listview');

                $logoImg.removeClass('gallery-img-gridview');
                $logoImg.addClass('gallery-img-listview');

                //Switch from list view to grid
            } else {
                $btnIcon.removeClass('glyphicon-th-list');
                $btnIcon.addClass('glyphicon-th');

                $logos.hide();
                $logos.removeClass('col-md-12');
                $logos.addClass('col-md-4');
                $logos.fadeIn(800);

                $logosContent.removeClass('gallery-content-listview');
                $logosContent.addClass('gallery-content-gridview');

                $logoContainers.removeClass('gallery-img-container-listview');
                $logoContainers.addClass('gallery-img-container-gridview');

                $logoImg.removeClass('gallery-img-listview');
                $logoImg.addClass('gallery-img-gridview');

            }
        },

        deleteButtonClick: function (event) {
            var logoId = $(event.target).data('id');

            logo.delete(logoId)
                .then(function () {
                    $('#' + logoId).remove();
                }, function () {
                    notifier.showErrorMessage('Something went wrong. Please try again!');
                });
            event.preventDefault();
        }
    };

    return GalleryController;
});

