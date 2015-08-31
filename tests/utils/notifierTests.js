define(['chai', 'sinon', 'utils/notifier'], function (chai, sinon, notifier) {
    var expect = chai.expect;

    describe('Notifier', function () {
        afterEach(function () {
            $('#noty_top_layout_container').remove();
        });

        describe('showErrorMessage method', function () {
            it('should call notify method', function () {
                var notifySpy = sinon.spy(notifier, 'notify');

                notifier.showErrorMessage('Error message!');

                expect(notifySpy.calledOnce).to.be.true;

                notifySpy.restore();
            });

            it('should call notify method with first parameter - passed message, and second parameter "error"',
                function () {
                    var notifySpy = sinon.spy(notifier, 'notify');

                    notifier.showErrorMessage('Error message!');

                    expect(notifySpy.calledWithExactly('Error message!', 'error')).to.be.true;

                    notifySpy.restore();
                });
        });

        describe('showSuccessMessage method', function () {
            it('should call notify method', function () {
                var notifySpy = sinon.spy(notifier, 'notify');

                notifier.showSuccessMessage('Success message!');

                expect(notifySpy.calledOnce).to.be.true;

                notifySpy.restore();
            });

            it('should call notify method with first parameter - passed message, and second parameter "success"',
                function () {
                    var notifySpy = sinon.spy(notifier, 'notify');

                    notifier.showSuccessMessage('Success message!');

                    expect(notifySpy.calledWithExactly('Success message!', 'success')).to.be.true;

                    notifySpy.restore();
                });
        });
    })
});