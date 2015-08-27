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
                $('#logout-btn').on('click', this.logoutClick);
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
                var formData = $(this).serializeArray(),
                    userData = {};

                formData.forEach(function (obj) {
                    userData[obj.name] = obj.value;
                });


                user.login(userData)
                    .then(function (data) {
                        viewRenderer.render('#view', galleryTemplate, {});

                        user.getName()
                            .then(function (name) {
                                $('#loginForm').hide();
                                $('#logout-btn').show();
                                $('#display-name').text('Hello, ' + name).show();
                            });

                        storage.setItem('loggedInUser', data.result);
                    }, function (error) {
                        //Show error message
                    });

                event.preventDefault();
            },

            logoutClick: function () {
                user.logout()
                    .then(function (data) {
                        $('#loginForm').show();
                        $('#logout-btn').hide();
                        $('#display-name').hide();

                        storage.removeItem('loggedInUser');
                    }, function (error) {
                        console.log(error)
                    });

                event.preventDefault();
            }
        };

        return MainController;
    });