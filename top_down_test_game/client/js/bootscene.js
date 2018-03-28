////create BootScene////
var BootScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
        function BootScene() {
			////because active is set to true, scene launches instantly////
            Phaser.Scene.call(this, {key: 'BootScene', active: true});
            this.pic;
        },
		
    ////Load up all assets game uses before game starts ////
    preload: function () {
		console.log('loading assets');
		this.load.image('preloader-bar', 'client/assets/images/preloader-bar.png');
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
		
		////preloading menu assets////
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
});

	