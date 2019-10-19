Slooow.lobbyMultiState = function (game) {

}

Slooow.lobbyMultiState.prototype = {

	init: function () {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOBBYMULTI** state");
		}
	},

	preload: function () {
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

	create: function () {
        //Boton atras 
        buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)
        //Texto atras
        textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back, game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Boton listo 
        buttonOK = game.add.button(game.world.centerX,
            game.world.centerY, 'button', actionOnClickOK, this,
            0, 0, 0)
        buttonOK.anchor.set(0.5)
        buttonOK.scale.setTo(0.2, 0.3)
        //Texto listo
        textButtonOK = game.add.text(game.world.centerX,
            game.world.centerY, game.global.activeLanguage.Accept, game.global.style)
        textButtonOK.anchor.set(0.5)
        textButtonOK.scale.setTo(0.5,0.5)

        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }
        function actionOnClickOK(){
            buttonBack.inputEnabled = false
            buttonBack.alpha = 0.6
            textButtonBack.alpha = 0.6

            buttonOK.inputEnabled = false
            buttonOK.alpha = 0.6
            textButtonOK.alpha = 0.6

            let msg = {
                event: 'CHOOSESNAIL',
                chooseSnail: 'NORMAL'
            }
            game.global.socket.send(JSON.stringify(msg))
            console.log(this.game.global.roomNameMulti)
            let msg2 = {
                event: 'MULTIPLAYER',
                roomName : this.game.global.roomNameMulti
            }
            game.global.socket.send(JSON.stringify(msg2))
            console.log('chooseSnail y multiplayer mandados')
        }
    },

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update : function() {
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
		
	}
}