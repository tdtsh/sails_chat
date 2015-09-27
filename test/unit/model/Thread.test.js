var request = require('supertest');
// @see https://github.com/visionmedia/supertest

describe.only('Thread', function() {

	describe('default test', function() {
		it('default it', function (done) {
			Thread.find()
				.then(function(results) {
					// some tests
					done();
				}).catch(done);
		});
	});

});
