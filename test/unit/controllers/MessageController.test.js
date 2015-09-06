var request = require('supertest');
// @see https://github.com/visionmedia/supertest

describe('MessageController', function() {

	describe('default test', function() {
		it('default it', function (done) {
			request(sails.hooks.http.app)
				.get('/message/')
				.expect(200, done);
		});
	});

});

/*
mocha test/bootstrap.test.js test/unit/controllers/MessageController.test.js
*/
