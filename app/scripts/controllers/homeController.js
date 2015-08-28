define(['../models/user'], function (user) {
    var HomeController = {
        attachHandlers: function () {
            var registerForm = $('#registerForm');
            registerForm.on('submit', this.submitRegister);
        },

        submitRegister: function (event) {
            var formData = $(this).serializeArray();
            var userData = {};

            formData.forEach(function (obj) {
                userData[obj.name] = obj.value;
            });

            user.register(userData)
                .then(function (data) {
                    $('#registerPanel').hide();

                    noty({
                        theme: 'relax',
                        type: 'success',
                        text: 'You are successfully registered!',
                        animation: {
                            open: 'animated fadeIn',
                            close: 'animated fadeOut'
                        },
                        timeout: 3500
                    });
                }, function (error) {
                    noty({
                        theme: 'relax',
                        type: 'error',
                        text: error.message,
                        animation: {
                            open: 'animated fadeIn',
                            close: 'animated fadeOut'
                        },
                        timeout: 3500
                    });
                });

            event.preventDefault();
        }
    };

    return HomeController;
});
