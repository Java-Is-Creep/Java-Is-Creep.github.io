Slooow.menuSoloAndMultiLocalState = function(game) {
}

Slooow.menuSoloAndMultiLocalState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **SHOP** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
    },

    preload : function() {
        //Background
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
        //this.background.tint = 4535760.527128731;
		//console.log(this.background.tint)
		this.background.tileScale.set(0.4, 0.4)
        this.background.anchor.set(0.5, 0.5)
    },

    create : function() {

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

        //Boton life
		btnLifes = game.add.button(game.world.centerX - 350,
            game.world.centerY - 300, 'pinkBtn', getLifes, this,
            0, 0, 0)
        btnLifes.anchor.set(0.5)
        btnLifes.scale.setTo(0.5, 0.5)
        //Texto life
		tLifes = game.add.text(game.world.centerX -320,
            game.world.centerY-300 , game.global.lifes, game.global.style)
        tLifes.anchor.set(0.5)
        tLifes.scale.setTo(0.8,0.8)
        //Heart
        lifes = game.add.image(game.world.centerX - 390,
            game.world.centerY - 300, 'lifes')
        lifes.anchor.set(0.5,0.5)
        lifes.scale.setTo(0.05, 0.05)
        
        //Boton mapa 1
		buttonMap1 = game.add.button(game.world.centerX - 350,
            game.world.centerY - 150, 'button', actionOnClickMap1, this,
            0, 0, 0)
        buttonMap1.anchor.set(0.5)
        buttonMap1.scale.setTo(0.8, 0.8)
        //Texto mapa 1
		textButtonMap1 = game.add.text(game.world.centerX -350,
            game.world.centerY-150 , game.global.activeLanguage.Map1, game.global.style)
        textButtonMap1.anchor.set(0.5)
        textButtonMap1.scale.setTo(0.8,0.8)

        //Boton mapa 2
		buttonMap2 = game.add.button(game.world.centerX -350,
            game.world.centerY + 50 , 'button', actionOnClickMap2, this,
            0, 0, 0)
        buttonMap2.anchor.set(0.5)
        buttonMap2.scale.setTo(0.8, 0.8)
        //Texto mapa 2
		textButtonMap2 = game.add.text(game.world.centerX -350,
            game.world.centerY + 50 , game.global.activeLanguage.Map2, game.global.style)
        textButtonMap2.anchor.set(0.5)
        textButtonMap2.scale.setTo(0.8,0.8)

        //Boton mapa 3
		buttonMap3 = game.add.button(game.world.centerX -350,
            game.world.centerY +250 , 'button', actionOnClickMap3, this,
            0, 0, 0)
        buttonMap3.anchor.set(0.5)
        buttonMap3.scale.setTo(0.8, 0.8)
        //Texto mapa 3
		textButtonMap3 = game.add.text(game.world.centerX -350,
            game.world.centerY +250 , game.global.activeLanguage.Map3, game.global.style)
        textButtonMap3.anchor.set(0.5)
        textButtonMap3.scale.setTo(0.8,0.8)
        
        //Title myTime
        bgMyTime1 = game.add.image(game.world.centerX +50,
            game.world.centerY - 270, 'button')
        bgMyTime1.anchor.set(0.5)
        bgMyTime1.scale.setTo(0.6, 0.4)
        tMyTime1 = game.add.text(game.world.centerX +50,
        game.world.centerY-270 , game.global.activeLanguage.TitleMyTime, game.global.style)
        tMyTime1.anchor.set(0.5)
        tMyTime1.scale.setTo(0.8,0.8)

        //Boton mapa 1
		bgTime1 = game.add.image(game.world.centerX +50,
            game.world.centerY - 150, 'button')
        bgTime1.anchor.set(0.5)
        bgTime1.scale.setTo(0.8, 0.6)
        //Texto mapa 1
        if (game.global.myTimes[1] < 1000000000) {
            tTime1 = game.add.text(game.world.centerX +50,
            game.world.centerY-150 , calculateTime(game.global.myTimes[1]), game.global.style)
            tTime1.anchor.set(0.5)
            tTime1.scale.setTo(0.8,0.8)
        } else {
            tTime1 = game.add.text(game.world.centerX +50,
            game.world.centerY-150 , game.global.activeLanguage.NoPlayed, game.global.style)
            tTime1.anchor.set(0.5)
            tTime1.scale.setTo(0.8,0.8)
        }
		

        //Boton mapa 2
		bgTime2 = game.add.image(game.world.centerX +50,
            game.world.centerY + 50, 'button')
        bgTime2.anchor.set(0.5)
        bgTime2.scale.setTo(0.8, 0.6)
        //Texto mapa 2
        if (game.global.myTimes[0] < 1000000000){
            tTime2 = game.add.text(game.world.centerX+50,
            game.world.centerY+ 50 , calculateTime(game.global.myTimes[0]), game.global.style)
            tTime2.anchor.set(0.5)
            tTime2.scale.setTo(0.8,0.8)
        } else {
            tTime2 = game.add.text(game.world.centerX+50,
            game.world.centerY+ 50 , game.global.activeLanguage.NoPlayed, game.global.style)
            tTime2.anchor.set(0.5)
            tTime2.scale.setTo(0.8,0.8)
        }
		

        //Boton mapa 3
		bgTime3 = game.add.image(game.world.centerX+50,
            game.world.centerY +250, 'button')
        bgTime3.anchor.set(0.5)
        bgTime3.scale.setTo(0.8, 0.6)
        //Texto mapa 3
        if (game.global.myTimes[2] < 1000000000) {
            tTime3 = game.add.text(game.world.centerX+50,
            game.world.centerY+ 250 , calculateTime(game.global.myTimes[2]), game.global.style)
            tTime3.anchor.set(0.5)
            tTime3.scale.setTo(0.8,0.8)
        } else {
            tTime3 = game.add.text(game.world.centerX+50,
            game.world.centerY+ 250 , game.global.activeLanguage.NoPlayed, game.global.style)
            tTime3.anchor.set(0.5)
            tTime3.scale.setTo(0.8,0.8)
        }

         //Title mapTime
        bgMapTime1 = game.add.image(game.world.centerX +450,
            game.world.centerY - 270, 'button')
        bgMapTime1.anchor.set(0.5)
        bgMapTime1.scale.setTo(0.6, 0.4)
        tMapTime1 = game.add.text(game.world.centerX +450,
        game.world.centerY-270 , game.global.activeLanguage.TitleMapTime, game.global.style)
        tMapTime1.anchor.set(0.5)
        tMapTime1.scale.setTo(0.8,0.8)

         //Boton mapa 1
		bgMapTime1 = game.add.image(game.world.centerX +450,
            game.world.centerY - 150, 'button')
        bgMapTime1.anchor.set(0.5)
        bgMapTime1.scale.setTo(0.8, 0.6)
        //Texto mapa 1
        tMapTime1 = game.add.text(game.world.centerX +450,
        game.world.centerY-150 , calculateTime(game.global.mapTimes[0]), game.global.style)
        tMapTime1.anchor.set(0.5)
        tMapTime1.scale.setTo(0.8,0.8)
        
        //Boton mapa 2
		bgMapTime2 = game.add.image(game.world.centerX +450,
            game.world.centerY + 50, 'button')
        bgMapTime2.anchor.set(0.5)
        bgMapTime2.scale.setTo(0.8, 0.6)
        //Texto mapa 2
        tMapTime2 = game.add.text(game.world.centerX+450,
        game.world.centerY+ 50 , calculateTime(game.global.mapTimes[1]), game.global.style)
        tMapTime2.anchor.set(0.5)
        tMapTime2.scale.setTo(0.8,0.8)	

        //Boton mapa 3
		bgMapTime3 = game.add.image(game.world.centerX+450,
            game.world.centerY +250, 'button')
        bgMapTime3.anchor.set(0.5)
        bgMapTime3.scale.setTo(0.8, 0.6)
        //Texto mapa 3
        tMapTime3 = game.add.text(game.world.centerX+450,
        game.world.centerY+ 250 , calculateTime(game.global.mapTimes[2]), game.global.style)
        tMapTime3.anchor.set(0.5)
        tMapTime3.scale.setTo(0.8,0.8)
		
        //buttonMap1.inputEnabled = false;
        //buttonMap2.inputEnabled = false;
        //buttonMap3.inputEnabled = false;
        
        function calculateTime(time){
            let ms
            let seg
            let min
            min = parseInt(time / (60*1000))
            seg = parseInt(time / 1000 % 60)
            ms = time % 1000
            let timeString
            if(min > 0){
                timeString = min+'´ '+seg+'´´ '+ms+'ms'
            } else if (seg > 0) {
                timeString =seg+'´´ '+ms+'ms'
            } else {
                timeString = ms+'ms'
            }
            
            return timeString       
        }

        function getLifes(){
            let msg = {
                    event: 'LIVEUP',    
                }
            game.global.socket.send(JSON.stringify(msg))
            game.state.start('addLifeState')
        }
        
        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }
        

        function actionOnClickMap1(){
            console.log('te mando enter lobby')
            game.global.mapChosen = 'mapa1'
            let msg = {
                event: 'ENTERLOBBY',
                roomName: game.global.username + 'Room',
                mapName: 'mapa1'
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('lobbyState')
/////////////////////////////////////////////////////////////////////////////////////////////
// AÑADIR MENSAJES AL SERVIDOR CON AMBIENTACION + MAPA
/////////////////////////////////////////////////////////////////////////////////////////////
        }

        function actionOnClickMap2(){
            game.global.mapChosen = 'mapa2'
            let msg = {
                event: 'ENTERLOBBY',
                roomName: game.global.username + 'Room',
                mapName: 'mapa2'
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('lobbyState')
/////////////////////////////////////////////////////////////////////////////////////////////
// AÑADIR MENSAJES AL SERVIDOR CON AMBIENTACION + MAPA
/////////////////////////////////////////////////////////////////////////////////////////////        
        }

        function actionOnClickMap3(){
            game.global.mapChosen = 'mapa2'
            let msg = {
                event: 'ENTERLOBBY',
                roomName: game.global.username + 'Room',
                mapName: 'mapa3'
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('lobbyState')
/////////////////////////////////////////////////////////////////////////////////////////////
// AÑADIR MENSAJES AL SERVIDOR CON AMBIENTACION + MAPA
/////////////////////////////////////////////////////////////////////////////////////////////         
        }
    },

    update : function() {
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
    }
}