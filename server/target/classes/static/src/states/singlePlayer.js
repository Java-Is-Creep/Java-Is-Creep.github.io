Slooow.singlePlayerState = function (game) {
	var graphics
	var stamina
}

Slooow.singlePlayerState.prototype = {

	// Solo calculos de pantalla, pero se puede meter animacion para cargar los assets

	// Solo se ejecuta una vez, se pasa a preload (funcion), las funciones se van a guardar en un mapa (global)
	init: function () {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **SINGLEPLAYER** state");
		}
	},

	preload: function () {
		game.global.player = game.add.image(game.world.centerX, game.world.centerY, 'seaSnail')
		game.global.player.anchor.setTo(0.5, 0.5);
		game.global.player.scale.setTo(0.3, 0.3)
		
	},

	create: function () {
		this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);

		//var suelo = new Phaser.Rectangle (30, 550, 30, 500)
		var style = {
			font: "40px Arial",
			fill: "#000000",
			align: "center"
		};
		game.global.stamina = game.add.text(game.world.centerX, game.world.centerY, "0", style);
		/*
				//Background
				var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
				b.anchor.set (0.5, 0.5)
				b.scale.setTo (1.2,1.2)
		*/
		//Boton desconectar


		buttonBack = game.add.button(50,
			40, 'button', actionOnClickBack, this,
			0, 0, 0)
		buttonBack.anchor.set(0.5)
		buttonBack.scale.setTo(0.2, 0.3)

		//Texto desconectar
		textButtonBack = game.add.text(50,
			40, 'Back', style)
		textButtonBack.anchor.set(0.5)
		textButtonBack.scale.setTo(0.5, 0.5)


		this.graphics = game.add.graphics(0, 0);
		console.log('Dibujar rectangulo');
		this.graphics.lineStyle(2, 0x0000FF, 1);
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
			console.log(game.global.arrayGrounds[i].x)
			console.log(game.global.arrayGrounds[i].y)
			console.log(game.global.arrayGrounds[i].height)
			console.log(game.global.arrayGrounds[i].width)
			console.log('screen height' + game.world.height)
			this.graphics.drawRect(game.global.arrayGrounds[i].x, game.world.height - game.global.arrayGrounds[i].y, game.global.arrayGrounds[i].width, -game.global.arrayGrounds[i].height)
		}

		for (var i = 0; i < game.global.arrayWalls.length; i++) {
			console.log(game.global.arrayWalls[i].x)
			console.log(game.global.arrayWalls[i].y)
			console.log(game.global.arrayWalls[i].height)
			console.log(game.global.arrayWalls[i].width)
			console.log('screen height' + game.world.height)
			this.graphics.drawRect(game.global.arrayWalls[i].x, game.world.height - game.global.arrayWalls[i].y, game.global.arrayWalls[i].width, -game.global.arrayWalls[i].height)
		}

		for (var i = 0; i < game.global.arraySlopes.length; i++) {
			console.log(game.global.arraySlopes[i].x)
			console.log(game.global.arraySlopes[i].y)
			console.log(game.global.arraySlopes[i].height)
			console.log(game.global.arraySlopes[i].width)
			console.log('screen height' + game.world.height)
			this.graphics.drawRect(game.global.arraySlopes[i].x, game.world.height - game.global.arraySlopes[i].y, game.global.arraySlopes[i].width, -game.global.arraySlopes[i].height)
		}
		
		for (var i = 0; i < game.global.arrayObstacleSpikes.length; i++) {
			console.log(game.global.arrayObstacleSpikes[i].x)
			console.log(game.global.arrayObstacleSpikes[i].y)
			console.log(game.global.arrayObstacleSpikes[i].height)
			console.log(game.global.arrayObstacleSpikes[i].width)
			console.log('screen height' + game.world.height)
			this.graphics.drawRect(game.global.arrayObstacleSpikes[i].x, game.world.height - game.global.arrayObstacleSpikes[i].y, game.global.arrayObstacleSpikes[i].width, -game.global.arrayObstacleSpikes[i].height)
		}

		function actionOnClickBack() {
			//alert('Saldras de la carrera');
			game.state.start('mainMenuState')
		}
	},

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update: function () {

		let msg = {
			event: 'UPDATEINPUT',
			isStopping: false,
			useObject: false
		}

		if (this.wKey.isDown) {
			msg.isStopping = true;
		} else if (this.wKey.isUp) {

		}
		game.global.socket.send(JSON.stringify(msg))


		for (var i = 0; i < game.global.arrayObstacleSpikes.length; i++) {
			console.log('pintar pichos')

			this.graphics.drawRect(game.global.arrayObstacleSpikes[i].x, game.world.height - game.global.arrayObstacleSpikes[i].y, game.global.arrayObstacleSpikes[i].width, -game.global.arrayObstacleSpikes[i].height)
		}

		


		
	}
}