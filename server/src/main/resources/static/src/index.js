var game;

window.onload = function () {
    game = new Phaser.Game(1024, 600, Phaser.AUTO, 'gameDiv');
    //game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv');
    console.log('Despues cargar juego');

    //Variables globales compartidas entre escenas
    game.global = {
        //Socket
        socket: null,
        FPS: 60,
        DEBUG_MODE: true,
        player : null,
        mapObjects: [],
        mapDrawn: false,
        username: '',
        password: '',
        //Array de suelos. Tiene: x, y, width, height
        arrayGrounds: [],
        //Array de paredes. Tiene: x, y, width, height
        arrayWalls: [],
        //Array de rampas. Tiene: x, y, width, height
        arraySlopes : [],
        //Array de obstaculos tipo pincho. Tiene: posX, posY
        arrayObstacleSpikes: [] 
    }
    console.log('Despues crear game global');

    game.global.socket = new WebSocket('ws://127.0.0.1:8080/snail');
    game.global.socket.onopen = () => {

        console.log('[DEBUG] WebSocket connection opened.')

    }

    game.global.socket.onclose = () => {
        console.log('[DEBUG] Websocket connection closed');
    }

    game.global.socket.onmessage = (message) => {
        var msg = JSON.parse(message.data)
        console.log(msg);

        switch (msg.event) {
            
            case 'TICK':
                if (game.global.DEBUG_MODE) {
                    console.log('[DEBUG] TICK message recieved')
                    console.dir(msg)
                }
                game.global.player.x = Math.floor(msg.posX)
                game.global.player.y = game.world.height  - (Math.floor(msg.posY))
                game.global.player.stamina = msg.stamina
                break

            case 'DRAWMAP':
                /*
                console.log (msg.posXArray)
                console.log (msg.posYArray)
                console.log (msg.heightArray)
                console.log (msg.widthArray)
                */

                //Arrays con los parametros de todos los objetos del mapa. Dependiendo del tipo se guardaran
                //En un array u otro
                var arrayPosX =  JSON.parse(msg.posX)
                var arrayPosY = JSON.parse(msg.posY)
                var arrayHeight = JSON.parse(msg.height)
                var arrayWidth = JSON.parse(msg.width)
                var type = JSON.parse(msg.myType) 

                var numOfGrounds = 0;
                var numOfWalls = 0;
                var numOfSlopes = 0;
                var numOfObstacleSpikes = 0;

                for (var i = 0; i<type.length; i++){
                    switch (type[i]){
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
                            this.game.global.arraySlopes[numOfSlopes].width = arrayWidth[i]
                            numOfSlopes++
                            break
                        case 'POWERUP':
                            //Por ahora no hace nada
                            break;
                        case 'OBSTACLE':
                            this.game.global.arrayObstacleSpikes[numOfObstacleSpikes] = new Object()
                            this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].x = arrayPosX[i]
                            this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].y = arrayPosY[i]
                            this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].height = arrayHeight[i]
                            this.game.global.arrayObstacleSpikes[numOfObstacleSpikes].width = arrayWidth[i]
                            numOfObstacleSpikes++
                            break                
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

            case 'SPIKEOBSTACLEUPDATE': 
                var arrayPosX = JSON.parse(msg.posX)
                var arrayPosY = JSON.parse(msg.posY)
                var i = 0
                for (var spike in game.global.arrayObstacleSpikes){
                    spike.posX = arrayPosX[i]
                    spike.posY = arrayPosY[i];
                    i++
                }
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
    this.game.state.add('shopState', Slooow.shopState);

    this.game.state.start('bootState');
}