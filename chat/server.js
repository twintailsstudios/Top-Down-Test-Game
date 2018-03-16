/** @namespace io.sockets */
//////start of socket.io setup code///////////
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];
////set up virtual file paths so the server can find all your files////
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));
app.use('/client',express.static(__dirname + '/client'));
app.use('/top_down_test_game',express.static(__dirname + '/top_down_test_game'));
app.use('/top_down_test_game/client/js',express.static(__dirname + '/top_down_test_game/client/js'));
app.use('/top_down_test_game/assets/',express.static(__dirname + '/top_down_test_game/client/assets'));

////make server request the index.html file if when a client connects nothing requested////
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

////server location (ex website domain name or localhost and port number)////
server.listen(8082,function(){
	console.log('Server is now running...Listening on '+server.address().port);
	});
////////////End of Server Setup/////////////


io.sockets.on('connection',  function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	
	////Disconect
	socket.on('disconnect', function(data){
		//if(!socket.username) return;
		users.splice(users.indexOf(socket.username), 1)
		updateUsernames();
		connections.splice(connections.indexOf(socket),1);
		console.log('Disconnected: %s sockets connected', connections.length);
	});
	
	////send message
	socket.on('send message', function(data){

			io.sockets.emit('new message', {msg: data, user: socket.username});
	});
	
	////new user
	socket.on('new user', function(data, callback){
		callback(true);
		socket.username = data;
		users.push(socket.username);
		updateUsernames();
	});
	
	function updateUsernames(){
		io.sockets.emit('get users', users);
	}
});	



////Chat application////
