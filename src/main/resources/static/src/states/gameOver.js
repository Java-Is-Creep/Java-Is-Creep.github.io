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
        /*
        var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)*/
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

        //Texto Puntuation
		textTime = game.add.text(game.world.centerX + 120,
            game.world.centerY - 110, game.global.activeLanguage.Points, game.global.style)
        textTime.scale.setTo(0.5,0.5)
        textTime.anchor.set(0.5)

        //number puntuation
        //this.mapRecordString = calculateTime(game.global.mapRecord)
        textMyTime = game.add.text(game.world.centerX + 120,
            game.world.centerY - 60,  game.global.puntuationGameOver, game.global.style)
        textMyTime.anchor.set(0.5)
        textMyTime.scale.setTo(0.7,0.7)

        function actionOnClickMainMenu(){
            //Resetear parametros
                //Resetear variables mapa
                 //Array de suelos. Tiene: x, y, width, height
                game.global.arrayGrounds = []
                //Array de paredes. Tiene: x, y, width, height
                game.global.arrayWalls = []
                //Array de rampas. Tiene: x, y, width, height
                game.global.arraySlopes = []
                //Array de obstaculos tipo pincho. Tiene: posX, posY
                game.global.arrayObstacles = []
                //Array de power ups
                game.global.arrayPowerUps = []
                //ArrayTrapdoors
                game.global.arrayTrapdoors = []
                //Array de trampolines
                game.global.arrayTrampolines = []
                game.global.arrayObstacleFire = []
                game.global.arrayDoors = []
                game.global.arrayWinds = []
                game.global.finishObject = new Object
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
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
    }
}