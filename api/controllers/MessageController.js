/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	find: function(req, res) {
		console.log("GET /message");
		Message.find().exec(function(err, messages) {
			Message.subscribe(req.socket);
			res.json(messages);
		});
	},

	create: function(req, res) {
		console.log("POST /message");
		var text = req.param('text');
		Message.create({
			text: text
		}).exec(function(err, message) {
			Message.publishCreate(message);
			res.json(message);
		});
	}
};
