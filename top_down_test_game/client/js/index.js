/////creating universal variables/////
const variableGroup = {
    ////Variables used by the UI Scene////
	menu: null,
    lookTab: null,
    itemsTab: null,
    spellsTab: null,
    mapTab: null,
    optionsTab: null,
    tabDisplay: null,
    numberButton: null,
	////Variables used by the Game Scene////
	player: null,
	player_id: null,
	cursors: null,
	cam1: null,
	cam2: null,
	go: null,
	controls: {},
	
	playerCount: 1,
	playerCountText: null,
	////Are these being used?////
	//let blocked;
	collider: null,
};

////having trouble putting these in the above variableGroup Constant////
let send_data = null;
let debug = false;


////create GameScene////
var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function GameScene() {
            Phaser.Scene.call(this, {key: 'GameScene', active: true});
            this.pic;
        },


    ////Load up all assets game uses before game starts ////
    preload: function () {
        ////is supposed to display loading bar? I'm not sure if this is working right....////
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
        this.load.spritesheet('dude', 'client/assets/spritesheets/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('dude2', 'client/assets/spritesheets/dude2.png', {frameWidth: 32, frameHeight: 48});

    },

    ////This function actually generates in the game what has been preloaded////
    create: function () {
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
        roof2_layer.depth = 4;
        roof2_layer.setCollision(-1);
        roof_layer.depth = 3;
        roof_layer.setCollision(-1);
        grass_layer.depth = 2;
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
        variableGroup.player = this.physics.add.sprite(4320, 4320, 'dude');
        game.physics.add.collider(variableGroup.player, ground_layer);
        /////tells game to look at arrow keys for game input/////
		variableGroup.cursors = this.input.keyboard.createCursorKeys();
        /////makes it so local player can leave the edges of the map/////
        ////also defines "hitbox" of local player and commands camera to follow////
        variableGroup.player.setSize(8, 8);
        variableGroup.player.setOffset(11, 40);
        variableGroup.player.setBounce(0.0);
        variableGroup.player.setCollideWorldBounds(false);
        variableGroup.cam1 = this.cameras.main.setSize(920, 920).startFollow(variableGroup.player).setName('Camera 1');



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
            animation = 'left';
        }
        else if (variableGroup.cursors.right.isDown) {
            velocityX = 160;
            animation = 'right';
        }
        //Y Axis
        if (variableGroup.cursors.up.isDown) {
            velocityY = -160;
            if (!animation) animation = 'right';
        }
        else if (variableGroup.cursors.down.isDown) {
            velocityY = 160;
            if (!animation) animation = 'left';
        }
		variableGroup.player.setVelocityX(velocityX);
		variableGroup.player.setVelocityY(velocityY);
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
		variableGroup.player.anims.play(animation || 'turn', true);

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

////create UiScene////
var UiScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function UiScene() {
        Phaser.Scene.call(this, {key: 'UiScene', active: true});
        this.pic;
    },
    preload: function () {
        this.load.image('menuframe', 'client/assets/images/menuframe.png', {frameWidth: 1921, frameHeight: 1041});
        this.load.image('numberbutton', 'client/assets/images/numberbutton.png');
        this.load.image('looktab', 'client/assets/images/looktab.png');
        this.load.image('lookdisplay', 'client/assets/images/lookdisplay.png');
        this.load.image('itemstab', 'client/assets/images/itemstab.png');
        this.load.image('itemsdisplay', 'client/assets/images/itemsdisplay.png');
        this.load.image('spellstab', 'client/assets/images/spellstab.png');
        this.load.image('spellsdisplay', 'client/assets/images/spellsdisplay.png');
        this.load.image('maptab', 'client/assets/images/maptab.png');
        this.load.image('mapdisplay', 'client/assets/images/mapdisplay.png');
        this.load.image('optionstab', 'client/assets/images/optionstab.png');
        this.load.image('optionsdisplay', 'client/assets/images/optionsdisplay.png');
        this.load.image('clothesavatar', 'client/assets/images/clothesavatar.png');
    },
    create: function () {
        let display = this; //Save this
        this.input.setGlobalTopOnly(true); // No idea what this does!

        //Menu
        variableGroup.menu = this.add.image(960.5, 460.5, 'menuframe').setScrollFactor(0);
        variableGroup.menu.depth = 5;
        //numberButton
        variableGroup.numberButton = this.add.image(181, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0x0000FF;
        });
        //numberButton
        variableGroup.numberButton = this.add.image(250, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0x800000;
        });
        //numberButton
        variableGroup.numberButton = this.add.image(317, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0xFFF00;
        });
        //numberButton
        variableGroup.numberButton = this.add.image(383, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0x008000;
        });
        //numberButton
        variableGroup.numberButton = this.add.image(448, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0x33FFE9;
        });
        //numberButton
        variableGroup.numberButton = this.add.image(512, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0xFCFF33;
        });
        //numberButton
        variableGroup.numberButton = this.add.image(575, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0xFF3333;
        });
        //numberButton
        variableGroup.numberButton = this.add.image(637, 903, 'numberbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.menu.tint = 0xFFFFFF;
        });
        //lookTab
        variableGroup.lookTab = this.add.image(1039, 15, 'looktab').setScrollFactor(0);
        variableGroup.lookTab.depth = 6;
        variableGroup.lookTab.setInteractive();
        variableGroup.lookTab.on('pointerdown', function () {
            console.log('look tab was pressed');
            variableGroup.tabDisplay = display.add.image(1440, 250, 'lookdisplay').setScrollFactor(0);
            variableGroup.tabDisplay.depth = 7
            //variableGroup.lookTab.tint = 0x33FFE9;
        });
        //itemsTab
        variableGroup.itemsTab = this.add.image(1176, 15, 'itemstab').setScrollFactor(0);
        variableGroup.itemsTab.depth = 6;
        variableGroup.itemsTab.setInteractive();
        variableGroup.itemsTab.on('pointerdown', function () {
            console.log('items tab was pressed');
            variableGroup.tabDisplay = display.add.image(1440, 250, 'itemsdisplay').setScrollFactor(0);
            variableGroup.tabDisplay.depth = 7
            //variableGroup.itemsTab.tint = 0x33FFE9;
        });
        //spellsTab
        variableGroup.spellsTab = this.add.image(1313, 15, 'spellstab').setScrollFactor(0);
        variableGroup.spellsTab.depth = 6;
        variableGroup.spellsTab.setInteractive();
        variableGroup.spellsTab.on('pointerdown', function () {
            console.log('spells tab was pressed');
            variableGroup.tabDisplay = display.add.image(1440, 250, 'spellsdisplay').setScrollFactor(0);
            variableGroup.tabDisplay.depth = 7
            //variableGroup.spellsTab.tint = 0x33FFE9;
        });
        //mapsTab
        variableGroup.mapTab = this.add.image(1450, 15, 'maptab').setScrollFactor(0);
        variableGroup.mapTab.depth = 6;
        console.log('map tab was pressed');
        variableGroup.mapTab.setInteractive();
        variableGroup.mapTab.on('pointerdown', function () {
            console.log('map tab was pressed');
            variableGroup.tabDisplay = display.add.image(1440, 250, 'mapdisplay').setScrollFactor(0);
            variableGroup.tabDisplay.depth = 7
            //variableGroup.mapTab.tint = 0x33FFE9;
        });
        //optionsTab
        variableGroup.optionsTab = this.add.image(1587, 15, 'optionstab').setScrollFactor(0);
        variableGroup.optionsTab.depth = 6;
        variableGroup.optionsTab.setInteractive();
        variableGroup.optionsTab.on('pointerdown', function () {
            console.log('options tab was pressed');
            variableGroup.tabDisplay = display.add.image(1440, 250, 'optionsdisplay').setScrollFactor(0);
            variableGroup.tabDisplay.depth = 7
            //variableGroup.optionsTab.tint = 0x33FFE9;
        });
        //clothesButton
        let clothesButton = this.add.image(48, 903, 'numberbutton').setScrollFactor(0);
        clothesButton.depth = 6;
        clothesButton.setInteractive();
        clothesButton.on('pointerdown', function () {
            //variableGroup.tabDisplay = this.add.image(81, 792, 'clothesavatar').setScrollFactor(0);
            clothesButton.tint = 0x0000FF;
        });
    },
});
/////configuring game state/////
const config = {
    type: Phaser.AUTO,
    width: 1921,
    height: 1041,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene:
        [GameScene, UiScene]
};
const Game = new Phaser.Game(config);