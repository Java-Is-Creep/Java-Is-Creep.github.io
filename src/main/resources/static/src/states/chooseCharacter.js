Slooow.chooseCharacterState = function(game) {
    var stat1
    var stat2
    var stat3
    var stat4
    var stat5
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

        stat1 = [];
        stat2 = [];
        stat3 = [];
        stat4 = [];
        stat5 = [];

        //Print image chosen
        var chosenShell = game.add.image(game.world.centerX-380, game.world.centerY-170, 'roundBtn')
        chosenShell.anchor.setTo(0.5, 0.5);
        chosenShell.scale.setTo(0.95, 0.95)
        var statsBg = game.add.image(game.world.centerX-320, game.world.centerY+180, 'squareBtn')
        statsBg.anchor.setTo(0.5, 0.5);
        statsBg.scale.setTo(2.7, 1.6)
        var textName = game.add.text(game.world.centerX-320, game.world.centerY+50, "" , game.global.style)
        textName.anchor.set(0.5)
        textName.scale.setTo(0.7,0.7)

        textSpeed = game.add.text(game.world.centerX-540, game.world.centerY+90, game.global.activeLanguage.Speed , game.global.style)
        textSpeed.scale.setTo(0.5,0.5)

        textAc = game.add.text(game.world.centerX-540, game.world.centerY+130, game.global.activeLanguage.Ac , game.global.style)
        textAc.scale.setTo(0.5,0.5)

        textWeight = game.add.text(game.world.centerX-540, game.world.centerY+170, game.global.activeLanguage.Weight , game.global.style)
        textWeight.scale.setTo(0.5,0.5)

        textStamina = game.add.text(game.world.centerX-540, game.world.centerY+210, game.global.activeLanguage.Stamina , game.global.style)
        textStamina.scale.setTo(0.5,0.5)
        
        textRegen = game.add.text(game.world.centerX-540, game.world.centerY+250, game.global.activeLanguage.Regen , game.global.style)
        textRegen.scale.setTo(0.5,0.5)
        var chosen = null
        loadChosen()
		

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
                        normalShell.inputEnabled = true
                        normalShell.alpha = 0.6
                    break
                case ('TANK'):
                        tankShell.inputEnabled = true
                        tankShell.alpha = 0.6
                    break   
                case ('BAGUETTE'):
                        frenchShell.inputEnabled = true
                        frenchShell.alpha = 0.6
                    break    
                case ('MIAU'):
                        catShell.inputEnabled = true
                        catShell.alpha = 0.6
                    break    
                case ('MERCA'):
                        slugShell.inputEnabled = true
                        slugShell.alpha = 0.6
                    break     
                case ('SEA'):
                        seaShell.inputEnabled = true
                        seaShell.alpha = 0.6
                    break
                case ('ROBA'):
                        thiefShell.inputEnabled = true
                        thiefShell.alpha = 0.6
                    break
                case ('IRIS'):
                        rainbowShell.inputEnabled = true
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
            loadChosen()
        }
        
        function chooseCharacterThief(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'thiefCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'ROBA'
            loadChosen()
        }

        function chooseCharacterRainbow(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'irisCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'IRIS'
            loadChosen()
        }

        function chooseCharacterCat(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'catCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'MIAU'
            loadChosen()
        }

        function chooseCharacterFrench(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'frenchCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'BAGUETTE'
            loadChosen()
        }

        function chooseCharacterNormal(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'normalCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'NORMAL'
            loadChosen()
        }

        function chooseCharacterTank(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'tanqueCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'TANK'
            loadChosen()
        }

        function chooseCharacterSlug(){
            chosen.destroy()
            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'slugCol')
            chosen.anchor.setTo(0.5, 0.5);
            chosen.scale.setTo(0.4, 0.4)
            game.global.snailChosen = 'MERCA'
            loadChosen()
        }

        function actionOnClickBack(){
            if (game.global.gameMode == 'SOLO'){
                game.state.start('lobbyState')
            } else {
                game.state.start('lobbyMultiState')
            }
            
        }

        function actionOnClickOK(){
            game.state.start('lobbyState')
        }

        function loadChosen(){
            if (game.global.snailChosen != null){
            switch (game.global.snailChosen){
                case ('NORMAL'):
                    if(chosen == null){
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'normalCol')
                        chosen.anchor.setTo(0.5, 0.5);
                        chosen.scale.setTo(0.4, 0.4)
                    }   
                        textName.setText("Caralcol")
                        printStats(game.global.normalStats[4],game.global.normalStats[1],
                            game.global.normalStats[2],
                            game.global.normalStats[0],game.global.normalStats[3])
                        game.global.statStamina = game.global.normalStats[0]
                        game.global.statAc = game.global.normalStats[1]
                        game.global.statRegen = game.global.normalStats[3]
                        game.global.statWeight = game.global.normalStats[2]
                        game.global.statSpeed = game.global.normalStats[4]
                        
                    break
                case ('TANK'):
                    if(chosen == null){
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'tanqueCol')
                        chosen.anchor.setTo(0.5, 0.5);
                        chosen.scale.setTo(0.4, 0.4)
                    }                           
                        textName.setText("Panzer")
                        printStats(game.global.tankStats[4],game.global.tankStats[1],
                            game.global.tankStats[2],
                            game.global.tankStats[0],game.global.tankStats[3])
                        game.global.statStamina = game.global.tankStats[0]
                        game.global.statAc = game.global.tankStats[1]
                        game.global.statRegen = game.global.tankStats[3]
                        game.global.statWeight = game.global.tankStats[2]
                        game.global.statSpeed = game.global.tankStats[4]
                    break   
                case ('BAGUETTE'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'frenchCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        textName.setText("Baguette")
                        printStats(game.global.baguetteStats[4],game.global.baguetteStats[1],
                            game.global.baguetteStats[2],
                            game.global.baguetteStats[0],game.global.baguetteStats[3])
                        game.global.statStamina = game.global.baguetteStats[0]
                        game.global.statAc = game.global.baguetteStats[1]
                        game.global.statRegen = game.global.baguetteStats[3]
                        game.global.statWeight = game.global.baguetteStats[2]
                        game.global.statSpeed = game.global.baguetteStats[4]
                    break    
                case ('MIAU'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'catCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Schrodinger")
                        printStats(game.global.miauStats[4],game.global.miauStats[1],
                            game.global.miauStats[2],
                            game.global.miauStats[0],game.global.miauStats[3])
                        game.global.statStamina = game.global.miauStats[0]
                        game.global.statAc = game.global.miauStats[1]
                        game.global.statRegen = game.global.miauStats[3]
                        game.global.statWeight = game.global.miauStats[2]
                        game.global.statSpeed = game.global.miauStats[4]
                    break    
                case ('MERCA'):
                         if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'slugCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        }                         
                        textName.setText("Jabba el Creep")
                        printStats(game.global.mercaStats[4],game.global.mercaStats[1],
                            game.global.mercaStats[2],
                            game.global.mercaStats[0],game.global.mercaStats[3])
                        game.global.statStamina = game.global.mercaStats[0]
                        game.global.statAc = game.global.mercaStats[1]
                        game.global.statRegen = game.global.mercaStats[3]
                        game.global.statWeight = game.global.mercaStats[2]
                        game.global.statSpeed = game.global.mercaStats[4]
                    break     
                case ('SEA'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'seaCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Maricol")
                        printStats(game.global.seaStats[4],game.global.seaStats[1],
                            game.global.seaStats[2],
                            game.global.seaStats[0],game.global.seaStats[3])
                        game.global.statStamina = game.global.seaStats[0]
                        game.global.statAc = game.global.seaStats[1]
                        game.global.statRegen = game.global.seaStats[3]
                        game.global.statWeight = game.global.seaStats[2]
                        game.global.statSpeed = game.global.seaStats[4]
                    break
                case ('ROBA'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'thiefCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Bárcenas")
                        printStats(game.global.robaStats[4],game.global.robaStats[1],
                            game.global.robaStats[2],
                            game.global.robaStats[0],game.global.robaStats[3])
                        game.global.statStamina = game.global.robaStats[0]
                        game.global.statAc = game.global.robaStats[1]
                        game.global.statRegen = game.global.robaStats[3]
                        game.global.statWeight = game.global.robaStats[2]
                        game.global.statSpeed = game.global.robaStats[4]
                    break
                case ('IRIS'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'irisCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Iris")
                        printStats(game.global.irisStats[4],game.global.irisStats[1],
                            game.global.irisStats[2],game.global.irisStats[0],
                            game.global.irisStats[3])
                        game.global.statStamina = game.global.irisStats[0]
                        game.global.statAc = game.global.irisStats[1]
                        game.global.statRegen = game.global.irisStats[3]
                        game.global.statWeight = game.global.irisStats[2]
                        game.global.statSpeed = game.global.irisStats[4]
                    break
                default:
                    console.log('snail sprite no identificado')
                    break    
            }
            
        }

        }

        function printStats(speed, ac, weight, stamina, regen){
            
            for (var i = 0; i < stat1.length; i++){
                stat1[i].destroy();
            }
            for (var i = 0; i < stat2.length; i++){
                stat2[i].destroy();
            }
            for (var i = 0; i < stat3.length; i++){
                stat3[i].destroy();
            }
            for (var i = 0; i < stat4.length; i++){
                stat4[i].destroy();
            }
            for (var i = 0; i < stat5.length; i++){
                stat5[i].destroy();
            }
            
            
            var offset = 0;
            for (var i = 0; i < speed; i++){
                stat1[i] = game.add.image(game.world.centerX-360 + parseInt(offset), game.world.centerY + 100, 'statBtn')
                stat1[i].anchor.set(0.5)
                stat1[i].scale.setTo(0.1,0.1)
                offset +=50
                
            }
            var offset = 0;  
            for (var i = 0; i < ac; i++){
                stat2[i] = game.add.image(game.world.centerX-360 + parseInt(offset), game.world.centerY + 140, 'statBtn')
                stat2[i].anchor.set(0.5)
                stat2[i].scale.setTo(0.1,0.1)
                offset +=50
                
            }
            var offset = 0;   
            for (var i = 0; i < weight; i++){
                stat3[i] = game.add.image(game.world.centerX-360 + parseInt(offset), game.world.centerY + 180, 'statBtn')
                stat3[i].anchor.set(0.5)
                stat3[i].scale.setTo(0.1,0.1)
                offset +=50

            }
            var offset = 0;   
            for (var i = 0; i < stamina; i++){
                stat4[i] = game.add.image(game.world.centerX-360 + parseInt(offset), game.world.centerY + 220, 'statBtn')
                stat4[i].anchor.set(0.5)
                stat4[i].scale.setTo(0.1,0.1)
                offset +=50

            }  
            var offset = 0; 
            for (var i = 0; i < regen; i++){
                stat5[i] = game.add.image(game.world.centerX-360 + parseInt(offset), game.world.centerY + 260, 'statBtn')
                stat5[i].anchor.set(0.5)
                stat5[i].scale.setTo(0.1,0.1)
                offset +=50
                
            } 
            
            }
    },

    update : function() {
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
    }
}