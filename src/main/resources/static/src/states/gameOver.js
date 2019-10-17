Slooow.gameOverState = function(game) {
    this.timeString
    this.maxTimeString
    this.yourRecordString
    this.mapRecordString
}

Slooow.gameOverState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **GAMEOVER** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
    },

    preload : function() {
    },

    create : function() {
    
        //Background
        var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)

        //Boton volver a jugar
		buttonReplay = game.add.button(game.world.centerX - 80,
            game.world.centerY + 250, 'replayBtn', actionOnClickReplay, this,
            0, 0, 0)
        buttonReplay.anchor.set(0.5)
        buttonReplay.scale.setTo(0.3, 0.3)

        //Boton menu
		buttonMenu = game.add.button(game.world.centerX + 80,
            game.world.centerY + 250, 'button', actionOnClickMainMenu, this,
            0, 0, 0)
        buttonMenu.anchor.set(0.5)
        buttonMenu.scale.setTo(0.3, 0.3)

        //Texto menu
		textButtonMenu = game.add.text(game.world.centerX + 80,
            game.world.centerY + 250, game.global.activeLanguage.MainMenu, game.global.style)
        textButtonMenu.anchor.set(0.5)
        textButtonMenu.scale.setTo(0.5,0.5)

        //bg resumen
        bgEnd = game.add.button(game.world.centerX,
            game.world.centerY-100, 'button', null, this,
            0, 0, 0)
        bgEnd.anchor.set(0.5)
        bgEnd.angle = 270
        bgEnd.scale.setTo(1.1, 2.9)

        //Texto time
		textTime = game.add.text(game.world.centerX - 120,
            game.world.centerY - 240, game.global.activeLanguage.Time, game.global.style)
        textTime.scale.setTo(0.5,0.5)
        textTime.anchor.set(0.5)

        //Texto myTime
        this.timeString = calculateTime(game.global.myTime)
        textMyTime = game.add.text(game.world.centerX-110,
            game.world.centerY - 190,  this.timeString, game.global.style)
        textMyTime.anchor.set(0.5)
        textMyTime.scale.setTo(0.7,0.7)

        //Texto maxTime
		textMaxTime = game.add.text(game.world.centerX+ 110,
        game.world.centerY - 240, game.global.activeLanguage.MaxTime, game.global.style)
        textMaxTime.scale.setTo(0.5,0.5)
        textMaxTime.anchor.set(0.5)
        
        //Numero maxTime
        this.maxTimeString = calculateTime(game.global.maxTime)
        MaxTime = game.add.text(game.world.centerX+  120,
            game.world.centerY - 190,  this.maxTimeString, game.global.style)
        MaxTime.anchor.set(0.5)
        MaxTime.scale.set(0.7)

        //Texto Your Record
		textTime = game.add.text(game.world.centerX - 120,
            game.world.centerY - 110, game.global.activeLanguage.YourRecord, game.global.style)
        textTime.scale.setTo(0.5,0.5)
        textTime.anchor.set(0.5)

        //number Your Record
        this.yourRecordString = calculateTime(game.global.myRecord)
        textMyTime = game.add.text(game.world.centerX - 110,
            game.world.centerY - 60,  this.yourRecordString, game.global.style)
        textMyTime.anchor.set(0.5)
        textMyTime.scale.setTo(0.7,0.7)

        //Texto Map Record
		textTime = game.add.text(game.world.centerX + 110,
            game.world.centerY - 110, game.global.activeLanguage.MapRecord, game.global.style)
        textTime.scale.setTo(0.5,0.5)
        textTime.anchor.set(0.5)

        //number Map Record
        this.mapRecordString = calculateTime(game.global.mapRecord)
        textMyTime = game.add.text(game.world.centerX + 120,
            game.world.centerY - 60,  this.yourRecordString, game.global.style)
        textMyTime.anchor.set(0.5)
        textMyTime.scale.setTo(0.7,0.7)

        function actionOnClickMainMenu(){
            game.state.start('mainMenuState')
        }

        function actionOnClickReplay(){
            console.log('te mando enter lobby')
            
            let msg = {
                event: 'ENTERLOBBY',
                roomName: game.global.username + 'Room',
                mapName: game.global.mapChosen
            }
            game.global.socket.send(JSON.stringify(msg))
            game.state.start('lobbyState')
        }

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
    },

    update : function() {
    }
}