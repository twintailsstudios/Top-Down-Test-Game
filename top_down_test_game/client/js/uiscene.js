////create UiScene////
var UiScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function UiScene() {
		////active is set to false here, so it waits for a command to launch////
        Phaser.Scene.call(this, {key: 'UiScene', active: false});
        this.pic;
    },

    create: function () {
		console.log('UiScene Started');
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