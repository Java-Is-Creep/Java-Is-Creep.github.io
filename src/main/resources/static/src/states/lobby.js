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
        /*
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)*/
        this.background = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'backgroundMenu')
        //this.background.height = this.game.height;
        //this.background.width = this.game.width;
        //Tints chulos:  1653685.9351650865
        //               10799539.640765665
        //               4535760.527128731   
        //this.background.tint = Math.random() * 0xffffff;
        //this.background.tint = 4535760.527128731;
		//console.log(this.background.tint)
		this.background.tileScale.set(0.4, 0.4)
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
		buttonReady = game.add.button(game.world.centerX + 350,
            game.world.centerY + 250, 'button', actionOnClickReady, this,
            0, 0, 0)
        buttonReady.anchor.set(0.5)
        buttonReady.scale.setTo(0.4, 0.5)
       
        //Texto ready
		textButtonReady = game.add.text(game.world.centerX + 350,
            game.world.centerY + 250, game.global.activeLanguage.Ready, game.global.style)
        textButtonReady.anchor.set(0.5)
        textButtonReady.scale.setTo(0.5,0.5)
        
        var chosenShell = game.add.image(game.world.centerX-380, game.world.centerY-170, 'roundBtn')
        chosenShell.anchor.setTo(0.5, 0.5);
        chosenShell.scale.setTo(0.95, 0.95)

        //Print image snail
        var chosen
        if (game.global.snailChosen != null){
            switch (game.global.snailChosen){
                case ('NORMAL'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'normalCol')
                    break
                case ('TANK'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'tanqueCol')
                    break   
                case ('BAGUETTE'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'frenchCol')
                    break    
                case ('MIAU'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'catCol')
                    break    
                case ('MERCA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'slugCol')
                    break     
                case ('SEA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'seaCol')
                    break
                case ('ROBA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'thiefCol')
                    break
                case ('IRIS'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'irisCol')
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
        

        //chose bg

        
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
            let msg3 = {
                event: 'CHOOSECHARSNAIL',
            }
            console.log("mando esta mierda")
            game.global.socket.send(JSON.stringify(msg3))
        }
	},

	update : function() {
			
		this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
	}
}