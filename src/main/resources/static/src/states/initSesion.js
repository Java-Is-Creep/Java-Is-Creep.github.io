Slooow.initSesionState = function (game) {
    var buttonInitSesion = undefined
    var textButtonInit = undefined
    var inicioSesionNameButton = undefined
    var inicioSesionPassButton = undefined
    this.language
}

Slooow.initSesionState.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **INITSESION** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
    },

    preload: function () {
        // BackGround
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)
    },

    // Escribimos nombre y contraseña para el jugador y mandamos mensaje al
    // servidor para que lo compruebe
    create: function () {
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
            placeHolder: game.global.activeLanguage.InputUser,
            zoom: true
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
            placeHolder: game.global.activeLanguage.InputPass,
            type: PhaserInput.InputType.password,
            zoom: true
        });

        // Init Session Button
        var style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        };

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

        buttonInitSesion = game.add.button(game.world.centerX + 100,
            game.world.centerY + 100, 'button', actionOnClickInit, this,
            0, 0, 0)
        buttonInitSesion.anchor.set(0.5)

        // Init Sesion Text
        textButtonInit = game.add.text(game.world.centerX + 100,
            game.world.centerY + 100, game.global.activeLanguage.LogIn, style)
        textButtonInit.anchor.set(0.5)
        textButtonInit.alpha = 0.5
        buttonInitSesion.alpha = 0.5
        textButtonInit.scale.setTo(0.5, 0.5)
        buttonInitSesion.scale.setTo(0.3, 0.3)

        // Create Account Button
        buttonCreateAccount = game.add.button(game.world.centerX - 100,
            game.world.centerY + 100, 'button', actionOnClickCreate, this,
            0, 0, 0)
        buttonCreateAccount.anchor.set(0.5)

        // Text Create Account
        textButtonCreate = game.add.text(game.world.centerX - 100,
            game.world.centerY + 100, game.global.activeLanguage.SingIn, style)
        textButtonCreate.anchor.set(0.5)
        textButtonCreate.scale.setTo(0.5, 0.5)
        buttonCreateAccount.scale.setTo(0.3, 0.3)

        //Funcion que se llama cuando se pulsa en iniciar sesion
        function actionOnClickInit() {
            if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined) {
                if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0) {
                    let msg = {
                        event: 'LOGIN',
                        playerName: inicioSesionNameButton.value,
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

//////////////////////////////////////////////////////////////////////
                    //Por ahora pasa directamente al menu principal, pero mas tarde habrá que comprobar usuario y contraseña
                    //game.state.start('mainMenuState')
                }
            }
        }

        //Funcion que se llama cuando se pulsa en crear cuenta
        function actionOnClickCreate() {
            game.state.start('createAccountState')
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
            inicioSesionPassButton.placeHolder.setText(game.global.activeLanguage.InputPass)
            inicioSesionNameButton.placeHolder.setText(game.global.activeLanguage.InputUser)
        }

    },

    update: function () {
        // Función para mostrar el boton de inicio de sesion con un alpha de 1
        if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined){
            if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0){
                textButtonInit.alpha = 1
                buttonInitSesion.alpha = 1
            }else {
                textButtonInit.alpha = 0.5
                buttonInitSesion.alpha = 0.5
            }
        }
    }
}
