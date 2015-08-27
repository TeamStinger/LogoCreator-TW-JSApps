define(['jquery'], function(view){
    var GalleryCtr = {
        attachHandlers: function () {
            $('.dropdown').on('click', function () {
                $('.dropdown-menu').toggle();

            });
            console.log('test');
        }
    };

    return GalleryCtr;
});
