define(['text!views/home.html', 'text!views/gallery.html', '../utils/viewRenderer', './homeController'],
    function (homeTemplate, galleryTemplate, viewRenderer, homeController) {
        var MainController = {
            init: function () {
                // TODO: Check if there is a logged in user
                new Everlive('pgQ17WjqBcAocZNw'); //This instance is accessed through Everlive.$

                viewRenderer.render("#view", homeTemplate, {});
                homeController.attachHandlers();

                $('#home').on('click', this.homeClick);
                $('#gallery').on('click', this.galleryClick);
            },
            homeClick: function (event) {
                event.preventDefault();
                viewRenderer.render('#view', homeTemplate, {});
                homeController.attachHandlers();
            },

            galleryClick: function (event) {
                event.preventDefault();
                viewRenderer.render('#view', galleryTemplate, {});
            }
        };

        return MainController;
    });