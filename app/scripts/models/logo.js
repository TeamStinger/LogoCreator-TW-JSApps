define(function () {
    var Logo = {
        save: function (fileObject) {
            return Everlive.$.Files.create(fileObject);
        },

        getAll: function () {
            return Everlive.$.Files.get();
        },

        getAllByUser: function (userId) {
            var filter = new Everlive.Query();

            filter.where().eq('Owner', userId);
            return Everlive.$.Files.get(filter);
        },

        delete: function (id) {
            return Everlive.$.Files.destroySingle({Id: id});
        }
    };

    return Logo;
});