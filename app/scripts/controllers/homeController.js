define(['../models/user', '../utils/notifier'], function (user, notifier) {
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
                    notifier.showSuccessMessage('You are successfully registered!');
                }, function (error) {
                    notifier.showErrorMessage(error.message);
                });

            event.preventDefault();
        }
    };

    return HomeController;
});
