"use strict";
/////creating universal variables/////
const variableGroup = {
	////Variables used by LoginScene////
	characterButton: null,
	characterSelect: null,
	headArrow: null,
	headSelect: null,
	headSelectIcon: null,
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
	playerObject: null,
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

//Object with all UI related variables / functions
let ui = {
    dragging: {
        element: null, //Element being dragged
		offsetX: 0, offsetY: 0, //Difference between mouse location and topleft of element
        startDragging: function (e) {
            let possibleElement = $(this).closest(".draggable"), offset;
            if (e.which !== 1 || typeof possibleElement === 'undefined' || ui.dragging.element !== null) return;
            e.preventDefault();
            ui.dragging.element = possibleElement[0];
            offset = possibleElement.offset(); //Offset of the element's topLeft corner
            ui.dragging.offsetX = e.clientX - offset.left;
            ui.dragging.offsetY = e.clientY - offset.top;
            $(document).mouseup(ui.dragging.stopDragging);
            $(document).mousemove(ui.dragging.movement);
        },
        stopDragging: function (e) {
            $(document).off('mousemove', ui.dragging.movement);
            ui.dragging.element = null;
        },
        movement: function (e) {
            ui.dragging.element.style.left = e.clientX - ui.dragging.offsetX + 'px';
            ui.dragging.element.style.top = e.clientY - ui.dragging.offsetY + 'px';
        }
    }
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

//Stuff in the jQuery $() function runs after everything else has loaded
$(function(){
    $('#ui .dragFrom').mousedown(ui.dragging.startDragging);
    $('#uiLogin_loginButton').click(function() {
    	let username = $('#uiLogin_username').val();
    	if (typeof username !== 'string' || username === '') username = 'anon';
        variableGroup.ioSystem.emit('login', {user:username});
        Game.scene.start('LoginScene');
        //TODO: Login - Error handling if server rejects such
        $('#uiLogin').hide();
	});
});