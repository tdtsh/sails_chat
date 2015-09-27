/**
 * ThreadController
 *
 * @description :: Server-side logic for managing threads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/*
	find: function(req, res) {
		console.log("GET /thread init-4");
		Thread.find().exec(function(err, threads) {
			return res.json(threads);
		});
	},
	*/

	create: function(req, res) {
		console.log("POST /thread title:" + title);
		var title = req.param('title') + '' || '';

		var errMsg = '';
		var result = {};

		if (!title) {
			errMsg += 'title required\n';
		} else if (title.length > 40) {
			errMsg += 'title too long (up to 40)\n';
		} else if (title.length < 2) {
			errMsg += 'title too short (must more than 2)\n';
		}

		if (errMsg) {
			result = {
				error: errMsg
			};
			return res.json(400, result);
		}

		Thread.findOne({
			title: title
		}).exec(function(err, thread) {
			// すでに同名のスレッドがあれば返す
			if (thread) {
				console.log("thread already exists");
				console.log("POST /thread Thread.subscrib");
				Thread.subscribe(req.socket, thread);
				return res.json(thread);
			}

			Thread.create({
				title: title
			}).exec(function(err, thread) {
				console.log('created thread:' + thread)
				if (subscribedThread) {
					Thread.unsubscribe(req.socket, subscribedThread);
				}
				subscribedThread = tread;
				Thread.subscribe(req.socket, thread);
				res.json(thread);
			});
		});
	}

};
