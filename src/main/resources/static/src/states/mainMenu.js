Slooow.mainMenuState = function (game) {
    var buttonStartSolo
    var optionsClicked 
    var minAlpha
    var maxAlpha
    var activeSound
    var language
}

Slooow.mainMenuState.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **MainMenu** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
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

        var styleTitle = {
            font: "bold 160px Impact",
            fill: "#ffffff",
            align: "center"
        };

        // TITLE
        buttonTittle = game.add.button(game.world.centerX,
            50, 'button', null, this,
            0, 0, 0)
        buttonTittle.anchor.set(0.5)
        buttonTittle.scale.setTo(1, 0.5)
        buttonTittle.inputEnable = false;
        textTitle = game.add.text(game.world.centerX,
            50, 'SLOOOW', styleTitle)
        textTitle.anchor.set(0.5)
        textTitle.scale.setTo(0.5, 0.5)
        

        //User
        buttonUser = game.add.button(240,
            40, 'button', null, this,
            0, 0, 0)
        buttonUser.anchor.set(0.5)
        buttonUser.scale.setTo(0.6, 0.35)
        buttonUser.inputEnable = false;
        textUsername = game.add.text(240,
            40, game.global.username, game.global.style)
        textUsername.anchor.set(0.5)
        textUsername.scale.setTo(0.5, 0.5)

        // Boton empezar juego solo
        buttonStartSolo = game.add.button(game.world.centerX + 300,
            game.world.centerY - 50, 'button', actionOnClickStartSolo, this,
            0, 0, 0)
        buttonStartSolo.anchor.set(0.5)
        buttonStartSolo.scale.setTo(0.6, 0.6)
        // Texto empezar juego solo
        textButtonStartSolo = game.add.text(game.world.centerX + 300,
            game.world.centerY - 50, game.global.activeLanguage.SoloMode, game.global.style)
        textButtonStartSolo.anchor.set(0.5)
        //textButtonStartSolo.scale.setTo(0.7, 0.7)

        /*
        //Boton empezar maraton
        buttonStartMarathon = game.add.button(game.world.centerX + 300,
            game.world.centerY - 50, 'button', actionOnClickStartMarathon, this,
            0, 0, 0)
        buttonStartMarathon.anchor.set(0.5)
        buttonStartMarathon.scale.setTo(0.3, 0.3)
        //Texto empezar maraton
        textButtonStartMarathon = game.add.text(game.world.centerX + 300,
            game.world.centerY - 50, game.global.activeLanguage.Marathon, game.global.style)
        textButtonStartMarathon.anchor.set(0.5)
        textButtonStartMarathon.scale.setTo(0.5, 0.5)
            */

        //Boton empezar multi online
        buttonStartMultiOnline = game.add.button(game.world.centerX + 300,
            game.world.centerY + 100, 'button', actionOnClickStartOnline, this,
            0, 0, 0)
        buttonStartMultiOnline.anchor.set(0.5)
        buttonStartMultiOnline.scale.setTo(0.6, 0.6)
        //Texto empezar multi online
        textButtonStartMultiOnline = game.add.text(game.world.centerX + 300,
            game.world.centerY + 100, game.global.activeLanguage.Online, game.global.style)
        textButtonStartMultiOnline.anchor.set(0.5)
        //textButtonStartMultiOnline.scale.setTo(0.7, 0.7)

        /*
        //Boton empezar multi local
        buttonStartMultiLocal = game.add.button(game.world.centerX + 300,
            game.world.centerY + 100, 'button', actionOnClickStartLocal, this,
            0, 0, 0)
        buttonStartMultiLocal.anchor.set(0.5)
        buttonStartMultiLocal.scale.setTo(0.3, 0.3)
        //Texto empezar multi local
        textButtonStartMultiLocal = game.add.text(game.world.centerX + 300,
            game.world.centerY + 100, game.global.activeLanguage.Local, game.global.style)
        textButtonStartMultiLocal.anchor.set(0.5)
        textButtonStartMultiLocal.scale.setTo(0.5, 0.5)
        */

        //Boton tienda
        buttonShop = game.add.button(game.world.centerX - 300,
            game.world.centerY, 'storeBtn', actionOnClickStartShop, this,
            0, 0, 0)
        buttonShop.anchor.set(0.5)
        buttonShop.scale.setTo(0.3, 0.3)

        // Boton empezar records
        buttonStartRecords = game.add.button(game.world.centerX,
            game.world.centerY, 'button', actionOnClickStartRecords, this,
            0, 0, 0)
        buttonStartRecords.anchor.set(0.5)
        buttonStartRecords.scale.setTo(0.3, 0.3)
        // Texto empezar records
        textButtonStartRecords = game.add.text(game.world.centerX,
            game.world.centerY, game.global.activeLanguage.Records, game.global.style)
        textButtonStartRecords.anchor.set(0.5)
        textButtonStartRecords.scale.setTo(0.5, 0.5)

        //Boton instagram
        buttonInstagram = game.add.button(game.world.centerX - 150,
            game.world.centerY + 250, 'instaBtn', actionOnClickInstagram, this,
            0, 0, 0)
        buttonInstagram.anchor.set(0.5)
        buttonInstagram.scale.setTo(0.3, 0.3)

        //Boton facebook
        buttonWeb = game.add.button(game.world.centerX,
            game.world.centerY + 250, 'facebookBtn', actionOnClickFacebook, this,
            0, 0, 0)
        buttonWeb.anchor.set(0.5)
        buttonWeb.scale.setTo(0.3, 0.3)

        //Boton twitter
        buttonTwitter = game.add.button(game.world.centerX + 150,
            game.world.centerY + 250, 'twitterBtn', actionOnClickTwitter, this,
            0, 0, 0)
        buttonTwitter.anchor.set(0.5)
        buttonTwitter.scale.setTo(0.3, 0.3)

        //Boton desconectar
        buttonDisconnect = game.add.button(60,
            40, 'logOffBtn', actionOnClickDisconnect, this,
            0, 0, 0)
        buttonDisconnect.anchor.set(0.5)
        buttonDisconnect.scale.setTo(0.3, 0.3)

        //Boton opciones
        buttonOptions = game.add.button(game.world.width - 60,
            40, 'settingsBtn', actionOnClickOptions, this,
            0, 0, 0)
        buttonOptions.anchor.set(0.5)
        buttonOptions.scale.setTo(0.3, 0.3)

        //Boton sonido on
        buttonSoundOn = game.add.button(game.world.width - 60,
            120, 'soundOnBtn', actionOnClickSound, this,
            0, 0, 0)
        buttonSoundOn.anchor.set(0.5)
        buttonSoundOn.scale.setTo(0.3, 0.3)
        buttonSoundOn.alpha = 0
        buttonSoundOn.inputEnabled = false
        this.activeSound = true;
        //Boton sonido off
        buttonSoundOff = game.add.button(game.world.width - 60,
            120, 'soundOffBtn', actionOnClickSound, this,
            0, 0, 0)
        buttonSoundOff.anchor.set(0.5)
        buttonSoundOff.scale.setTo(0.3, 0.3)
        buttonSoundOff.alpha = 0
        buttonSoundOff.inputEnabled = false

        //Boton ESPAÑITA AE
        if(game.global.activeLanguage.Language == 'eng'){
            this.language = 'eng'
        } else {
            this.language = 'ESPAÑITA'
        }
        buttonAE = game.add.button(game.world.width - 60,
            200, 'ESPAÑITABtn', actionOnClickLanguage, this,
            0, 0, 0)
        buttonAE.anchor.set(0.5)
        buttonAE.scale.setTo(0.3, 0.3)
        buttonAE.alpha = 0
        buttonAE.inputEnabled = false
        //Boton eng
        buttonEng = game.add.button(game.world.width - 60,
            200, 'engBtn', actionOnClickLanguage, this,
            0, 0, 0)
        buttonEng.anchor.set(0.5)
        buttonEng.scale.setTo(0.3, 0.3)
        buttonEng.alpha = 0
        buttonEng.inputEnabled = false 

        //Boton contacto
        buttonContact = game.add.button(game.world.width - 60,
            280, 'jTeamBtn', actionOnClickWeb, this,
            0, 0, 0)
        buttonContact.anchor.set(0.5)
        buttonContact.scale.setTo(0.3, 0.3)
        buttonContact.alpha = 0
        buttonContact.inputEnabled = false

        function actionOnClickStartSolo() {
            game.state.start('menuSoloAndMultiLocalState')
        }

        /*
        function actionOnClickStartMarathon() {
            //game.state.start('marathonState')
        }*/

        function actionOnClickStartOnline() {
            game.state.start('menuMultiOnlineState')
        }

        /*
        function actionOnClickStartLocal() {
            //game.state.start('localState')
        }*/

        function actionOnClickStartShop() {
            let msg = {
                event: 'SHOP'
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('shopState')
        }

        function actionOnClickStartRecords() {
            let msg = {
                event: 'MYRECORDS'
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('recordsState')
        }

        function actionOnClickInstagram() {
            window.open('https://www.instagram.com/java_is_creep/', this)
        }

        function actionOnClickFacebook() {
            window.open('https://www.facebook.com/javaiscreepteam/', this)
        }

        function actionOnClickWeb() {
            window.open('https://java-is-creep.github.io/Portfolio/', this)
        }

        function actionOnClickTwitter() {
            window.open('https://twitter.com/Java_Is_Creep', this)
        }

        function actionOnClickDisconnect() { 
            let msg = {
                event: 'DISCONNECT',
                playerName: game.global.username
            }
            game.global.socket.send(JSON.stringify(msg))
            game.global.username = ''
            game.global.password = ''
            //game.state.start('initSesionState')
        }

        // Desplega una ventana en un lateral para acceder a las opciones, deshabilitando todo lo demás
        function actionOnClickOptions() {
            if (optionsClicked == false) {
                optionsClicked = true

                textTitle.alpha = minAlpha;
                buttonTittle.alpha = minAlpha;

                buttonUser.alpha = minAlpha
                textUsername.alpha = minAlpha

                buttonStartSolo.alpha = minAlpha
                buttonStartSolo.inputEnabled = false;
                textButtonStartSolo.alpha = minAlpha
        
                //buttonStartMarathon.alpha = minAlpha
                //buttonStartMarathon.inputEnabled = false
                //textButtonStartMarathon.alpha = minAlpha

                buttonStartRecords.alpha = minAlpha
                buttonStartRecords.inputEnabled = false
                textButtonStartRecords.alpha = minAlpha

                buttonStartMultiOnline.alpha = minAlpha
                buttonStartMultiOnline.inputEnabled = false
                textButtonStartMultiOnline.alpha = minAlpha

                //buttonStartMultiLocal.alpha = minAlpha
                //buttonStartMultiLocal.inputEnabled = false
                //textButtonStartMultiLocal.alpha = minAlpha

                buttonShop.alpha = minAlpha
                buttonShop.inputEnabled = false

                buttonInstagram.alpha = minAlpha
                buttonInstagram.inputEnabled = false

                buttonWeb.alpha = minAlpha
                buttonWeb.inputEnabled = false

                buttonTwitter.alpha = minAlpha
                buttonTwitter.inputEnabled = false

                buttonDisconnect.alpha = minAlpha
                buttonDisconnect.inputEnabled = false

                buttonSoundOn.alpha = 1
                buttonSoundOn.inputEnabled = true

                if(this.language == 'eng'){
                    buttonEng.alpha = 1
                    buttonEng.inputEnabled = true
                } else {
                    buttonAE.alpha = 1
                    buttonAE.inputEnabled = true
                }
                

                buttonContact.alpha = 1
                buttonContact.inputEnabled = true
            } else{

                optionsClicked = false

                textTitle.alpha = maxAlpha;
                buttonTittle.alpha = maxAlpha;

                buttonUser.alpha = maxAlpha
                textUsername.alpha = maxAlpha

                buttonStartSolo.alpha = maxAlpha
                buttonStartSolo.inputEnabled = true;
                textButtonStartSolo.alpha = maxAlpha
        
               // buttonStartMarathon.alpha = maxAlpha
               // buttonStartMarathon.inputEnabled = true
               // textButtonStartMarathon.alpha = maxAlpha

                buttonStartRecords.alpha = maxAlpha
                buttonStartRecords.inputEnabled = true
                textButtonStartRecords.alpha = maxAlpha

                buttonStartMultiOnline.alpha = maxAlpha
                buttonStartMultiOnline.inputEnabled = true
                textButtonStartMultiOnline.alpha = maxAlpha

                //buttonStartMultiLocal.alpha = maxAlpha
               // buttonStartMultiLocal.inputEnabled = true
                //textButtonStartMultiLocal.alpha = maxAlpha

                buttonShop.alpha = maxAlpha
                buttonShop.inputEnabled = true

                buttonInstagram.alpha = maxAlpha
                buttonInstagram.inputEnabled = true

                buttonWeb.alpha = maxAlpha
                buttonWeb.inputEnabled = true

                buttonTwitter.alpha = maxAlpha
                buttonTwitter.inputEnabled = true

                buttonDisconnect.alpha = maxAlpha
                buttonDisconnect.inputEnabled = true

            
                buttonSoundOn.alpha = 0
                buttonSoundOn.inputEnabled = false
            
                buttonSoundOff.alpha = 0
                buttonSoundOff.inputEnabled = false
                
            
                buttonEng.alpha = 0
                buttonEng.inputEnabled = false
            
                buttonAE.alpha = 0
                buttonAE.inputEnabled = false
                

                buttonContact.alpha = 0
                buttonContact.inputEnabled = false
            }
        }

        function actionOnClickSound (){
            //TODO Cambio real de sonido
            if(this.activeSound){
                buttonSoundOff.alpha = maxAlpha
                buttonSoundOff.inputEnabled = true
                buttonSoundOn.alpha = 0
                buttonSoundOn.inputEnabled = false
                this.activeSound = false;
            } else {
                buttonSoundOn.alpha = maxAlpha
                buttonSoundOn.inputEnabled = true
                buttonSoundOff.alpha = 0
                buttonSoundOff.inputEnabled = false
                this.activeSound = true;
            }

        }

        function actionOnClickLanguage(){
            //TODO Cambio real de idioma
            if(this.language == 'eng'){
                buttonEng.alpha = 0
                buttonEng.inputEnabled = false
                buttonAE.alpha = maxAlpha
                buttonAE.inputEnabled = true
                this.language = 'ESPAÑITA'
                game.global.activeLanguage = game.global.languageData.ESPAÑITA
            } else {
                buttonAE.alpha = 0
                buttonAE.inputEnabled = false
                buttonEng.alpha = maxAlpha
                buttonEng.inputEnabled = true
                this.language = 'eng'
                game.global.activeLanguage = game.global.languageData.eng
            }
            textButtonStartRecords.setText(game.global.activeLanguage.Records)
            //textButtonStartMarathon.setText(game.global.activeLanguage.Marathon);
        }
    },

    update: function () {}
}