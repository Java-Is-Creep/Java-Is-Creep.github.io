Slooow.lobbyState = function(game) {
}

Slooow.lobbyState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOBBY** state");
		}
	},

	preload : function() {
		
	},

	create : function() {
        //Background
        var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)

        var style = {
			font : "40px Arial",
			fill : "#000000",
			align : "center"
		};
        var style2 = {
			font : "40px Arial",
			fill : "#ffffff",
			align : "center"
		};
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

         //Boton ready
		buttonReady = game.add.button(game.world.centerX + 400,
            game.world.centerY + 250, 'button', actionOnClickReady, this,
            0, 0, 0)
        buttonReady.anchor.set(0.5)
        buttonReady.scale.setTo(0.2, 0.3)

        //Texto ready
		textButtonReady = game.add.text(game.world.centerX + 400,
            game.world.centerY + 250, 'Ready', style)
        textButtonReady.anchor.set(0.5)
        textButtonReady.scale.setTo(0.5,0.5)

        //Print image
        var chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'seaSnail')
		chosen.anchor.setTo(0.5, 0.5);
        chosen.scale.setTo(0.4, 0.4)

        chosen.inputEnabled = true
        chosen.events.onInputDown.add(chooseCharacter, this)
        
        //Texto datos sala
		textLobbyData = game.add.text(game.world.centerX -400,
            game.world.centerY -50, 'Lobby Data', style2)
        textLobbyData.anchor.set(0.5)
        textLobbyData.scale.setTo(0.5,0.5)

        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }

        function actionOnClickReady(){
            let msg = {
                event: 'SINGLEPLAYER',
                playerName: game.global.username,
                roomName: 'sala1'
            }
            game.global.socket.send(JSON.stringify(msg))
        }

        function chooseCharacter(){
            game.state.start('chooseCharacterState')
        }
	},

	update : function() {
			
		
	}
}