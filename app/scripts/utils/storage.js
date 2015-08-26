define(function () {
    var Storage = {
        loadItem: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },

        saveItem: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        removeItem: function (key) {
            localStorage.removeItem(key);
        }
    };

    return Storage;
});
