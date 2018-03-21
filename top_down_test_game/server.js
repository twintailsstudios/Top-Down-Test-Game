/** @namespace io.sockets */
//////start of socket.io setup code///////////
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

users = [];
connections = [];
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
////////////End of Server Setup/////////////


const players = {};
////if client disconnects & reconnects compare server ID////
const server_id = Math.random().toString(36).substr(2, 5);
///player connects server will log connecting id and emit "connected" command
io.on('connection', function socket_handler(socket) {

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
        console.log(data);
        socket.broadcast.emit("update_other",data);
    })
})
;
////assign server an ID number////
console.log('server starting with ID: ', server_id);





////Game Server////
