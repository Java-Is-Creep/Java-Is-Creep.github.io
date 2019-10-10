Slooow.initSesionState = function (game) {
    var buttonInitSesion = undefined
    var textButtonInit = undefined
    var inicioSesionNameButton = undefined
    var inicioSesionPassButton = undefined
}

Slooow.initSesionState.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **INITSESION** state");
        }
    },

    preload: function () {
    },

    // Escribimos nombre y contraseña para el jugador y mandamos mensaje al
    // servidor para que lo compruebe
    create: function () {
        // BackGround
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
	    this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)
        //this.background.scale.setTo(1.2, 1.2)

		/*
		// Window
		var window = game.add.image (game.world.centerX, game.world.centerY, 'window')
		window.scale.setTo(0.65, 0.65)
		window.anchor.set(0.5, 0.5)
		
		// Logo y Nombre
		var logo = game.add.image (game.world.centerX, game.world.centerY - 200, 'logo')
		logo.scale.setTo(0.5, 0.5)
		logo.anchor.set(0.5, 0.5)
		
		var style = {
			font : "bold 40px Impact",
			fill : "#ffffff",
			align : "center"
		};
		/*var text = game.add.text(game.world.centerX, game.world.centerY - 200,
				'Slooow GAME', style)
		text.anchor.set(0.5)
        */

        // Boton Username
        inicioSesionNameButton = game.add.inputField(game.world.centerX - 160,
            game.world.centerY - 100, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 30,
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Username'
        });

        // Boton PassWord
        inicioSesionPassButton = game.add.inputField(game.world.centerX - 160,
            game.world.centerY - 30, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 30,
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Password',
            type: PhaserInput.InputType.password
        });

        // Init Session Button
        var style2 = {
            font: "40px Arial",
            fill: "#000000",
            align: "center"
        };

        game.global.input2 = game.add.inputField(game.world.centerX - 480,
            game.world.centerY + 175, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 20,
            width: 580,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Click'
        });
        this.escKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.ENTER);


        //Boton iniciar sesion
        buttonInitSesion = game.add.button(game.world.centerX + 100,
            game.world.centerY + 100, 'button', actionOnClickInit, this,
            0, 0, 0)
        buttonInitSesion.anchor.set(0.5)

        //Boton crear cuenta
        buttonCreateAccount = game.add.button(game.world.centerX - 100,
            game.world.centerY + 100, 'button', actionOnClickCreate, this,
            0, 0, 0)
        buttonCreateAccount.anchor.set(0.5)

        //Texto iniciar sesion
        textButtonInit = game.add.text(game.world.centerX + 100,
            game.world.centerY + 100, 'Iniciar Sesion', style2)
        textButtonInit.anchor.set(0.5)
        //textButtonInit.alpha = 0.5
        //buttonInitSesion.alpha = 0.5
        textButtonInit.scale.setTo(0.5, 0.5)
        buttonInitSesion.scale.setTo(0.3, 0.3)

        //Texto boton crear
        textButtonCreate = game.add.text(game.world.centerX - 100,
            game.world.centerY + 100, 'Crear cuenta', style2)
        textButtonCreate.anchor.set(0.5)
        //textButtonCreate.aplha = 0.5
        textButtonCreate.scale.setTo(0.5, 0.5)
        //buttonCreateAccount.alpha = 0.5
        buttonCreateAccount.scale.setTo(0.3, 0.3)

        //Funcion que se llama cuando se pulsa en iniciar sesion
        function actionOnClickInit() {
            if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined) {
                if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0) {
                    let msg = {
                        event: 'NAME AND PASSWORD',
                        name: inicioSesionNameButton.value,
                        pass: inicioSesionPassButton.value
                    }
                    console.log('Usuario:' + inicioSesionNameButton.value)
                    console.log('contrasena: ' + inicioSesionPassButton.value)
                    game.global.username = inicioSesionNameButton.value
                    game.global.password = inicioSesionPassButton.value
                    game.global.socket.send(JSON.stringify(msg))
                    inicioSesionNameButton.text.setText('')
                    inicioSesionNameButton.value = undefined
                    inicioSesionPassButton.text.setText('')
                    inicioSesionPassButton.value = undefined


                    //Por ahora pasa directamente al menu principal, pero mas tarde habrá que comprobar usuario y contraseña
                    game.state.start('mainMenuState')
                }
            }
        }

        //Funcion que se llama cuando se pulsa en crear cuenta
        function actionOnClickCreate() {
            console.log('Pulsado crear cuenta')
            game.state.start('createAccountState')
            console.log('despues crear cuenta')
        }   

    },

    update: function () {
        
        if (game.global.input2.value !== undefined) {
            if (this.escKey.justDown
                && game.global.input2.value.length !== 0) {

                let msg = {
                    event: 'SINGLEPLAYER',
                    playerName: game.global.input2.value,
                    roomName: 'sala1'
                }
                game.global.socket.send(JSON.stringify(msg))
                game.global.input2.text.setText('')
                game.global.input2.value = undefined


                game.state.start('singlePlayerState')
                console.log('despues de iniciar isngle')
            }
        }


    }
    /*if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined){
        if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0){
            textButtonInit.alpha = 1
            buttonInitSesion.alpha = 1
        }else {
            textButtonInit.alpha = 0.5
            buttonInitSesion.alpha = 0.5
        }
    }*/
}
