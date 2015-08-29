define(function () {
    var Logo = {
        save: function (fileObject) {
            return Everlive.$.Files.create(fileObject);
        },
        
        getAll: function () {
            return Everlive.$.Files.get();
        },
        
        getAllByUser: function () {
            
        }
    };

    return Logo;
});
