define(['text!views/home.html', 'text!views/gallery.html', 'text!views/createLogo.html', '../utils/viewRenderer',
        './homeController', '../models/user', '../models/logo', '../utils/storage', './galleryController',
        './createLogoController', '../utils/notifier'],
    function (homeTemplate, galleryTemplate, createLogoTemplate, viewRenderer,
              homeController, user, logo, storage, galleryController,
              createLogoController, notifier) {
        var MainController = {
            init: function () {
                new Everlive('pgQ17WjqBcAocZNw'); //This instance is accessed through Everlive.$

                MainController.renderPageByUserAuthentication();
                MainController.attachNavigationHandlers();
            },

            homeClick: function (event) {
                MainController.renderPageByUserAuthentication();

                event.preventDefault();
            },

            galleryClick: function (event) {
                logo.getAll()
                    .then(function (allLogos) {
                        viewRenderer.render('#view', galleryTemplate, {
                            isLoggedInUser: true,
                            isInGallery: true,
                            logos: allLogos.result
                        });
                        galleryController.attachHandlers();
                    }, function (error) {
                        notifier.showErrorMessage('Cannot load gallery. Please try again!');
                    });

                event.preventDefault();
            },

            myLogosClick: function (event) {
                var loggedInUser = storage.getItem('loggedInUser');

                logo.getAllByUser(loggedInUser.principal_id)
                    .then(function (allLogos) {
                        viewRenderer.render('#view', galleryTemplate, {
                            isLoggedInUser: loggedInUser,
                            isInGallery: false,
                            logos: allLogos.result
                        });
                        galleryController.attachHandlers();
                        galleryController.attachDeleteButtonHandler();
                    });

                event.preventDefault();
            },

            createLogoClick: function (event) {
                var loggedInUser = storage.getItem('loggedInUser');

                viewRenderer.render('#view', createLogoTemplate, {
                    isLoggedInUser: loggedInUser
                });

                createLogoController.init();

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
                        storage.setItem('loggedInUser', data.result);

                        MainController.renderPageByUserAuthentication();
                    }, function (error) {
                        notifier.showErrorMessage(error.message);
                    });

                event.preventDefault();
            },

            logoutClick: function () {
                user.logout()
                    .then(function (data) {
                        storage.removeItem('loggedInUser');
                        MainController.renderPageByUserAuthentication();
                    }, function (error) {
                        notifier.showErrorMessage(error.message);
                    });

                event.preventDefault();
            },

            attachNavigationHandlers: function () {
                $('#home').on('click', this.homeClick);
                $('#gallery').on('click', this.galleryClick);
                $('#myLogos').on('click', this.myLogosClick);
                $('#createLogo').on('click', this.createLogoClick);
                $('#loginForm').on('submit', this.loginClick);
                $('#logout-btn').on('click', this.logoutClick);
            },

            renderPageByUserAuthentication: function () {
                var loggedInUser = storage.getItem('loggedInUser');

                viewRenderer.render('#view', homeTemplate, {
                    isLoggedInUser: loggedInUser
                });

                if (loggedInUser) {
                    user.restoreAuthorization(loggedInUser);
                    MainController.hideLoginForm();
                } else {
                    MainController.showLoginForm();
                    homeController.attachHandlers();
                }
            },

            hideLoginForm: function () {
                user.getCurrentUser()
                    .then(function (currentUser) {
                        var name = currentUser.result.DisplayName;
                        storage.setItem('currentUserName', name);

                        $('#loginForm').hide();
                        $('#logout-btn').show();
                        $('#display-name').text('Hello, ' + name).show();
                    });
            },

            showLoginForm: function () {
                $('#loginForm').show();
                $('#logout-btn').hide();
                $('#display-name').hide();
            }
        };

        return MainController;
    });