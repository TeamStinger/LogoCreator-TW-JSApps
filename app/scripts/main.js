require.config({
    paths: {
        'jquery': 'lib/jquery',
        'jqueryUI': 'lib/jquery-ui',
        'text': 'lib/text',
        'views': '../views'
    }
});

require(['controllers/mainController', 'jquery', 'jqueryUI', 'text'], function (controller) {
    controller.init();
});