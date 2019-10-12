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
		b.anchor.set (0, 1)
		//b.scale.set (0.35, 0.35)
		b.tileScale.setTo (0.99,1)

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
			console.log(game.global.arrayGrounds[i].x + ' '+ game.global.arrayGrounds[i].y)
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
			game.global.arrayTrampolines[i].scale.setTo(0.5, 0.5)
		}

		for (var i = 0; i< game.global.arrayObstacles.length; i++){
			game.global.arrayObstacles[i] = game.add.image(game.global.arrayObstacles[i].x, game.world.height - game.global.arrayObstacles[i].y, 'fireSpritesheet')
			game.global.arrayObstacles[i].frame = 0;
			game.global.arrayObstacles[i].animations.add('stopped', [0], 1, false)
			game.global.arrayObstacles[i].animations.add('sparks', [1,2], 4, true)
			game.global.arrayObstacles[i].animations.add('fire', [3,4,5], 6, true) 
			game.global.arrayObstacles[i].visible = true
			game.global.arrayObstacles[i].anchor.setTo (0, 0)
			game.global.arrayObstacles[i].scale.setTo(0.1, 0.1)
		}

		for (var i = 0; i < game.global.arrayPowerUps.length; i++) {
			game.global.arrayPowerUps[i] = game.add.image(game.global.arrayPowerUps[i].x, game.world.height - game.global.arrayPowerUps[i].y, 'roundBtn')
			game.global.arrayPowerUps[i].visible = true
			game.global.arrayPowerUps[i].anchor.setTo(0.5,0.5)
			game.global.arrayPowerUps[i].scale.setTo(0.5, 0.5)
		} 

		//game.global.player.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'catSnail')
		
		game.global.player.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'irisColWalk')
		game.global.player.sprite.animations.add('walk')
		game.global.player.sprite.animations.play('walk', 5, true);
		

		game.global.player.sprite.anchor.setTo(0.5, 0.5);
		game.global.player.sprite.scale.setTo(0.28, 0.28)

		// Creacion Barra de Estamina
		game.global.player.stamina2 = game.add.sprite(0, 0, 'bar_Estamina2')
		game.global.player.stamina2.anchor.set(0,0);
		game.global.player.stamina2.scale.setTo(3,3);

		game.global.player.stamina1 = game.add.sprite(0, 0, 'bar_Estamina1')
		game.global.player.stamina1.anchor.set(0,0);
		game.global.player.stamina1.scale.setTo(3,3);

		game.global.player.stamina2.fixedToCamera = true;
		game.global.player.stamina1.fixedToCamera = true;

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


		//Boton back
		/*buttonBack = game.add.button(200,
			200, 'button', actionOnClickBack, this,
			0, 0, 0)
		buttonBack.anchor.set(0.5)
		buttonBack.scale.setTo(0.2, 0.3)

		//Texto back
		textButtonBack = game.add.text(200,
			200, 'Back', style)
		textButtonBack.anchor.set(0.5)
		textButtonBack.scale.setTo(0.5, 0.5)*/


		

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
			game.state.start('gameOverState')
		}
    
		game.camera.focusOnXY(game.global.player.sprite.x+400 ,game.global.player.sprite.y+100);

	}

}