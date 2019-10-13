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





    //Variables globales compartidas entre escenas
    game.global = {
        //Socket
        socket: null,
        FPS: 60,
        DEBUG_MODE: false,
        player: null,
        mapObjects: [],
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
        arrayDoors:[],
        finishObject: new Object,
        player: new this.Object(),
        winner: false,
        time: null,
        maxTime: null
    }

    // Conexiones
    //game.global.socket = new WebSocket('wss://slooow.herokuapp.com/snail');
    game.global.socket = new WebSocket('ws://127.0.0.1:8080/snail');
    //game.global.socket = new WebSocket('ws://192.168.1.17:8080/snail');
    game.global.socket.onopen = () => {

        console.log('[DEBUG] WebSocket connection opened.')

    }

    game.global.socket.onclose = () => {
        console.log('[DEBUG] Websocket connection closed');
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
                game.global.player.sprite.x = Math.floor(msg.posX)
                game.global.player.sprite.y = game.world.height - (Math.floor(msg.posY))
                if (game.global.player.maxStamina == 0) {
                    game.global.player.maxStamina = msg.stamina
                }
                var scale = msg.stamina * 3 / 1200
                game.global.player.stamina1.scale.setTo(scale, 3)

                game.global.player.stamina.setText(msg.stamina)
                break

            case 'DRAWMAP':
                //Arrays con los parametros de todos los objetos del mapa. Dependiendo del tipo se guardaran
                //En un array u otro
                var arrayPosX = JSON.parse(msg.posX)
                var arrayPosY = JSON.parse(msg.posY)
                var arrayHeight = JSON.parse(msg.height)
                var arrayWidth = JSON.parse(msg.width)
                var type = JSON.parse(msg.myType)

                var numOfGrounds = 0;
                var numOfWalls = 0;
                var numOfSlopes = 0;
                var numOfObstacles = 0;
                var numOfPowerUps = 0;
                var numOfTrapdoors = 0;
                var numOfTrampolines = 0;
                var numOfDoors = 0;

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
                            console.log("Angulo en indexjs" + this.game.global.arraySlopes[numOfSlopes].height)
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
                            console.log("Patata")
                            console.dir(this.game.global.arrayObstacles[numOfObstacles])
                            this.game.global.arrayObstacles[numOfObstacles] = new Object()
                            //this.game.global.arrayObstacleSpikes[numOfObstacleSpikes] = game.add.image(arrayPosX[i],game.world.height - arrayPosY[i], 'button')
                            this.game.global.arrayObstacles[numOfObstacles].x = arrayPosX[i]
                            this.game.global.arrayObstacles[numOfObstacles].y = arrayPosY[i]
                            console.log("Patata777")
                            console.dir(this.game.global.arrayObstacles)
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
                            console.log('trapdoor')
                            console.dir(game.global.arrayTrapdoors)
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
                        case 'FINISH':
                            this.game.global.finishObject.x = arrayPosX
                            this.game.global.finishObject.y = arrayPosY
                            this.game.global.finishObject.height = arrayHeight
                            this.game.global.finishObject.width = arrayWidth

                        default:
                            this.console.log('tipo sin reconocer ' + type[i])
                            break
                    }
                }
                /*
                for (var j = 0; j< arrayPosX.length; j++){
                    this.game.global.mapObjects[j] = new Object()
                }
                for (var i = 0; i< arrayPosX.length; i++){
                    game.global.mapObjects[i].x = arrayPosX[i];
                    game.global.mapObjects[i].y =  arrayPosY[i] 
                    game.global.mapObjects[i].height = arrayHeight[i];
                    game.global.mapObjects[i].width = arrayWidth[i];
                    this.console.log('Objeto ' + i + ': ' + game.global.mapObjects[i].x + ' ' + game.global.mapObjects[i].y +' ' +game.global.mapObjects[i].height + ' ' + game.global.mapObjects[i].width )
                }*/
                game.state.start('singlePlayerState')
                break;

            case 'OBSTACLEUPDATE':
                var id = msg.id
                switch (msg.estate) {
                    case 'ACTIVE':
                        //Empezar animacion de fuego
                        break
                    case 'NOTACTIVE':
                        //Apagar
                        break
                    case 'PREACTIVATE':
                        //Empezar animacion chispas
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
                console.log(this.game.global.arrayTrapdoors[id])
                if (this.game.global.arrayTrapdoors[id] !== undefined) {
                    if (game.global.arrayTrapdoors[id].frame == 0) {
                        game.global.arrayTrapdoors[id].frame = 1
                    } else {
                        game.global.arrayTrapdoors[id].frame = 0
                    }
                }
                console.log(this.game.global.arrayTrapdoors[id])
                break
            case 'UPDATETRAMPOLINE':
                this.console.log('UPDATE TRAMPOLINEEEEEEEE')
                var id = JSON.parse(msg.id)
                game.global.arrayTrampolines[id].animations.play('activate', 8, false)
                break
            case 'FINISH':
                this.game.global.winner = JSON.parse(msg.winner)
                this.game.global.time = JSON.parse(msg.time)
                this.game.global.maxTime = JSON.parse(msg.maxTime)
                break
            case 'GROUNDCOLLISION':
                //Poner la animacion de andar
                break
            case 'OBJECTUSED':
                switch (msg.type) {
                    case 'SHIELD':
                        break
                    case 'STAMINA':
                        break
                    case 'WEIGHT':
                        break
                    case 'LETUCCE':
                        break
                    case 'SPEED':
                        break
                    case 'INK':
                        break
                    case 'NULL':
                        this.console.log('MAL')
                        break
                    default:
                        break
                }
                break
            case 'OBSTACLECOLLISION':
                //Poner animacion de cansado
                break
            case 'SLOPECOLLISION':
                //Poner animacion cuesta
                break
            case 'SNAILUPDATE':
                //Saber si me quedo sin stamina o si la recupero
                var runOutOfStamina = msg.runOutOfStamina
                var recoverStamina = msg.recoverStamina
                if (runOutOfStamina){
                    //Animacion de cansarse
                }
                if (recoverStamina){
                    //Animacion de andar normal
                }
                break
            case 'TAKEPOWERUP':
                //DECIR DANI QUE ME MANDE ID
                var id = msg.id
                //Borrar powerup con ese id
                //this.game.global.arrayPowerUps[id].destroy()
                switch (msg.type) {
                    case 'SHIELD':
                        //Crear sprite shield
                        break
                    case 'STAMINA':
                        //Crear sprite estamina
                        break
                    case 'WEIGHT':
                        //Crear sprite peso
                        break
                    case 'LETUCCE':
                        //Crear sprite lechuga
                        break
                    case 'SPEED':
                        //Crear sprite velocidad
                        break
                    case 'INK':
                        //Crear sprite tinta
                        break
                    case 'NULL':
                        this.console.log('MAL')
                        break
                    default:
                        break
                }
                break
            case 'UPDATEDOOR':
                var id = msg.id
                //Cambiar el sprite de la puerta
                break
            case 'WALLCOLLISION':
                break
        }


    }


    this.game.state.add('bootState', Slooow.bootState);
    this.game.state.add('preloadState', Slooow.preloadState);
    this.game.state.add('initGameState', Slooow.initGameState);
    this.game.state.add('initSesionState', Slooow.initSesionState);
    this.game.state.add('createAccountState', Slooow.createAccountState);
    this.game.state.add('mainMenuState', Slooow.mainMenuState);
    this.game.state.add('singlePlayerState', Slooow.singlePlayerState);
    this.game.state.add('marathonState', Slooow.marathonState);
    this.game.state.add('lobbyState', Slooow.lobbyState);
    this.game.state.add('chooseCharacterState', Slooow.chooseCharacterState);
    this.game.state.add('gameOverState', Slooow.gameOverState);
    this.game.state.add('menuSoloAndMultiLocalState', Slooow.menuSoloAndMultiLocalState);
    this.game.state.add('menuMultiOnlineState', Slooow.menuMultiOnlineState);
    this.game.state.add('shopState', Slooow.shopState);

    this.game.state.start('bootState');
}