Slooow.chooseCharacterState = function(game) {
}

Slooow.chooseCharacterState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **CHOOSECHARACTER** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
    },

    preload : function() {
    },

    create : function() {
     
        var style = {
			font : "40px Arial",
			fill : "#ffffff",
			align : "center"
        };

        var style2 = {
			font : "40px Arial",
			fill : "#ffffff",
			align : "center"
        };
        
        

        //Background
        var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)

        //Boton back
		buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)

        //Texto back
		textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back , style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Boton aceptar
		buttonAccept = game.add.button(game.world.centerX,
            game.world.centerY+300, 'button', actionOnClickOK, this,
            0, 0, 0)
            buttonAccept.anchor.set(0.5)
            buttonAccept.scale.setTo(0.2, 0.3)

        //Texto aceptar
		textButtonBack = game.add.text(game.world.centerX,
            game.world.centerY+300, game.global.activeLanguage.Accept, style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Texto estadisticas seleccionado
		textStats = game.add.text(game.world.centerX-400,
            game.world.centerY -50, game.global.activeLanguage.Stats, style2)
            textStats.anchor.set(0.5)
            textStats.scale.setTo(0.5,0.5)

        //Print image chosen
        
        var chosen
        if (game.global.snailChosen != null){
            switch (game.global.snailChosen){
                case ('NORMAL'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'normalCol')
                    break
                case ('TANK'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'tanqueCol')
                    break   
                case ('BAGUETTE'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'frenchCol')
                    break    
                case ('MIAU'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'catCol')
                    break    
                case ('MERCA'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'slugCol')
                    break     
                case ('SEA'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'seaCol')
                    break
                case ('ROBA'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'thiefCol')
                    break
                case ('IRIS'):
                        chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'irisCol')
                    break
                default:
                    console.log('snail sprite no identificado')
                    break    
            }
        }
		chosen.anchor.setTo(0.5, 0.5);
        chosen.scale.setTo(0.4, 0.4)

        //Print image thief
        var thiefSnail = game.add.image(game.world.centerX, game.world.centerY-150, 'thiefCol')
		thiefSnail.anchor.setTo(0.5, 0.5);
        thiefSnail.scale.setTo(0.3, 0.3)

        thiefSnail.inputEnabled = true
        thiefSnail.events.onInputDown.add(chooseCharacterThief, this)

        //Print image seaSnail
        var seaSnail = game.add.image(game.world.centerX +150, game.world.centerY-150, 'seaCol')
		seaSnail.anchor.setTo(0.5, 0.5);
        seaSnail.scale.setTo(0.3, 0.3)

        seaSnail.inputEnabled = true
        seaSnail.events.onInputDown.add(chooseCharacterSea, this)

        //Print image arcoiris
        var rainbowSnail = game.add.image(game.world.centerX+300, game.world.centerY-150, 'irisCol')
		rainbowSnail.anchor.setTo(0.5, 0.5);
        rainbowSnail.scale.setTo(0.3, 0.3)

        rainbowSnail.inputEnabled = true
        rainbowSnail.events.onInputDown.add(chooseCharacterRainbow, this)

        //Print image gatocol
        var catSnail = game.add.image(game.world.centerX+300, game.world.centerY-50, 'catCol')
		catSnail.anchor.setTo(0.5, 0.5);
        catSnail.scale.setTo(0.3, 0.3)

        catSnail.inputEnabled = true
        catSnail.events.onInputDown.add(chooseCharacterCat, this)

        //Print image frenchSnail
        var frenchSnail = game.add.image(game.world.centerX +150, game.world.centerY-50, 'frenchCol')
		frenchSnail.anchor.setTo(0.5, 0.5);
        frenchSnail.scale.setTo(0.3, 0.3)

        frenchSnail.inputEnabled = true
        frenchSnail.events.onInputDown.add(chooseCharacterFrench, this)

        //Print image normal
        var normalSnail = game.add.image(game.world.centerX, game.world.centerY-50, 'normalCol')
		normalSnail.anchor.setTo(0.5, 0.5);
        normalSnail.scale.setTo(0.3, 0.3)

        normalSnail.inputEnabled = true
        normalSnail.events.onInputDown.add(chooseCharacterNormal, this)

        //Print image tank
        var tankSnail = game.add.image(game.world.centerX, game.world.centerY+50, 'tanqueCol')
		tankSnail.anchor.setTo(0.5, 0.5);
        tankSnail.scale.setTo(0.3, 0.3)

        tankSnail.inputEnabled = true
        tankSnail.events.onInputDown.add(chooseCharacterTank, this)

        //Print image slugSnail
        var slugSnail = game.add.image(game.world.centerX +150, game.world.centerY+50, 'slugCol')
		slugSnail.anchor.setTo(0.5, 0.5);
        slugSnail.scale.setTo(0.3, 0.3)

        slugSnail.inputEnabled = true
        slugSnail.events.onInputDown.add(chooseCharacterSlug, this)

        function chooseCharacterSea (){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'seaCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'SEA'
        }
        
        function chooseCharacterThief(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'thiefCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'ROBA'
        }

        function chooseCharacterRainbow(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'irisCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'IRIS'
        }

        function chooseCharacterCat(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'catCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'MIAU'
        }

        function chooseCharacterFrench(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'frenchCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'BAGUETTE'
        }

        function chooseCharacterNormal(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'normalCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'NORMAL'
        }

        function chooseCharacterTank(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'tanqueCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'TANK'
        }

        function chooseCharacterSlug(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-350, game.world.centerY-150, 'slugCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'MERCA'
        }

        function actionOnClickBack(){
            game.state.start('lobbyState')
        }

        function actionOnClickOK(){
            game.state.start('lobbyState')
        }
    },

    update : function() {
    }
}