define(['text!views/home.html', 'text!views/gallery.html', 'text!views/myLogos.html', 'text!views/createLogo.html',
        '../utils/viewRenderer', './homeController', '../models/user', '../utils/storage', './galleryController',
        '../utils/notifier'],
    function (homeTemplate, galleryTemplate, myLogosTemplate, createLogoTemplate,
              viewRenderer, homeController, user, storage, galleryController,
              notifier) {
        var testArray = [{
            author: 'GitMan',
            src: 'https://git-scm.com/images/logos/downloads/Git-Logo-Black.png',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'ClownGuy',
            src: 'https://pbs.twimg.com/profile_images/1464613488/mc_frontalot_twitter_icon_v3.jpg',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'CArComp',
            src: 'https://cdn2.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'Star',
            src: 'http://thevisualcommunicationguy.com/wp-content/uploads/2013/11/Starbucks-Logo-051711.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }, {
            author: 'BatPerson',
            src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
            info: 'I made this logo using the best logo making website in the world!'
        }];

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
                viewRenderer.render('#view', galleryTemplate, testArray);

                galleryController.attachHandlers();
                event.preventDefault();
            },

            myLogosClick: function (event) {
                var loggedInUser = storage.getItem('loggedInUser');

                viewRenderer.render('#view', myLogosTemplate, {
                    isLoggedInUser: loggedInUser
                });

                event.preventDefault();
            },

            createLogoClick: function (event) {
                var loggedInUser = storage.getItem('loggedInUser');

                viewRenderer.render('#view', createLogoTemplate, {
                    isLoggedInUser: loggedInUser
                });

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