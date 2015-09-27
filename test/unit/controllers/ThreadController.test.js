var request = require('supertest');
// @see https://github.com/visionmedia/supertest

describe('ThreadController', function() {

	describe('default test', function() {
		it('default it', function(done) {
			request(sails.hooks.http.app)
				.get('/thread/')
				.expect(200, done);
		});
	});

	describe('test create', function() {
		it('引数が無いGETリクエストは400エラー', function(done) {
			request(sails.hooks.http.app)
				.post('/thread')
				.expect(400, done);
		});

		it('引数titleが無いPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/thread')
				.send({
					hoge: ''
				})
				.expect(400, done);
		});

		it('引数titleが短すぎるPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/thread')
				.send({
					title: '1'
				})
				.expect(400, done);
		});

		it('引数titleが長すぎるPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/thread')
				.send({
					title: '123456789012345678901'
				})
				.expect(400, done);
		});

		it('正しくtitleがセットされると成功する', function(done) {
			request(sails.hooks.http.app)
				.post('/thread')
				.send({
					title: 'testtitle'
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect({
					title: 'testtitle',
					createdAt: '2015-09-13T08:13:42.169Z',
					updatedAt: '2015-09-13T08:13:42.169Z',
					id: '55f5303637c9169018b6aabf'
				})
				.end(function(err, res) {
					if (err) return done(err);
					done();
				});
		});


	});
});

/*
mocha test/bootstrap.test.js test/unit/controllers/ThreadController.test.js
*/
