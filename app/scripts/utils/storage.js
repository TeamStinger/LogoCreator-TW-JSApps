define(function () {
    var Storage = {
        getItem: function (key) {
            return JSON.parse(localStorage.getItem(key));
        },

        setItem: function (key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        removeItem: function (key) {
            localStorage.removeItem(key);
        }
    };

    return Storage;
});
