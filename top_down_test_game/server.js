/** @namespace io.sockets */
//////start of socket.io setup code///////////
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const users = [];
const connections = [];
const players = {};

const server_id = Math.random().toString(36).substr(2, 5);
console.log('server starting with ID: ', server_id);
////set up virtual file paths so the server can find all your files////
//app.use('/css',express.static(__dirname + '/css'));
//app.use('/js',express.static(__dirname + '/js'));
//app.use('/assets',express.static(__dirname + '/assets'));
//app.use('/client',express.static(__dirname + '/client'));
//app.use('/top_down_test_game',express.static(__dirname + '/top_down_test_game'));
app.use('/client/js',express.static(__dirname + '/client/js'));
app.use('/client/assets/',express.static(__dirname + '/client/assets'));
//app.use('/client/assets/music',express.static(__dirname + '/client/assets/music'));
//app.use('/assets/',express.static(__dirname + '/client/assets'));


////make server request the index.html file if when a client connects nothing requested////
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

////server location (ex website domain name or localhost and port number)////
server.listen(8081,function(){
	console.log('Server is now running...Listening on '+server.address().port);
	});
////////////End of main server setup/////////////

////////////System channel/////////////
io.on('connection', function socket_handler(socket) {
	console.log("Connection to system from ", socket.id);

	socket.on("login", (data) => {
		console.log("Login request from ", socket.id);
		//TODO: Fill out server login response
		socket.emit('login');
	});
});

////////////Game channel/////////////
let ioGame = io.of('/game');
///player connects server will log connecting id and emit "connected" command
ioGame.on('connection', function socket_handler(socket) {
	console.log("Connection to game from ", socket.id);
	player = {id: socket.id};
	players[socket.id] = player;

	console.log("connecting", player);
	socket.emit("connected", player);
	socket.emit("players", players);
	socket.broadcast.emit("joined", player);

////emits disconnect command when players leave////
	socket.on("disconnect", (reason) => {
		socket.broadcast.emit("left", player);
		console.log("left", player);
		if (players[socket.id]) {
			delete players[socket.id];
		}
	});
	socket.on("update", (data) => {
		console.log('update called successfully');
		console.log(data);
		socket.broadcast.emit("update_other",data);
	})
})
;
console.log('server started with ID: ', server_id);
