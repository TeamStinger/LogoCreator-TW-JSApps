define(['../models/user', '../utils/notifier', '../utils/viewRenderer', 'text!views/about.html', '../utils/validators'],
    function (user, notifier, viewRenderer, aboutTemplate,validator) {
    var HomeController = {
        attachHandlers: function () {
            var registerForm = $('#registerForm'),
                learnButton = $('#learnButton');

            registerForm.on('submit', this.submitRegister);
            learnButton.on('click', this.learnButtonClick);
        },

        submitRegister: function (event) {
            var formData = $(this).serializeArray(),
                userData = {},
                userName = formData[0].value,
                password = formData[1].value,
                email = formData[3].value;

            var isValidUserName = validator.userNameValidation(userName);
            var isValidPassword = validator.passwordValidation(password);
            var isValidEmail = validator.emailValidation(email);

            if (!isValidUserName.result) {
                notifier.showErrorMessage(isValidUserName.error);
            } else if (!isValidPassword.result) {
                notifier.showErrorMessage(isValidPassword.error);
            } else if (!isValidEmail.result) {
                notifier.showErrorMessage(isValidEmail.error);
            } else {
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
            }

            event.preventDefault();
        },

        learnButtonClick: function (event) {
            viewRenderer.render('#view', aboutTemplate, {});

            event.preventDefault();
        }
    };

    return HomeController;
});
