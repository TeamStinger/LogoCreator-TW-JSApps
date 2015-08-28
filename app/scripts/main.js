require.config({
    paths: {
        'jquery': 'lib/jquery',
        'jqueryUI': 'lib/jquery-ui',
        'text': 'lib/text',
        'handlebars': 'lib/handlebars-v3.0.3',
        'views': '../views',
        'CryptoJS': 'lib/crypto-core-min',
        'CryptoJS.SHA1': 'lib/crypto-sha1-min',
        'lightBox': 'lib/lightbox.min',
        'noty': 'lib/jquery.noty.packaged.min'
    },
    shim: {
        'CryptoJS': {
            exports: 'CryptoJS'
        },
        'CryptoJS.SHA1': {
            deps: ['CryptoJS'],
            exports: 'CryptoJS.SHA1'
        }
    }
});

require(['controllers/mainController', 'jquery', 'jqueryUI', 'CryptoJS.SHA1', 'text', 'lightBox', 'noty'],
    function (controller) {
    controller.init();
});