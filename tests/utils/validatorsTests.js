define(['chai', 'utils/validators'], function (chai, validators) {
    var expect = chai.expect;

    describe('Validators', function () {
        describe('createResultObject method', function () {
            it('should return object with result true and no error message when validator passes', function () {
                var resObj = validators.createResultObject(true, 'Message');

                expect(resObj).to.deep.equal({ result: true, error: '' });
            });

            it('should return object with result false and error message when validator fails', function () {
                var resObj = validators.createResultObject(false, 'Message');

                expect(resObj).to.deep.equal({ result: false, error: 'Message' });
            });
        });

        describe('emailValidation method', function () {
            it('should return false and error message if email is not valid', function () {
                var resObj = validators.emailValidation('mail');

                expect(resObj).to.deep.equal({ result: false, error: 'Invalid Email' });
            });

            it('should return true and empty error message if email is valid', function () {
                var resObj = validators.emailValidation('mail@domain.com');

                expect(resObj).to.deep.equal({ result: true, error: '' });
            });
        });

        describe('passwordValidation method', function () {
            it('should return false and error message if password length is less than 6 chars', function () {
                var resObj = validators.passwordValidation('pass');

                expect(resObj).to.deep.equal({ result: false, error: 'Password must be between 6 to 20 and contain at least one numeric digit, one uppercase and one lowercase letter' });
            });

            it('should return false and error message if password length is more than 20 chars', function () {
                var resObj = validators.passwordValidation('123456789pass123456789');

                expect(resObj).to.deep.equal({ result: false, error: 'Password must be between 6 to 20 and contain at least one numeric digit, one uppercase and one lowercase letter' });
            });

            it('should return false and error message if do not contains at leat one numeric digit, one uppercase or one lowercase letter', function () {
                var resObj = validators.passwordValidation('password');

                expect(resObj).to.deep.equal({ result: false, error: 'Password must be between 6 to 20 and contain at least one numeric digit, one uppercase and one lowercase letter' });
            });

            it('should return true and empty error message if password is valid', function () {
                var resObj = validators.passwordValidation('passWord1');

                expect(resObj).to.deep.equal({ result: true, error: '' });
            });
        });

        describe('userNameValidation method', function () {
            it('should return false and error message if username is less than 3 chars', function () {
                var resObj = validators.userNameValidation('us');

                expect(resObj).to.deep.equal({ result: false, error: 'Username must be between 3 and 10 symbols' });
            });

            it('should return false and error message if username is more than 10 chars', function () {
                var resObj = validators.userNameValidation('12345678901');

                expect(resObj).to.deep.equal({ result: false, error: 'Username must be between 3 and 10 symbols' });
            });

            it('should return false and error message if username contains non alphanumerical chars', function () {
                var resObj = validators.userNameValidation('username@');

                expect(resObj).to.deep.equal({ result: false, error: 'Username can contain only alphanumerical symbols' });
            });

            it('should return true and empty error message if username is valid', function () {
                var resObj = validators.userNameValidation('username');

                expect(resObj).to.deep.equal({ result: true, error: '' });
            });
        });

        describe('descriptionValidation method', function () {
            it('should return false and error message if description is more than 100 chars', function () {
                var resObj = validators.descriptionValidation('12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901'); // 101 chars

                expect(resObj).to.deep.equal({ result: false, error: 'Description must be between 0 and 100 symbols' });
            });

            it('should return false and error message if description contains non alphanumerical chars', function () {
                var resObj = validators.descriptionValidation('description@');

                expect(resObj).to.deep.equal({ result: false, error: 'Description can contain only alphanumerical symbols' });
            });

            it('should return true and empty error message if description is valid', function () {
                var resObj = validators.descriptionValidation('description');

                expect(resObj).to.deep.equal({ result: true, error: '' });
            });
        });

        describe('stringLenghtValidation method', function () {
            it('should return false if string contains less chars than the min', function () {
                var res = validators.stringLenghtValidation('1', 2, 4);

                expect(res).to.be.false;
            });

            it('should return false if string contains more chars than the max', function () {
                var res = validators.stringLenghtValidation('12345', 2, 4);

                expect(res).to.be.false;
            });

            it('should return true if string length is between min and max', function () {
                var res = validators.stringLenghtValidation('123', 2, 4);

                expect(res).to.be.true;
            });
        });
    })
});