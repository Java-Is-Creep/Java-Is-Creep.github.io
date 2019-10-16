Slooow.lobbyState = function(game) {
}

Slooow.lobbyState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOBBY** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
	},

	preload : function() {
		//Background
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)
	},

	create : function() {

        var style = {
			font : "40px Arial",
			fill : "#ffffff",
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
            40, game.global.activeLanguage.Back, style)
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
            game.world.centerY + 250, game.global.activeLanguage.Ready, style)
        textButtonReady.anchor.set(0.5)
        textButtonReady.scale.setTo(0.5,0.5)

        //Print image
        
        var chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'irisCol')
		chosen.anchor.setTo(0.5, 0.5);
        chosen.scale.setTo(0.4, 0.4)
        chosen.inputEnabled = true
        chosen.events.onInputDown.add(chooseCharacter, this)
        game.global.player.sprite.visible = true
        
        //Texto datos sala
		textLobbyData = game.add.text(game.world.centerX -400,
            game.world.centerY -50, game.global.activeLanguage.LobbyData, style2)
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