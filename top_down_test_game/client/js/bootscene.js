////create BootScene////
var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function BootScene() {
			////because active is set to true, scene launches instantly////
            Phaser.Scene.call(this, {key: 'BootScene', active: true});
        },
		
    ////Load up all assets game uses before game starts ////
    preload: function () {
		console.log('Preloader started..');
		boot = this;
		//boot.load.image('preloader-bar', 'client/assets/images/preloader-bar.png');
        let progressBar = this.add.graphics();
        let progressBarHolder = this.add.graphics();
        progressBarHolder.fillStyle(0x222222, 0.8);
        progressBarHolder.fillRect(735, 270, 320, 50);
        /* //This seems to tick through individual files, which isn't so useful.
        boot.load.on('fileprogress', function (file, value) {
            console.log("File progress event: ", file, ", ", value);
        }); */
        //This seems to capture a total ratio (between 0.0 and 1.0)
        boot.load.on('progress', function (ratio) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(745, 280, 300 * ratio, 30);
        });

        boot.load.on('complete', function () {
            progressBar.destroy();
            progressBarHolder.destroy();
        });
		
        //This loads the tilesheet that the map uses to generate pictures////
        boot.load.image('spritesheet', 'client/assets/images/spritesheet.png');

        //This loads the map json file that says what coordinates have what pictures////
        boot.load.tilemapTiledJSON('level_2', 'client/assets/tilemaps/level2.json');

        //loads song file////
        boot.load.audio('bgm_calm', 'client/assets/music/Electrodoodle.mp3');

        //loads sprite files to be used for players////
        boot.load.spritesheet('dude', 'client/assets/spritesheets/dude.png', {frameWidth: 32, frameHeight: 48});
        boot.load.spritesheet('dude2', 'client/assets/spritesheets/dude2.png', {frameWidth: 32, frameHeight: 48});
		
		////preloads clickable login button ////
		boot.load.image('loginbutton', 'client/assets/images/loginbutton.png');
		boot.load.image('characterselect', 'client/assets/images/characterselect.png');

        //preloading menu assets////
        boot.load.image('menuframe', 'client/assets/images/menuframe.png', {frameWidth: 1921, frameHeight: 1041});
        boot.load.image('numberbutton', 'client/assets/images/numberbutton.png');
        boot.load.image('looktab', 'client/assets/images/looktab.png');
        boot.load.image('lookdisplay', 'client/assets/images/lookdisplay.png');
        boot.load.image('itemstab', 'client/assets/images/itemstab.png');
        boot.load.image('itemsdisplay', 'client/assets/images/itemsdisplay.png');
        boot.load.image('spellstab', 'client/assets/images/spellstab.png');
        boot.load.image('spellsdisplay', 'client/assets/images/spellsdisplay.png');
        boot.load.image('maptab', 'client/assets/images/maptab.png');
        boot.load.image('mapdisplay', 'client/assets/images/mapdisplay.png');
        boot.load.image('optionstab', 'client/assets/images/optionstab.png');
        boot.load.image('optionsdisplay', 'client/assets/images/optionsdisplay.png');
        boot.load.image('clothesavatar', 'client/assets/images/clothesavatar.png');
    },
    create: function() {
        variableGroup.ioSystem = io(location.host); //Connect here, since we may eventually do MOTD type things before login
        boot.scene.start('LoginScene');
    }
});

	