require.config({
    baseUrl: '../app/scripts',
    paths: {
        'mocha': 'lib/mocha',
        'chai': 'lib/chai',
        'sinon': 'lib/sinon',
        'jquery': 'lib/jquery',
        'jqueryUI': 'lib/jquery-ui',
        'text': 'lib/text',
        'handlebars': 'lib/handlebars-v3.0.3',
        'views': '../views',
        'CryptoJS': 'lib/crypto-core-min',
        'CryptoJS.SHA1': 'lib/crypto-sha1-min',
        'lightBox': 'lib/lightbox.min',
        'noty': 'lib/jquery.noty.packaged.min',
        'kendo': 'lib/kendo.ui.core.min',
        'html2canvas': 'lib/html2canvas',
        'tests': '../../tests'
    },
    shim: {
        'CryptoJS': {
            exports: 'CryptoJS'
        },
        'CryptoJS.SHA1': {
            deps: ['CryptoJS'],
            exports: 'CryptoJS.SHA1'
        },
        'mocha': {
            init: function () {
                this.mocha.setup('bdd');

                return this.mocha;
            }
        }
    }
});

define(['mocha', 'jquery', 'jqueryUI', 'CryptoJS.SHA1', 'text', 'lightBox', 'noty'], function (mocha) {
    require(['tests/utils/notifierTests', 'tests/utils/viewRendererTests'],
        function () {
            mocha.run();
        });
});

