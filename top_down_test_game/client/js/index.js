/////creating universal variables/////
const variableGroup = {
	////Variables used by LoginScene////
	characterButton: null,
	characterSelect: null,
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
	playerHead: null,
	playerBody: null,
	moveLeft: null,
	leftBody: null,
	leftHead: null,
	moveRight: null,
	rightBody: null,
	rightHead: null,
	standStill: null,
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
    //Endpoints for communication - These look like different connections but sockets.io will share one
    ioSystem: null,
    ioGame: null,
    ioChat: null
};

////having trouble putting these in the above variableGroup Constant////
let send_data = null;
let debug = false;

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
	////this lists all the scenes there are in the game to be referenced later////
	////only launches scenes that have "active" set to "true"////
        [BootScene, LoginScene, GameScene, UiScene]
};
const Game = new Phaser.Game(config);