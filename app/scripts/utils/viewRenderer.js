define(['handlebars'], function (handlebars) {
    var ViewRenderer = {
        render: function (selector, view, data) {
            var template = ViewRenderer.compileTemplate(view, data);

            $(selector).html(template);
        },

        appendToDOM: function (selector, view, data) {
            var template = ViewRenderer.compileTemplate(view, data);

            $(selector).append(template);
        },

        compileTemplate: function (view, data) {
            var template = handlebars.compile(view),
                compiledTemplate = template(data);

            return compiledTemplate;
        }
    };

    return ViewRenderer;
});