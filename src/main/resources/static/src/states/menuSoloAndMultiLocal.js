Slooow.menuSoloAndMultiLocalState = function(game) {
}

Slooow.menuSoloAndMultiLocalState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **SHOP** state");
        }
    },

    preload : function() {
        //Background
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)
    },

    create : function() {

        var style = {
			font : "40px Arial",
			fill : "#ffffff",
			align : "center"
        };

        //Boton desconectar 
		buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)
        //Texto desconectar
		textButtonBack = game.add.text(50,
            40, 'Back', style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Boton ambientacion1 = Pradera
		buttonWorld1 = game.add.button(game.world.centerX - 400,
            game.world.centerY - 200, 'button', actionOnClickWorld1, this,
            0, 0, 0)
        buttonWorld1.anchor.set(0.5)
        buttonWorld1.scale.setTo(0.8, 0.8)
        //Texto ambientacion1
		textButtonWorld1 = game.add.text(game.world.centerX - 400,
            game.world.centerY - 200, 'Pradera', style)
        textButtonWorld1.anchor.set(0.5)
        textButtonWorld1.scale.setTo(0.8,0.8)

        //Boton ambientacion2 = Cocina
		buttonWorld2 = game.add.button(game.world.centerX ,
            game.world.centerY - 200, 'button', actionOnClickWorld2, this,
            0, 0, 0)
        buttonWorld2.anchor.set(0.5)
        buttonWorld2.scale.setTo(0.8, 0.8)
        //Texto ambientacion2
		textButtonWorld2 = game.add.text(game.world.centerX ,
            game.world.centerY - 200, 'Cocina', style)
        textButtonWorld2.anchor.set(0.5)
        textButtonWorld2.scale.setTo(0.8,0.8)

        //Boton ambientacion3 = Hielo
		buttonWorld3 = game.add.button(game.world.centerX +400,
            game.world.centerY - 200, 'button', actionOnClickWorld3, this,
            0, 0, 0)
        buttonWorld3.anchor.set(0.5)
        buttonWorld3.scale.setTo(0.8, 0.8)
        //Texto ambientacion3
		textButtonWorld3 = game.add.text(game.world.centerX +400,
            game.world.centerY - 200, 'Hielo', style)
        textButtonWorld3.anchor.set(0.5)
        textButtonWorld3.scale.setTo(0.8,0.8)

        //Boton mapa 1
		buttonMap1 = game.add.button(game.world.centerX ,
            game.world.centerY , 'button', actionOnClickMap1, this,
            0, 0, 0)
        buttonMap1.anchor.set(0.5)
        buttonMap1.scale.setTo(2, 0.8)
        //Texto mapa 1
		textButtonMap1 = game.add.text(game.world.centerX ,
            game.world.centerY , 'Mapa 1', style)
        textButtonMap1.anchor.set(0.5)
        textButtonMap1.scale.setTo(0.8,0.8)

        //Boton mapa 2
		buttonMap2 = game.add.button(game.world.centerX ,
            game.world.centerY +150 , 'button', actionOnClickMap2, this,
            0, 0, 0)
        buttonMap2.anchor.set(0.5)
        buttonMap2.scale.setTo(2, 0.8)
        //Texto mapa 2
		textButtonMap2 = game.add.text(game.world.centerX ,
            game.world.centerY +150 , 'Mapa 2', style)
        textButtonMap2.anchor.set(0.5)
        textButtonMap2.scale.setTo(0.8,0.8)

        //Boton mapa 3
		buttonMap3 = game.add.button(game.world.centerX ,
            game.world.centerY +300 , 'button', actionOnClickMap3, this,
            0, 0, 0)
        buttonMap3.anchor.set(0.5)
        buttonMap3.scale.setTo(2, 0.8)
        //Texto mapa 3
		textButtonMap3 = game.add.text(game.world.centerX ,
            game.world.centerY +300 , 'Mapa 3', style)
        textButtonMap3.anchor.set(0.5)
        textButtonMap3.scale.setTo(0.8,0.8)

        buttonMap1.inputEnabled = false;
        buttonMap2.inputEnabled = false;
        buttonMap3.inputEnabled = false;

        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }

        function actionOnClickWorld1 (){
            //Textos mapa
            textButtonMap1.setText('Mapa 1 - Pradera')
            buttonMap1.inputEnabled = true;
            textButtonMap2.setText('Mapa 2 - Pradera')
            buttonMap2.inputEnabled = true;
            textButtonMap3.setText('Mapa 3 - Pradera')
            buttonMap3.inputEnabled = true;
        }

        function actionOnClickWorld2 (){
            //Textos mapa
            textButtonMap1.setText('Mapa 1 - Cocina')
            buttonMap1.inputEnabled = true;
            textButtonMap2.setText('Mapa 2 - Cocina')
            buttonMap2.inputEnabled = true;
            textButtonMap3.setText('Mapa 3 - Cocina')
            buttonMap3.inputEnabled = true;
        }

        function actionOnClickWorld3 (){
            //Textos mapa
            textButtonMap1.setText('Mapa 1 - Hielo')
            buttonMap1.inputEnabled = true;
            textButtonMap2.setText('Mapa 2 - Hielo')
            buttonMap2.inputEnabled = true;
            textButtonMap3.setText('Mapa 3 - Hielo')
            buttonMap3.inputEnabled = true;          
        }

        function actionOnClickMap1(){
            game.state.start('lobbyState')
/////////////////////////////////////////////////////////////////////////////////////////////
// AÑADIR MENSAJES AL SERVIDOR CON AMBIENTACION + MAPA
/////////////////////////////////////////////////////////////////////////////////////////////
        }

        function actionOnClickMap2(){
            game.state.start('lobbyState')
/////////////////////////////////////////////////////////////////////////////////////////////
// AÑADIR MENSAJES AL SERVIDOR CON AMBIENTACION + MAPA
/////////////////////////////////////////////////////////////////////////////////////////////        
        }

        function actionOnClickMap3(){
            game.state.start('lobbyState')
/////////////////////////////////////////////////////////////////////////////////////////////
// AÑADIR MENSAJES AL SERVIDOR CON AMBIENTACION + MAPA
/////////////////////////////////////////////////////////////////////////////////////////////         
        }
    },

    update : function() {
    }
}