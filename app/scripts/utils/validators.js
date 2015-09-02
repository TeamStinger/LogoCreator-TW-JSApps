define(function () {
    var Validator = {
        createResultObject: function (isValid, errorMessage) {
            return {
                result: isValid,
                error: isValid ? '' : errorMessage
            }
        },

        // Length is not separated from symbol validity check for better security
        emailValidation: function (email) {
            var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                result = pattern.test(email),
                validationResult = this.createResultObject(result, 'Invalid Email');

            return validationResult;
        },

        passwordValidation: function (password) {
            var validationResult,
                passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                isValidPassword = passwordPattern.test(password);

            validationResult = this.createResultObject(isValidPassword, 'Password must be between 6 to 20 and contain at least one numeric digit, one uppercase and one lowercase letter');

            return validationResult;
        },

        userNameValidation: function (userName) {
            return this.plainTextValidation('Username', 3, 10, userName);
        },

        descriptionValidation: function (descriptionText) {
            return this.plainTextValidation('Description', 0, 100, descriptionText);
        },

        // Length check is separated from symbol check for more user friendly check
        plainTextValidation: function (type, min, max, text) {
            var validationResult,
                isLenghtValid = this.stringLenghtValidation(text, min, max),
                alphaNumericPattern = /^[a-zA-Z0-9_]+([-.][a-zA-Z0-9_]+)*$/i;

            if (!isLenghtValid) {
                validationResult = this.createResultObject(false, type + ' must be between ' + min + ' and ' + max + ' symbols');

                return validationResult;
            }

            if (!alphaNumericPattern.test(text)) {
                validationResult = this.createResultObject(false, type + ' can contain only alphanumerical symbols');

                return validationResult;
            }

            validationResult = this.createResultObject(true);

            return validationResult;
        },

        stringLenghtValidation: function (string, botRange, upRange) {
            if (!botRange) {
                botRange = 3;
            }

            if (!upRange) {
                upRange = 10;
            }

            return string.length >= botRange && string.length <= upRange;
        }
    };

    return Validator
});