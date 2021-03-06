let remote_players = {};
let remote_playersBody = {};
let remote_playersHead = {};
let movement = {left: false, right: false, up: false, down: false}; //This is more intendedMovement, it may differ from actual velocities due to physics

////most of this does nothing at the moment, with the exception of the final "else" command////
////setting player velocity to 0 here is important because it keeps non-local player's sprites
////from sliding all over the screen////
function update_movement(player, movement) {
	if (player) {
		animation = '';
		//X Axis
		if (movement.left) {
			//player.setVelocityX(-160);
			animation = 'otherleft';
		}
		else if (movement.right) {
			// player.setVelocityX(160);
			animation = 'otherright';
		}
		else player.setVelocityX(0);
		//Y Axis
		if (movement.up) {
			//player.setVelocityY(-160);
			if (!animation) animation = 'otherright';
		}
		else if (movement.down) {
			//player.setVelocityY(160);
			//if (!animation) animation = 'otherright';
		}
		//else player.setVelocityY(0);
		player.anims.play(animation || 'standstill', true);
	}
}


////called from index.js, tells server when players connect and disconnect////
function start_multiplayer() {
	variableGroup.ioGame = io(location.host + '/game');

	////I have no idea what this data_storage stuff is////
	const data_storage = {connected: false};
	variableGroup.ioGame.on("connected", (data) => {
		if (data_storage.connected) {
			location.reload(true);
		} 
		else {
			console.log("connected", data);
			variableGroup.player_id = data.id;
			data_storage.connected = true;
			console.log("data.id variable = ", data.id);
		}
		console.log('data_storage variable = ', data_storage);
	});
	////when server says player has joined, log player id in console////
	variableGroup.ioGame.on("joined", (data) => {
		console.log("joined", data);
		remote_players[data.id] = data;
		console.log(remote_players);
	});
	////if server say player left remove player id and destroy player info////
	variableGroup.ioGame.on("left", (data) => {
		console.log("left", data);
		if (remote_players[data.id]) {
			remote_players[data.id].player.destroy();
			delete remote_players[data.id];

		}
		console.log('logged out: ', remote_players);
		update_hud();
	});

	variableGroup.ioGame.on("players", (data) => {
		remote_players = data;
	});
	////when server says player has moved, update position on other players screen?////
	////Honestly most of this is a mystery to me...////
	variableGroup.ioGame.on("update_other", (data) => {
		if (variableGroup.go) {
			//console.log('variableGroup.go was called');
			if (data.id !== variableGroup.player_id) {
				//console.log('data.id !== variableGroup.player_id');
				if (!remote_players[data.id]) remote_players[data.id] = data;
					//console.log('!remote_players[data.id]) remote_players[data.id] = data');
				if (remote_players[data.id].player) {
					//console.log('remote_players[data.id].player');
					remote_players[data.id].movement = data.movement;
					if (data.movement) {
						//console.log('data.movement');
						update_movement(remote_players[data.id].player, data.movement);
					}
					remote_players[data.id].player.setPosition(data.position.x, data.position.y);
					//console.log('data = ', data);
					
					/////////////////////////////////////////////////////////////////////////////////////////
					////THIS! This code right here! This causes the delay for remote players! This is what causes
					////remote players to continue moving even after they've let go of the arrow key!
					//remote_players[data.id].player.setVelocity(data.velocity.x, data.velocity.y);
					////////////////////////////////////////////////////////////////////////////////////////
					
					/*remote_players[data.id].playerHead.setPosition(data.position.x, data.position.y);
					remote_players[data.id].playerHead.setVelocity(data.velocity.x, data.velocity.y);
					remote_players[data.id].playerBody.setPosition(data.position.x, data.position.y);
					remote_players[data.id].playerBody.setVelocity(data.velocity.x, data.velocity.y);*/
				}
				else {
					////This part I know! Defines spawn point of non-local players along with their sprite////
					////also defines hitbox of non-local player sprites and gives them physics to they can collide with things////
					const new_player = variableGroup.go.physics.add.sprite(4320, 4320, 'emptyplayer');
					/*const new_playerHead = variableGroup.go.physics.add.sprite(4320, 4320, 'dudeheadpurple');
					const new_playerBody = variableGroup.go.physics.add.sprite(4320, 4320, 'dudebody');*/
					new_player.setSize(8, 8);
					new_player.setOffset(11, 40);
					new_player.setBounce(0.0);
					new_player.setCollideWorldBounds(false);
					new_player.setMaxVelocity(160, 400);
					new_player.setDragX(350);
					new_player.update();
					variableGroup.go.physics.add.collider(new_player, blocked);
					remote_players[data.id].player = new_player;
					console.log('player = ', variableGroup.player);
                    
					/*
					new_playerHead.setSize(8, 8);
					new_playerHead.setOffset(11, 40);
					new_playerHead.setBounce(0.0);
					new_playerHead.setCollideWorldBounds(false);
					new_playerHead.setMaxVelocity(160, 400);
					new_playerHead.setDragX(350);
					new_playerHead.update();
					variableGroup.go.physics.add.collider(new_playerHead, blocked);
					remote_players[data.id].playerHead = new_playerHead;
					
					new_playerBody.setSize(8, 8);
					new_playerBody.setOffset(11, 40);
					new_playerBody.setBounce(0.0);
					new_playerBody.setCollideWorldBounds(false);
					new_playerBody.setMaxVelocity(160, 400);
					new_playerBody.setDragX(350);
					new_playerBody.update();
					variableGroup.go.physics.add.collider(new_playerBody, blocked);
					remote_players[data.id].playerBody = new_playerBody;
					console.log('remote_players variable = ', remote_players);
					*/
				}
				if (!remote_players[data.id].player) delete remote_players[data.id];
			}
		}
	});

	////outputs whether or not players are moving to change variables above////
	////Honestly mostly useless right now I think?////
	variableGroup.player.setPosition(variableGroup.player.body.position.x, variableGroup.player.body.position.y);
	const keybinds = {
		ArrowLeft: "Left",
		ArrowRight: "Right",
		ArrowUp: "Up",
		ArrowDown: "Down"
	};

	/* These are now combined as part of the update tick since the keydown/keyup events weren't triggering promptly
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
	*/

	//Utility function to send data
	function send_data(message, data) {
		return variableGroup.ioGame.emit(message, data)
	}
	return send_data;
			console.log('send_data =', send_data);
}


////sends player position and velocity to server? Maybe also?////
////This is called whenever a local player presses an arrow key...////
////So it must be important for movement...but I don't know what actually uses this data////
function emit_movement() {
	console.log('emit_movement called successfully');
	if (send_data && variableGroup.player && variableGroup.player_id) {
		const player_data = {};
		player_data.id = variableGroup.player_id;
		console.log('emit_movement player_data = ', variableGroup.player_id);
		player_data.velocity = variableGroup.player.body.velocity;
		player_data.position = {x: variableGroup.player.x, y: variableGroup.player.y};
		player_data.movement = movement;
		send_data('update', player_data);
	} else {
		console.error('Attempting to send player movement data before multiplayer initialized')
	}
}



