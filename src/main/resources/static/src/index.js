var game;

function fullscreen() {
    console.log(game);
    document.body.requestFullscreen();
    screen.orientation.lock('landscape');
}

window.onload = function () {
    game = new Phaser.Game(1280, 720, Phaser.AUTO);
    //game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, 'gameDiv');
    //game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');

    // Con esto conseguimos a que la imagen renderizada a 1280x720
    // Falta hacerlo responsive
    /*var config = {
        width: "100%",
        height: "100%",
        renderer: Phaser.AUTO
    }*/

    /*var config = {
        width: 1280,
        height: 720,
        renderer: Phaser.AUTO
    }
    
    game = new Phaser.Game (config)*/

    /*var offFullScreen = false;

    addEventListener("click", function () {
        if (offFullScreen === false) {
            var
                el = document.documentElement
                , rfs =
                    el.requestFullScreen
                    || el.webkitRequestFullScreen
                    || el.mozRequestFullScreen
                ;
            rfs.call(el);
            offFullScreen = true;
        }
    });*/

    // Find the right method, call on correct element
    /*function launchFullScreen(element) {
        if(element.requestFullScreen) {
            element.requestFullScreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        }
    }*/
    // Launch fullscreen for browsers that support it!
    //launchFullScreen(document.documentElement); // the whole page


    var firstFrame = 0;

    //Variables globales compartidas entre escenas
    game.global = {
        //Socket
        socket: null,
        FPS: 60,
        DEBUG_MODE: false,
        player: null,
        mapDrawn: false,
        username: '',
        password: '',
        //Array de suelos. Tiene: x, y, width, height
        arrayGrounds: [],
        //Array de paredes. Tiene: x, y, width, height
        arrayWalls: [],
        //Array de rampas. Tiene: x, y, width, height
        arraySlopes: [],
        //Array de obstaculos tipo pincho. Tiene: posX, posY
        arrayObstacles: [],
        //Array de power ups
        arrayPowerUps: [],
        //ArrayTrapdoors
        arrayTrapdoors: [],
        //Array de trampolines
        arrayTrampolines: [],
        arrayObstacleFire: [],
        arrayDoors: [],
        arrayWinds: [],
        finishObject: new Object,
        player: new this.Object(),
        //Cosas del game over
        winner: false,
        time: null,
        maxTime: null,
        record: null,
        puntuationGameOver: null,
        //Cosas visuales jugador (de solo)
        haveToRotateToWall: false,
        haveToRotateToGround: false,
        haveToRotateToSlope: false,
        degreesToRotateSlope: 0,
        maxStamina: 0,
        //Cosas visuales jugador (multi)
        myPlayerId: null,
        playersMulti: [],
        snailChosenMulti: [],
        haveToRotateToWallMulti: [],
        haveToRotateToGroundMulti: [],
        haveToRotateToSlopeMulti: [],
        degreesToRotateSlopeMulti: [],
        arrayPositionsMulti: [],
        arrayTimesMulti: [],
        roomNameMulti: null,
        //PowerUps
        wingPowerUp: null,
        shieldPowerUp: null,
        staminaPowerUp: null,
        lettucePowerUp: null,
        onPowerUp: null,
        downPowerUp: null,
        clockPowerUp: null,
        inkPowerUp: null,
        speedPowerUp: null,
        hasPowerUp: false,
        //Saber si los tienes o no
        owned: [],
        notOwned: [],
        //Elegir caracol y mapa
        snailChosen: null,
        mapChosen: null,
        gameMode: null,
        //Para records
        nameMapRecords: [],
        myTimes: [],
        style: null,
        maxStamina: 0,
        puntuationGameOver: null,
        money: null,
        points: null,
        maxStamina : 0,
        puntuationGameOver : null,
        money : null,
        points : null,
        snailToBuy : null,
        skinToBuy : null,
        statSpeed : null,
        statAc: null,
        statWeight: null,
        statStamina: null,
        statRegen: null,
        normalStats: [],
        tankStats: [],
        baguetteStats: [],
        miauStats: [],
        mercaStats: [],
        seaStats: [],
        robaStats: [],
        irisStats:[],
        shellPrice: null,
        pointsPrice: null,
    }

    // Conexiones
    //game.global.socket = new WebSocket('wss://slooow.herokuapp.com/snail');
    game.global.socket = new WebSocket('ws://127.0.0.1:8080/snail');
    //game.global.socket = new WebSocket('ws://25.35.101.144:8080/snail')
    //game.global.socket = new WebSocket('wss://25.34.17.250:8080/snail')
    //game.global.socket = new WebSocket('ws://192.168.1.17:8080/snail');
    //game.global.socket = new WebSocket('ws://127.0.0.1:8080/snail');
    //game.global.socket = new WebSocket('ws://192.168.1.109:8080/snail');
    game.global.socket.onopen = () => {

        console.log('[DEBUG] WebSocket connection opened.')

    }

    game.global.socket.onclose = () => {
        console.log('[DEBUG] Websocket connection closed');
        game.state.start('errorState')
    }

    game.global.socket.onmessage = (message) => {
        var msg = JSON.parse(message.data)
        if (game.global.DEBUG_MODE) {
            console.log(msg);
        }

        switch (msg.event) {

            case 'TICK':
                if (game.global.DEBUG_MODE) {
                    console.log('[DEBUG] TICK message recieved')
                    console.dir(msg)
                }
                // Tratamiento del personaje
                game.global.player.sprite.x = Math.floor(msg.posX)
                game.global.player.sprite.y = game.world.height - (Math.floor(msg.posY)) - 10
                // Tratamiento de la estamina (UI)
                if (game.global.player.maxStamina == 0) {
                    game.global.player.maxStamina = msg.stamina
                }
                var scale = msg.stamina * 0.5 / game.global.player.maxStamina
                game.global.player.stamina2.scale.setTo(scale, 0.45)

                // Tratamiento de la barra de progreso
                //console.log (game.global.finishObject.x)
                var posProgress = 100 + game.global.finishObject.x - game.global.player.sprite.x
                var scaleProgress = posProgress / game.global.finishObject.x
                game.global.player.progressBar2.scale.setTo(scaleProgress, 1)

                break
            case 'DRAWMAP':
                //Arrays con los parametros de todos los objetos del mapa. Dependiendo del tipo se guardaran
                //En un array u otro
                this.console.log('Me llega el draw map')
                var arrayPosX = JSON.parse(msg.posX)
                var arrayPosY = JSON.parse(msg.posY)
                var arrayHeight = JSON.parse(msg.height)
                var arrayWidth = JSON.parse(msg.width)
                var type = JSON.parse(msg.myType)

                var roomType = JSON.stringify(msg.roomType)
                roomType = roomType.substring(1, roomType.length - 1)
                this.console.log(roomType)

                var numOfGrounds = 0;
                var numOfWalls = 0;
                var numOfSlopes = 0;
                var numOfObstacles = 0;
                var numOfPowerUps = 0;
                var numOfTrapdoors = 0;
                var numOfTrampolines = 0;
                var numOfDoors = 0;
                var numOfWinds = 0;

                for (var i = 0; i < type.length; i++) {
                    switch (type[i]) {
                        case 'GROUND':
                            this.game.global.arrayGrounds[numOfGrounds] = new Object()
                            this.game.global.arrayGrounds[numOfGrounds].x = arrayPosX[i]
                            this.game.global.arrayGrounds[numOfGrounds].y = arrayPosY[i]
                            this.game.global.arrayGrounds[numOfGrounds].height = arrayHeight[i]
                            this.game.global.arrayGrounds[numOfGrounds].width = arrayWidth[i]
                            numOfGrounds++
                            break
                        case 'WALL':
                            this.game.global.arrayWalls[numOfWalls] = new Object()
                            this.game.global.arrayWalls[numOfWalls].x = arrayPosX[i]
                            this.game.global.arrayWalls[numOfWalls].y = arrayPosY[i]
                            this.game.global.arrayWalls[numOfWalls].height = arrayHeight[i]
                            this.game.global.arrayWalls[numOfWalls].width = arrayWidth[i]
                            numOfWalls++
                            break
                        case 'SLOPE':
                            this.game.global.arraySlopes[numOfSlopes] = new Object()
                            this.game.global.arraySlopes[numOfSlopes].x = arrayPosX[i]
                            this.game.global.arraySlopes[numOfSlopes].y = arrayPosY[i]
                            this.game.global.arraySlopes[numOfSlopes].height = arrayHeight[i]
                            //console.log("Angulo en indexjs" + this.game.global.arraySlopes[numOfSlopes].height)
                            this.game.global.arraySlopes[numOfSlopes].width = arrayWidth[i]
                            numOfSlopes++
                            break
                        case 'POWERUP':
                            this.game.global.arrayPowerUps[numOfPowerUps] = new Object()
                            this.game.global.arrayPowerUps[numOfPowerUps].x = arrayPosX[i]
                            this.game.global.arrayPowerUps[numOfPowerUps].y = arrayPosY[i]
                            this.game.global.arrayPowerUps[numOfPowerUps].height = arrayHeight[i]
                            this.game.global.arrayPowerUps[numOfPowerUps].width = arrayWidth[i]
                            numOfPowerUps++
                            break;
                        case 'OBSTACLE':
                            //this.game.global.arrayObstacleSpikes[numOfObstacleSpikes] = new this.Object() 

                            //this.game.global.arrayObstacleSpikes[numOfObstacleSpikes] = {image:game.add.image(arrayPosX[i], game.world.height - arrayPosY[i], 'button')}
                            //this.game.global.arrayObstacleSpikes[numOfObstacleSpikes] = this.game.add.image(arrayPosX[i], game.world.height - arrayPosY[i], 'button')
                            /*console.log ("Primero")
                            console.log (game.global.arrayObstacleSpikes)
                            game.global.arrayObstacleSpikes[numOfObstacleSpikes] = {image : game.add.sprite(arrayPosX[i], game.world.height - arrayPosY[i], 'button')}
                            console.log ("Segundo")
                            console.log (game.global.arrayObstacleSpikes)*/

                            //this.game.global.arrayObstacleSpikes[numOfObstacleSpikes] = new this.Object() 
                            // this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].x = arrayPosX[i]
                            // this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].y = arrayPosY[i]

                            // this.console.log(game.global.arrayObstacleSpikes[numOfObstacleSpikes].image)
                            // this.console.log('Posicion imagen: ' + 'x ' +  this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].image.x +  'y: '+this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].image.y)
                            // this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].height = arrayHeight[i]
                            //this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].width = arrayWidth[i]
                            // console.log("Patata")
                            //console.dir(this.game.global.arrayObstacles[numOfObstacles])
                            this.game.global.arrayObstacles[numOfObstacles] = new Object()
                            //this.game.global.arrayObstacleSpikes[numOfObstacleSpikes] = game.add.image(arrayPosX[i],game.world.height - arrayPosY[i], 'button')
                            this.game.global.arrayObstacles[numOfObstacles].x = arrayPosX[i]
                            this.game.global.arrayObstacles[numOfObstacles].y = arrayPosY[i]
                            // console.log("Patata777")
                            // console.dir(this.game.global.arrayObstacles)
                            numOfObstacles++
                            break
                        case 'GENERICPOWERUP':
                            this.game.global.arrayPowerUps[numOfPowerUps] = new Object()
                            this.game.global.arrayPowerUps[numOfPowerUps].x = arrayPosX[i]
                            this.game.global.arrayPowerUps[numOfPowerUps].y = arrayPosY[i]
                            this.game.global.arrayPowerUps[numOfPowerUps].height = arrayHeight[i]
                            this.game.global.arrayPowerUps[numOfPowerUps].width = arrayWidth[i]
                            numOfPowerUps++
                            break
                        case 'TRAPDOOR':
                            game.global.arrayTrapdoors[numOfTrapdoors] = new Object()
                            game.global.arrayTrapdoors[numOfTrapdoors].x = arrayPosX[i]
                            game.global.arrayTrapdoors[numOfTrapdoors].y = arrayPosY[i]
                            game.global.arrayTrapdoors[numOfTrapdoors].height = arrayHeight[i]
                            game.global.arrayTrapdoors[numOfTrapdoors].width = arrayWidth[i]
                            numOfTrapdoors++
                            // console.log('trapdoor')
                            // console.dir(game.global.arrayTrapdoors)
                            break
                        case 'TRAMPOLINE':
                            this.game.global.arrayTrampolines[numOfTrampolines] = new Object()
                            game.global.arrayTrampolines[numOfTrampolines].x = arrayPosX[i]
                            game.global.arrayTrampolines[numOfTrampolines].y = arrayPosY[i]
                            game.global.arrayTrampolines[numOfTrampolines].height = arrayHeight[i]
                            game.global.arrayTrampolines[numOfTrampolines].width = arrayWidth[i]
                            numOfTrampolines++;
                            break
                        case 'DOOR':
                            this.game.global.arrayDoors[numOfDoors] = new Object()
                            game.global.arrayDoors[numOfDoors].x = arrayPosX[i]
                            game.global.arrayDoors[numOfDoors].y = arrayPosY[i]
                            game.global.arrayDoors[numOfDoors].height = arrayHeight[i]
                            game.global.arrayDoors[numOfDoors].width = arrayWidth[i]
                            numOfDoors++;
                            break
                        case 'WIND':
                            //this.console.dir(msg)
                            var direction = JSON.parse(msg.direction)
                            //this.console.log(direction)
                            //this.console.log(direction[numOfWinds])
                            this.game.global.arrayWinds[numOfWinds] = new this.Object()
                            this.game.global.arrayWinds[numOfWinds].x = arrayPosX[i]
                            this.game.global.arrayWinds[numOfWinds].y = arrayPosY[i]
                            this.game.global.arrayWinds[numOfWinds].height = arrayHeight[i]
                            this.game.global.arrayWinds[numOfWinds].width = arrayWidth[i]
                            this.game.global.arrayWinds[numOfWinds].direction = direction[numOfWinds]
                            //this.console.log('wind draw map')
                            //this.console.dir(game.global.arrayWinds[numOfWinds])
                            numOfWinds++
                            break
                        case 'FINISH':
                            this.game.global.finishObject.x = arrayPosX[i]
                            this.game.global.finishObject.y = arrayPosY[i]
                            this.game.global.finishObject.height = arrayHeight[i]
                            this.game.global.finishObject.width = arrayWidth[i]
                            break
                        default:
                            this.console.log('tipo sin reconocer ' + type[i])
                            break
                    }
                }

                if (roomType == 'SINGLE') {
                    game.state.start('singlePlayerState')
                } else if (roomType == 'MULTI') {
                    var namePlayers = JSON.parse(msg.name)
                    var snails = JSON.parse(msg.snails)
                    for (var i = 0; i < namePlayers.length; i++) {
                        game.global.playersMulti[i] = new this.Object()
                        this.game.global.playersMulti[i].name = namePlayers[i]
                        this.game.global.snailChosenMulti[i] = snails[i]
                        if (namePlayers[i] == this.game.global.username) {
                            this.game.global.myPlayerId = i

                        }
                    }
                    this.console.log('Empiezo el multiplayer')
                    this.game.state.start('multiplayerState')
                }

                break;

            case 'OBSTACLEUPDATE':
                // this.console.log('OPBSTACLE UPDATEEEEEEEEEEEEEEE')
                //console.log(msg)
                var id = JSON.parse(msg.id)
                var state = JSON.stringify(msg.estate)
                //this.console.log(state)
                switch (state) {
                    case '"ACTIVE"':
                        //Empezar animacion de fuego
                        //this.console.log('Activar fuego')
                        this.game.global.arrayObstacles[id].animations.play('fire')
                        break
                    case '"NOTACTIVE"':
                        //Apagar
                        //this.console.log('Desactivar')
                        this.game.global.arrayObstacles[id].animations.play('stopped')
                        break
                    case '"PREACTIVATE"':
                        //Empezar animacion chispas
                        //this.console.log('Chispas')
                        game.global.arrayObstacles[id].animations.play('sparks')
                        break
                    default:
                        break
                }
                /*
                var arrayPosX = JSON.parse(msg.posX)
                var arrayPosY = JSON.parse(msg.posY)
                for (var i = 0; i < this.game.global.arrayObstacles.length; i++) {
                    // this.console.log('pos antes: ' + this.game.global.arrayObstacleSpikes[i].x + ', ' + this.game.global.arrayObstacleSpikes[i].y)
                    this.game.global.arrayObstacles[i].x = arrayPosX[i]
                    this.game.global.arrayObstacles[i].y = game.world.height - arrayPosY[i]
                    // this.console.log('pos antes: ' + this.game.global.arrayObstacleSpikes[i].x + ', ' + this.game.global.arrayObstacleSpikes[i].y)             
                }*/
                break
            case 'UPDATETRAPDOOR':
                //console.log('EVENTO UPDATE TRAPDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR')
                //console.log(msg);

                var id = JSON.parse(msg.id)
                var state = JSON.stringify(msg.state)
                state = state.substring(1, state.length - 1)
                //console.log(this.game.global.arrayTrapdoors[id])
                if (this.game.global.arrayTrapdoors[id] !== undefined) {
                    if (state == 'CLOSE') {
                        game.global.arrayTrapdoors[id].frame = 1
                    } else {
                        game.global.arrayTrapdoors[id].frame = 0
                    }
                }
                //console.log(this.game.global.arrayTrapdoors[id])
                break
            case 'UPDATETRAMPOLINE':
                //this.console.log('UPDATE TRAMPOLINEEEEEEEE')
                var id = JSON.parse(msg.id)
                game.global.arrayTrampolines[id].animations.play('activate', 8, false)
                break
            case 'WINDUPDATE':
                //this.console.log('WIND UPDATEEEEEEEEEEE')
                //this.console.dir(msg)
                var direction = JSON.parse(msg.direction)
                var id = JSON.parse(msg.id)
                if (direction == true) {
                    // this.console.log('a favor')
                    game.global.arrayWinds[id].angle = 180
                    game.global.arrayWinds[id].animations.play('wind')
                } else {
                    // this.console.log('en contra')
                    game.global.arrayWinds[id].angle = 0
                    game.global.arrayWinds[id].animations.play('wind')
                }
                break
            case 'FINISH':
                game.global.winner = JSON.parse(msg.winner)
                game.global.myTime = JSON.parse(msg.time)
                game.global.maxTime = JSON.parse(msg.maxTime)
                game.global.myRecord = JSON.parse(msg.record)
                var puntos = JSON.parse(msg.points)
                this.game.global.puntuationGameOver = puntos

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


                game.state.start('gameOverState')
                break
            case 'GROUNDCOLLISION':
                //Poner la animacion de andar
                this.game.global.haveToRotateToGround = true
                game.global.haveToRotateToSlope = false
                this.game.global.haveToRotateToWall = false
                break
            case 'OBJECTUSED':
                this.console.log('invisible')
                switch (JSON.stringify(msg.type)) {
                    case '"SHIELD"':
                        game.global.player.shieldPowerUp.visible = false
                        game.global.player.sprite.addChild(game.add.sprite(200, -200, 'shieldPowerUp'))
                        break
                    case '"STAMINA"':
                        game.global.player.staminaPowerUp.visible = false
                        game.global.player.sprite.addChild(game.add.sprite(200, -200, 'staminaPowerUp'))
                        break
                    case '"WEIGHT"':
                        game.global.player.wingPowerUp.visible = false
                        game.global.player.sprite.addChild(game.add.sprite(200, -200, 'wingsPowerUp'))
                        break
                    case '"LETUCCE"':
                        game.global.player.lettucePowerUp.visible = false
                        game.global.player.sprite.addChild(game.add.sprite(200, -200, 'lettucePowerUp'))
                        break
                    case '"SPEED"':
                        game.global.player.speedPowerUp.visible = false
                        game.global.player.sprite.addChild(game.add.sprite(200, -200, 'speedPowerUp'))
                        break
                    case '"INK"':
                        game.global.player.inkPowerUp.visible = false
                        game.global.player.sprite.addChild(game.add.sprite(200, -200, 'inkPowerUp'))
                        break
                    case '"NULL"':
                        this.console.log('MAL')
                        break
                    default:
                        break
                }
                this.game.global.hasPowerUp = false
                break
            case 'OBSTACLECOLLISION':
                //Poner animacion de cansado
                game.global.player.sprite.animations.play('damage');
                break
            case 'SLOPECOLLISION':
                //Poner animacion cuesta
                var degrees = JSON.parse(msg.degrees)
                if (degrees < 0) {
                    //degrees = 360 + degrees
                }
                this.game.global.degreesToRotateSlope = degrees
                this.game.global.haveToRotateToGround = false
                game.global.haveToRotateToSlope = true
                this.game.global.haveToRotateToWall = false
                break
            case 'SNAILUPDATE':
                //Saber si me quedo sin stamina o si la recupero
                var runOutOfStamina = JSON.parse(msg.runOutStamina)
                var recoverStamina = JSON.parse(msg.recoverStamina)
                if (runOutOfStamina) {
                    //Animacion de cansarse
                    game.global.player.sprite.animations.play('tired');
                } else
                    if (recoverStamina) {
                        //Animacion de andar normal
                        game.global.player.sprite.animations.play('walk');
                    }
                break
            case 'TAKEPOWERUP':
                //DECIR DANI QUE ME MANDE ID
                //this.console.log('take power up')
                var id = JSON.parse(msg.id)
                //Borrar powerup con ese id
                this.game.global.arrayPowerUps[id].alpha = 0
                if (this.game.global.hasPowerUp) {
                    if (game.global.player.shieldPowerUp.visible == true) {
                        game.global.player.shieldPowerUp.visible = false
                    }
                    else if (game.global.player.staminaPowerUp.visible == true) {
                        game.global.player.staminaPowerUp.visible = false
                    } else if (game.global.player.wingPowerUp.visible == true) {
                        game.global.player.wingPowerUp.visible = false
                    } else if (game.global.player.lettucePowerUp.visible == true) {
                        game.global.player.lettucePowerUp.visible = false
                    } else if (game.global.player.speedPowerUp.visible == true) {
                        game.global.player.speedPowerUp.visible = false
                    } else if (game.global.player.inkPowerUp.visible == true) {
                        game.global.player.inkPowerUp.visible = false
                    }
                }
                switch (JSON.stringify(msg.type)) {
                    case '"SHIELD"':
                        //Crear sprite shield
                        game.global.player.shieldPowerUp.visible = true
                        break
                    case '"STAMINA"':
                        //Crear sprite estamina
                        game.global.player.staminaPowerUp.visible = true
                        break
                    case '"WEIGHT"':
                        //Crear sprite peso
                        game.global.player.wingPowerUp.visible = true
                        break
                    case '"LETUCCE"':
                        //Crear sprite lechuga
                        game.global.player.lettucePowerUp.visible = true
                        break
                    case '"SPEED"':
                        //Crear sprite velocidad
                        game.global.player.speedPowerUp.visible = true
                        break
                    case '"INK"':
                        //Crear sprite tinta
                        game.global.player.inkPowerUp.visible = true
                        break
                    case '"NULL"':
                        this.console.log('MAL')
                        break
                    default:
                        break
                }
                this.game.global.hasPowerUp = true
                break
            case 'UPDATEDOOR':
                //Cambiar el sprite de la puerta
                var id = JSON.parse(msg.id)
                var state = JSON.stringify(msg.state)
                state = state.substring(1, state.length - 1)
                this.console.log(msg)
                //console.log(this.game.global.arrayDoors[id])
                if (this.game.global.arrayDoors[id] !== undefined) {
                    if (state == 'OPEN') {
                        this.console.log('abrir puerta')
                        game.global.arrayDoors[id].frame = 1
                    } else {
                        this.console.log('cerrar puerta')
                        game.global.arrayDoors[id].frame = 0
                    }
                }
                break
            case 'WALLCOLLISION':
                //Rotate sprite
                this.game.global.haveToRotateToGround = false
                game.global.haveToRotateToSlope = false
                this.game.global.haveToRotateToWall = true
                break
            case 'LOGINSTATUS':
                if (JSON.parse(msg.conectionStatus)) {
                    game.state.start('mainMenuState')
                } else {
                    // deberia sacarse un mensaje de error
                    game.state.start('createAccountState')
                }
                break
            case 'CREATEACCOUNTSTATUS':
                if (JSON.parse(msg.conectionStatus)) {
                    game.state.start('mainMenuState')
                } else {
                    //game.state.start('shopState')
                    console.log("Creacion de cuenta negativa")
                }
                break
            case 'DISCONNECTSTATUS':
                game.global.mapDrawn = false
                game.global.username = ''
                game.global.password = ''
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
                game.global.player = new this.Object()
                game.global.winner = false
                game.global.time = null
                game.global.maxTime = null
                game.global.record = null
                game.global.haveToRotateToWall = false
                game.global.haveToRotateToGround = false
                game.global.haveToRotateToSlope = false
                game.global.degreesToRotateSlope = 0
                game.global.wingPowerUp = null
                game.global.shieldPowerUp = null
                game.global.staminaPowerUp = null
                game.global.lettucePowerUp = null
                game.global.onPowerUp = null
                game.global.downPowerUp = null
                game.global.clockPowerUp = null
                game.global.inkPowerUp = null
                game.global.speedPowerUp = null
                game.global.hasPowerUp = false

                game.global.snailChosen = null
                game.global.mapChosen = null

                game.global.nameMapRecords = []
                game.global.myTimes = []

                game.global.maxStamina = 0
                if (JSON.parse(msg.disconnectionStatus)) {
                    game.state.start('initSesionState')
                }
                break

            case 'ENTERLOBBY':
                this.console.log('me llega enter lobby')
                var snail = JSON.stringify(msg.snail)
                snail = snail.substring(1, snail.length - 1)
                this.console.log(snail)
                this.game.global.snailChosen = snail
                game.global.maxStamina = 0
                game.global.statStamina = JSON.parse(msg.stamina)
                game.global.statAc = JSON.parse(msg.ac)
                game.global.statRegen = JSON.parse(msg.regen)
                game.global.statWeight = JSON.parse(msg.weight)
                game.global.statSpeed = JSON.parse(msg.speed)
                this.game.state.start('lobbyState')
                break

            case 'MYRECORDS':
                var nameMap = JSON.parse(msg.nameMap)
                var myTime = JSON.parse(msg.myTime)

                for (var i = 0; i < nameMap.length; i++) {
                    this.game.global.nameMapRecords[i] = nameMap[i]
                    this.game.global.myTimes[i] = myTime[i]
                }
                this.game.state.start('recordsState')
                break
            case 'SHOPENTER':
                let ownedAux = JSON.parse(msg.owned)
                let notOwnedAux = JSON.parse(msg.notOwned)

                for (var i = 0; i < ownedAux.length; i++) {
                    game.global.owned[i] = ownedAux[i];
                }

                for (var j = 0; j < notOwnedAux.length; j++) {
                    game.global.notOwned[j] = notOwnedAux[j]
                }
                game.global.points = JSON.parse(msg.points)
                game.global.money = JSON.parse(msg.money)
                game.state.start('shopState')
                break
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////   MULTIJUGADOR   ///////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////////////////
            case 'TICKMULTI':
                //Array de las posiciones de todos los jugadores
                var arrayPosX = JSON.parse(msg.posX)
                var arrayPosY = JSON.parse(msg.posY)

                //Stamina del jugador
                var arrayStamina = JSON.parse(msg.stamina)
                //this.console.log(arrayStamina)
                //Nombres de los jugadores
                var namePlayers = JSON.parse(msg.name)

                if (firstFrame == 0) {
                    /*game.global.loadingAnim.destroy();
                    game.global.loading.destroy();*/

                    this.game.global.maxStamina = arrayStamina[this.game.global.myPlayerId]
                    firstFrame++
                    this.console.log(game.global.playersMulti)
                }
                //Actualizamos las posiciones de todos los caracoles
                for (var i = 0; i < arrayPosX.length; i++) {
                    this.game.global.playersMulti[i].sprite.x = Math.floor(arrayPosX[i])
                    this.game.global.playersMulti[i].sprite.y = game.world.height - Math.floor(arrayPosY[i]) - 10
                }
                //Actualizamos la stamina de tu jugador
                /*
                for (var i = 0; i<arrayStamina; i++){
                    var scale = arrayStamina[i] * 0.5 / game.global.maxStamina
                    game.global.playersMulti[i].stamina2.scale.setTo(scale, 0.45)
                }
                */
                
                var scale = arrayStamina[this.game.global.myPlayerId] * 0.5 / game.global.maxStamina
                game.global.playersMulti[this.game.global.myPlayerId].stamina2.scale.setTo(scale, 0.45)
                
                //Actualizar barra de progreso del jugador (MAS ADELANTE TODOS)
                var posProgress = 100 + game.global.finishObject.x - game.global.playersMulti[this.game.global.myPlayerId].sprite.x
                var scaleProgress = posProgress / game.global.finishObject.x
                game.global.playersMulti[this.game.global.myPlayerId].progressBar2.scale.setTo(scaleProgress, 1)

                break
            case 'SNAILUPDATEMULTI':
                var runOutOfStamina = JSON.parse(msg.runOutStamina)
                var recoverStamina = JSON.parse(msg.recoverStamina)
                var idPlayer = JSON.parse(msg.id)
                console.log(msg)
                if (runOutOfStamina) {
                    //Animacion de cansarse
                    game.global.playersMulti[idPlayer].sprite.animations.play('tired');
                } else if (recoverStamina) {
                        //Animacion de andar normal
                        game.global.playersMulti[idPlayer].sprite.animations.play('walk');
                }
                break
            case 'FINISHMULTI':
                var myTime = JSON.parse(msg.time)
                var myRecord = JSON.parse(msg.record)
                var myPoints = JSON.parse(msg.points)
                var arrayPositionNames = JSON.stringify(msg.positionName)
                var arrayPositionTimes = JSON.parse(msg.positionTime)

                game.global.myTime = myTime
                game.global.myRecord = myRecord
                game.global.puntuationGameOver = myPoints
                game.global.arrayPositionsMulti = arrayPositionNames
                game.global.arrayTimesMulti = arrayPositionTimes

                

                game.state.start('gameOverState')
                break
            case 'WAITINGROOMSTART':
                var roomName = JSON.stringify(msg.roomName)
                roomName = roomName.substring(1, roomName.length - 1)
                this.game.global.roomNameMulti = roomName

                var snail = JSON.stringify(msg.snail)
                snail = snail.substring(1, snail.length - 1)
                this.console.log(snail)
                this.game.global.snailChosen = snail
                game.global.maxStamina = 0
                game.global.statStamina = JSON.parse(msg.stamina)
                game.global.statAc = JSON.parse(msg.ac)
                game.global.statRegen = JSON.parse(msg.regen)
                game.global.statWeight = JSON.parse(msg.weight)
                game.global.statSpeed = JSON.parse(msg.speed)

                this.game.state.start('lobbyMultiState')
                break

            case 'SLOPECOLLISIONMULTI':
                this.console.log('colision cuesta')
                var idPlayer = JSON.parse(msg.id)
                var degreesToRotate = JSON.parse(msg.degrees)

                this.game.global.degreesToRotateSlopeMulti[idPlayer] = degreesToRotate
                this.game.global.haveToRotateToGroundMulti[idPlayer] = false
                game.global.haveToRotateToSlopeMulti[idPlayer] = true
                this.game.global.haveToRotateToWallMulti[idPlayer] = false
                break
            case 'OBSTACLECOLLISIONMULTI':
                
                //Poner animacion de cansado
                var id = JSON.parse(msg.id)
                
                this.console.log('colision obstaculo ' + id)
                game.global.playersMulti[id].sprite.animations.play('damage');
                break

            case 'WALLCOLLISIONMULTI':
                //this.console.log('colision pared')
                var idPlayer = JSON.parse(msg.id)

                this.game.global.haveToRotateToGroundMulti[idPlayer] = false
                game.global.haveToRotateToSlopeMulti[idPlayer] = false
                this.game.global.haveToRotateToWallMulti[idPlayer] = true
                break

            case 'GROUNDCOLLISIONMULTI':
                //this.console.log('colision suelo')
                var idPlayer = JSON.parse(msg.id)
                this.game.global.haveToRotateToGroundMulti[idPlayer] = true
                game.global.haveToRotateToSlopeMulti[idPlayer] = false
                this.game.global.haveToRotateToWallMulti[idPlayer] = false
                break
            case 'OBJECTUSEDMULTI':
                //this.console.log('invisible')
                var myId = JSON.parse(msg.id)
                switch (JSON.stringify(msg.type)) {
                    case '"SHIELD"':
                        game.global.playersMulti[myId].shieldPowerUp.visible = false
                        game.global.playersMulti[myId].sprite.addChild(game.add.sprite(200, -200, 'shieldPowerUp'))
                        break
                    case '"STAMINA"':
                        game.global.playersMulti[myId].staminaPowerUp.visible = false
                        game.global.playersMulti[myId].sprite.addChild(game.add.sprite(200, -200, 'staminaPowerUp'))
                        break
                    case '"WEIGHT"':
                        game.global.playersMulti[myId].wingPowerUp.visible = false
                        game.global.playersMulti[myId].sprite.addChild(game.add.sprite(200, -200, 'wingsPowerUp'))
                        break
                    case '"LETUCCE"':
                        game.global.playersMulti[myId].lettucePowerUp.visible = false
                        game.global.playersMulti[myId].sprite.addChild(game.add.sprite(200, -200, 'lettucePowerUp'))
                        break
                    case '"SPEED"':
                        game.global.playersMulti[myId].speedPowerUp.visible = false
                        game.global.playersMulti[myId].sprite.addChild(game.add.sprite(200, -200, 'speedPowerUp'))
                        break
                    case '"INK"':
                        game.global.playersMulti[myId].inkPowerUp.visible = false
                        game.global.playersMulti[myId].sprite.addChild(game.add.sprite(200, -200, 'inkPowerUp'))
                        break
                    case '"NULL"':
                        this.console.log('MAL')
                        break
                    default:
                        break
                }
                this.game.global.hasPowerUp = false
                break
            case 'TAKEPOWERUPMULTI':
                //DECIR DANI QUE ME MANDE ID
                //this.console.log('take power up')
                var id = JSON.parse(msg.id)
                var idPlayer = JSON.parse(msg.idPlayer)
                //Borrar powerup con ese id
                this.game.global.arrayPowerUps[id].alpha = 0
                if (this.game.global.hasPowerUp) {
                    if (game.global.playersMulti[idPlayer].shieldPowerUp.visible == true) {
                        game.global.playersMulti[idPlayer].shieldPowerUp.visible = false
                    }
                    else if (game.global.playersMulti[idPlayer].staminaPowerUp.visible == true) {
                        game.global.playersMulti[idPlayer].staminaPowerUp.visible = false
                    } else if (game.global.playersMulti[idPlayer].wingPowerUp.visible == true) {
                        game.global.playersMulti[idPlayer].wingPowerUp.visible = false
                    } else if (game.global.playersMulti[idPlayer].lettucePowerUp.visible == true) {
                        game.global.playersMulti[idPlayer].lettucePowerUp.visible = false
                    } else if (game.global.playersMulti[idPlayer].speedPowerUp.visible == true) {
                        game.global.playersMulti[idPlayer].speedPowerUp.visible = false
                    } else if (game.global.playersMulti[idPlayer].inkPowerUp.visible == true) {
                        game.global.playersMulti[idPlayer].inkPowerUp.visible = false
                    }
                }
                switch (JSON.stringify(msg.type)) {
                    case '"SHIELD"':
                        //Crear sprite shield
                        game.global.playersMulti[idPlayer].shieldPowerUp.visible = true
                        break
                    case '"STAMINA"':
                        //Crear sprite estamina
                        game.global.playersMulti[idPlayer].staminaPowerUp.visible = true
                        break
                    case '"WEIGHT"':
                        //Crear sprite peso
                        game.global.playersMulti[idPlayer].wingPowerUp.visible = true
                        break
                    case '"LETUCCE"':
                        //Crear sprite lechuga
                        game.global.playersMulti[idPlayer].lettucePowerUp.visible = true
                        break
                    case '"SPEED"':
                        //Crear sprite velocidad
                        game.global.playersMulti[idPlayer].speedPowerUp.visible = true
                        break
                    case '"INK"':
                        //Crear sprite tinta
                        game.global.playersMulti[idPlayer].inkPowerUp.visible = true
                        break
                    case '"NULL"':
                        this.console.log('MAL')
                        break
                    default:
                        break
                }
                this.game.global.hasPowerUp = true
                break

            case 'PLAYERENTER':
                var namePlayer = JSON.stringify(msg.name)
                break
            case 'PLAYERLEFT':
                var namePlayer = JSON.stringify(msg.name)
                break
            case 'MULTIROOMSFULL':
                break
            case 'CHOOSEENTER':
                let ownedAux2 = JSON.parse(msg.owned)
                let notOwnedAux2 = JSON.parse(msg.notOwned)
                let normalStatsAux = JSON.parse(msg.normal)
                let tankStatsAux = JSON.parse(msg.tank)
                let baguetteStatsAux = JSON.parse(msg.baguette)
                let miauStatsAux = JSON.parse(msg.miau)
                let mercaStatsAux = JSON.parse(msg.merca)
                let seaStatsAux = JSON.parse(msg.sea)
                let robaStatsAux = JSON.parse(msg.roba)
                let irisStatsAux = JSON.parse(msg.iris)

                for (var e = 0; e < ownedAux2.length; e++){
                    game.global.owned[e] = ownedAux2[e];
                }

                for (var s = 0; s < notOwnedAux2.length; s++){
                    game.global.notOwned[s] = notOwnedAux2[s]
                }

                for (var p = 0; p < normalStatsAux.length; p++){
                    game.global.normalStats[p] = normalStatsAux[p]
                    game.global.tankStats[p] = tankStatsAux[p]
                    game.global.baguetteStats[p] = baguetteStatsAux[p]
                    game.global.miauStats[p] = miauStatsAux[p]
                    game.global.mercaStats[p] = mercaStatsAux[p]
                    game.global.seaStats[p] = seaStatsAux[p]
                    game.global.robaStats[p] = robaStatsAux[p]
                    game.global.irisStats[p] = irisStatsAux[p]
                }

                game.state.start('chooseCharacterState')
                break
            case 'SEESNAILRS':
                game.global.statStamina = JSON.parse(msg.stamina)
                game.global.statAc = JSON.parse(msg.ac)
                game.global.statRegen = JSON.parse(msg.regen)
                game.global.statWeight = JSON.parse(msg.weight)
                game.global.statSpeed = JSON.parse(msg.speed)
                game.global.shellPrice = JSON.parse(msg.shells)
                game.global.pointsPrice = JSON.parse(msg.baba)
                game.state.start('buySnailState')
                break
            case 'PURCHASEOK':
                game.global.money = JSON.parse(msg.shells)
                game.state.start('shopState')
        }   


    }


    this.game.state.add('bootState', Slooow.bootState);
    this.game.state.add('preloadState', Slooow.preloadState);
    this.game.state.add('errorState', Slooow.errorState);
    this.game.state.add('initGameState', Slooow.initGameState);
    this.game.state.add('initSesionState', Slooow.initSesionState);
    this.game.state.add('createAccountState', Slooow.createAccountState);
    this.game.state.add('mainMenuState', Slooow.mainMenuState);
    this.game.state.add('singlePlayerState', Slooow.singlePlayerState);
    this.game.state.add('marathonState', Slooow.marathonState);
    this.game.state.add('lobbyState', Slooow.lobbyState);
    this.game.state.add('lobbyMultiState', Slooow.lobbyMultiState);
    this.game.state.add('multiplayerState', Slooow.multiplayerState);
    this.game.state.add('chooseCharacterState', Slooow.chooseCharacterState);
    this.game.state.add('gameOverState', Slooow.gameOverState);
    this.game.state.add('menuSoloAndMultiLocalState', Slooow.menuSoloAndMultiLocalState);
    this.game.state.add('menuMultiOnlineState', Slooow.menuMultiOnlineState);
    this.game.state.add('shopState', Slooow.shopState);
    this.game.state.add('buySnailState', Slooow.buySnailState);
    this.game.state.add('buyShellsState', Slooow.buyShellsState);
    this.game.state.add('recordsState', Slooow.recordsState);
    this.game.state.add('trophiesState', Slooow.trophiesState);


    this.game.state.start('bootState');
}