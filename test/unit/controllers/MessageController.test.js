var request = require('supertest');
// @see https://github.com/visionmedia/supertest

describe('MessageController', function() {

	describe('test find', function() {

		it('引数が無いGETリクエストは400エラー', function(done) {
			request(sails.hooks.http.app)
				.get('/message')
				.expect(400, done);
		});

		it('引数thread_idが無いGETリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.get('/message')
				.send({
					hoge: ''
				})
				.expect(400, done);
		});

		it('引数thread_idが短すぎるGETリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.get('/message')
				.send({
					thread_id: '1'
				})
				.expect(400, done);
		});

		it('引数thread_idが長すぎるGETリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.get('/message')
				.send({
					thread_id: '123456789012345678901'
				})
				.expect(400, done);
		});

		it('正しくthread_idがセットされると成功する', function(done) {
			request(sails.hooks.http.app)
				.get('/message?thread_id=test_thread')
				.send()
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect([{
					thread: 'test_thread',
					text: '',
					createdAt: '2015-09-13T09:25:26.639Z',
					updatedAt: '2015-09-13T09:25:26.639Z',
					id: '55f541062dce78161a4db0d3'
				}])
				.end(function(err, res) {
					if (err) return done(err);
					done();
				});
		});
	});

	describe('test create', function() {

		it('引数が無いGETリクエストは400エラー', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.expect(400, done);
		});

		it('引数thread_idが無いPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					hoge: ''
				})
				.expect(400, done);
		});

		it('引数thread_idが短すぎるPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					thread_id: '1'
				})
				.expect(400, done);
		});

		it('引数thread_idが長すぎるPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					thread_id: '123456789012345678901'
				})
				.expect(400, done);
		});

		it('引数が無いGETリクエストは400エラー', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.expect(400, done);
		});

		it('引数textが無いPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					hoge: ''
				})
				.expect(400, done);
		});

		it('引数textが短すぎるPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					text: '1'
				})
				.expect(400, done);
		});

		it('引数textが長すぎるPOSTリクエストは400エラーになる', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					text: '123456789012345678901'
				})
				.expect(400, done);
		});

		it('textが無いと失敗する', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					thread_id: 'test_thread'
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect({
					error: 'text required\n'
				})
				.expect(400, done);
		});
		it('正しくtextがセットされると成功する', function(done) {
			request(sails.hooks.http.app)
				.post('/message')
				.send({
					thread_id: 'test_thread',
					text: 'testtext'
				})
				.set('Accept', 'application/json')
				.expect('Content-Type', /json/)
				.expect({
					text: 'testtext',
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
mocha test/bootstrap.test.js test/unit/controllers/MessageController.test.js
*/
