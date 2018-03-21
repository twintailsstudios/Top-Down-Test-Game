let remote_players = {};
let movement = {Left: 0, Right: 0, Up: 0, Down: 0};

////most of this does nothing at the moment, with the exception of the final "else" command////
////setting player velocity to 0 here is important because it keeps non-local player's sprites
////from sliding all over the screen////
function update_movement(player, movement) {
    if (player) {
        if (movement["Left"]) {
            //player.setVelocityX(-160);

            player.anims.play('otherleft', true);
        }
        else if (movement["Right"]) {
           // player.setVelocityX(160);

			player.anims.play('otherright', true);
		}
		else if (movement['Up']) {
			//player.setVelocityY(-160);
	
			player.anims.play('right', true);
		}
		else if (movement['Down']) {
			//player.setVelocityY(160);
	
			player.anims.play('left', true);
		}
		else{
			player.setVelocityX(0);
			player.setVelocityY(0);
			player.anims.play('turn');
	}

}}


////called from index.js, tells server when players connect and disconnect////
function start_multiplayer() {

////tells non-local players where to look to find the game files////
    let socket = io(location.host);

////I have no idea what this data_storage stuff is////
    const data_storage = {connected: false};
    socket.on("connected", (data) => {
        if (data_storage.connected) {
            location.reload(true);
        } else {
            console.log("connected", data);
            player_id = data.id;
            data_storage.connected = true;
			console.log("data.id variable = ", data.id);
        }
			console.log('data_storage variable = ', data_storage);
    });
////when server says player has joined, log player id in console////
    socket.on("joined", (data) => {
        console.log("joined", data);
        remote_players[data.id] = data;
        console.log(remote_players);
    });
////if server say player left remove player id and destroy player info////
    socket.on("left", (data) => {
        console.log("left", data);
        if (remote_players[data.id]) {
            remote_players[data.id].player.destroy();
            delete remote_players[data.id];

        }
			console.log('logged out: ', remote_players);
        update_hud();
    });

    socket.on("players", (data) => {
        remote_players = data;
    });
////when server says player has moved, update position on other players screen?////
////Honestly most of this is a mystery to me...////
    socket.on("update_other", (data) => {
        if (go) {
            if (data.id !== player_id) {
                if (!remote_players[data.id]) remote_players[data.id] = data;
                if (remote_players[data.id].player) {
                    remote_players[data.id].movement = data.movement;
                    if (data.movement) {
                        update_movement(remote_players[data.id].player, data.movement);
                    }
                    remote_players[data.id].player.setPosition(data.position.x, data.position.y);
                    remote_players[data.id].player.setVelocity(data.velocity.x, data.velocity.y);
                } else {
////This part I know! Defines spawn point of non-local players along with their sprite////
////also defines hitbox of non-local player sprites and gives them physics to they can collide with things////
                    const new_player = go.physics.add.sprite(4320, 4320, 'dude2');
                    player.setSize(8, 8);
					player.setOffset(11, 40);
                    player.setBounce(0.0);
                    new_player.setCollideWorldBounds(false);
                    new_player.setMaxVelocity(160, 400);
                    new_player.setDragX(350);
                    new_player.update();
                    go.physics.add.collider(new_player, blocked);
                    remote_players[data.id].player = new_player;
						console.log('remote_players variable = ', remote_players);
                }
                if (!remote_players[data.id].player) delete remote_players[data.id];
            }
        }
    });

////outputs whether or not players are moving to change variables above////
////Honestly mostly useless right now I think?////
    player.setPosition(player.body.position.x, player.body.position.y);
    const keybinds = {
        ArrowLeft: "Left",
        ArrowRight: "Right",
        ArrowUp: "Up",
		ArrowDown: "Down"
    };
	
	
///////////////////ARE THESE BEING CALLED PROPERLY?/////////////////
////adds a value to the array above if one of the arrows are pressed////
////Are they even important at all?////
    document.addEventListener('keydown', function (e) {
        if (e.code in keybinds) {
            if (movement[keybinds[e.code]] !== 1) {
                movement[keybinds[e.code]] = 1;
                emit_movement();
            }
        }
    });
////removes value to the array above when the arrow key is released////
    document.addEventListener("keyup", function (e) {
        if (e.code in keybinds) {
            if (movement[keybinds[e.code]] !== 0) {
                movement[keybinds[e.code]] = 0;
                emit_movement();
            }
        }
    });

    //Utility function to send data
    function send_data(message, data) {
        return socket.emit(message, data)
    }
    return send_data;
}


////sends player position and velocity to server? MAybe also?////
////This is called whenever a local player presses an arrow key...////
////So it must be important for movement...but I don't know what actually uses this data////
function emit_movement() {
      if (send_data && player && player_id) {

        const player_data = {};
        player_data.id = player_id;
        player_data.velocity = player.body.velocity;
        player_data.position = {x: player.x, y: player.y};
        player_data.movement = movement;
        send_data('update', player_data);
      } else {
        console.error('Attempting to send player movement data before multiplayer initialized')
      }
}



