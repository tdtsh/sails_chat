var currentThread;
var threadsObject = {};

/////////////////////////////////////////////////
// メッセージ一覧を取得する selectThread-4
/////////////////////////////////////////////////
var getMessages = function(threadId) {

	if (!threadId) {
		return;
	}
	console.log('getMessages threadId:' + threadId + ' selectThread-4');
	io.socket.get("/message", {
		thread_id: threadId
	}, function(messages) {
		$("#chat-timeline").empty();
		_.each(messages, function(message) {
			$("#chat-timeline").append('<li>' + message.text + '</li>');
		});
	});
}

/////////////////////////////////////////////////
// メッセージを送信する
/////////////////////////////////////////////////
var sendMessage = function(args) {

	console.log('sendMessage send-1');
	if (!args.threadId) {
		console.log('sendMessage ThreadId is undefined');
		return;
	}

	if (!args.msg) {
		alert('You must write something');
		return;
	}

	io.socket.post("/message", {
		text: args.msg,
		thread_id: args.threadId
	}, function(res) {
		console.log("sendMessage return res:");
		console.log(res);
		var resText = res.text;
		console.log('sendMessage return:' + resText + ' send-4');
		$("#chat-timeline").append('<li>' + resText + '</li>');
		$('#chat-textarea').val('');
	});
};


/////////////////////////////////////////////////
// スレッド一覧を取得する init-2
/////////////////////////////////////////////////
var getThreads = function() {
	console.log('getThreads init-2');
	io.socket.get("/thread", {}, function(threads) {
		console.log('/thread init-3');
		$("#threads").empty();
		_.each(threads, function(thread) {
			var htmlline = '<li class="room" id="' + thread.title + '">' + thread.title + '</li><p title="' + thread.title + '" onclick="javascript: deleteThread(this.title);">[x]</p>';
			//console.log('/thread each ' + htmlline);
			$("#threads").append(htmlline);
			threadsObject[thread.title] = thread;
		});
	});
}

/////////////////////////////////////////////////
// スレッドを作成する
/////////////////////////////////////////////////
var createThread = function(title) {
	console.log("createThread: " + title);
	// Thread作成or取得
	io.socket.post("/thread", {
		title: title
	}, function(res, a) {
		console.log("createThread return res:");
		console.log(res);
		$('#current-thread').text("in " + res.title);
		getThreads();
		// 取得したThreadのメッセージを取ってくる
		//getMessages(res.title);
		getMessages(res.id);
		currentThread = res;
		$('#thread-form').val('');
	});
}

/////////////////////////////////////////////////
// スレッドを削除する
/////////////////////////////////////////////////
var deleteThread = function(threadId) {
	console.log("deleteThread: " + threadId);
	console.log(threadsObject[threadId]);
	io.socket.delete("/thread", threadsObject[threadId]
	, function(thread, jwres) {
		console.log("deleteThread thread:" + thread);
		console.log("deleteThread jwres:" + jwres);
		getThreads();
	});
}


$(document).ready(function() {

	console.log('ready init-1');

	/////////////////////////////////////////////////
	// スレッド作成
	/////////////////////////////////////////////////
	$('#thread-create-button').on('click', function() {
		console.log('#thread-create-button');
		var title = $('#thread-form').val();
		createThread(title);
	});

	/////////////////////////////////////////////////
	// スレッド選択 selectThread-1
	/////////////////////////////////////////////////
	$('#threads').on('click', '.room', function(e) {
		console.log('threads click id:' + e.currentTarget.id + ' selectThread-1');
		//currentThread = e.currentTarget;
		//getMessages(currentThread.id);
		createThread(e.currentTarget.id);
	});

	/////////////////////////////////////////////////
	// メッセージ送信 
	/////////////////////////////////////////////////
	var sendValue = function() {
		var msg = $('#chat-textarea').val();
		sendMessage({
			threadId: currentThread.id,
			msg: msg
		})
	};
	$('#chat-send-button').on('click', sendValue);

	/////////////////////////////////////////////////
	// メッセージのリターンキー監視
	/////////////////////////////////////////////////
	$('#chat-textarea').keypress(function(e) {
		if (e.keyCode == 13 && currentThread ) {
			sendValue();
		}
	});

	/************************************************
	 * on thread
	 ************************************************/
	io.socket.on('thread', function(thread) {
		console.log('on thread');
		console.log(thread);
		if (thread.verb == "updated" && thread.data.model == 'message') {
			$("#chat-timeline").append('<li id=' + thread.data.body.id + '>' + thread.data.body.text + '</li>');
		}
	});

	getThreads();

	getMessages(currentThreadId);

});
