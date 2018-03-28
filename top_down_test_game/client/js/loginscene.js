////create LoginScene////
var LoginScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function LoginScene() {
			////because active is set to true, scene launches instantly////
            Phaser.Scene.call(this, {key: 'LoginScene', active: true});
            this.pic;
        },

	////preloads clickable login button ////
	preload: function () {
		console.log('LoginScene Started');
		this.load.image('loginbutton', 'client/assets/images/loginbutton.png');
	},
	////creates login button and launches GameScene when button is clicked////
    create: function () {
		//loginButton
		let start = this;
        variableGroup.numberButton = this.add.image(900, 500, 'loginbutton').setScrollFactor(0);
        variableGroup.numberButton.depth = 6;
        variableGroup.numberButton.setInteractive();
        variableGroup.numberButton.on('pointerdown', function () {
			////scene.start replaces old scenes with started scene////
            start.scene.start('GameScene')
		});
	},	
});