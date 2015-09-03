define(['chai', 'sinon', 'controllers/mainController', 'controllers/homeController'], function (chai, sinon, mainController, homeController) {
    var expect = chai.expect;

    describe('homeController', function () {
        describe('when homeClick is initialize', function () {
            beforeEach(function () {
                $('<div id="view">').appendTo(document.body);
                mainController.renderPageByUserAuthentication();
            });

            afterEach(function () {
                $('#view').remove();
            });

            it('register form should be in the page', function () {
                expect($('#registerPanel').length).to.be.equal(1);
            });

            it('register form should visible', function () {
                expect($('#registerPanel').is(':visible')).to.be.true;
            })
        });

        describe('when learn button is clicked', function () {
            beforeEach(function () {
                $('<div id="view">').appendTo(document.body);
                mainController.renderPageByUserAuthentication();
            });

            afterEach(function () {
                $('#view').remove();
            });

            it('should render about view', function () {
                $('#learnButton').trigger('click');

                expect($('.jumbotron h1').text()).to.be.equal('Who are we?');
            });
        });
    })
});