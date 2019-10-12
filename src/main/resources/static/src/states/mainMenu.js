Slooow.mainMenuState = function (game) {
    var buttonStartSolo
    var optionsClicked 
    var minAlpha
    var maxAlpha
}

Slooow.mainMenuState.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **MainMenu** state");
        }
    },

    preload: function () {
        //Background
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)
    },

    create: function () {
        // Control de la pestaña de opciones
        optionsClicked = false
        // MinAlpha poner casi en invisible los botones no disponibles
        minAlpha = 0.1
        maxAlpha = 1

        var style = {
            font: "40px Arial",
            fill: "#000000",
            align: "center"
        };

        var style2 = {
            font: "bold 200px Impact",
            fill: "#ffffff",
            align: "center"
        };

        var style3 = {
            font: "40px Arial",
            fill: "#ffffff",
            boundsAlignH: "left"
        };

        // TITLE
        textTitle = game.add.text(game.world.centerX,
            50, 'SLOOOW', style2)
        textTitle.anchor.set(0.5)
        textTitle.scale.setTo(0.5, 0.5)

        //Texto usuario
        textUsername = game.add.text(160,
            40, game.global.username, style3)
        textUsername.anchor.set(0.5)
        textUsername.scale.setTo(0.5, 0.5)

        // Boton empezar juego solo
        buttonStartSolo = game.add.button(game.world.centerX + 100,
            game.world.centerY - 50, 'button', actionOnClickStartSolo, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.3, 0.3)
        // Texto empezar juego solo
        textButtonStartSolo = game.add.text(game.world.centerX + 100,
            game.world.centerY - 50, 'Solo', style)
        textButtonStartSolo.anchor.set(0.5)
        textButtonStartSolo.scale.setTo(0.5, 0.5)

        //Boton empezar maraton
        buttonStartMarathon = game.add.button(game.world.centerX + 300,
            game.world.centerY - 50, 'button', actionOnClickStartMarathon, this,
            0, 0, 0)
        buttonStartMarathon.anchor.set(0.5)
        buttonStartMarathon.scale.setTo(0.3, 0.3)
        //Texto empezar maraton
        textButtonStartMarathon = game.add.text(game.world.centerX + 300,
            game.world.centerY - 50, 'Maraton', style)
        textButtonStartMarathon.anchor.set(0.5)
        textButtonStartMarathon.scale.setTo(0.5, 0.5)

        //Boton empezar multi online
        buttonStartMultiOnline = game.add.button(game.world.centerX + 100,
            game.world.centerY + 100, 'button', actionOnClickStartOnline, this,
            0, 0, 0)
        buttonStartMultiOnline.anchor.set(0.5)
        buttonStartMultiOnline.scale.setTo(0.3, 0.3)
        //Texto empezar multi online
        textButtonStartMultiOnline = game.add.text(game.world.centerX + 100,
            game.world.centerY + 100, 'Online', style)
        textButtonStartMultiOnline.anchor.set(0.5)
        textButtonStartMultiOnline.scale.setTo(0.5, 0.5)

        //Boton empezar multi local
        buttonStartMultiLocal = game.add.button(game.world.centerX + 300,
            game.world.centerY + 100, 'button', actionOnClickStartLocal, this,
            0, 0, 0)
        buttonStartMultiLocal.anchor.set(0.5)
        buttonStartMultiLocal.scale.setTo(0.3, 0.3)
        //Texto empezar multi local
        textButtonStartMultiLocal = game.add.text(game.world.centerX + 300,
            game.world.centerY + 100, 'Local', style)
        textButtonStartMultiLocal.anchor.set(0.5)
        textButtonStartMultiLocal.scale.setTo(0.5, 0.5)

        //Boton tienda
        buttonShop = game.add.button(game.world.centerX - 300,
            game.world.centerY, 'button', actionOnClickStartShop, this,
            0, 0, 0)
        buttonShop.anchor.set(0.5)
        buttonShop.scale.setTo(0.3, 0.3)
        //Texto tienda
        textButtonShop = game.add.text(game.world.centerX - 300,
            game.world.centerY, 'Shop', style)
        textButtonShop.anchor.set(0.5)
        textButtonShop.scale.setTo(0.5, 0.5)

        //Boton instagram
        buttonInstagram = game.add.button(game.world.centerX - 150,
            game.world.centerY + 250, 'button', actionOnClickInstagram, this,
            0, 0, 0)
        buttonInstagram.anchor.set(0.5)
        buttonInstagram.scale.setTo(0.3, 0.3)
        //Texto instagram
        textButtonInstagram = game.add.text(game.world.centerX - 150,
            game.world.centerY + 250, 'Instagram', style)
        textButtonInstagram.anchor.set(0.5)
        textButtonInstagram.scale.setTo(0.5, 0.5)

        //Boton web
        buttonWeb = game.add.button(game.world.centerX,
            game.world.centerY + 250, 'button', actionOnClickWeb, this,
            0, 0, 0)
        buttonWeb.anchor.set(0.5)
        buttonWeb.scale.setTo(0.3, 0.3)
        //Texto web
        textButtonWeb = game.add.text(game.world.centerX,
            game.world.centerY + 250, 'Web', style)
        textButtonWeb.anchor.set(0.5)
        textButtonWeb.scale.setTo(0.5, 0.5)

        //Boton twitter
        buttonTwitter = game.add.button(game.world.centerX + 150,
            game.world.centerY + 250, 'button', actionOnClickTwitter, this,
            0, 0, 0)
        buttonTwitter.anchor.set(0.5)
        buttonTwitter.scale.setTo(0.3, 0.3)
        //Texto twitter
        textButtonTwitter = game.add.text(game.world.centerX + 150,
            game.world.centerY + 250, 'Twitter', style)
        textButtonTwitter.anchor.set(0.5)
        textButtonTwitter.scale.setTo(0.5, 0.5)

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
        textButtonDisconnect.scale.setTo(0.5, 0.5)

        //Boton opciones
        buttonOptions = game.add.button(game.world.width - 60,
            40, 'button', actionOnClickOptions, this,
            0, 0, 0)
        buttonOptions.anchor.set(0.5)
        buttonOptions.scale.setTo(0.25, 0.3)
        //Texto opciones
        textButtonOptions = game.add.text(game.world.width - 60,
            40, 'Options', style)
        textButtonOptions.anchor.set(0.5)
        textButtonOptions.scale.setTo(0.5, 0.5)

        //Boton sonido
        buttonSound = game.add.button(game.world.width - 200,
            100, 'button', actionOnClickSound, this,
            0, 0, 0)
        buttonSound.anchor.set(0.5)
        buttonSound.scale.setTo(0.25, 0.3)
        buttonSound.alpha = 0
        buttonSound.inputEnabled = false
        //Texto sonido
        textButtonSound = game.add.text(game.world.width - 200,
            100, 'Sound', style)
        textButtonSound.anchor.set(0.5)
        textButtonSound.scale.setTo(0.5, 0.5)
        textButtonSound.alpha = 0

        //Boton sonido
        buttonLanguage = game.add.button(game.world.width - 200,
            150, 'button', actionOnClickLanguage, this,
            0, 0, 0)
        buttonLanguage.anchor.set(0.5)
        buttonLanguage.scale.setTo(0.25, 0.3)
        buttonLanguage.alpha = 0
        buttonLanguage.inputEnabled = false
        //Texto sonido
        textButtonLanguage = game.add.text(game.world.width - 200,
            150, 'Language', style)
        textButtonLanguage.anchor.set(0.5)
        textButtonLanguage.scale.setTo(0.5, 0.5)
        textButtonLanguage.alpha = 0

        //Boton contacto
        buttonContact = game.add.button(game.world.width - 200,
            200, 'button', actionOnClickWeb, this,
            0, 0, 0)
        buttonContact.anchor.set(0.5)
        buttonContact.scale.setTo(0.25, 0.3)
        buttonContact.alpha = 0
        buttonContact.inputEnabled = false
        //Texto contacto
        textButtonContact = game.add.text(game.world.width - 200,
            200, 'Contact Us', style)
        textButtonContact.anchor.set(0.5)
        textButtonContact.scale.setTo(0.5, 0.5)
        textButtonContact.alpha = 0

        function actionOnClickStartSolo() {
            game.state.start('menuSoloAndMultiLocalState')
        }

        function actionOnClickStartMarathon() {
            //game.state.start('marathonState')
        }

        function actionOnClickStartOnline() {
            game.state.start('menuMultiOnlineState')
        }

        function actionOnClickStartLocal() {
            //game.state.start('localState')
        }

        function actionOnClickStartShop() {
            game.state.start('shopState')
        }

        function actionOnClickInstagram() {
            window.open('https://www.instagram.com/java_is_creep/', this)
        }

        function actionOnClickWeb() {
            window.open('https://java-is-creep.github.io/Portfolio/', this)
        }

        function actionOnClickTwitter() {
            window.open('https://twitter.com/Java_Is_Creep', this)
        }

        function actionOnClickDisconnect() {
            game.global.username = ''
            game.global.password = ''
            let msg = {
                event: 'DISCONNECT',
                playerName: game.global.username,
            }
            game.global.socket.send(JSON.stringify(msg))
            game.state.start('initSesionState')
        }

        // Desplega una ventana en un lateral para acceder a las opciones, deshabilitando todo lo demás
        function actionOnClickOptions() {
            if (optionsClicked == false) {
                optionsClicked = true

                textTitle.alpha = minAlpha;

                buttonStartSolo.alpha = minAlpha
                buttonStartSolo.inputEnabled = false;
                textButtonStartSolo.alpha = minAlpha
        
                buttonStartMarathon.alpha = minAlpha
                buttonStartMarathon.inputEnabled = false
                textButtonStartMarathon.alpha = minAlpha

                buttonStartMultiOnline.alpha = minAlpha
                buttonStartMultiOnline.inputEnabled = false
                textButtonStartMultiOnline.alpha = minAlpha

                buttonStartMultiLocal.alpha = minAlpha
                buttonStartMultiLocal.inputEnabled = false
                textButtonStartMultiLocal.alpha = minAlpha

                buttonShop.alpha = minAlpha
                buttonShop.inputEnabled = false
                textButtonShop.alpha = minAlpha

                buttonInstagram.alpha = minAlpha
                buttonInstagram.inputEnabled = false
                textButtonInstagram.alpha = minAlpha

                buttonWeb.alpha = minAlpha
                buttonWeb.inputEnabled = false
                textButtonWeb.alpha = minAlpha

                buttonTwitter.alpha = minAlpha
                buttonTwitter.inputEnabled = false
                textButtonTwitter.alpha = minAlpha

                buttonDisconnect.alpha = minAlpha
                buttonDisconnect.inputEnabled = false
                textButtonDisconnect.alpha = minAlpha

                buttonSound.alpha = 1
                buttonSound.inputEnabled = true
                textButtonSound.alpha = 1

                buttonLanguage.alpha = 1
                buttonLanguage.inputEnabled = true
                textButtonLanguage.alpha = 1

                buttonContact.alpha = 1
                buttonContact.inputEnabled = true
                textButtonContact.alpha = 1
            } else{
                optionsClicked = false

                textTitle.alpha = maxAlpha;

                buttonStartSolo.alpha = maxAlpha
                buttonStartSolo.inputEnabled = true;
                textButtonStartSolo.alpha = maxAlpha
        
                buttonStartMarathon.alpha = maxAlpha
                buttonStartMarathon.inputEnabled = true
                textButtonStartMarathon.alpha = maxAlpha

                buttonStartMultiOnline.alpha = maxAlpha
                buttonStartMultiOnline.inputEnabled = true
                textButtonStartMultiOnline.alpha = maxAlpha

                buttonStartMultiLocal.alpha = maxAlpha
                buttonStartMultiLocal.inputEnabled = true
                textButtonStartMultiLocal.alpha = maxAlpha

                buttonShop.alpha = maxAlpha
                buttonShop.inputEnabled = true
                textButtonShop.alpha = maxAlpha

                buttonInstagram.alpha = maxAlpha
                buttonInstagram.inputEnabled = true
                textButtonInstagram.alpha = maxAlpha

                buttonWeb.alpha = maxAlpha
                buttonWeb.inputEnabled = true
                textButtonWeb.alpha = maxAlpha

                buttonTwitter.alpha = maxAlpha
                buttonTwitter.inputEnabled = true
                textButtonTwitter.alpha = maxAlpha

                buttonDisconnect.alpha = maxAlpha
                buttonDisconnect.inputEnabled = true
                textButtonDisconnect.alpha = maxAlpha

                buttonSound.alpha = 0
                buttonSound.inputEnabled = false
                textButtonSound.alpha = 0

                buttonLanguage.alpha = 0
                buttonLanguage.inputEnabled = false
                textButtonLanguage.alpha = 0

                buttonContact.alpha = 0
                buttonContact.inputEnabled = false
                textButtonContact.alpha = 0
            }
        }

        function actionOnClickSound (){
        }

        function actionOnClickLanguage(){
        }
    },

    update: function () {}
}