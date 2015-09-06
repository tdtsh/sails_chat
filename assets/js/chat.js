var sendMessage = function() {

	console.log('sendMessage');
	var message = $('#send-message').val();
	console.log('message:' + message);

	if (!message) {
		alert('You must write something');
		return;
	}

	io.socket.post("/message", {
		text: message
	}, function(res) {
		$("#messages").append('<li>' + res.text + '</li>');
		$('#send-message').val('');
	});
};

$(document).ready(function() {

	io.socket.get("/message", {}, function(messages) {
		_.each(messages, function(message) {
			$("#messages").append('<li>' + message.text + '</li>');
		});
	});

	io.socket.on('message', function(message) {
		console.log('on message');
		console.log(message);
		if (message.verb == "created") {
			$("#messages").append('<li id=' + message.id + '>' + message.data.text + '</li>');
		}
	});

	$('#send-message').keypress(function(e) {
		console.log(e.keyCode);
		if (e.keyCode == 13) {
			sendMessage();
		}
	});

	$('#send-button').on('click', sendMessage);

});
