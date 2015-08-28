define(['../models/user'], function (user) {
    var registerForm;

    var HomeController = {
        attachHandlers: function () {
            registerForm = $('#registerForm');
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
                    registerForm.hide();
                    //Show successful registered user message
                }, function (err) {
                    //Show error message
                    console.log(err);
                });

            event.preventDefault();
        }
    };

    return HomeController;
});
