/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/************************************************
	 * メッセージ一覧を返す.
	 ************************************************/
	find: function(req, res) {
		var threadId = req.param('thread_id') || '';
		Message.find({
			thread: threadId
		}).exec(function(err, messages) {
			res.json(messages);
		});
	},
	/************************************************
	 * メッセージを作成する.
	 ************************************************/
	create: function(req, res) {

		var text = req.param('text') || '';
		var threadId = req.param('thread_id');
		Message.create({
			thread: threadId,
			text: text
		}).exec(function(err, message) {

			if (req.isSocket) {
				console.log('message.thread:' + message.thread);
				Thread.publishUpdate(message.thread, {
					model: 'message',
					body: message
				}, !req.options.mirror && req);
			}

			res.json(message);
		});
	}

};
