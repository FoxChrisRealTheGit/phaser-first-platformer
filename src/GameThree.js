window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default function FirstPlatformerThree() {
    var game = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'myCanvas', {
        preload: preload, create: create, update: update
    })
    var player;
    var platforms;
    var clouds;
    var cursors;
    var background;
    var trees;

    function preload() {
        game.load.image('platform', 'img/platform.png');
        game.load.image('cloud-platform', 'img/cloud-platform.png')
        game.load.spritesheet('dude', 'img/dude.png', 32, 48);
        game.load.image('trees', 'img/trees.png');
        game.load.image('background', 'img/background.png');
    }

    function create() {
        game.world.setBounds(0, 0, 1920, 1920);
        background = this.add.tileSprite(0, 0, 640, 480, 'background').scale.setTo(3.5, 3.5);
        background.fixedToCamera = true;
        game.physics.startSystem(window.Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();

        clouds = this.add.group();
        clouds.enableBody = true;
        // clouds.body.allowGravity = false;

        var cloud1 = clouds.create(300, 450, 'cloud-platform');
        cloud1.body.immovable = true;
        var cloud1 = clouds.create(450, 550, 'cloud-platform');
        cloud1.body.immovable = true;
        //[
        //     { x: "+200", xSpeed: 2000, xEase: "Linear", y: "-200", ySpeed: 2000, yEase: "Sine.easeIn" },
        //     { x: "-200", xSpeed: 2000, xEase: "Linear", y: "-200", ySpeed: 2000, yEase: "Sine.easeOut" },
        //     { x: "-200", xSpeed: 2000, xEase: "Linear", y: "+200", ySpeed: 2000, yEase: "Sine.easeIn" },
        //     { x: "+200", xSpeed: 2000, xEase: "Linear", y: "+200", ySpeed: 2000, yEase: "Sine.easeOut" }
        // ]);


        /* below is the player instance */
        player = game.add.sprite(300, 300, 'dude');
        game.physics.arcade.enable(player);

        //player.body.bounce.y = 0.2;
        player.body.gravity.y = 500;
        player.body.collideWorldBounds = true;
       
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        game.camera.follow(player)
    }
    function update() {
        game.physics.arcade.collide(player, clouds)
        //background.tilePosition.x = -(this.camera.x * 0.7);
        //trees.tilePosition.x = -(this.camera.x * 0.9);

        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            player.body.velocity.x = -150;
            player.animations.play('left');
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 150;
            player.animations.play('right');
        } else {
            player.animations.stop();
            player.frame = 4;
        }
        //below is code for jumping
        if (cursors.up.isDown && player.body.touching.down) {
            player.body.velocity.y = -350;
        } else if (cursors.down.isDown && !player.body.touching.down) {
            player.body.velocity.y = 550;
        }
    }

    // function CloudPlatform(game, x, y, key, group) {
    //     if (typeof group === 'undefined') {
    //         group = game.world;
    //     }
    //     window.Phaser.Sprite.call(this, game, x, y, key);
    //     game.physics.arcade.enable(this);

    //     this.anchor.x = 0.5;
    //     this.body.customSeparateX = true;
    //     this.body.customSeparateY = true;
    //     this.body.allowGravity = false;
    //     this.body.immovable = true;
    //     //this.playerLocked = false;
    //     group.add(this);
    // }


}