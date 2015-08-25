require.config({
    paths: {
        'jquery': 'lib/jquery',
        'jqueryUI': 'lib/jquery-ui',
        'text': 'lib/text',
        'handlebars': 'lib/handlebars-v3.0.3',
        'views': '../views'
    }
});

require(['controllers/mainController', 'jquery', 'jqueryUI', 'text'], function (controller) {
    controller.init();
});