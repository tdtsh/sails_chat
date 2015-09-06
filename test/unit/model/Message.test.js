var request = require('supertest');
// @see https://github.com/visionmedia/supertest

describe.only('Message', function() {

	describe('hogehoge', function() {
		it('fugafuga', function (done) {
			Message.find()
				.then(function(results) {
					// some tests
					done();
				}).catch(done);
		});
	});

});
