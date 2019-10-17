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


        //Boton desconectar
		buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)
        //Texto desconectar
		textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back, game.global.style)
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
            game.world.centerY + 250, game.global.activeLanguage.Ready, game.global.style)
        textButtonReady.anchor.set(0.5)
        textButtonReady.scale.setTo(0.5,0.5)

        //Print image snail
        var chosen
        if (game.global.snailChosen != null){
            switch (game.global.snailChosen){
                case ('NORMAL'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'normalCol')
                    break
                case ('TANK'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'tanqueCol')
                    break   
                case ('BAGUETTE'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'frenchCol')
                    break    
                case ('MIAU'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'catCol')
                    break    
                case ('MERCA'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'slugCol')
                    break     
                case ('SEA'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'seaCol')
                    break
                case ('ROBA'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'thiefCol')
                    break
                case ('IRIS'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'irisCol')
                    break
                default:
                    console.log('snail sprite no identificado')
                    break    
            }
        }
		chosen.anchor.setTo(0.5, 0.5);
        chosen.scale.setTo(0.4, 0.4)
        chosen.inputEnabled = true
        chosen.events.onInputDown.add(chooseCharacter, this)
        
        //Texto datos sala
		textLobbyData = game.add.text(game.world.centerX -400,
            game.world.centerY -50, game.global.activeLanguage.LobbyData, game.global.style)
        textLobbyData.anchor.set(0.5)
        textLobbyData.scale.setTo(0.5,0.5)

        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }

        function actionOnClickReady(){
            let msg = {
                event: 'CHOOSESNAIL',
                chooseSnail: game.global.snailChosen
            }
            game.global.socket.send(JSON.stringify(msg))


            let msg2 = {
                event: 'SINGLEPLAYER',
                playerName: game.global.username,
                roomName: game.global.username + 'Room'
            }
            game.global.socket.send(JSON.stringify(msg2))
        }

        function chooseCharacter(){
            game.state.start('chooseCharacterState')
        }
	},

	update : function() {
			
		
	}
}