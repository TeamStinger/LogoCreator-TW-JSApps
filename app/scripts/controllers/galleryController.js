define(['../models/logo', '../models/categories', '../utils/notifier', '../utils/viewRenderer', 'text!views/gallery.html'],
    function (logo, categories, notifier, viewRenderer, galleryTemplate) {
        var amountToTake = 9,
            amountToSkip = 0,
            logos = [],
            currentFilter;

        function renderCollection(query) {
            logo.getByCondition(query)
                .then(function (sortedLogos) {
                    for (var i = 0; i < sortedLogos.result.length; i += 1) {
                        logos.push(sortedLogos.result[i]);
                    }
                    viewRenderer.render('#view', galleryTemplate, {
                        isLoggedInUser: true,
                        isInGallery: true,
                        logos: logos,
                        categories: categories
                    }, function (error) {
                        notifier.showErrorMessage('Cannot load gallery. Please try again!');
                    });

                    GalleryController.attachHandlers();
                });
        }

        function setSortQuery(query, filter) {
            if (filter !== 'CreatedAtDescending') {
                query.orderDesc('CreatedAt').skip(amountToSkip).take(amountToTake);
            } else {
                query.order(filter).skip(amountToSkip).take(amountToTake);
            }
        }

        function setCategoryQuery(query, filter) {
            query.where().eq('Category', filter);
            query.skip(amountToSkip).take(amountToTake);
        }

        var GalleryController = {
            attachHandlers: function () {
                $('#dropdownMenu1').on('click', GalleryController.sortMenuClick);
                $('#dropdownMenu2').on('click', GalleryController.categoryMenuClick);
                $('#dropdown-menu-sort').on('click', 'a', GalleryController.sortOptionClick);
                $('#dropdown-menu-category').on('click', 'a', GalleryController.categoryOptionClick);
                $('#grid-btn').on('click', GalleryController.gridButtonClick);
                $('#showMoreBtn').on('click', function () {
                    amountToSkip += amountToTake;
                    if (currentFilter === 'CreatedAtDescending' || currentFilter === 'CreatedAt' || currentFilter === 'OwnerName') {
                        GalleryController.sortOptionClick('');
                    } else {
                        GalleryController.categoryOptionClick('');
                    }
                })
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

            sortOptionClick: function (event) {
                var query = new Everlive.Query();
                var filter;
                if (event === '') {
                    filter = currentFilter;
                } else {
                    filter = $(event.target).data('sort');
                }

                if (currentFilter !== filter && event !== '') {
                    logos = [];
                    amountToSkip = 0;
                }

                setSortQuery(query, filter);

                renderCollection(query);

                currentFilter = filter;
                GalleryController.sortMenuClick();

            },

            categoryOptionClick: function (event) {
                var query = new Everlive.Query(),
                    filter;

                if (event === '') {
                    filter = currentFilter;
                } else {
                    filter = $(event.target).data('category');
                }

                if (currentFilter !== filter && event !== '') {
                    logos = [];
                    amountToSkip = 0;
                }

                setCategoryQuery(query, filter);

                renderCollection(query);

                currentFilter = filter;
                GalleryController.categoryMenuClick();
                event.preventDefault();
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

