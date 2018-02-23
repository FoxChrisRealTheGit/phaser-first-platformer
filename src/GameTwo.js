window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default function FirstPlatformerTwo() {
    var game = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'myCanvas', {
        preload: preload, create: create, update: update
    })
    var player;
    var platforms;
    var cursors;

    function preload() {
        game.load.image('ice-platform', 'img/ice-platform.png');
        game.load.image('not-ice-platform', 'img/not-ice-platform.png');
        game.load.image('background', 'img/background.png')
        game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    }
    function create() {
        game.physics.startSystem(window.Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'background').scale.setTo(2, 2);
        cursors = game.input.keyboard.createCursorKeys();

    

        platforms = this.add.group();
        platforms.enableBody = true;
        var ice1 = platforms.create(0, 64, 'ice-platform');
        //ice1.body.immovable = true;
        var plat1 = platforms.create(200, 180, 'not-ice-platform');
        //plat1.body.immovable = true;
        ice1 = platforms.create(400, 296, 'ice-platform');
        ice1.body.friction.x = 0.5;
        plat1 = platforms.create(600, 412, 'not-ice-platform');

        platforms.setAll('body.allowGravity', false);
       platforms.setAll('body.immovable', true);
        platforms.setAll('body.velocity.x', 100);

        /* below is the player instance */
        player = game.add.sprite(700, 300, 'dude');
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = false;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

    }
    function update() {
        platforms.forEach(wrapPlatform, this)
        game.physics.arcade.collide(player, platforms);
    //    this.physics.arcade.collide(
    //         player, platforms,
    //         setFriction, null, this
    //     );
        //var standing = player.body.blocked.down || player.body.touching.down;
        //game.sky.tilePosition.y = -(game.camera.y * 0.7);
        
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

    // function setFriction(player, platforms) {
    //     if (platforms.key === 'ice-platform') {
    //         player.body.x -= platforms.body.x - platforms.body.prev.x
    //     }
    // }

     function wrapPlatform(platform) {

        if (platform.body.velocity.x < 0 && platform.x <= -160)
        {
            platform.x = 840;
        }
        else if (platform.body.velocity.x > 0 && platform.x >= 840)
        {
            platform.x = -160;
        }

    }

}