Slooow.multiplayerState = function (game) {
    
}
var background
Slooow.multiplayerState.prototype = {

    init: function () {
        //if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **MULTIPLAYER** state");
        //}
        game.world.setBounds(0, 0, 8640, 1600);
    },

    preload: function () {

        // Cargamos el background
        background = game.add.tileSprite(0, game.world.height, 8640, 1600, 'cocinaBg')
        background.anchor.set(0, 1)
        background.tileScale.setTo(1.99, 2)

        game.global.maxStamina = 0

        console.log('array players')
        console.log(game.global.playersMulti.length)
        console.dir(game.global.playersMulti)

        // Cargamos los objetos posibles del mapa
        for (var i = 0; i < game.global.arrayGrounds.length; i++) {
            game.global.arrayGrounds[i] = game.add.tileSprite(game.global.arrayGrounds[i].x, game.world.height - game.global.arrayGrounds[i].y + 25, game.global.arrayGrounds[i].width, 25, 'groundTile')
            game.global.arrayGrounds[i].visible = true
            game.global.arrayGrounds[i].anchor.setTo(0, 1)
            game.global.arrayGrounds[i].tileScale.setTo(0.5, 0.5)
        }

        //Pintamos las paredes
        for (var i = 0; i < game.global.arrayWalls.length; i++) {
            game.global.arrayWalls[i] = game.add.tileSprite(game.global.arrayWalls[i].x, game.world.height - game.global.arrayWalls[i].y, game.global.arrayWalls[i].width, game.global.arrayWalls[i].height, 'wallTile')
            game.global.arrayWalls[i].visible = true
            game.global.arrayWalls[i].anchor.setTo(0, 1)
            game.global.arrayWalls[i].tileScale.setTo(0.5, 0.5)
        }

        //Pintamos las cuestas
        for (var i = 0; i < game.global.arraySlopes.length; i++) {
            var angulo = game.global.arraySlopes[i].height
            game.global.arraySlopes[i] = game.add.image(game.global.arraySlopes[i].x, game.world.height - game.global.arraySlopes[i].y - 25, 'slopeDown')
            game.global.arraySlopes[i].anchor.setTo(0.0, 0.0)

            if (angulo < 0) {
                game.global.arraySlopes[i].angle += - angulo
            } else {
                game.global.arraySlopes[i].angle -= angulo
            }
            game.global.arraySlopes[i].visible = true
            game.global.arraySlopes[i].scale.setTo(0.5, 0.5)
        }

        //Pintamos las trampillas
        for (var i = 0; i < game.global.arrayTrapdoors.length; i++) {
            game.global.arrayTrapdoors[i] = game.add.image(game.global.arrayTrapdoors[i].x, game.world.height/*game.world.getBounds().y*/ - game.global.arrayTrapdoors[i].y, 'trapdoor')
            game.global.arrayTrapdoors[i].frame = 0
            game.global.arrayTrapdoors[i].visible = true
            game.global.arrayTrapdoors[i].anchor.setTo(0, 0)
            game.global.arrayTrapdoors[i].scale.setTo(0.21, 0.3)
        }

        //Pintamos trampolines
        for (var i = 0; i < game.global.arrayTrampolines.length; i++) {
            game.global.arrayTrampolines[i] = game.add.image(game.global.arrayTrampolines[i].x, game.world.height - game.global.arrayTrampolines[i].y - 150, 'sartenSpritesheet')
            game.global.arrayTrampolines[i].frame = 0
            game.global.arrayTrampolines[i].animations.add('activate')
            game.global.arrayTrampolines[i].visible = true
            game.global.arrayTrampolines[i].anchor.setTo(0, 0)
            game.global.arrayTrampolines[i].scale.setTo(1, 1)
        }

        //Pintamos obstaculos
        for (var i = 0; i < game.global.arrayObstacles.length; i++) {
            game.global.arrayObstacles[i] = game.add.image(game.global.arrayObstacles[i].x, game.world.height - game.global.arrayObstacles[i].y - 20, 'fireSpritesheet')
            game.global.arrayObstacles[i].frame = 0;
            game.global.arrayObstacles[i].animations.add('stopped', [0], 1, false)
            game.global.arrayObstacles[i].animations.add('sparks', [1, 2], 4, true)
            game.global.arrayObstacles[i].animations.add('fire', [3, 4, 5], 6, true)
            game.global.arrayObstacles[i].visible = true
            game.global.arrayObstacles[i].anchor.setTo(0, 0.5)
            game.global.arrayObstacles[i].scale.setTo(0.6, 0.6)
        }

        //Pintamos power ups
        for (var i = 0; i < game.global.arrayPowerUps.length; i++) {
            game.global.arrayPowerUps[i] = game.add.image(game.global.arrayPowerUps[i].x, game.world.height - game.global.arrayPowerUps[i].y, 'boxPowerUpSpritesheet')
            game.global.arrayPowerUps[i].animations.add('turn')
            game.global.arrayPowerUps[i].animations.play('turn', 4, true)
            game.global.arrayPowerUps[i].visible = true
            game.global.arrayPowerUps[i].anchor.setTo(0.5, 0.5)
            game.global.arrayPowerUps[i].scale.setTo(0.15, 0.15)
        }

        //Pintamos puertas
        for (var i = 0; i < game.global.arrayDoors.length; i++) {
            game.global.arrayDoors[i] = game.add.image(game.global.arrayDoors[i].x - 14, game.world.height - game.global.arrayDoors[i].y + 25, 'doorSpritesheet')
            game.global.arrayDoors[i].frame = 1
            game.global.arrayDoors[i].visible = true
            game.global.arrayDoors[i].anchor.setTo(0, 1)
            game.global.arrayDoors[i].scale.setTo(0.35, 0.35)
        }

        //Pintamos viento
        for (var i = 0; i < game.global.arrayWinds.length; i++) {
            game.global.arrayWinds[i] = game.add.image(game.global.arrayWinds[i].x + 200, game.world.height - game.global.arrayWinds[i].y, 'windSpritesheet')
            game.global.arrayWinds[i].angle = 180
            game.global.arrayWinds[i].animations.add('wind', [0, 1, 2, 3, 4, 5], 4, true)
            game.global.arrayWinds[i].animations.add('windReverse', [5, 4, 3, 2, 1, 0], 4, true)
            if (game.global.arrayWinds[i].direction == true) {
                game.global.arrayWinds[i].animations.play('wind')
            } else {
                game.global.arrayWinds[i].angle = 0
                game.global.arrayWinds[i].animations.play('wind')
            }
            game.global.arrayWinds[i].visible = true
            game.global.arrayWinds[i].anchor.setTo(0.5, 0.5)
            game.global.arrayWinds[i].scale.setTo(1, 0.4)
        }

        //Pintamos el objeto de meta
        if (game.global.finishObject != undefined) {
            var y = game.world.height - game.global.finishObject.y
            game.global.finishObject = game.add.image(game.global.finishObject.x, game.world.height - game.global.finishObject.y, 'finishObject')
            game.global.finishObject.visible = true
            game.global.finishObject.anchor.setTo(0, 1)
            game.global.finishObject.scale.setTo(0.5, 0.5)
            var finishGround = game.add.image(game.global.finishObject.x, y, 'finishGround')
            finishGround.visible = true
            finishGround.anchor.setTo(0, 0)
            finishGround.scale.setTo(0.5, 0.5)
        }

        //Pintamos los caracoles que no eres tu (vas por detras de ti)
        for (var i = 0; i < game.global.playersMulti.length; i++) {
            if (i != game.global.myPlayerId) {
                switch (game.global.snailChosenMulti[i]) {
                    case ('NORMAL'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'normalColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 5), 5, true);
                        break
                    case ('TANK'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'tanqueColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 4), 5, true);
                        break
                    case ('BAGUETTE'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'baguetteColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 4), 5, true);
                        break;
                    case ('MIAU'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'miauColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                        break;
                    case ('MERCA'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'mercaColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                        break;
                    case ('SEA'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'seaColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 3), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                        break;
                    case ('ROBA'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'robaColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 3), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                        break;
                    case ('IRIS'):
                        game.global.playersMulti[i].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'irisColAnimation')
                        game.global.playersMulti[i].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 3), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                        game.global.playersMulti[i].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 2), 5, true);
                        break;
                    default:
                }
            }
        }

        //Pintamos tu caracol
        switch (game.global.snailChosenMulti[game.global.myPlayerId]) {
            case ('NORMAL'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'normalColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 5), 5, true);
                break
            case ('TANK'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'tanqueColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 4), 5, true);
                break
            case ('BAGUETTE'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'baguetteColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 4), 5, true);
                break;
            case ('MIAU'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'miauColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                break;
            case ('MERCA'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'mercaColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                break;
            case ('SEA'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'seaColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 3), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                break;
            case ('ROBA'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'robaColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 3), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 3), 5, true);
                break;
            case ('IRIS'):
                game.global.playersMulti[game.global.myPlayerId].sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'irisColAnimation')
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 3), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 3), 5, true);
                game.global.playersMulti[game.global.myPlayerId].sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 2), 5, true);
                break;
            default:
        }

        //Iniciamos las animaciones
        for (var i = 0; i < game.global.playersMulti.length; i++) {
            game.global.playersMulti[i].sprite.animations.play('walk');
            game.global.playersMulti[i].sprite.anchor.setTo(0.5, 0.5);
            game.global.playersMulti[i].sprite.scale.setTo(0.28, 0.28)
        }

        //Barra de estamina
        game.global.playersMulti[game.global.myPlayerId].stamina3 = game.add.sprite(10, 0, 'barStaminaInterior')
        game.global.playersMulti[game.global.myPlayerId].stamina3.anchor.set(0, 0);
        game.global.playersMulti[game.global.myPlayerId].stamina3.scale.setTo(0.5, 0.5);

        game.global.playersMulti[game.global.myPlayerId].stamina2 = game.add.sprite(28, 20, 'barStamina')
        game.global.playersMulti[game.global.myPlayerId].stamina2.anchor.set(0, 0);
        game.global.playersMulti[game.global.myPlayerId].stamina2.scale.setTo(0.5, 0.5);

        game.global.playersMulti[game.global.myPlayerId].stamina1 = game.add.sprite(10, 0, 'barStaminaFuera')
        game.global.playersMulti[game.global.myPlayerId].stamina1.anchor.set(0, 0);
        game.global.playersMulti[game.global.myPlayerId].stamina1.scale.setTo(0.5, 0.5);

        game.global.playersMulti[game.global.myPlayerId].stamina3.fixedToCamera = true;
        game.global.playersMulti[game.global.myPlayerId].stamina2.fixedToCamera = true;
        game.global.playersMulti[game.global.myPlayerId].stamina1.fixedToCamera = true;

        // Creacion de la barra de progreso
        game.global.playersMulti[game.global.myPlayerId].progressBar1 = game.add.sprite(game.width / 3, 20, 'barProgressInteriorColor')
        game.global.playersMulti[game.global.myPlayerId].progressBar2 = game.add.sprite(game.width / 3, 20, 'barProgressInteriorNegra')
        game.global.playersMulti[game.global.myPlayerId].progressBar3 = game.add.sprite(game.width / 3, 20, 'barProgressFuera')

        game.global.playersMulti[game.global.myPlayerId].progressBar2.x += game.global.playersMulti[game.global.myPlayerId].progressBar2.width
        game.global.playersMulti[game.global.myPlayerId].progressBar2.anchor.setTo(1, 0)

        game.global.playersMulti[game.global.myPlayerId].progressBar1.fixedToCamera = true;
        game.global.playersMulti[game.global.myPlayerId].progressBar2.fixedToCamera = true;
        game.global.playersMulti[game.global.myPlayerId].progressBar3.fixedToCamera = true;

        //Power Ups en pantalla
        game.global.playersMulti[game.global.myPlayerId].powerUpsContainer = game.add.sprite(game.width - 150, 50, 'powerUpsContainer')
        game.global.playersMulti[game.global.myPlayerId].powerUpsContainer.scale.setTo(0.5, 0.5)
        //game.global.player.powerUpsContainer.anchor.setTo(0.5, 0.5)
        game.global.playersMulti[game.global.myPlayerId].powerUpsContainer.fixedToCamera = true

        game.global.playersMulti[game.global.myPlayerId].wingPowerUp = game.add.sprite(game.width - 140, 60, 'wingsPowerUp')
        game.global.playersMulti[game.global.myPlayerId].wingPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].wingPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].wingPowerUp.fixedToCamera = true

        game.global.playersMulti[game.global.myPlayerId].shieldPowerUp = game.add.sprite(game.width - 140, 60, 'shieldPowerUp')
        game.global.playersMulti[game.global.myPlayerId].shieldPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].shieldPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].shieldPowerUp.fixedToCamera = true
        game.global.playersMulti[game.global.myPlayerId].staminaPowerUp = game.add.sprite(game.width - 130, 60, 'staminaPowerUp')
        game.global.playersMulti[game.global.myPlayerId].staminaPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].staminaPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].staminaPowerUp.fixedToCamera = true
        game.global.playersMulti[game.global.myPlayerId].lettucePowerUp = game.add.sprite(game.width - 140, 60, 'lettucePowerUp')
        game.global.playersMulti[game.global.myPlayerId].lettucePowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].lettucePowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].lettucePowerUp.fixedToCamera = true
        game.global.playersMulti[game.global.myPlayerId].onPowerUp = game.add.sprite(game.width - 140, 50, 'onPowerUp')
        game.global.playersMulti[game.global.myPlayerId].onPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].onPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].onPowerUp.fixedToCamera = true
        game.global.playersMulti[game.global.myPlayerId].downPowerUp = game.add.sprite(game.width - 140, 45, 'downUp')
        game.global.playersMulti[game.global.myPlayerId].downPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].downPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].downPowerUp.fixedToCamera = true
        game.global.playersMulti[game.global.myPlayerId].clockPowerUp = game.add.sprite(game.width - 135, 65, 'clockPowerUp')
        game.global.playersMulti[game.global.myPlayerId].clockPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].clockPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].clockPowerUp.fixedToCamera = true
        game.global.playersMulti[game.global.myPlayerId].inkPowerUp = game.add.sprite(game.width - 140, 60, 'inkPowerUp')
        game.global.playersMulti[game.global.myPlayerId].inkPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].inkPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].inkPowerUp.fixedToCamera = true
        game.global.playersMulti[game.global.myPlayerId].speedPowerUp = game.add.sprite(game.width - 140, 60, 'speedPowerUp')
        game.global.playersMulti[game.global.myPlayerId].speedPowerUp.visible = false
        game.global.playersMulti[game.global.myPlayerId].speedPowerUp.scale.setTo(0.4, 0.4)
        game.global.playersMulti[game.global.myPlayerId].speedPowerUp.fixedToCamera = true

        game.global.loading = game.add.sprite(game.global.playersMulti[game.global.myPlayerId].sprite.x +400, game.global.playersMulti[game.global.myPlayerId].sprite.y+100, 'loading')
        game.global.loading.anchor.setTo(0.5)
        game.global.loading.visible = true
		game.global.loading.height = this.game.height;
        game.global.loading.width = this.game.width;
        game.global.loadingAnim = game.global.loading.animations.add ('move')
        game.global.loadingAnim.play (8, true)

    },

    create: function () {

        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);

        this.tapping = game.input.pointer1;
    },

    // Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
    update: function () {

        let msg = {
            event: 'UPDATEINPUT',
            isSprinting: false,
            useObject: false
        }
        if (this.wKey.isDown && this.wKey.duration <= 100) {
            msg.isSprinting = true;
        }

        if (this.wKey.isDown && this.wKey.duration > 300) {
            msg.useObject = true;
        }

        if (game.input.pointer1.isDown && game.input.pointer1.duration <= 100) {
            msg.isSprinting = true;
        }

        if (game.input.pointer1.isDown && game.input.pointer1.duration > 300) {
            msg.useObject = true;
        }
        game.global.socket.send(JSON.stringify(msg))

        game.camera.focusOnXY(game.global.playersMulti[game.global.myPlayerId].sprite.x + 400, game.global.playersMulti[game.global.myPlayerId].sprite.y + 100);

        for (var i = 0; i < game.global.playersMulti.length; i++) {
            if (this.game.global.haveToRotateToWallMulti[i] == true) {
                if (game.global.playersMulti[i].sprite.angle > -90) {
                    game.global.playersMulti[i].sprite.angle -= 2
                } else {
                    game.global.haveToRotateToWallMulti[i] = false
                    game.global.playersMulti[i].sprite.angle = -90
                }
            }
            if (game.global.haveToRotateToGroundMulti[i] == true) {
                if (game.global.playersMulti[i].sprite.angle < -2) {
                    game.global.playersMulti[i].sprite.angle += 2
                } else if (game.global.playersMulti[i].sprite.angle > 2) {
                    game.global.playersMulti[i].sprite.angle -= 2
                } else {
                    game.global.haveToRotateToGroundMulti[i] = false
                    game.global.playersMulti[i].sprite.angle = 0
                }
            }
            if (game.global.haveToRotateToSlopeMulti[i] == true) {
                // El angulo que me pasa va desde -90 a 90
                // Cuando me llega un 45, realmente tengo que girarlo hasta -45

                //Cuesta hacia arriba
                if (game.global.degreesToRotateSlopeMulti[i] > 0) {
                    if (game.global.playersMulti[i].sprite.angle > -game.global.degreesToRotateSlopeMulti[i]) {
                        game.global.playersMulti[i].sprite.angle -= 3
                        game.global.playersMulti[i].sprite.angle = Math.round(game.global.playersMulti[i].sprite.angle)
                    } else {
                        game.global.playersMulti[i].sprite.angle = -game.global.degreesToRotateSlopeMulti[i]
                        game.global.haveToRotateToSlopeMulti[i] = false
                        game.global.degreesToRotateSlopeMulti[i] = 0
                    }
                }
                // Cuesta hacia abajo
                else {
                    if (game.global.playersMulti[i].sprite.angle < -game.global.degreesToRotateSlopeMulti[i]) {
                        game.global.playersMulti[i].sprite.angle += 3
                        game.global.playersMulti[i].sprite.angle = Math.round(game.global.playersMulti[i].sprite.angle)
                    } else {
                        game.global.playersMulti[i].sprite.angle = -game.global.degreesToRotateSlopeMulti[i]
                        game.global.haveToRotateToSlopeMulti[i] = false
                        game.global.degreesToRotateSlopeMulti[i] = 0
                    }
                }
            }

            //Comprobamos si hay algun power up activo para quitarle opacidad poco a poco
            if (game.global.playersMulti[i].sprite.children.length > 0) {
                game.global.playersMulti[i].sprite.children[0].alpha -= 0.005
                if (game.global.playersMulti[i].sprite.children[0].alpha < 0.01) {
                    game.global.playersMulti[i].sprite.children[0].destroy()
                }
            }
        }
    }
}