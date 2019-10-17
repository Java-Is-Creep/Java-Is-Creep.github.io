Slooow.shopState = function(game) {
}

Slooow.shopState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **SHOP** state");
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

        //Boton desconectar
		buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)

        //Texto desconectar
		textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back, game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

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
            game.state.start('mainMenuState')
        }
    },

    update : function() {
    }
}