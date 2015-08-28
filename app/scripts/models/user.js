define(function () {
    var User = {
        register: function (userData) {
            var password = CryptoJS.SHA1(userData.password + userData.name).toString();

            return Everlive.$.Users.register(userData.name, password, {
                DisplayName: userData.displayName,
                Email: userData.email
            });
        },

        login: function (userData) {
            var password = CryptoJS.SHA1(userData.password + userData.name).toString();

            return Everlive.$.Authentication.login(userData.name, password);
        },

        logout: function () {
            return Everlive.$.Authentication.logout();
        },

        restoreAuthorization: function (loggedInUser) {
            Everlive.$.Authentication.setAuthorization(loggedInUser.access_token,
                loggedInUser.token_type, loggedInUser.principal_id);
        },

        getCurrentUser: function () {
            return Everlive.$.Users.currentUser();
        }
    };

    return User;
});
