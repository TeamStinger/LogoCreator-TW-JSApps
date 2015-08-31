define(['../models/user', '../utils/notifier', '../utils/viewRenderer', 'text!views/about.html'],
    function (user, notifier, viewRenderer, aboutTemplate) {
    var HomeController = {
        attachHandlers: function () {
            var registerForm = $('#registerForm'),
                learnButton = $('#learnButton');

            registerForm.on('submit', this.submitRegister);
            learnButton.on('click', this.learnButtonClick);
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
        },

        learnButtonClick: function (event) {
            viewRenderer.render('#view', aboutTemplate, {});

            event.preventDefault();
        }
    };

    return HomeController;
});
