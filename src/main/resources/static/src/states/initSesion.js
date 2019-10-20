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
        //console.log(this.background.tint)
        this.background.tileScale.set(0.4, 0.4)
        this.background.anchor.set(0.5, 0.5)
    },

    // Escribimos nombre y contraseña para el jugador y mandamos mensaje al
    // servidor para que lo compruebe
    create: function () {

        if ( game.global.musicMenu == undefined){
            game.global.musicMenu = this.game.add.audio('musicMenu')
        }
            game.global.musicMenu.loop = true
            game.global.musicMenu.volume = 0.2
        if (game.global.musicMenu.isPlaying == false) {
            game.global.musicMenu.play()
        }
        // Boton Username
        inicioSesionNameButton = game.add.inputField(game.world.centerX - 240,
            game.world.centerY - 140, {
            font: '40px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 55,
            width: 450,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: game.global.activeLanguage.InputUser,
            zoom: false
        });

        // Boton PassWord
        inicioSesionPassButton = game.add.inputField(game.world.centerX - 240,
            game.world.centerY - 30, {
            font: '40px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 55,
            width: 450,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: game.global.activeLanguage.InputPass,
            type: PhaserInput.InputType.password,
            zoom: false
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
        if (game.global.activeLanguage.Language == 'eng') {
            this.language = 'eng'
            buttonEng.alpha = 1
            buttonEng.inputEnabled = true
        } else {
            this.language = 'ESPAÑITA'
            buttonAE.alpha = 1
            buttonAE.inputEnabled = true
        }

        buttonInitSesion = game.add.button(game.world.centerX + 200,
            game.world.centerY + 170, 'button', actionOnClickInit, this,
            0, 0, 0)
        buttonInitSesion.anchor.set(0.5)

        // Init Sesion Text
        textButtonInit = game.add.text(game.world.centerX + 200,
            game.world.centerY + 170, game.global.activeLanguage.LogIn, game.global.style)
        textButtonInit.anchor.set(0.5)
        textButtonInit.alpha = 0.5
        buttonInitSesion.alpha = 0.5
        textButtonInit.scale.setTo(1, 1)
        buttonInitSesion.scale.setTo(0.65, 0.65)

        // Create Account Button
        buttonCreateAccount = game.add.button(game.world.centerX - 200,
            game.world.centerY + 170, 'button', actionOnClickCreate, this,
            0, 0, 0)
        buttonCreateAccount.anchor.set(0.5)

        // Text Create Account
        textButtonCreate = game.add.text(game.world.centerX - 200,
            game.world.centerY + 170, game.global.activeLanguage.SingIn, game.global.style)
        textButtonCreate.anchor.set(0.5)
        textButtonCreate.scale.setTo(1, 1)
        buttonCreateAccount.scale.setTo(0.65, 0.65)

        //Funcion que se llama cuando se pulsa en iniciar sesion
        function actionOnClickInit() {
            if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined) {
                if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0) {
                    let msg = {
                        event: 'LOGIN',
                        playerName: inicioSesionNameButton.value,
                        pass: inicioSesionPassButton.value
                    }
                    //console.log('Usuario:' + inicioSesionNameButton.value)
                    //console.log('contrasena: ' + inicioSesionPassButton.value)
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

        function actionOnClickLanguage() {
            //TODO Cambio real de idioma
            if (this.language == 'eng') {
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

        this.background.tilePosition.x += 0.5
        this.background.tilePosition.y -= 0.5

        // Función para mostrar el boton de inicio de sesion con un alpha de 1
        if (inicioSesionNameButton.value !== undefined && inicioSesionPassButton.value !== undefined) {
            if (inicioSesionNameButton.value.length !== 0 && inicioSesionPassButton.value.length !== 0) {
                textButtonInit.alpha = 1
                buttonInitSesion.alpha = 1
            } else {
                textButtonInit.alpha = 0.5
                buttonInitSesion.alpha = 0.5
            }
        }
    }
}
