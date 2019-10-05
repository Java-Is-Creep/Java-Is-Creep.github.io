Slooow.mainMenuState = function(game) {
    var buttonStartSolo
}

Slooow.mainMenuState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **MainMenu** state");
        }
    },

    preload : function() {
    },

    create : function() {

        var style = {
			font : "40px Arial",
			fill : "#000000",
			align : "center"
		};

        var styleTitle = {
			font : "bold 200px Impact",
			fill : "#ffffff",
			align : "center"
		};
        //Background
        b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)

        //Texto titulo
		textTitle = game.add.text(game.world.centerX ,
            50, 'SLOOOW', styleTitle)
        textTitle.anchor.set(0.5)
        textTitle.scale.setTo(0.5,0.5)
        
        //Boton empezar juego solo
		buttonStartSolo = game.add.button(game.world.centerX + 100,
            game.world.centerY - 50, 'button', actionOnClickStartSolo, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)

        //Texto empezar juego solo
		textButtonStartSolo = game.add.text(game.world.centerX + 100,
            game.world.centerY - 50, 'Solo', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5,0.5)

        //Boton empezar maraton
		buttonStartSolo = game.add.button(game.world.centerX + 300,
            game.world.centerY - 50, 'button', actionOnClickStartMarathon, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)

        //Texto empezar maraton
		textButtonStartSolo = game.add.text(game.world.centerX + 300,
            game.world.centerY - 50, 'Maraton', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5,0.5)

        //Boton empezar multi online
		buttonStartSolo = game.add.button(game.world.centerX + 100,
            game.world.centerY +100, 'button', actionOnClickStartOnline, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)

        //Texto empezar multi online
		textButtonStartSolo = game.add.text(game.world.centerX + 100,
            game.world.centerY +100, 'Online', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5,0.5)

        //Boton empezar multi local
		buttonStartSolo = game.add.button(game.world.centerX + 300,
            game.world.centerY +100, 'button', actionOnClickStartLocal, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)

        //Texto empezar multi local
		textButtonStartSolo = game.add.text(game.world.centerX + 300,
            game.world.centerY +100, 'Local', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5,0.5)


        //Boton tienda
		buttonShop = game.add.button(game.world.centerX - 300,
            game.world.centerY , 'button', actionOnClickStartShop, this,
            0, 0, 0)
        buttonShop.anchor.set(0.5)
        buttonShop.scale.setTo(0.3, 0.3)

        //Texto tienda
		textButtonShop = game.add.text(game.world.centerX - 300,
            game.world.centerY , 'Shop', style)
        textButtonShop.anchor.set(0.5)
        textButtonShop.scale.setTo(0.5,0.5)

        //Boton instagram
		buttonStartSolo = game.add.button(game.world.centerX -100,
            game.world.centerY + 200, 'button', actionOnClickInstagram, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)

        //Texto instagram
		textButtonStartSolo = game.add.text(game.world.centerX -100,
            game.world.centerY + 200, 'Instagram', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5,0.5)

        //Boton web
		buttonStartSolo = game.add.button(game.world.centerX,
            game.world.centerY + 200, 'button', actionOnClickWeb, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)

        //Texto web
		textButtonStartSolo = game.add.text(game.world.centerX ,
            game.world.centerY + 200, 'Web', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5,0.5)

         //Boton twitter
		buttonStartSolo = game.add.button(game.world.centerX +100,
            game.world.centerY + 200, 'button', actionOnClickTwitter, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)

        //Texto twitter
		textButtonStartSolo = game.add.text(game.world.centerX +100,
            game.world.centerY + 200, 'Twitter', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5,0.5)
        

        //Boton desconectar
		buttonDisconnect = game.add.button(60,
            40, 'button', actionOnClickDisconnect, this,
            0, 0, 0)
        buttonDisconnect.anchor.set(0.5)
        buttonDisconnect.scale.setTo(0.25, 0.3)

        //Texto desconectar
		textButtonDisconnect = game.add.text(60,
            40, 'Disconnect', style)
        textButtonDisconnect.anchor.set(0.5)
        textButtonDisconnect.scale.setTo(0.5,0.5)
        
        function actionOnClickStartSolo(){
            let msg = {
                event: 'SINGLEPLAYER',
                playerName: game.global.username,
                roomName: 'sala1'
            }
            game.global.socket.send(JSON.stringify(msg))
            game.state.start('singlePlayerState')
        }

        function actionOnClickStartMarathon(){
            let msg = {
                event: 'MARATHON',
                playerName: game.global.username,
                roomName: 'sala1'
            }
            game.global.socket.send(JSON.stringify(msg))
            game.state.start('marathonState')
        }

        function actionOnClickStartOnline(){
            console.log('pulsado online')
            //game.state.start('shopState')
        }

        function actionOnClickStartLocal(){
            console.log('Pulsado local')
            //game.state.start('shopState')
        }

        function actionOnClickStartShop(){
            game.state.start('shopState')
        }

        function actionOnClickInstagram(){
            window.open('https://www.instagram.com/java_is_creep/', this)
        }

        function actionOnClickWeb(){
            window.open('https://java-is-creep.github.io/Portfolio/', this)
        }

        function actionOnClickTwitter(){
            window.open('https://twitter.com/Java_Is_Creep', this)
        }

        function actionOnClickDisconnect(){
            game.global.username = ''
            game.global.password = ''
            let msg = {
                event: 'DISCONNECT',
                playerName: game.global.username,
            }
            game.global.socket.send(JSON.stringify(msg))
            game.state.start('initSesionState')
        }

        function actionOnClickStartShop(){
            game.state.start('shopState')
        }

    },

    update : function() {
    }
}