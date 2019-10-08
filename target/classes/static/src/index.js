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
        password: ''
    }
    console.log('Despues crear game global');

    game.global.socket = new WebSocket('wss://no-puedo-mas.herokuapp.com/snail');
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
                break

            case 'DRAWMAP':
                /*
                console.log (msg.posXArray)
                console.log (msg.posYArray)
                console.log (msg.heightArray)
                console.log (msg.widthArray)
                */
                var arrayPosX =  JSON.parse(msg.posX)
                var arrayPosY = JSON.parse(msg.posY)
                var arrayHeight = JSON.parse(msg.height)
                var arrayWidth = JSON.parse(msg.width)

                for (var j = 0; j< arrayPosX.length; j++){
                    this.game.global.mapObjects[j] = new Object()
                }
                for (var i = 0; i< arrayPosX.length; i++){
                    game.global.mapObjects[i].x = arrayPosX[i];
                    game.global.mapObjects[i].y = /*worldHeight -*/ arrayPosY[i] 
                    game.global.mapObjects[i].height = arrayHeight[i];
                    game.global.mapObjects[i].width = arrayWidth[i];
                    this.console.log('Objeto ' + i + ': ' + game.global.mapObjects[i].x + ' ' + game.global.mapObjects[i].y +' ' +game.global.mapObjects[i].height + ' ' + game.global.mapObjects[i].width )
                }
                game.state.start('singlePlayerState')
                break;
                
                    
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