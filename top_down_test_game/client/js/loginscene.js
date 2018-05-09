////create LoginScene////
var LoginScene = new Phaser.Class({
	Extends: Phaser.Scene,
	initialize:
		function LoginScene() {
			Phaser.Scene.call(this, {key: 'LoginScene', active: false});
			this.pic;
		},

	////creates login button and launches GameScene when button is clicked////
	create: function () {
		console.log('LoginScene Started');
		let buttonPress = this;
		variableGroup.ioSystem.on('login', (response) => { //TODO: Handle login response from server
			////launch only if new login with no saved sprite////
			variableGroup.characterSelect = this.add.image(900, 500, 'characterselect').setScrollFactor(0);

			////Head Selection////
			////Create clickable left arrow////
			variableGroup.headSelect = 1;
			variableGroup.headArrow = this.add.image(1048, 378, 'leftarrow').setScrollFactor(0);
			variableGroup.headArrow.depth = 10;
			variableGroup.headArrow.setInteractive();
			variableGroup.headArrow.on('pointerdown', function () {
				////subtract 1 value to headArrow variable////
				if (variableGroup.headSelect <= 1) {
					console.log('headSelect is <= 1');
				}
					else {
						variableGroup.headSelect--;
						console.log('headSelect = ', variableGroup.headSelect);
					}
			});
			////Create clickable right arrow////
			variableGroup.headArrow = this.add.image(1298, 378, 'rightarrow').setScrollFactor(0);
			variableGroup.headArrow.depth = 10;
			variableGroup.headArrow.setInteractive();
			variableGroup.headArrow.on('pointerdown', function () {
				////add 1 value to headArrow variable////
				if (variableGroup.headSelect >= 3) {
					console.log('headSelect is >= 3');
				}
					else {
						variableGroup.headSelect++;
						console.log('headSelect = ', variableGroup.headSelect);
					}
			});					
			////Create "finish" button to start the game with selected character////
			variableGroup.characterSelect.depth = 7;
			variableGroup.characterButton = this.add.image(866, 675, 'numberbutton').setScrollFactor(0);
			variableGroup.characterButton.depth = 8;
			variableGroup.characterButton.setInteractive();
				variableGroup.characterButton.on('pointerdown', function () {
					////scene.start replaces old scenes with started scene////
					buttonPress.scene.start('GameScene');
				});
		});
	},
	
	update: function () {
		////this moniters the "headSelect" variable and will display different images depending on it's value
		////headSelect will later be used to define what animations are being used in GameScene.js
		if (variableGroup.headSelect == 1) {
			variableGroup.headSelectIcon = this.add.image(1170, 378, 'headselectpurple').setScrollFactor(0);
			variableGroup.headSelectIcon.depth = 10;
			//console.log('displaying purple head');
		}
		if (variableGroup.headSelect == 2) {
			variableGroup.headSelectIcon = this.add.image(1170, 378, 'headselectblue').setScrollFactor(0);
			variableGroup.headSelectIcon.depth = 10;
			//console.log('displaying blue head');
		}
		if (variableGroup.headSelect == 3) {
			variableGroup.headSelectIcon = this.add.image(1170, 378, 'headselectgreen').setScrollFactor(0);
			variableGroup.headSelectIcon.depth = 10;
			//console.log('displaying green head');
		}	
	},
});