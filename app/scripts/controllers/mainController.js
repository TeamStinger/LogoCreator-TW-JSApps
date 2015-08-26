define(['text!views/home.html', 'text!views/gallery.html', '../utils/viewRenderer', './homeController',
        '../models/user', '../utils/storage'],
    function (homeTemplate, galleryTemplate, viewRenderer, homeController,
              user, storage) {
        var MainController = {
            init: function () {
                // TODO: Check if there is a logged in user
                new Everlive('pgQ17WjqBcAocZNw'); //This instance is accessed through Everlive.$

                viewRenderer.render("#view", homeTemplate, {});
                homeController.attachHandlers();

                $('#home').on('click', this.homeClick);
                $('#gallery').on('click', this.galleryClick);
                $('#loginForm').on('click', this.loginClick);
            },

            homeClick: function (event) {
                viewRenderer.render('#view', homeTemplate, {});
                homeController.attachHandlers();

                event.preventDefault();
            },

            galleryClick: function (event) {
                viewRenderer.render('#view', galleryTemplate, {});

                event.preventDefault();
            },

            loginClick: function (event) {
                var formData = $(this).serializeArray();
                var userData = {};

                formData.forEach(function (obj) {
                    userData[obj.name] = obj.value;
                });


                user.login(userData)
                    .then(function (data) {
                        $('#loginForm').hide();
                        viewRenderer.render('#view', galleryTemplate, {});

                        storage.setItem('loggedInUser', data.result);
                    }, function (error) {
                        //Show error message
                    });

                event.preventDefault();
            }
        };

        return MainController;
    });