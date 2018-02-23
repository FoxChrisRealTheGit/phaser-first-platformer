window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default function FirstPlatformerThree() {
    var game = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'myCanvas', {
        preload: preload, create: create, update: update
    })
    var player;
    var platforms;
    var cursors;

    function preload() {
        game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    }
    function create() {
        game.physics.startSystem(window.Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();

        /* below is the player instance */
        player = game.add.sprite(700, 300, 'dude');
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    }
    function update() {


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
            player.body.velocity.y = 350;
        }
    }

}