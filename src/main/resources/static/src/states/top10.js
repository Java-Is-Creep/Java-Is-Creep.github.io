Slooow.top10State = function (game) {
    var show = false
}

Slooow.top10State.prototype = {

    init: function () {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **TOP10** state");
        }
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
        //Boton atras 
        buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)
        //Texto atras
        textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back, game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5, 0.5)

        //Boton TOP10 
        buttonTop10 = game.add.image(game.world.centerX + 150, game.world.centerY - 250, 'button')
        buttonTop10.anchor.set(0.5, 0.5)
        buttonTop10.scale.setTo(1, 0.5)
        //Texto TOP10
        textButtonTop10 = game.add.text(game.world.centerX + 150,
            game.world.centerY - 250, 'TOP 10', game.global.style)
        textButtonTop10.anchor.set(0.5, 0.5)
        textButtonTop10.scale.setTo(0.5, 0.5)

        //Boton map1 
        buttonMap1 = game.add.button(game.world.centerX - 450,
            game.world.centerY - 100, 'button', actionOnClickMap1, this,
            0, 0, 0)
        buttonMap1.anchor.set(0.5)
        buttonMap1.scale.setTo(0.5, 0.5)
        //Texto map1
        textButtonMap1 = game.add.text(game.world.centerX - 450,
            game.world.centerY - 100, game.global.activeLanguage.Map1, game.global.style)
        textButtonMap1.anchor.set(0.5)
        textButtonMap1.scale.setTo(0.5, 0.5)

        //Boton map2
        buttonMap2 = game.add.button(game.world.centerX - 450,
            game.world.centerY + 50, 'button', actionOnClickMap2, this,
            0, 0, 0)
        buttonMap2.anchor.set(0.5)
        buttonMap2.scale.setTo(0.5, 0.5)
        //Texto map2
        textButtonMap2 = game.add.text(game.world.centerX - 450,
            game.world.centerY + 50, game.global.activeLanguage.Map2, game.global.style)
        textButtonMap2.anchor.set(0.5)
        textButtonMap2.scale.setTo(0.5, 0.5)

        //Boton map3
        buttonMap3 = game.add.button(game.world.centerX - 450,
            game.world.centerY + 200, 'button', actionOnClickMap3, this,
            0, 0, 0)
        buttonMap3.anchor.set(0.5)
        buttonMap3.scale.setTo(0.5, 0.5)
        //Texto map2
        textButtonMap3 = game.add.text(game.world.centerX - 450,
            game.world.centerY + 200, game.global.activeLanguage.Map3, game.global.style)
        textButtonMap3.anchor.set(0.5)
        textButtonMap3.scale.setTo(0.5, 0.5)

        //Boton Fondo 
        buttonTop10 = game.add.image(game.world.centerX + 150, game.world.centerY + 75, 'button')
        buttonTop10.anchor.set(0.5, 0.5)
        buttonTop10.scale.setTo(2, 2.5)

        //Texto top1
        textTop1 = game.add.text(game.world.centerX + 150,
            game.world.centerY - 100, 'TOP 1', game.global.style)
        textTop1.anchor.set(0.5)
        textTop1.scale.setTo(0.5, 0.5)
        //Texto top2
        textTop2 = game.add.text(game.world.centerX + 150,
            game.world.centerY - 60, 'TOP 2', game.global.style)
        textTop2.anchor.set(0.5)
        textTop2.scale.setTo(0.5, 0.5)
        //Texto top3
        textTop3 = game.add.text(game.world.centerX + 150,
            game.world.centerY - 20, 'TOP 3', game.global.style)
        textTop3.anchor.set(0.5)
        textTop3.scale.setTo(0.5, 0.5)
        //Texto top4
        textTop4 = game.add.text(game.world.centerX + 150,
            game.world.centerY + 20, 'TOP 4', game.global.style)
        textTop4.anchor.set(0.5)
        textTop4.scale.setTo(0.5, 0.5)
        //Texto top5
        textTop5 = game.add.text(game.world.centerX + 150,
            game.world.centerY + 60, 'TOP 5', game.global.style)
        textTop5.anchor.set(0.5)
        textTop5.scale.setTo(0.5, 0.5)
        //Texto top6
        textTop6 = game.add.text(game.world.centerX + 150,
            game.world.centerY + 100, 'TOP 6', game.global.style)
        textTop6.anchor.set(0.5)
        textTop6.scale.setTo(0.5, 0.5)
        //Texto top7
        textTop7 = game.add.text(game.world.centerX + 150,
            game.world.centerY + 140, 'TOP 7', game.global.style)
        textTop7.anchor.set(0.5)
        textTop7.scale.setTo(0.5, 0.5)
        //Texto top8
        textTop8 = game.add.text(game.world.centerX + 150,
            game.world.centerY + 180, 'TOP 8', game.global.style)
        textTop8.anchor.set(0.5)
        textTop8.scale.setTo(0.5, 0.5)
        //Texto top9
        textTop9 = game.add.text(game.world.centerX + 150,
            game.world.centerY + 220, 'TOP 9', game.global.style)
        textTop9.anchor.set(0.5)
        textTop9.scale.setTo(0.5, 0.5)
        //Texto top10
        textTop10 = game.add.text(game.world.centerX + 150,
            game.world.centerY + 260, 'TOP 10', game.global.style)
        textTop10.anchor.set(0.5)
        textTop10.scale.setTo(0.5, 0.5)


        function actionOnClickBack() {
            this.show = false
            game.state.start('mainMenuState')
        }

        function actionOnClickMap1() {
            this.show = true
            let msg = {
                event: 'RECORDS',
                mapName: 'mapa1'
            }
            game.global.socket.send(JSON.stringify(msg))
        }

        function actionOnClickMap2() {
            this.show = true
            let msg = {
                event: 'RECORDS',
                mapName: 'mapa2'
            }
            game.global.socket.send(JSON.stringify(msg))
        }

        function actionOnClickMap3() {
            this.show = true
            let msg = {
                event: 'RECORDS',
                mapName: 'mapa3'
            }
            game.global.socket.send(JSON.stringify(msg))
        }

        
    },


    // Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
    update: function () {
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
        this.background.tilePosition.x += 0.5
        this.background.tilePosition.y -= 0.5

        if (this.show == true) {
            if (game.global.top10UserNames[0] != 'none') {
                textTop1.setText('TOP 1: ' + game.global.top10UserNames[0] + ' --> ' + calculateTime(game.global.top10Times[0]))
            } else {
                textTop1.setText('TOP 1: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[1] != 'none') {
                textTop2.setText('TOP 2: ' + game.global.top10UserNames[1] + ' --> ' + calculateTime(game.global.top10Times[1]))
            } else {
                textTop2.setText('TOP 2: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[2] != 'none') {
                textTop3.setText('TOP 3: ' + game.global.top10UserNames[2] + ' --> ' + calculateTime(game.global.top10Times[2]))
            } else {
                textTop3.setText('TOP 3: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[3] != 'none') {
                textTop4.setText('TOP 4: ' + game.global.top10UserNames[3] + ' --> ' + calculateTime(game.global.top10Times[3]))
            } else {
                textTop4.setText('TOP 4: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[4] != 'none') {
                textTop5.setText('TOP 5: ' + game.global.top10UserNames[4] + ' --> ' + calculateTime(game.global.top10Times[4]))
            } else {
                textTop5.setText('TOP 5: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[5] != 'none') {
                textTop6.setText('TOP 6: ' + game.global.top10UserNames[5] + ' --> ' + calculateTime(game.global.top10Times[5]))
            } else {
                textTop6.setText('TOP 6: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[6] != 'none') {
                textTop7.setText('TOP 7: ' + game.global.top10UserNames[6] + ' --> ' + calculateTime(game.global.top10Times[6]))
            } else {
                textTop7.setText('TOP 7: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[7] != 'none') {
                textTop8.setText('TOP 8: ' + game.global.top10UserNames[7] + ' --> ' + calculateTime(game.global.top10Times[7]))
            } else {
                textTop8.setText('TOP 8: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[8] != 'none') {
                textTop9.setText('TOP 9: ' + game.global.top10UserNames[8] + ' --> ' + calculateTime(game.global.top10Times[8]))
            } else {
                textTop9.setText('TOP 9: ' + game.global.activeLanguage.NoPlayed)
            }

            if (game.global.top10UserNames[9] != 'none') {
                textTop10.setText('TOP 10: ' + game.global.top10UserNames[9] + ' --> ' + calculateTime(game.global.top10Times[9]))
            } else {
                textTop10.setText('TOP 10: ' + game.global.activeLanguage.NoPlayed)
            }
        }
    }

}