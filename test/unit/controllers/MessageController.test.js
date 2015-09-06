var request = require('supertest');
// @see https://github.com/visionmedia/supertest

describe('MessageController', function() {

	describe('hoge', function() {
		it('fuga', function (done) {
			request(sails.hooks.http.app)
				.get('/message/')
				.expect(200, done);
		});
	});

});

/*
mocha test/bootstrap.test.js test/unit/controllers/MessageController.test.js
*/
