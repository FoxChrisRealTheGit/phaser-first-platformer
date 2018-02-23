window.PIXI = require('phaser-ce/build/custom/pixi');
window.p2 = require('phaser-ce/build/custom/p2');
window.Phaser = require('phaser-ce/build/custom/phaser-split');

export default function FirstPlatformer() {
    var game = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'myCanvas', {
        preload: preload, create: create, update: update
    })

    var platforms;
    var cursors;
    var player;
    var stars;
    var score = 0;
    var scoreText;

    function preload() {
        game.load.image('sky', 'img/sky.png');
        game.load.image('ground', 'img/platform.png');
        game.load.image('star', 'img/star.png');
        game.load.spritesheet('dude', 'img/dude.png', 32, 48);
    }
    function create() {
        cursors = game.input.keyboard.createCursorKeys();
        
        game.physics.startSystem(window.Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'sky');
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        platforms = game.add.group();
        platforms.enableBody = true;
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        var ledge = platforms.create(400, 400, 'ground');
        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        /* below is stars*/
        stars = game.add.group();
        stars.enableBody = true;
        for (var i = 0; i < 12; i += 1) {
            var star = stars.create(i * 70, 0, 'star');
            star.body.gravity.y = 400;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        /* below is the player instance */
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

    }
    function update() {
        var hitPlatform = game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.overlap(player, stars, collectStar, null, this);
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
        if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -350;
        } else if (cursors.down.isDown && !player.body.touching.down) {
            player.body.velocity.y = 350;
        }
        if(score === 120){
            winLevel();
        }

    }
    function collectStar(player, star) {
        star.kill();
        score += 10;
        scoreText.text = 'Score: ' + score;
    }
    function winLevel(){
        window.alert('You win!');
        document.location.reload();
    }

}