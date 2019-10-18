Slooow.menuMultiOnlineState = function (game) {
    var option = -1;
    var map = null
}

Slooow.menuMultiOnlineState.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **MENUMULTIONLINE** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
    },

    preload: function () {
    },

    create: function () {

        //Background
        /*
        var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)
*/
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

        //Boton texto explicativo
        buttonText = game.add.button(game.world.centerX,
            game.world.centerY - 280, 'button', null, this,
            0, 0, 0)
        buttonText.anchor.set(0.5)
        buttonText.scale.setTo(2, 0.6)
        buttonText.inputEnabled = false;

        //Texto explicativo
        text = game.add.text(game.world.centerX,
            game.world.centerY - 280, game.global.activeLanguage.OnlineMenuText1, game.global.style)
        text.anchor.set(0.5)
        text.scale.setTo(0.8, 0.8)

        //Boton unirse a sala
        buttonJoin = game.add.button(game.world.centerX - 400,
            game.world.centerY - 100, 'button', actionOnClickJoinRoom, this,
            0, 0, 0)
        buttonJoin.anchor.set(0.5)
        buttonJoin.scale.setTo(0.8, 0.8)

        //Texto unirse a sala
        textButtonJoin = game.add.text(game.world.centerX - 400,
            game.world.centerY - 100, game.global.activeLanguage.JoinRoom, game.global.style)
        textButtonJoin.anchor.set(0.5)
        textButtonJoin.scale.setTo(0.8, 0.8)

        //Boton crear sala
        buttonCreate = game.add.button(game.world.centerX,
            game.world.centerY - 100, 'button', actionOnClickCreateRoom, this,
            0, 0, 0)
        buttonCreate.anchor.set(0.5)
        buttonCreate.scale.setTo(0.8, 0.8)

        //Texto crear sala
        textButtonCreate = game.add.text(game.world.centerX,
            game.world.centerY - 100, game.global.activeLanguage.CreateRoom, game.global.style)
        textButtonCreate.anchor.set(0.5)
        textButtonCreate.scale.setTo(0.8, 0.8)

        //Boton buscar sala
        buttonSearch = game.add.button(game.world.centerX + 400,
            game.world.centerY - 100, 'button', actionOnClickSearchRoom, this,
            0, 0, 0)
        buttonSearch.anchor.set(0.5)
        buttonSearch.scale.setTo(0.8, 0.8)

        //Texto buscar sala
        textButtonSearch = game.add.text(game.world.centerX + 400,
            game.world.centerY - 100, game.global.activeLanguage.SearchRoom, game.global.style)
        textButtonSearch.anchor.set(0.5)
        textButtonSearch.scale.setTo(0.8, 0.8)


        //Boton map1
        buttonMap1 = game.add.button(game.world.centerX - 400,
            game.world.centerY + 100, 'button', actionOnClickMap1, this,
            0, 0, 0)
        buttonMap1.anchor.set(0.5)
        buttonMap1.scale.setTo(0.8, 0.8)

        //Texto map1
        textButtonMap1 = game.add.text(game.world.centerX - 400,
            game.world.centerY + 100, game.global.activeLanguage.Map1, game.global.style)
        textButtonMap1.anchor.set(0.5)
        textButtonMap1.scale.setTo(0.8, 0.8)

        //Boton map2
        buttonMap2 = game.add.button(game.world.centerX,
            game.world.centerY + 100, 'button', actionOnClickMap2, this,
            0, 0, 0)
        buttonMap2.anchor.set(0.5)
        buttonMap2.scale.setTo(0.8, 0.8)

        //Texto map2
        textButtonMap2 = game.add.text(game.world.centerX,
            game.world.centerY + 100, game.global.activeLanguage.Map2, game.global.style)
        textButtonMap2.anchor.set(0.5)
        textButtonMap2.scale.setTo(0.8, 0.8)

        //Boton map3
        buttonMap3 = game.add.button(game.world.centerX + 400,
            game.world.centerY + 100, 'button', actionOnClickMap3, this,
            0, 0, 0)
        buttonMap3.anchor.set(0.5)
        buttonMap3.scale.setTo(0.8, 0.8)

        //Texto map3
        textButtonMap3 = game.add.text(game.world.centerX + 400,
            game.world.centerY + 100, game.global.activeLanguage.Map3, game.global.style)
        textButtonMap3.anchor.set(0.5)
        textButtonMap3.scale.setTo(0.8, 0.8)

        // Boton nombre sala
        roomNameButton = game.add.inputField(game.world.centerX - 400,
            game.world.centerY + 230, {
            font: '25px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            height: 50,
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: game.global.activeLanguage.RoomName,
            zoom: true
        });


        //Boton OK
        buttonOK = game.add.button(game.world.centerX + 200,
            game.world.centerY + 250, 'button', actionOnClickOK, this,
            0, 0, 0)
        buttonOK.anchor.set(0.5, 0.5)
        buttonOK.scale.setTo(0.6, 0.6)

        //Texto OK
        textButtonOK = game.add.text(game.world.centerX + 200,
            game.world.centerY + 250, game.global.activeLanguage.Accept, game.global.style)
        textButtonOK.anchor.set(0.5)
        textButtonOK.scale.setTo(0.8, 0.8)
        /*
        //Boton mapa 2
		buttonMap2 = game.add.button(game.world.centerX ,
            game.world.centerY +250 , 'button', actionOnClickMap2, this,
            0, 0, 0)
        buttonMap2.anchor.set(0.5)
        buttonMap2.scale.setTo(2, 0.8)

        //Texto mapa 2
		textButtonMap2 = game.add.text(game.world.centerX ,
            game.world.centerY +250 , game.global.activeLanguage.Map2, game.global.style)
        textButtonMap2.anchor.set(0.5)
        textButtonMap2.scale.setTo(0.8,0.8)

        //Boton mapa 3
		buttonMap3 = game.add.button(game.world.centerX ,
            game.world.centerY +400 , 'button', actionOnClickMap3, this,
            0, 0, 0)
        buttonMap3.anchor.set(0.5)
        buttonMap3.scale.setTo(2, 0.8)

        //Texto mapa 3
		textButtonMap3 = game.add.text(game.world.centerX ,
            game.world.centerY +400 , game.global.activeLanguage.Map3, game.global.style)
        textButtonMap3.anchor.set(0.5)
        textButtonMap3.scale.setTo(0.8,0.8)
*/
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
        textButtonBack.scale.setTo(0.5, 0.5)

        function actionOnClickBack() {
            game.state.start('mainMenuState')
        }

        function actionOnClickJoinRoom() {
            option = 0;
        }
        function actionOnClickCreateRoom() {
            option = 1;
        }
        function actionOnClickSearchRoom() {
            option = 2;
        }

        function actionOnClickMap1() {
            map = 'map1'
        }
        function actionOnClickMap2() {
            map = 'map2'
        }
        function actionOnClickMap3() {
            map = 'map3'
        }

        function actionOnClickOK() {

            if (option == 0) {
                let msg = {
                    event: 'SEARCHRANDOMROOM'
                }
                game.global.socket.send(JSON.stringify(msg))
            } else if (option == 1) {
                let msg = {
                    event: 'ENTERLOBBYMULTI',
                    RoomMap: map,
                    roomName: roomNameButton.value
                }
                game.global.socket.send(JSON.stringify(msg))
            } else if (option == 2){
                let msg = {
                    event: 'SEARCHNAMEROOM',
                    roomName: roomNameButton.value
                }
                game.global.socket.send(JSON.stringify(msg))
            } else {
                console.log('fallo en algun lado')
            }
            
        }


    },

    update: function () {

        this.background.tilePosition.x += 0.5
        this.background.tilePosition.y -= 0.5
    }
}