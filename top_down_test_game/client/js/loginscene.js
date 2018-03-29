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
		//loginButton
		let buttonPress = this;
        variableGroup.numberButton = this.add.image(900, 500, 'loginbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
            variableGroup.ioSystem.emit('login', {user:'Pending'}); //TODO: Fill out login request from client
		});
        variableGroup.ioSystem.on('login', (response) => { //TODO: Handle login response from server
		////launch only if new login with no saved sprite////
			variableGroup.characterSelect = this.add.image(900, 500, 'characterselect').setScrollFactor(0);
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
});