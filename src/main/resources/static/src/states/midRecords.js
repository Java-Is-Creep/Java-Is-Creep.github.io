Slooow.midRecordsState = function(game) {
}

Slooow.midRecordsState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **MIDRECORDS** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
	},

	preload : function() {
		
	},

	create : function() {
        //Background
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

        //Boton myRecords
		buttonMyRecords = game.add.button(game.world.centerX -200,
            game.world.centerY, 'button', actionOnClickMyRecords, this,
            0, 0, 0)
        buttonMyRecords.anchor.set(0.5)
        buttonMyRecords.scale.setTo(0.5, 0.5)

        //Texto my records
		textButtonMyRecords = game.add.text(game.world.centerX -200,
            game.world.centerY, game.global.activeLanguage.Records, game.global.style)
        textButtonMyRecords.anchor.set(0.5)
        textButtonMyRecords.scale.setTo(0.5,0.5)

        //Boton top10
		buttonTop10 = game.add.button(game.world.centerX +200,
            game.world.centerY, 'button', actionOnClickTop10, this,
            0, 0, 0)
        buttonTop10.anchor.set(0.5)
        buttonTop10.scale.setTo(0.5, 0.5)

        //Texto top10
		textButtonTop10 = game.add.text(game.world.centerX +200,
            game.world.centerY, 'TOP 10', game.global.style)
        textButtonTop10.anchor.set(0.5)
        textButtonTop10.scale.setTo(0.5,0.5)

        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }

        function actionOnClickTop10(){
            game.state.start('top10State')
        }

        function actionOnClickMyRecords(){
            let msg = {
                event: 'MYRECORDS'
            }
            game.global.socket.send(JSON.stringify(msg))
        }


	},

	update : function() {
		this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
	}
}