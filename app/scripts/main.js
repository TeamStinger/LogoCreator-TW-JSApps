require.config({
    paths: {
        'jquery': 'lib/jquery',
        'jqueryUI': 'lib/jquery-ui',
        'text': 'lib/text',
        'views': '../views'
    }
});

require(['controller/controller', 'jquery', 'jqueryUI', 'text'], function (controller) {
    controller.init();
});