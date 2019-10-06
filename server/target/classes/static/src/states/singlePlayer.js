Slooow.singlePlayerState = function (game) {
	var graphics
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
			font : "40px Arial",
			fill : "#000000",
			align : "center"
		};
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
        textButtonBack.scale.setTo(0.5,0.5)


		this.graphics = game.add.graphics(0, 0);
		console.log('Dibujar rectangulo');
		this.graphics.lineStyle(2, 0x0000FF, 1);
		//this.graphics.drawRect(50, 250, 500, 100);
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

		
        
        function actionOnClickBack(){
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
	}
}