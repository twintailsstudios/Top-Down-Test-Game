////create GameScene////
var GameScene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function GameScene() {
			////active is set to false here, so it waits for a command to launch////
			Phaser.Scene.call(this, {key: 'GameScene', active: false});
			this.pic;
		},

    ////This function actually generates in the game what has been preloaded////
	create: function () {
		const game = this;
		console.log('GameScene Started');
		////scene.launch will launch new scene in parallel with current scene////
		this.scene.launch('UiScene')
        /////plays music/////
		let background_music = this.sound.add('bgm_calm');
		background_music.volume = 0.05;
		background_music.loop = true;
		background_music.play();


        ////Loads the json  file and also the map tileset////
		const map = this.make.tilemap({key: 'level_2'});
		const tileset = map.addTilesetImage('spritesheet');

        ////Creates "layers" of different map tiles to be placed on top of one another////
		const roof2_layer = map.createStaticLayer('roof2', tileset, 0, 0);
		const roof_layer = map.createStaticLayer('roof', tileset, 0, 0);
		const grass_layer = map.createStaticLayer('grass', tileset, 0, 0);
		const background_layer = map.createStaticLayer('background', tileset, 0, 0);
		const background2_layer = map.createStaticLayer('background2', tileset, 0, 0);
		const background3_layer = map.createStaticLayer('background3', tileset, 0, 0);
		const ground_layer = map.createStaticLayer('blocked', tileset, 0, 0);
		const ground2_layer = map.createStaticLayer('blocked2', tileset, 0, 0);

        ////defines the height that each map layer is displayed at and what tile IDs player can collide with////
		roof2_layer.depth = 4;
		roof2_layer.setCollision(-1);
		roof_layer.depth = 3;
		roof_layer.setCollision(-1);
		grass_layer.depth = 2;
		grass_layer.setCollision(-1);
		ground_layer.setCollision([73, 74, 75, 292, 329, 450, 451, 452, 454, 455, 456, 482, 513, 514, 515, 516, 517, 518, 518, 583, 584, 589, 609, 610, 611, 645, 646, 647, 648, 651, 705, 706, 707, 712, 771, 772, 773, 774, 775, 776, 833, 834, 835, 836, 837, 838, 839, 840, 1300, 1301, 1302, 1363, 1364, 1366, 1367, 1427, 1431, 1491, 1492, 1494, 1495, 1556, 1557, 1558, 2369, 2370, 2371, 2433, 2434, 2435, 2497, 2498, 2499,]);
		ground_layer.depth = 0;
		ground2_layer.setCollision(-1);
		background_layer.setCollision(-1);
		background2_layer.setCollision(-1);
		background3_layer.setCollision(-1);
		ground_layer.setCollisionFromCollisionGroup();
        ////makes all the objects you can't walk through/////
		blocked = this.physics.add.staticGroup();
		
		
        ////////////////////////experimental playerObject grouping code/////////////////////////////////
		//The idea is to create a set of "player info" that will be sent from the client to the server
		//The server will receive this packet of info and send back to other clients a message saying
		//"player_ID is at this location and using spritesheet1 for head, spritesheet 4 for body" so on and so forth
		//Clients will receive this message from server and know that player is at this location and has these accessories
		//the location of accessories will be determined client side by setting the location of the accessories to match the player location
		//client will apply spritesheets for those accessories based on the info pack received from the server.
		/*
		variableGroup.player = {
			//define where player is
			playerLocation,
			//the "base sprite" that all other accessory sprites are layered on top of
			playerBody,
			//"accessory" sprites that will be grouped together with the base sprite
			playerHead,
			playerEars,
			playerTail,
			playerPatterns,			
		}
		*/
		////////////////////////END experimental playerObject grouping code/////////////////////////////////
		
		
        ////Defines local player spawn position and what sprite local player will use////
		variableGroup.player = this.physics.add.sprite(4320, 4320, 'dudebody')
		variableGroup.playerHead = this.physics.add.sprite(4320, 4320, 'dudeheadpurple')
		variableGroup.playerBody = this.physics.add.sprite(4320, 4320, 'dudebody')
        /////makes it so local player can leave the edges of the map/////
        ////also defines "hitbox" of local player and commands camera to follow////
		variableGroup.player.setSize(8, 8);
		variableGroup.player.setOffset(11, 40);
		variableGroup.player.setBounce(0.0);
		variableGroup.player.setCollideWorldBounds(false);
		variableGroup.playerHead.setSize(8, 8);
		variableGroup.playerHead.setOffset(11, 40);
		variableGroup.playerHead.setBounce(0.0);
		variableGroup.playerHead.setCollideWorldBounds(false);
		variableGroup.playerBody.setSize(8, 8);
		variableGroup.playerBody.setOffset(11, 40);
		variableGroup.playerBody.setBounce(0.0);
		variableGroup.playerBody.setCollideWorldBounds(false);
		////gives physics to local player so that they will obey blocked objects/////
		game.physics.add.collider(variableGroup.player, ground_layer);
		game.physics.add.collider(variableGroup.playerHead, ground_layer);
		game.physics.add.collider(variableGroup.playerBody, ground_layer);
		variableGroup.cam1 = this.cameras.main.setSize(920, 920).startFollow(variableGroup.player).setName('Camera 1');
		

        /////tells game to look at arrow keys for game input/////
		variableGroup.cursors = this.input.keyboard.createCursorKeys();
		

        /////creates the available animations to call on when moving sprites/////
		this.anims.create({
			key: 'otherleft',
			frames: this.anims.generateFrameNumbers('dude2', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'otherturn',
			frames: [{key: 'dude2', frame: 4}],
			frameRate: 20
		});

		this.anims.create({
			key: 'otherright',
			frames: this.anims.generateFrameNumbers('dude2', {start: 5, end: 8}),
			frameRate: 10,
			repeat: -1
			});

		/*
		this.anims.create({
            key: 'leftbody',
			frames: this.anims.generateFrameNumbers('dudebody', {start: 0, end: 3}),
            //frames: this.anims.generateFrameNumbers('dudebody', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
		
		
        this.anims.create({
            key: 'lefthead',
			frames: this.anims.generateFrameNumbers('dudeheadpurple', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
		*/
        /*this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });*/

        /*this.anims.create({
            key: 'rightbody',
			frames: this.anims.generateFrameNumbers('dudebody', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
		
        this.anims.create({
            key: 'righthead',
            frames: this.anims.generateFrameNumbers('dudeheadpurple', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
		*/
////animation group testing////
		////Left Facing Animations////
		variableGroup.leftBody = {
			key: 'leftbody',
			frames: this.anims.generateFrameNumbers('dudebody', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		};
		this.anims.create(variableGroup.leftBody);
		
		variableGroup.leftHead = {
			key: 'lefthead',
			frames: this.anims.generateFrameNumbers('dudeheadpurple', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1
		};
		this.anims.create(variableGroup.leftHead);
		
		////Right Facing Animations////
		variableGroup.rightBody = {
			key: 'rightbody',
			frames: this.anims.generateFrameNumbers('dudebody', {start: 5, end: 8}),
			frameRate: 10,
			repeat: -1
		};
		this.anims.create(variableGroup.rightBody);
		
		variableGroup.rightHead = {
			key: 'righthead',
			frames: this.anims.generateFrameNumbers('dudeheadpurple', {start: 5, end: 8}),
			frameRate: 10,
			repeat: -1
		};
		this.anims.create(variableGroup.rightHead);
		
		////Animation played when player is not moving////
		variableGroup.standStill = {
			key: 'standstill',
			frames: [{key: 'dude', frame: 4}],
			frameRate: 20
		};
		this.anims.create(variableGroup.standStill);
		

////trying to create an object to map animations to...////
///make is so "when call "left" bring up head animation and body animation...something like that?////	
		/*{
			variableGroup.moveLeft; {
				variableGroup.leftHead = 'lefthead',
				console.log('variableGroup.moveLeft1 = ', variableGroup.moveLeft)
				variableGroup.leftBody = 'leftbody'
				console.log('variableGroup.moveLeft2 = ', variableGroup.moveLeft)
				
			};
			console.log('variableGroup.moveLeft3 = ', variableGroup.moveLeft)
			variableGroup.moveRight; {
				variableGroup.rightHead = 'righthead',
				variableGroup.Rightbody = 'rightbody'
			};

		};*/
		
////this also doesn't work...///
		/*variableGroup.moveLeft = variableGroup.leftHead + variableGroup.leftBody;
		console.log('variableGroup.moveLeft1 = ', variableGroup.moveLeft) */
////apparently you can not call animation keys from arrays either...////
		variableGroup.moveLeft = ['lefthead', 'leftbody'];
		
		
        ////go - this; is some how important to representing non-local player movement////
        ////line 78 of multiplayer.js updates player position only "if go"////
		variableGroup.go = this;
		variableGroup.collider = this.physics.add.collider(variableGroup.player, blocked);
		variableGroup.controls.velocity = variableGroup.player.body.velocity;

        ////will soon display how many people are connected? Hopefully? Maybe?/////
		variableGroup.playerCountText = this.add.text(16, 70, 'Players: Connecting...', {fontSize: '30px', fill: '#000'});

        /////call start_multiplayer function in multiplayer.js file/////
		send_data = start_multiplayer();
	},


    ////Game continually loops this function to check for input////
	update: function () {
        ////if an arrow key is pressed, move local player in appropriate direction////
        ////also assigns animations to local player sprite////
        ////emit_movement calls this function in the multiplayer.js file////
		let animation = '';
		let velocityX = 0, velocityY = 0;
        //X Axis
		if (variableGroup.cursors.left.isDown) {
			velocityX = -160;
			//animation = 'leftbody';            
			variableGroup.playerBody.anims.play('leftbody', true);
			variableGroup.playerHead.anims.play('lefthead', true);
		}
		else if (variableGroup.cursors.right.isDown) {
			velocityX = 160;
            //animation = 'rightbody';
			variableGroup.playerBody.anims.play('rightbody', true);
			variableGroup.playerHead.anims.play('righthead', true);
		}

        //Y Axis
		
		else if (variableGroup.cursors.up.isDown) {
			velocityY = -160;
			//animation = 'rightbody';
			variableGroup.playerBody.anims.play('rightbody', true);
			variableGroup.playerHead.anims.play('righthead', true);
		}
		else if (variableGroup.cursors.down.isDown) {
			velocityY = 160;
             //animation = 'leftbody';
			variableGroup.playerBody.anims.play('leftbody', true);
			variableGroup.playerHead.anims.play('lefthead', true);
		}
			else {
			variableGroup.playerBody.anims.play('standstill', true);
			variableGroup.playerHead.anims.play('standstill', true);
			}
		
		

		variableGroup.player.setVelocityX(velocityX);
		variableGroup.player.setVelocityY(velocityY);
		variableGroup.playerHead.setVelocityX(velocityX);
		variableGroup.playerHead.setVelocityY(velocityY);
		variableGroup.playerBody.setVelocityX(velocityX);
		variableGroup.playerBody.setVelocityY(velocityY);		
        //Notify server if we have either velocity OR the previous frame had some movement (so that it receives stops)
		if (velocityX || velocityY || movement.left || movement.right || movement.up || movement.down) {
            //Update actual movement before sending
			movement.left = (velocityX < 0);
			movement.right = (velocityX > 0);
			movement.up = (velocityY < 0);
			movement.down = (velocityY > 0);
            //console.log('Sending ', movement);
			emit_movement();
		}
        //variableGroup.player.anims.play(animation || 'turn', true);
		//variableGroup.playerBody.anims.play('leftbody' || 'rightbody' || 'standstill', true);
		//variableGroup.playerHead.anims.play('lefthead' || 'righthead' || 'standstill', true);
		//variableGroup.playerBody.anims.play('rightbody' || 'standstill', true);
		//variableGroup.playerHead.anims.play('righthead' || 'standstill', true);

        ////haven't figured out what this is for yet...but seems important////
        ////Has something to do with updating player movements for other clients?///
		for (let id in remote_players) {
			if (remote_players.hasOwnProperty(id)) {
				if (remote_players[id].player && remote_players[id].movement) {
                    //update_movement(remote_players[id].player, remote_players[id].movement);
				}
			}
		}
	},
});