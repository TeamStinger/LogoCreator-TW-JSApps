define(['text!views/home.html', 'text!views/gallery.html', 'text!views/myLogos.html', 'text!views/createLogo.html',
        '../utils/viewRenderer', './homeController', '../models/user', '../utils/storage', './galleryController'],
    function (homeTemplate, galleryTemplate, myLogosTemplate, createLogoTemplate,
              viewRenderer, homeController,
              user, storage, galleryController) {
        var MainController = {
            init: function () {
                // TODO: Check if there is a logged in user
                new Everlive('pgQ17WjqBcAocZNw'); //This instance is accessed through Everlive.$

                viewRenderer.render("#view", homeTemplate, {});
                homeController.attachHandlers();

                $('#home').on('click', this.homeClick);
                $('#gallery').on('click', this.galleryClick);
                $('#myLogos').on('click', this.myLogosClick);
                $('#createLogo').on('click', this.createLogoClick);
                $('#loginForm').on('click', this.loginClick);
                $('#logout-btn').on('click', this.logoutClick);
            },

            homeClick: function (event) {
                viewRenderer.render('#view', homeTemplate, {});
                homeController.attachHandlers();

                event.preventDefault();
            },

            galleryClick: function (event) {
                viewRenderer.render('#view', galleryTemplate, [{
                    author: 'GitMan',
                    src: 'https://git-scm.com/images/logos/downloads/Git-Logo-Black.png',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'ClownGuy',
                    src: 'https://pbs.twimg.com/profile_images/1464613488/mc_frontalot_twitter_icon_v3.jpg',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'CArComp',
                    src: 'https://cdn2.colorlib.com/wp/wp-content/uploads/sites/2/2014/02/Olympic-logo.png',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'Star',
                    src: 'http://thevisualcommunicationguy.com/wp-content/uploads/2013/11/Starbucks-Logo-051711.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                },{
                    author: 'BatPerson',
                    src: 'http://www.vectortemplates.com/raster/batman-logo-big.gif',
                    info: 'I made this logo using the best logo making website in the world!'
                }]);

                galleryController.attachHandlers();
                event.preventDefault();
            },

            myLogosClick: function () {
                viewRenderer.render('#view', myLogosTemplate, {})
            },

            createLogoClick: function () {
                viewRenderer.render('#view', createLogoTemplate, {})
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