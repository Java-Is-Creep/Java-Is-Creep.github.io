Slooow.singlePlayerState = function (game) {
	var stamina
	var camerados
}

Slooow.singlePlayerState.prototype = {

	// Solo calculos de pantalla, pero se puede meter animacion para cargar los assets

	// Solo se ejecuta una vez, se pasa a preload (funcion), las funciones se van a guardar en un mapa (global)
	init: function () {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **SINGLEPLAYER** state");
		}
		game.world.setBounds(0, 0, 8640, 1600);
	},

	preload: function () {

		// Cargamos el background
		var b = game.add.tileSprite (0, game.world.height, 8640, 1600, 'cocinaBg')
		b.anchor.set(0, 1)
		b.tileScale.setTo(1.99,2)

		game.global.player.maxStamina = 0
		
		//console.log('trapdoor')
        //console.dir(game.global.arrayTrapdoors)
		// Cargamos los objetos posibles del mapa
		//console.dir(game.global.arrayGrounds)
		for (var i = 0; i< game.global.arrayGrounds.length; i++){
			//game.global.arrayGrounds[i] = game.add.image(game.global.arrayGrounds[i].x, game.world.height/*game.world.getBounds().y*/ - game.global.arrayGrounds[i].y, 'groundTile')
			game.global.arrayGrounds[i] = game.add.tileSprite(game.global.arrayGrounds[i].x, game.world.height - game.global.arrayGrounds[i].y+25, game.global.arrayGrounds[i].width, 25, 'groundTile')
			game.global.arrayGrounds[i].visible = true
			game.global.arrayGrounds[i].anchor.setTo(0,1)
			game.global.arrayGrounds[i].tileScale.setTo(0.5, 0.5)
			//console.log(game.global.arrayGrounds[i].x + ' '+ game.global.arrayGrounds[i].y)
		}

		//Pintamos las paredes
		for (var i = 0; i< game.global.arrayWalls.length; i++){
			game.global.arrayWalls[i] = game.add.tileSprite(game.global.arrayWalls[i].x, game.world.height - game.global.arrayWalls[i].y, game.global.arrayWalls[i].width, game.global.arrayWalls[i].height, 'wallTile')
			game.global.arrayWalls[i].visible = true
			game.global.arrayWalls[i].anchor.setTo(0,1)
			game.global.arrayWalls[i].tileScale.setTo(0.5, 0.5)
		}
		

		for (var i = 0; i< game.global.arraySlopes.length; i++){
			//console.log('angulo en singleplayer 1: '+ game.global.arraySlopes[i].height)
			var angulo = game.global.arraySlopes[i].height
			game.global.arraySlopes[i] = game.add.image(game.global.arraySlopes[i].x , game.world.height - game.global.arraySlopes[i].y -25  , 'slopeDown' )
			//game.global.arraySlopes[i] = game.add.image(game.global.arraySlopes[i].x -20, game.world.height- game.global.arraySlopes[i].y - 30, 'slopeDown' )
			//console.log('angulo en singleplayer 2: '+ game.global.arraySlopes[i].height)
			game.global.arraySlopes[i].anchor.setTo (0.0,0.0)
			
			//console.log("Angulo en singleplayer 3"+ this.game.global.arraySlopes[i].height)
			if (angulo < 0) {
				game.global.arraySlopes[i].angle += - angulo
			} else{
				game.global.arraySlopes[i].angle -= angulo
			}
			game.global.arraySlopes[i].visible = true
			//game.global.arraySlopes[i].anchor.setTo (0.5,0.5)
			game.global.arraySlopes[i].scale.setTo (0.5,0.5)
		}
		//console.log('trapdoor')
       // console.dir(game.global.arrayTrapdoors)
		//Pintamos las trampillas
		//console.log('num of trapdoors: ' + game.global.arrayTrapdoors.length)
		for (var i = 0; i< game.global.arrayTrapdoors.length; i++){
			//console.log('num of trapdoors: ' + game.global.arrayTrapdoors.length)
			game.global.arrayTrapdoors[i] = game.add.image(game.global.arrayTrapdoors[i].x, game.world.height/*game.world.getBounds().y*/ - game.global.arrayTrapdoors[i].y, 'trapdoor')
			game.global.arrayTrapdoors[i].frame = 0
			game.global.arrayTrapdoors[i].visible = true
			game.global.arrayTrapdoors[i].anchor.setTo (0,0)
			game.global.arrayTrapdoors[i].scale.setTo (0.21,0.3)
		}

		for (var i = 0; i< game.global.arrayTrampolines.length; i++){
			game.global.arrayTrampolines[i] = game.add.image(game.global.arrayTrampolines[i].x, game.world.height - game.global.arrayTrampolines[i].y-150, 'sartenSpritesheet')
			game.global.arrayTrampolines[i].frame = 0
			game.global.arrayTrampolines[i].animations.add('activate')
			//game.global.arrayTrampolines[i].animations.play('activate', 8, false)
			game.global.arrayTrampolines[i].visible = true
			game.global.arrayTrampolines[i].anchor.setTo(0,0)
			game.global.arrayTrampolines[i].scale.setTo(1, 1)
		}

		for (var i = 0; i< game.global.arrayObstacles.length; i++){
			game.global.arrayObstacles[i] = game.add.image(game.global.arrayObstacles[i].x, game.world.height - game.global.arrayObstacles[i].y-20, 'fireSpritesheet')
			game.global.arrayObstacles[i].frame = 0;
			game.global.arrayObstacles[i].animations.add('stopped', [0], 1, false)
			game.global.arrayObstacles[i].animations.add('sparks', [1,2], 4, true)
			game.global.arrayObstacles[i].animations.add('fire', [3,4,5], 6, true)
			game.global.arrayObstacles[i].visible = true
			game.global.arrayObstacles[i].anchor.setTo (0, 0.5)
			game.global.arrayObstacles[i].scale.setTo(0.6, 0.6)
		}

		for (var i = 0; i < game.global.arrayPowerUps.length; i++) {
			game.global.arrayPowerUps[i] = game.add.image(game.global.arrayPowerUps[i].x, game.world.height - game.global.arrayPowerUps[i].y, 'boxPowerUpSpritesheet')
			game.global.arrayPowerUps[i].animations.add('turn')
			game.global.arrayPowerUps[i].animations.play('turn', 4, true)
			game.global.arrayPowerUps[i].visible = true
			game.global.arrayPowerUps[i].anchor.setTo(0.5,0.5)
			game.global.arrayPowerUps[i].scale.setTo(0.15, 0.15)
		} 

		for (var i = 0; i< game.global.arrayDoors.length; i++){
			game.global.arrayDoors[i] = game.add.image(game.global.arrayDoors[i].x-14, game.world.height - game.global.arrayDoors[i].y+25, 'doorSpritesheet')
			game.global.arrayDoors[i].frame = 1
			game.global.arrayDoors[i].visible = true
			game.global.arrayDoors[i].anchor.setTo(0,1)
			game.global.arrayDoors[i].scale.setTo(0.35, 0.35)
		}

		for (var i = 0; i< game.global.arrayWinds.length; i++){
			console.log('viento')
			console.dir(game.global.arrayWinds[i])
			game.global.arrayWinds[i] = game.add.image(game.global.arrayWinds[i].x+200, game.world.height - game.global.arrayWinds[i].y, 'windSpritesheet')
			game.global.arrayWinds[i].angle = 180
			game.global.arrayWinds[i].animations.add('wind',[0,1,2,3,4,5], 4, true)
			game.global.arrayWinds[i].animations.add('windReverse', [5,4,3,2,1,0], 4, true)
			if (game.global.arrayWinds[i].direction == true){
				console.log('a favor')
				game.global.arrayWinds[i].animations.play('wind')
			} else{
				console.log('en contra')
				game.global.arrayWinds[i].angle = 0
				game.global.arrayWinds[i].animations.play('wind')
			}
			//game.global.arrayWinds[i].frame = 0
			game.global.arrayWinds[i].visible = true
			game.global.arrayWinds[i].anchor.setTo(0.5,0.5)
			game.global.arrayWinds[i].scale.setTo(1, 0.4)
		}

		if (game.global.finishObject != undefined){
			game.global.finishObject = game.add.image(game.global.finishObject.x, game.world.height - game.global.finishObject.y, 'finishObject')
			game.global.finishObject.visible = true
			game.global.finishObject.anchor.setTo(0,1)
			game.global.finishObject.scale.setTo(0.5, 0.5)
			var finishGround =  game.add.image(game.global.finishObject.x,game.world.height - game.global.finishObject.y, 'finishGround')
			finishGround.visible = true
			finishGround.anchor.setTo(0,0)
			finishGround.scale.setTo(0.5, 0.5)
		}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// PERSONAJE
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		game.global.player.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'normalColAnimation')

		game.global.player.sprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 0, 7), 5, true);
		game.global.player.sprite.animations.add('tired', Phaser.Animation.generateFrameNames('tired', 0, 7), 5, true);
		game.global.player.sprite.animations.add('damage', Phaser.Animation.generateFrameNames('oof', 0, 5), 5, true);
		//game.global.player.sprite.animations.add('turn', Phaser.Animation.generateFrameNames('turn', 0, 3), 5, true);
		game.global.player.sprite.animations.play('walk');
		game.global.player.sprite.anchor.setTo(0.5, 0.5);
		game.global.player.sprite.scale.setTo(0.28, 0.28)

		// Creacion Barra de Estamina
		game.global.player.stamina3 = game.add.sprite(0, 0, 'barStaminaInterior')
		game.global.player.stamina3.anchor.set(0,0);
		game.global.player.stamina3.scale.setTo(0.5,0.5);
		
		game.global.player.stamina2 = game.add.sprite(0, 0, 'barStamina')
		game.global.player.stamina2.anchor.set(0,0);
		game.global.player.stamina2.scale.setTo(0.5,0.5);

		game.global.player.stamina1 = game.add.sprite(0, 0, 'barStaminaFuera')
		game.global.player.stamina1.anchor.set(0,0);
		game.global.player.stamina1.scale.setTo(0.5,0.5);

		game.global.player.stamina3.fixedToCamera = true;
		game.global.player.stamina2.fixedToCamera = true;
		game.global.player.stamina1.fixedToCamera = true;

		// Creacion de la barra de progreso
		game.global.player.progressBar1 = game.add.sprite(game.width/3, 20, 'barProgressInteriorColor')
		game.global.player.progressBar2 = game.add.sprite(game.width/3, 20, 'barProgressInteriorNegra')
		game.global.player.progressBar3 = game.add.sprite(game.width/3, 20, 'barProgressFuera')

		game.global.player.progressBar2.x += game.global.player.progressBar2.width
		game.global.player.progressBar2.anchor.setTo (1,0)

		game.global.player.progressBar1.fixedToCamera = true;
		game.global.player.progressBar2.fixedToCamera = true;
		game.global.player.progressBar3.fixedToCamera = true;

		game.global.player.powerUpsContainer = game.add.sprite(game.width -150, 50, 'powerUpsContainer')
		game.global.player.powerUpsContainer.scale.setTo(0.5, 0.5)
		game.global.player.powerUpsContainer.fixedToCamera = true

		//console.log ("Array Cargado")
		//console.dir (game.global.arrayObstacleSpikes)
		
		//game.global.arrayObstacleSpikes = game.add.image(game.world.centerX, game.world.centerY, 'button')
		//var spike = game.add.image(game.world.centerX, game.world.centerY, 'button')
		//spike.anchor.setTo(0.5, 0.5)
		//spike.scale.setTo(0.3, 0.3)
	},

	create: function () {
		
		this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);

		this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.R]);

		this.tapping = game.input.pointer1;
		//this.tapTap = game.input.addPointer();
		//var suelo = new Phaser.Rectangle (30, 550, 30, 500)
		var style = {
			font: "40px Arial",
			fill: "#000000",
			align: "center"
		};

		var style2 = {
			font: "40px Arial",
			fill: "#CB0017",
			align: "center"
		}
		game.global.player.stamina = game.add.text(0, 0, "0", style2);
		game.global.player.stamina.fixedToCamera = true;	

		function actionOnClickBack() {
			//alert('Saldras de la carrera');
			game.state.start('mainMenuState')
		}
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
		
		if (this.wKey.isDown && this.wKey.duration > 100) {
			msg.useObject = true;
		}
		
		if (game.input.pointer1.isDown && game.input.pointer1.duration <= 100){
			msg.isSprinting = true;
		}

		if (game.input.pointer1.isDown && game.input.pointer1.duration > 100){
			msg.useObject = true;
		}
		game.global.socket.send(JSON.stringify(msg))

		if (this.rKey.isDown){
			game.global.winner = true
            game.global.myTime = 93220
			game.global.maxTime = 153057
			game.global.myRecord = 87520
			game.global.mapRecord = 75236
			game.state.start('gameOverState')
		}
    
		game.camera.focusOnXY(game.global.player.sprite.x+400 ,game.global.player.sprite.y+100);

		if (this.game.global.haveToRotateToWall == true){
			if (game.global.player.sprite.angle > -90){
				game.global.player.sprite.angle-=2
			} else{
				game.global.haveToRotateToWall = false
				game.global.player.sprite.angle = -90
			}
		}
		if (game.global.haveToRotateToGround == true){
			if (game.global.player.sprite.angle < -2){
				game.global.player.sprite.angle+=2
			} else if (game.global.player.sprite.angle > 2){
				game.global.player.sprite.angle-=2
			}else{
				game.global.haveToRotateToGround = false
				game.global.player.sprite.angle = 0
			}
		}
		if(game.global.haveToRotateToSlope == true){
			// El angulo que me pasa va desde -90 a 90
			// Cuando me llega un 45, realmente tengo que girarlo hasta -45

			//Cuesta hacia arriba
			if (game.global.degreesToRotateSlope > 0){
				if (game.global.player.sprite.angle > -game.global.degreesToRotateSlope){
					game.global.player.sprite.angle-=3
					game.global.player.sprite.angle = Math.round(game.global.player.sprite.angle)
				}else{
					game.global.player.sprite.angle = -game.global.degreesToRotateSlope
					game.global.haveToRotateToSlope = false
					game.global.degreesToRotateSlope = 0
				}
			}
			// Cuesta hacia abajo
			else{
				if (game.global.player.sprite.angle < -game.global.degreesToRotateSlope){
					game.global.player.sprite.angle+=3
					game.global.player.sprite.angle = Math.round(game.global.player.sprite.angle)
				}else{
					game.global.player.sprite.angle = -game.global.degreesToRotateSlope
					game.global.haveToRotateToSlope = false
					game.global.degreesToRotateSlope = 0
				}
			}
		}
	}
}