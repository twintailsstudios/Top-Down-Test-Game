/////creating universal variables/////
let blocked;
var player;
var playerCount = 1;
var playerCountText;
let controls = {};
let gameover = 0;
let collider;
let player_id;
let send_data = null;
let go;
let debug = false;

/////configuring game state/////
const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
////create game////
const game = new Phaser.Game(config);

////Load up all assets game uses before game starts ////
function preload() {
/////is supposed to display loading bar? I'm not sure if this is working right..../////
    this.load.on('fileprogress', function (file, value) {
        console.log(value);
    });

    this.load.on('complete', function () {

        // progress.destroy();

    });
	
////Preload Map Files////
////This loads the tilesheet that the map uses to generate pictures////
	this.load.image('spritesheet', 'top_down_test_game/client/assets/images/spritesheet.png');
////This loads the map json file that says what coordinates have what pictures////
        this.load.tilemapTiledJSON('level_2', 'top_down_test_game/client/assets/tilemaps/level2.json');
/////actually preloads resources to use in game/////
////loads song file////
    this.load.audio('bgm_calm', 'top_down_test_game/assets/music/Electrodoodle.mp3');
////loads sprite files to be used for players////
	this.load.spritesheet('dude', 'top_down_test_game/client/assets/spritesheets/dude.png',{frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('dude2', 'top_down_test_game/client/assets/spritesheets/dude2.png',{frameWidth: 32, frameHeight: 48});


}

////This function actually generates in the game what has been preloaded////
function create() {
    const game = this;
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
        const ground_layer = map.createStaticLayer('blocked', tileset, 0, 0);
		const ground2_layer = map.createStaticLayer('blocked2', tileset, 0, 0);
		
////defines the height that each map layer is displayed at and what tile IDs player can collide with////		
		roof2_layer.depth = 9999
		roof2_layer.setCollision(-1);		
		roof_layer.depth = 9998
		roof_layer.setCollision(-1);
		grass_layer.depth = 9997
		grass_layer.setCollision(-1);
        ground_layer.setCollision([73, 74, 75, 292, 329, 450, 451, 452, 454, 455, 456, 482, 513, 514, 515, 516, 517, 518, 518, 583, 584, 589, 609, 610, 611, 645, 646, 647, 648, 651, 705, 706, 707, 712, 771, 772, 773, 774, 775, 776, 833, 834, 835, 836, 837, 838, 839, 840, 1300, 1301, 1302, 1363, 1364, 1366, 1367, 1427, 1431, 1491, 1492, 1494, 1495, 1556, 1557, 1558, 2369, 2370, 2371, 2433, 2434, 2435, 2497, 2498, 2499,]);
		ground2_layer.setCollision(-1);
		background_layer.setCollision(-1);
		background2_layer.setCollision(-1);
        ground_layer.setCollisionFromCollisionGroup();
////makes all the objects you can't walk through/////
    blocked = this.physics.add.staticGroup();
////gives physics to local player so that they will obey blocked objects/////
////Also defines local player spawn position and what sprite local player will use////
    player = this.physics.add.sprite(4320, 4320, 'dude');
	game.physics.add.collider(player, ground_layer);
/////tells game to look at arrow keys for game input/////
	cursors = this.input.keyboard.createCursorKeys();
/////makes it so local player can leave the edges of the map/////
////also defines "hitbox" of local player and commands camera to follow////
	player.setSize(8, 8);
        player.setOffset(11, 40);
	player.setBounce(0.0);
    player.setCollideWorldBounds(false);
	this.cameras.main.startFollow(player)
	
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

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    go = this;
    collider = this.physics.add.collider(player, blocked);
	controls.velocity = player.body.velocity;
	
////will soon display how many people are connected? Hopefully? Maybe?/////
	playerCountText = this.add.text(16, 70, 'Players: Connecting...', {fontSize: '30px', fill: '#000'});

/////call start_multiplayer function in multiplayer.js file/////
	send_data = start_multiplayer();
}



////Game continually loops this function to check for input////
function update() {
////if an arrow key is pressed, move local player in appropriate direction////
////also assigns animations to local player sprite////
////emit_movement calls this function in the multiplayer.js file////
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
				emit_movement();
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);
				emit_movement();
            player.anims.play('right', true);
        }
        else if (cursors.up.isDown) {
			player.setVelocityY(-160);
					emit_movement();
			player.anims.play('right', true);
		}
		else if (cursors.down.isDown) {
			player.setVelocityY(160);
					emit_movement();
			player.anims.play('left', true);
		}
		else{
			player.setVelocityX(0);
			player.setVelocityY(0);
				//emit_movement();
			player.anims.play('turn');
		}
	
	
////haven't figured out what this is for yet...but seems important////
////Has something to do with updating player movements for other clients?///
        for (let id in remote_players) {
            if (remote_players.hasOwnProperty(id)) {
                if (remote_players[id].player && remote_players[id].movement) {
                    update_movement(remote_players[id].player, remote_players[id].movement);
                }
            }

        }
}