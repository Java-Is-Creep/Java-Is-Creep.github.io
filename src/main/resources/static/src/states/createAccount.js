Slooow.createAccountState = function(game) {
    var buttonCreateAccount
    var buttonBack
}

Slooow.createAccountState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **CREATEACCOUNT** state");
        }
    },

    preload : function() {
        // BackGround
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)
        
        // Campo nombre de usuario
        usernameInput = game.add.inputField(game.world.centerX - 160,
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

        // Campo PassWord
        passwordInput = game.add.inputField(game.world.centerX - 160,
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

        //Campo confirmar pass
        confirmPasswordInput = game.add.inputField(game.world.centerX - 160,
            game.world.centerY +40, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 30,
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Confirm Password',
            type: PhaserInput.InputType.password
        });

        var style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        }

        //Boton crear cuenta
        buttonCreateAccount = game.add.button(game.world.centerX ,
            game.world.centerY + 140, 'button', actionOnClickCreate, this,
            0, 0, 0)
        buttonCreateAccount.anchor.set(0.5)
        buttonCreateAccount.scale.setTo(0.4, 0.3)
        //Texto boton crear cuenta
        textButtonInit = game.add.text(game.world.centerX ,
            game.world.centerY + 140, 'Create Account', style)
        textButtonInit.anchor.set(0.5)
        textButtonInit.scale.setTo(0.5, 0.5)

        //Boton atras
        buttonBack = game.add.button(50 ,
            40  , 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)
        //Texto atras
        textButtonBack = game.add.text(50 ,
            40, 'Back', style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5, 0.5)

        function actionOnClickCreate (){
            if (usernameInput.value !== undefined && passwordInput.value !== undefined && confirmPasswordInput.value != undefined) {
				if (usernameInput.value.length !== 0 && passwordInput.value.length !== 0 && confirmPasswordInput.value.length !== 0) {
					let msg = {
						event : 'CREATEACCOUNT',
						name : usernameInput.value,
                        pass : passwordInput.value,
                        confirmPass : confirmPasswordInput.value
                    }
                    game.global.socket.send(JSON.stringify(msg))
                    
                    game.global.username = usernameInput.value
                    game.global.password = passwordInput.value
					//inicioSesionNameButton.text.setText('')
					inicioSesionNameButton.value = undefined
					//inicioSesionPassButton.text.setText('')
                    inicioSesionPassButton.value = undefined
///////////////////////////////////////////////////////////////////////////////////////////
                    //Por ahora pasa directamente al menu principal, pero mas tarde habrá que comprobar usuario y contraseña
                    //game.state.start('mainMenuState')
				}
			}
            game.state.start('mainMenuState')
        }

        function actionOnClickBack (){
            game.state.start('initSesionState')
        }
    },

    create : function() {},

    update : function() {}
}