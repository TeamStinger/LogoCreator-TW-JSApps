define(['handlebars'], function (handlebars) {
    var ViewRenderer = {
        render: function (selector, view, data) {
            var template = handlebars.compile(view),
                compiledTemplate = template(data);

            $(selector).html(compiledTemplate);
        }
    };

    return ViewRenderer;
});