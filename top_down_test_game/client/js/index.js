/////creating universal variables/////
let blocked;
var player;
var playerCount = 1;
var playerCountText;
let controls = {};
var menu;
var leftbutton;
let gameover = 0;
let collider;
let player_id;
let send_data = null;
let go;
let debug = false;

/////configuring game state/////
const config = {
    type: Phaser.AUTO,
    width: 920,
    height: 920,
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
	this.load.image('spritesheet', 'client/assets/images/spritesheet.png');
////This loads the map json file that says what coordinates have what pictures////
        this.load.tilemapTiledJSON('level_2', 'client/assets/tilemaps/level2.json');
/////actually preloads resources to use in game/////
////loads song file////
    this.load.audio('bgm_calm', 'client/assets/music/Electrodoodle.mp3');
////loads sprite files to be used for players////
	this.load.spritesheet('dude', 'client/assets/spritesheets/dude.png',{frameWidth: 32, frameHeight: 48});
    this.load.spritesheet('dude2', 'client/assets/spritesheets/dude2.png',{frameWidth: 32, frameHeight: 48});
	this.load.image('menu', 'client/assets/images/menu.png',{frameWidth: 144, frameHeight: 432});
	this.load.image('leftbutton', 'client/assets/images/leftbutton.png');
	this.load.image('rightbutton', 'client/assets/images/rightbutton.png');

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
		const background3_layer = map.createStaticLayer('background3', tileset, 0, 0);
        const ground_layer = map.createStaticLayer('blocked', tileset, 0, 0);
		const ground2_layer = map.createStaticLayer('blocked2', tileset, 0, 0);
		
////defines the height that each map layer is displayed at and what tile IDs player can collide with////		
		roof2_layer.depth = 4
		roof2_layer.setCollision(-1);		
		roof_layer.depth = 3
		roof_layer.setCollision(-1);
		grass_layer.depth = 2
		grass_layer.setCollision(-1);
        ground_layer.setCollision([73, 74, 75, 292, 329, 450, 451, 452, 454, 455, 456, 482, 513, 514, 515, 516, 517, 518, 518, 583, 584, 589, 609, 610, 611, 645, 646, 647, 648, 651, 705, 706, 707, 712, 771, 772, 773, 774, 775, 776, 833, 834, 835, 836, 837, 838, 839, 840, 1300, 1301, 1302, 1363, 1364, 1366, 1367, 1427, 1431, 1491, 1492, 1494, 1495, 1556, 1557, 1558, 2369, 2370, 2371, 2433, 2434, 2435, 2497, 2498, 2499,]);
		ground2_layer.setCollision(-1);
		background_layer.setCollision(-1);
		background2_layer.setCollision(-1);
		background3_layer.setCollision(-1);
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
	
////Display menu////
	{
        this.input.setGlobalTopOnly(true);

        var menu = this.add.image(848, 216, 'menu').setScrollFactor(0);
		menu.depth = 5
		//menu.setScrollFactor(4000, 4000)
			//menu.setInteractive();
				//menu.on('pointerdown', function () {
					//menu.tint = Math.random() * 0xffffff;

        //};
    }
	{
        this.input.setGlobalTopOnly(true);

        var leftbutton = this.add.image(819, 51, 'leftbutton').setScrollFactor(0);
		leftbutton.depth = 6

			leftbutton.setInteractive();
				leftbutton.on('pointerdown', function () {
					menu.tint = 0x0000FF;

        });
    }
	{
        this.input.setGlobalTopOnly(true);

        var rightbutton = this.add.image(882, 51, 'rightbutton').setScrollFactor(0);
		rightbutton.depth = 6

			rightbutton.setInteractive();
				rightbutton.on('pointerdown', function () {
					menu.tint = 0x008000;

        });
    }	

	
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
        let animation = '';
        let velocityX = 0, velocityY = 0;
        //X Axis
        if (cursors.left.isDown) {
            velocityX = -160;
            animation = 'left';
        }
        else if (cursors.right.isDown) {
            velocityX = 160;
            animation = 'right';
        }
        //Y Axis
        if (cursors.up.isDown) {
			velocityY = -160;
            if (!animation) animation = 'right';
		}
		else if (cursors.down.isDown) {
			velocityY = 160;
            if (!animation) animation = 'left';
		}
        player.setVelocityX(velocityX);
        player.setVelocityY(velocityY);
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
        player.anims.play(animation || 'turn', true);
	
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