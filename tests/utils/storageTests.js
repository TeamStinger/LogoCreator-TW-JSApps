define(['chai', 'utils/storage'], function (chai, storage) {
    var expect = chai.expect;

    describe('Storage', function () {
        describe('setItem method', function () {
            it('should set simple string item in the local storage', function () {
                var item = 'Simple string';

                storage.setItem('key', item);

                expect(JSON.parse(localStorage.getItem('key'))).to.be.equal(item);
            });

            it('should setobject item in the local storage', function () {
                var item = { objKey: 'value' };

                storage.setItem('key', item);

                expect(JSON.parse(localStorage.getItem('key'))).to.deep.equal(item);
            });
        });

        describe('getItem method', function () {
            afterEach(function () {
                localStorage.removeItem('key');
            });

            it('should get simple string item in the local storage', function () {
                var item = 'Simple string';

                storage.setItem('key', item);

                expect(storage.getItem('key')).to.be.equal(item);
            });

            it('should get object item in the local storage', function () {
                var item = { objKey: 'value' };

                storage.setItem('key', item);

                expect(storage.getItem('key')).to.deep.equal(item);
            });
        });

        describe('removeItem method', function () {
            it('should remove item from the local storage', function () {
                var item = 'Item';
                localStorage.setItem('key', item);

                expect(localStorage.getItem('key')).to.not.equal.null;

                storage.removeItem('key');

                expect(localStorage.getItem('key')).to.equal.null;
            });
        });
    })
});