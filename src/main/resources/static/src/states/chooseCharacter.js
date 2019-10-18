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

        //Boton back
		buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)

        //Texto back
		textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back , game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Boton aceptar
		buttonAccept = game.add.button(game.world.centerX+350,
            game.world.centerY+300, 'button', actionOnClickOK, this,
            0, 0, 0)
            buttonAccept.anchor.set(0.5)
            buttonAccept.scale.setTo(0.4, 0.5)

        //Texto aceptar
		textButtonBack = game.add.text(game.world.centerX+350,
            game.world.centerY+300, game.global.activeLanguage.Accept, game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Texto estadisticas seleccionado
		textStats = game.add.text(game.world.centerX-400,
            game.world.centerY -50, game.global.activeLanguage.Stats, game.global.style)
            textStats.anchor.set(0.5)
            textStats.scale.setTo(0.5,0.5)

        //Print image chosen
        var chosenShell = game.add.image(game.world.centerX-380, game.world.centerY-170, 'roundBtn')
        chosenShell.anchor.setTo(0.5, 0.5);
        chosenShell.scale.setTo(0.95, 0.95)
        var chosen
        if (game.global.snailChosen != null){
            switch (game.global.snailChosen){
                case ('NORMAL'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'normalCol')
                    break
                case ('TANK'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'tanqueCol')
                    break   
                case ('BAGUETTE'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'frenchCol')
                    break    
                case ('MIAU'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'catCol')
                    break    
                case ('MERCA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'slugCol')
                    break     
                case ('SEA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'seaCol')
                    break
                case ('ROBA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'thiefCol')
                    break
                case ('IRIS'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'irisCol')
                    break
                default:
                    console.log('snail sprite no identificado')
                    break    
            }
        }
		chosen.anchor.setTo(0.5, 0.5);
        chosen.scale.setTo(0.4, 0.4)

        //Print image gatocol
        var catShell = game.add.button(game.world.centerX+250, game.world.centerY-230, 'roundBtn')
        catShell.anchor.setTo(0.5, 0.5);
        catShell.scale.setTo(0.6, 0.6)
        var catSnail = game.add.image(0, -10, 'catCol')
        catShell.addChild(catSnail)
		catSnail.anchor.setTo(0.5, 0.5);
        catSnail.scale.setTo(0.45, 0.45)

        catShell.inputEnabled = true
        catShell.events.onInputDown.add(chooseCharacterCat, this)

        //Print image frenchSnail
        var frenchShell = game.add.button(game.world.centerX+100, game.world.centerY-230, 'roundBtn')
        frenchShell.anchor.setTo(0.5, 0.5);
        frenchShell.scale.setTo(0.6, 0.6)
        var frenchSnail = game.add.image(0, -10, 'frenchCol')
        frenchShell.addChild(frenchSnail)
		frenchSnail.anchor.setTo(0.5, 0.5);
        frenchSnail.scale.setTo(0.45, 0.45)

        frenchShell.inputEnabled = true
        frenchShell.events.onInputDown.add(chooseCharacterFrench, this)

        //Print image normal
        var normalShell = game.add.button(game.world.centerX-50, game.world.centerY-230, 'roundBtn')
        normalShell.anchor.setTo(0.5, 0.5);
        normalShell.scale.setTo(0.6, 0.6)
        var normalSnail = game.add.image(0, -10, 'normalCol')
        normalShell.addChild(normalSnail)
		normalSnail.anchor.setTo(0.5, 0.5);
        normalSnail.scale.setTo(0.45, 0.45)

        normalShell.inputEnabled = true
        normalShell.events.onInputDown.add(chooseCharacterNormal, this)

        //Print image thief
        var thiefShell = game.add.button(game.world.centerX+400, game.world.centerY-230, 'roundBtn')
        thiefShell.anchor.setTo(0.5, 0.5);
        thiefShell.scale.setTo(0.6, 0.6)
        var thiefSnail = game.add.image(0, -10, 'thiefCol')
        thiefShell.addChild(thiefSnail)
		thiefSnail.anchor.setTo(0.5, 0.5);
        thiefSnail.scale.setTo(0.45, 0.45)

        thiefShell.inputEnabled = true
        thiefShell.events.onInputDown.add(chooseCharacterThief, this)

        //Print image seaSnail
        var seaShell = game.add.button(game.world.centerX+250, game.world.centerY-80, 'roundBtn')
        seaShell.anchor.setTo(0.5, 0.5);
        seaShell.scale.setTo(0.6, 0.6)
        var seaSnail = game.add.image(0, -10, 'seaCol')
        seaShell.addChild(seaSnail)
		seaSnail.anchor.setTo(0.5, 0.5);
        seaSnail.scale.setTo(0.45, 0.45)

        seaShell.inputEnabled = true
        seaShell.events.onInputDown.add(chooseCharacterSea, this)
  

        //Print image tank
        var tankShell = game.add.button(game.world.centerX-50, game.world.centerY-80, 'roundBtn')
        tankShell.anchor.setTo(0.5, 0.5);
        tankShell.scale.setTo(0.6, 0.6)
        var tankSnail = game.add.image(0,-10, 'tanqueCol')
        tankShell.addChild(tankSnail)
		tankSnail.anchor.setTo(0.5, 0.5);
        tankSnail.scale.setTo(0.45, 0.45)

        tankShell.inputEnabled = true
        tankShell.events.onInputDown.add(chooseCharacterTank, this)

        //Print image slugSnail
        var slugShell = game.add.button(game.world.centerX +100, game.world.centerY-80, 'roundBtn')
        slugShell.anchor.setTo(0.5, 0.5);
        slugShell.scale.setTo(0.6, 0.6)
        var slugSnail = game.add.image(0, -10, 'slugCol')
        slugShell.addChild(slugSnail)
		slugSnail.anchor.setTo(0.5, 0.5);
        slugSnail.scale.setTo(0.45, 0.45)

        slugShell.inputEnabled = true
        slugShell.events.onInputDown.add(chooseCharacterSlug, this)

         //Print image arcoiris
        var rainbowShell = game.add.button(game.world.centerX+400, game.world.centerY-80, 'roundBtn')
        rainbowShell.anchor.setTo(0.5, 0.5);
        rainbowShell.scale.setTo(0.6, 0.6)
        var rainbowSnail = game.add.image(0, -10, 'irisCol')
        rainbowShell.addChild(rainbowSnail)
		rainbowSnail.anchor.setTo(0.5, 0.5);
        rainbowSnail.scale.setTo(0.45, 0.45)

        rainbowShell.inputEnabled = true
        rainbowShell.events.onInputDown.add(chooseCharacterRainbow, this)

        for(var i = 0; i < game.global.owned.length; i++){
            switch (game.global.owned[i]){
                case ('NORMAL'):
                        normalShell.inputEnabled = true
                        normalShell.alpha = 1
                    break
                case ('TANK'):
                        tankShell.inputEnabled = true
                        tankShell.alpha = 1
                    break   
                case ('BAGUETTE'):
                        frenchShell.inputEnabled = true
                        frenchShell.alpha = 1
                    break    
                case ('MIAU'):
                        catShell.inputEnabled = true
                        catShell.alpha = 1
                    break    
                case ('MERCA'):
                        slugShell.inputEnabled = true
                        slugShell.alpha = 1
                    break     
                case ('SEA'):
                        seaShell.inputEnabled = true
                        seaShell.alpha = 1
                    break
                case ('ROBA'):
                        thiefShell.inputEnabled = true
                        thiefShell.alpha = 1
                    break
                case ('IRIS'):
                        rainbowShell.inputEnabled = true
                        rainbowShell.alpha = 1
                    break
                default:
                    console.log('snail sprite no identificado')
                    break    
            }
        }

        for(var i = 0; i < game.global.notOwned.length; i++){
            switch (game.global.notOwned[i]){
                case ('NORMAL'):
                        normalShell.inputEnabled = false
                        normalShell.alpha = 0.6
                    break
                case ('TANK'):
                        tankShell.inputEnabled = false
                        tankShell.alpha = 0.6
                    break   
                case ('BAGUETTE'):
                        frenchShell.inputEnabled = false
                        frenchShell.alpha = 0.6
                    break    
                case ('MIAU'):
                        catShell.inputEnabled = false
                        catShell.alpha = 0.6
                    break    
                case ('MERCA'):
                        slugShell.inputEnabled = false
                        slugShell.alpha = 0.6
                    break     
                case ('SEA'):
                        seaShell.inputEnabled = false
                        seaShell.alpha = 0.6
                    break
                case ('ROBA'):
                        thiefShell.inputEnabled = false
                        thiefShell.alpha = 0.6
                    break
                case ('IRIS'):
                        rainbowShell.inputEnabled = false
                        rainbowShell.alpha = 0.6
                    break
                default:
                    console.log('snail sprite no identificado')
                    break    
            }
        }

        function chooseCharacterSea (){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'seaCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'SEA'
        }
        
        function chooseCharacterThief(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'thiefCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'ROBA'
        }

        function chooseCharacterRainbow(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'irisCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'IRIS'
        }

        function chooseCharacterCat(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'catCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'MIAU'
        }

        function chooseCharacterFrench(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'frenchCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'BAGUETTE'
        }

        function chooseCharacterNormal(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'normalCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'NORMAL'
        }

        function chooseCharacterTank(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'tanqueCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'TANK'
        }

        function chooseCharacterSlug(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'slugCol')
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
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
    }
}