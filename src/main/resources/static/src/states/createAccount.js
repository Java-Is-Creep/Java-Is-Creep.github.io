Slooow.createAccountState = function(game) {
    var buttonCreateAccount
    var buttonBack
}

Slooow.createAccountState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **CREATEACCOUNT** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
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
            placeHolder: game.global.activeLanguage.InputUser
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
            placeHolder: game.global.activeLanguage.InputPass,
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
            placeHolder: game.global.activeLanguage.InputConfirm,
            type: PhaserInput.InputType.password
        });

        //Boton ESPAÑITA AE
        buttonAE = game.add.button(game.world.width - 60,
            50, 'ESPAÑITABtn', actionOnClickLanguage, this,
            0, 0, 0)
        buttonAE.anchor.set(0.5)
        buttonAE.scale.setTo(0.3, 0.3)
        buttonAE.alpha = 0
        buttonAE.inputEnabled = false
        //Boton eng
        buttonEng = game.add.button(game.world.width - 60,
            50, 'engBtn', actionOnClickLanguage, this,
            0, 0, 0)
        buttonEng.anchor.set(0.5)
        buttonEng.scale.setTo(0.3, 0.3)
        buttonEng.alpha = 0
        buttonEng.inputEnabled = false 
        if(game.global.activeLanguage.Language == 'eng'){
            this.language = 'eng'
            buttonEng.alpha = 1
            buttonEng.inputEnabled = true
        } else {
            this.language = 'ESPAÑITA'
            buttonAE.alpha = 1
            buttonAE.inputEnabled = true
        }

        //Boton crear cuenta
        buttonCreateAccount = game.add.button(game.world.centerX ,
            game.world.centerY + 140, 'button', actionOnClickCreate, this,
            0, 0, 0)
        buttonCreateAccount.anchor.set(0.5)
        buttonCreateAccount.scale.setTo(0.4, 0.3)
        //Texto boton crear cuenta
        textButtonInit = game.add.text(game.world.centerX ,
            game.world.centerY + 140, game.global.activeLanguage.SingIn, game.global.style)
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
            40, game.global.activeLanguage.Back, game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5, 0.5)

        function actionOnClickCreate (){
            if (usernameInput.value !== undefined && passwordInput.value !== undefined && confirmPasswordInput.value != undefined) {
				if (usernameInput.value.length !== 0 && passwordInput.value.length !== 0 && confirmPasswordInput.value.length !== 0) {
					let msg = {
						event : 'CREATEACCOUNT',
						playerName : usernameInput.value,
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
            //game.state.start('mainMenuState')
        }

        function actionOnClickBack (){
            game.state.start('initSesionState')
        }

        function actionOnClickLanguage(){
            //TODO Cambio real de idioma
            if(this.language == 'eng'){
                buttonEng.alpha = 0
                buttonEng.inputEnabled = false
                buttonAE.alpha = 1
                buttonAE.inputEnabled = true
                this.language = 'ESPAÑITA'
                game.global.activeLanguage = game.global.languageData.ESPAÑITA
            } else {
                buttonAE.alpha = 0
                buttonAE.inputEnabled = false
                buttonEng.alpha = 1
                buttonEng.inputEnabled = true
                this.language = 'eng'
                game.global.activeLanguage = game.global.languageData.eng
            }
            textButtonInit.setText(game.global.activeLanguage.LogIn);
            textButtonCreate.setText(game.global.activeLanguage.SingIn);
            textButtonBack.setText(game.global.activeLanguage.Back)
            passwordInput.placeHolder.setText(game.global.activeLanguage.InputPass)
            usernameInput.placeHolder.setText(game.global.activeLanguage.InputUser)
            confirmPasswordInput.placeHolder.setText(game.global.activeLanguage.InputConfirm)
        }
    },

    create : function() {},

    update : function() {}
}