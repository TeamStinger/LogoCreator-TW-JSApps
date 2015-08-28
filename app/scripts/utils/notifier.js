define([], function () {
    var Notifier = {
        notify: function (message, type) {
            noty({
                theme: 'relax',
                type: type,
                text: message,
                animation: {
                    open: 'animated fadeIn',
                    close: 'animated fadeOut'
                },
                timeout: 3500
            });
        },

        showSuccessMessage: function (message) {
            this.notify(message, 'success')
        },

        showErrorMessage: function (message) {
            this.notify(message, 'error')
        }
    };

    return Notifier;
});
