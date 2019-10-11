Slooow.singlePlayerState = function (game) {
	var graphics
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

		game.world.setBounds(0, 0, 10000, 10000);
	},

	preload: function () {

		var b = game.add.image (0, game.world.height, 'cocina_back')
		b.anchor.set (0, 1)
		b.scale.set (0.35, 0.35)
		this.graphics = game.add.graphics(0, 0);
		this.graphics.lineStyle(2, 0x0000FF, 1);
		

		// Cargamos los objetos posibles del mapa
		console.dir(game.global.arrayGrounds)
		for (var i = 0; i< game.global.arrayGrounds.length; i++){
			//game.global.arrayGrounds[i] = game.add.image(game.global.arrayGrounds[i].x, game.world.height/*game.world.getBounds().y*/ - game.global.arrayGrounds[i].y, 'groundTile')
			game.global.arrayGrounds[i] = game.add.tileSprite(game.global.arrayGrounds[i].x, game.world.height - game.global.arrayGrounds[i].y+25, game.global.arrayGrounds[i].width, 25, 'groundTile')
			game.global.arrayGrounds[i].visible = true
			game.global.arrayGrounds[i].anchor.setTo(0,1)
			game.global.arrayGrounds[i].tileScale.setTo(0.5, 0.5)
			//this.graphics.drawRect(game.global.arrayGrounds[i].x, game.world.height - game.global.arrayGrounds[i].y, 1400, 25)
			console.log(game.global.arrayGrounds[i].x + ' '+ game.global.arrayGrounds[i].y)
		}

		//Pintamos las paredes
		for (var i = 0; i< game.global.arrayWalls.length; i++){
			game.global.arrayWalls[i] = game.add.tileSprite(game.global.arrayWalls[i].x, game.world.height - game.global.arrayWalls[i].y, game.global.arrayWalls[i].width, game.global.arrayWalls[i].height, 'wallTile')
			game.global.arrayWalls[i].visible = true
			game.global.arrayWalls[i].anchor.setTo(0,1)
			game.global.arrayWalls[i].tileScale.setTo(0.5, 0.5)
		}
		//game.global.arrayObstacleSpikes = new Array (5)
		for (var i = 0; i < game.global.arrayObstacleSpikes.length; i++){
			game.global.arrayObstacleSpikes[i] = game.add.image(game.global.arrayObstacleSpikes[i].x, game.world.height/*game.world.getBounds().y*/ - game.global.arrayObstacleSpikes[i].y, 'button')
			game.global.arrayObstacleSpikes[i].visible = true
			game.global.arrayObstacleSpikes[i].anchor.setTo (0,1)
			game.global.arrayObstacleSpikes[i].scale.setTo (0.22,0.3)
		}

		for (var i = 0; i< game.global.arraySlopes.length; i++){
			console.log('angulo en singleplayer 1: '+ game.global.arraySlopes[i].height)
			var angulo = game.global.arraySlopes[i].height
			game.global.arraySlopes[i] = game.add.image(game.global.arraySlopes[i].x , game.world.height - game.global.arraySlopes[i].y -25  , 'slopeDown' )
			//game.global.arraySlopes[i] = game.add.image(game.global.arraySlopes[i].x -20, game.world.height- game.global.arraySlopes[i].y - 30, 'slopeDown' )
			console.log('angulo en singleplayer 2: '+ game.global.arraySlopes[i].height)
			game.global.arraySlopes[i].anchor.setTo (0.0,0.0)
			
			console.log("Angulo en singleplayer 3"+ this.game.global.arraySlopes[i].height)
			if (angulo < 0) {
				game.global.arraySlopes[i].angle += - angulo
			} else{
				game.global.arraySlopes[i].angle -= angulo
			}
			game.global.arraySlopes[i].visible = true
			//game.global.arraySlopes[i].anchor.setTo (0.5,0.5)
			game.global.arraySlopes[i].scale.setTo (0.5,0.5)
		}
		game.global.player.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'seaSnail')
		game.global.player.sprite.anchor.setTo(0.5, 0.5);
		game.global.player.sprite.scale.setTo(0.2, 0.2)

		console.log ("Array Cargado")
		console.dir (game.global.arrayObstacleSpikes)
		
		//game.global.arrayObstacleSpikes = game.add.image(game.world.centerX, game.world.centerY, 'button')
		//var spike = game.add.image(game.world.centerX, game.world.centerY, 'button')
		//spike.anchor.setTo(0.5, 0.5)
		//spike.scale.setTo(0.3, 0.3)

	},

	create: function () {
		

		this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);

		this.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.E]);

		this.rKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.R]);

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
		/*
				//Background
				var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
				b.anchor.set (0.5, 0.5)
				b.scale.setTo (1.2,1.2)
		*/
		//Boton back
		buttonBack = game.add.button(50,
			40, 'button', actionOnClickBack, this,
			0, 0, 0)
		buttonBack.anchor.set(0.5)
		buttonBack.scale.setTo(0.2, 0.3)

		//Texto back
		textButtonBack = game.add.text(50,
			40, 'Back', style)
		textButtonBack.anchor.set(0.5)
		textButtonBack.scale.setTo(0.5, 0.5)


		
		//this.graphics.drawRect(50, 250, 500, 100);
		/*
		var i = 0;
		for (var mapObject in game.global.mapObjects) {
				console.log(game.global.mapObjects[i].x)	
				console.log(game.global.mapObjects[i].y)
				console.log(game.global.mapObjects[i].height)	
				console.log(game.global.mapObjects[i].width)
				console.log('screen height' + game.world.height )
			//this.graphics.drawRect(50, 250, 500, 100);
			this.graphics.drawRect(game.global.mapObjects[i].x, game.world.height -  game.global.mapObjects[i].y, game.global.mapObjects[i].width, -game.global.mapObjects[i].height)
			i++;
		}
*/
		//Pintamos los suelos
		for (var i = 0; i < game.global.arrayGrounds.length; i++) {
			//console.log(game.global.arrayGrounds[i].x)
			//console.log(game.global.arrayGrounds[i].y)
			//console.log(game.global.arrayGrounds[i].height)
			//console.log(game.global.arrayGrounds[i].width)
			//console.log('screen height' + game.world.height)
			//this.graphics.drawRect(game.global.arrayGrounds[i].x, game.world.height - game.global.arrayGrounds[i].y, game.global.arrayGrounds[i].width, -game.global.arrayGrounds[i].height)
		}

		for (var i = 0; i < game.global.arrayWalls.length; i++) {
			//console.log(game.global.arrayWalls[i].x)
			//console.log(game.global.arrayWalls[i].y)
			//console.log(game.global.arrayWalls[i].height)
			//console.log(game.global.arrayWalls[i].width)
			//console.log('screen height' + game.world.height)
			this.graphics.drawRect(game.global.arrayWalls[i].x, game.world.height - game.global.arrayWalls[i].y, game.global.arrayWalls[i].width, -game.global.arrayWalls[i].height)
		}

		for (var i = 0; i < game.global.arraySlopes.length; i++) {
			//console.log(game.global.arraySlopes[i].x)
			//console.log(game.global.arraySlopes[i].y)
			//console.log(game.global.arraySlopes[i].height)
			//console.log(game.global.arraySlopes[i].width)
			//console.log('screen height' + game.world.height)
			this.graphics.drawRect(game.global.arraySlopes[i].x, game.world.height - game.global.arraySlopes[i].y, game.global.arraySlopes[i].width, -game.global.arraySlopes[i].height)
		}

		for (var i = 0; i < game.global.arrayObstacleSpikes.length; i++) {
			//console.log(game.global.arrayObstacleSpikes[i].image.x)
			//console.log(game.global.arrayObstacleSpikes[i].image.y)
			//console.log(game.global.arrayObstacleSpikes[i].height)
			//console.log(game.global.arrayObstacleSpikes[i].width)
			//console.log('screen height' + game.world.height)
			//this.graphics.drawRect(game.global.arrayObstacleSpikes[i].x, game.world.height - game.global.arrayObstacleSpikes[i].y, game.global.arrayObstacleSpikes[i].width, -game.global.arrayObstacleSpikes[i].height)
		}

		for (var i = 0; i < game.global.arrayPowerUps.length; i++) {
			console.log(game.global.arrayPowerUps[i].x)
			console.log(game.global.arrayPowerUps[i].y)
			console.log(game.global.arrayPowerUps[i].height)
			console.log(game.global.arrayPowerUps[i].width)
			console.log('screen height' + game.world.height)
			this.graphics.drawRect(game.global.arrayPowerUps[i].x, game.world.height - game.global.arrayPowerUps[i].y, game.global.arrayPowerUps[i].width, -game.global.arrayPowerUps[i].height)
		}

		function actionOnClickBack() {
			//alert('Saldras de la carrera');
			game.state.start('mainMenuState')
		}
		
		//game.camera.scale.x += 0.1;
		//game.camera.scale.y += 0.1;
		// camera.follow(target, style, lerpX, lerpY, offsetX, offsetY)
		//game.camera.follow(game.global.player.sprite);
		//game.camera.focusOnXY(game.global.player.sprite.x,game.global.player.sprite.x);
		//game.camera.followOffset.set(-300, 0);
	},

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update: function () {

		if (game.global.arrayObstacleSpikes.length > 0) {
			for (var i = 0; i < game.global.arrayObstacleSpikes.length; i++) {
				//var spike = game.add.image(game.global.arrayObstacleSpikes[i].x,game.world.height - game.global.arrayObstacleSpikes[i].y, 'button')
				//spike.anchor.setTo(0,1)
				//spike.scale.setTo(0.25, 0.3)
			}
		}

		let msg = {
			event: 'UPDATEINPUT',
			isSprinting: false,
			useObject: false
		}

		if (this.wKey.isDown) {
			msg.isSprinting = true;
		}
		if (this.eKey.isDown) {
			msg.useObject = true
		}
		game.global.socket.send(JSON.stringify(msg))

		if (this.rKey.isDown){
			game.state.start('gameOverState')
		}

		game.camera.focusOnXY(game.global.player.sprite.x+400 ,game.global.player.sprite.y+100);

	}
}