Slooow.gameOverMultiState = function (game) {

}

Slooow.gameOverMultiState.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **GAMEOVER** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
    },

    preload: function () {
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

    create: function () {

        //console.log('CREATE GAME OVEEEER')
        //Boton monedas y monedas
        buttonTop = game.add.image(game.world.centerX, 100, 'button')
        buttonTop.anchor.set(0.5)
        buttonTop.scale.setTo(2.2, 0.5)

        var myPos;
        for (var i = 0; i < game.global.finishedPlayersMulti.length; i++) {
            if (game.global.finishedPlayersMulti[i] == game.global.username) {
                myPos = i + 1
                break
            }
        }
        //console.log('Despues de for myPosicion')
        //Texto puestos
        textPosition = game.add.text(game.world.centerX - 300,
            100, game.global.activeLanguage.Position + ': ' + myPos, game.global.style)
        textPosition.anchor.set(0.5)
        textPosition.scale.setTo(0.5, 0.5)
        //console.log(' myPos printeada')

        //Texto monedas
        textCoins = game.add.text(game.world.centerX + 100,
            100, game.global.activeLanguage.Points + ': ' + game.global.myPointsMulti, game.global.style)
        textCoins.anchor.set(0.5)
        textCoins.scale.setTo(0.5, 0.5)
        //console.log(' monedas printeadas')

        //Boton puesto 1
        buttonP1 = game.add.image(game.world.centerX, game.world.centerY - 150, 'button')
        buttonP1.anchor.set(0.5)
        buttonP1.scale.setTo(1.5, 0.5)
        if (game.global.finishedPlayersMulti[0] != undefined) {
            var timeAux
            if (isNaN(game.global.finishedTimesMulti[0])){
                timeAux = game.global.activeLanguage.NotFinished
            } else{
                timeAux = game.global.finishedPlayersMulti[0] + '-->  '+ calculateTime(game.global.finishedTimesMulti[0])
            }
            //Texto puesto 1
            textP1 = game.add.text(game.world.centerX, game.world.centerY - 150, '1: '  + timeAux, game.global.style)
        } else {
            textP1 = game.add.text(game.world.centerX, game.world.centerY - 150, '1: '  + game.global.activeLanguage.NotFinished, game.global.style)
        }
        textP1.anchor.set(0.5)
        textP1.scale.setTo(0.5, 0.5)
        //console.log(' 1')
        //Boton puesto 2
        buttonP2 = game.add.image(game.world.centerX, game.world.centerY - 50, 'button')
        buttonP2.anchor.set(0.5)
        buttonP2.scale.setTo(1.5, 0.5)
        if (game.global.finishedPlayersMulti[1] != undefined) {
            var timeAux
            if (isNaN(game.global.finishedTimesMulti[1])){
                timeAux = game.global.activeLanguage.NotFinished
            } else{
                timeAux = game.global.finishedPlayersMulti[1] + '-->  '+ calculateTime(game.global.finishedTimesMulti[1])
            }
            //Texto puesto 2
            textP2 = game.add.text(game.world.centerX, game.world.centerY - 50, '2: ' + timeAux, game.global.style)
        }else {
            textP2 = game.add.text(game.world.centerX, game.world.centerY - 50, '2: '  + game.global.activeLanguage.NotFinished, game.global.style)
        }
        textP2.anchor.set(0.5)
        textP2.scale.setTo(0.5, 0.5)
        //console.log(' 2')
        //Boton puesto 3
        buttonP3 = game.add.image(game.world.centerX, game.world.centerY + 50, 'button')
        buttonP3.anchor.set(0.5)
        buttonP3.scale.setTo(1.5, 0.5)
        if (game.global.finishedPlayersMulti[2] != undefined) {
            var timeAux
            if (isNaN(game.global.finishedTimesMulti[2])){
                timeAux = game.global.activeLanguage.NotFinished
            } else{
                timeAux = game.global.finishedPlayersMulti[2] + '-->  '+ calculateTime(game.global.finishedTimesMulti[2])
            }
            //Texto puesto 3
            textP3 = game.add.text(game.world.centerX, game.world.centerY + 50, '3: ' + timeAux, game.global.style)
        } else{
            textP3 = game.add.text(game.world.centerX, game.world.centerY + 50, '3: ' + game.global.activeLanguage.NotFinished, game.global.style)
        }
        textP3.anchor.set(0.5)
        textP3.scale.setTo(0.5, 0.5)
        //console.log(' 3')
        //Boton puesto 4
        buttonP4 = game.add.image(game.world.centerX, game.world.centerY + 150, 'button')
        buttonP4.anchor.set(0.5)
        buttonP4.scale.setTo(1.5, 0.5)

        if (game.global.finishedPlayersMulti[3] != undefined) {
            var timeAux
            if (isNaN(game.global.finishedTimesMulti[3])){
                timeAux = game.global.activeLanguage.NotFinished
            } else{
                timeAux =  game.global.finishedPlayersMulti[3] + '-->  '+ calculateTime(game.global.finishedTimesMulti[3])
            }
            //Texto puesto 4
            textP4 = game.add.text(game.world.centerX, game.world.centerY + 150, '4: ' +  timeAux, game.global.style)
        } else{
            textP4 = game.add.text(game.world.centerX, game.world.centerY + 150, '4: ' +  game.global.activeLanguage.NotFinished, game.global.style)
        }
        textP4.anchor.set(0.5)
            textP4.scale.setTo(0.5, 0.5)
        //console.log(' 4')
        /*
        //Boton replay
        buttonReplay = game.add.button(game.world.centerX - 200,
            game.world.centerY + 250, 'button', replay, this,
            0, 0, 0)
        buttonReplay.anchor.set(0.5)
        buttonReplay.scale.setTo(0.5, 0.5)
        buttonReplay.inputEnabled = false
        //Texto replay
        textReplay = game.add.text(game.world.centerX - 200, game.world.centerY + 250, 'Replay', game.global.style)
        textReplay.anchor.set(0.5)
        textReplay.scale.setTo(0.5, 0.5)
*/

        //Boton salir
        buttonExit = game.add.button(game.world.centerX + 200,
            game.world.centerY + 250, 'button', exit, this,
            0, 0, 0)
        buttonExit.anchor.set(0.5)
        buttonExit.scale.setTo(0.5, 0.5)
        //Texto salir
        textExit = game.add.text(game.world.centerX + 200, game.world.centerY + 250, 'Salir', game.global.style)
        textExit.anchor.set(0.5)
        textExit.scale.setTo(0.5, 0.5)

        /*
        function replay() {

        }*/

        function exit() {
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

            game.global.musicGame.stop()
            game.global.musicMenu.play()

            game.state.start('mainMenuState')
        }

        function calculateTime(time) {
            let ms
            let seg
            let min
            min = parseInt(time / (60 * 1000))
            seg = parseInt(time / 1000 % 60)
            ms = time % 1000
            let timeString
            if (min > 0) {
                timeString = min + '´ ' + seg + '´´ ' + ms + 'ms'
            } else if (seg > 0) {
                timeString = seg + '´´ ' + ms + 'ms'
            } else {
                timeString = ms + 'ms'
            }

            return timeString
        }
    },

    // Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
    update: function () {
        this.background.tilePosition.x += 0.5
        this.background.tilePosition.y -= 0.5

        //textPosition.setText (game.global.activeLanguage.Position + ': ' + game.global.)

    }
}