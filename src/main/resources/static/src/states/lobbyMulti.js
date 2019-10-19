Slooow.lobbyMultiState = function (game) {

}

Slooow.lobbyMultiState.prototype = {

	init: function () {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOBBYMULTI** state");
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
        textButtonBack.scale.setTo(0.5,0.5)

        //Boton listo 
        buttonOK = game.add.button(game.world.centerX +350,
            game.world.centerY +250, 'button', actionOnClickOK, this,
            0, 0, 0)
        buttonOK.anchor.set(0.5)
        buttonOK.scale.setTo(0.2, 0.3)
        //Texto listo
        textButtonOK = game.add.text(game.world.centerX +350,
            game.world.centerY +250, game.global.activeLanguage.Accept, game.global.style)
        textButtonOK.anchor.set(0.5)
        textButtonOK.scale.setTo(0.5,0.5)

        
        var chosenShell = game.add.image(game.world.centerX-380, game.world.centerY-170, 'roundBtn')
        chosenShell.anchor.setTo(0.5, 0.5);
        chosenShell.scale.setTo(0.95, 0.95)

        //Print image snail
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
		
        chosen.inputEnabled = true
        chosen.events.onInputDown.add(chooseCharacter, this)
        
        //Texto datos sala
		textLobbyData = game.add.text(game.world.centerX -400,
            game.world.centerY -50, game.global.activeLanguage.LobbyData, game.global.style)
        textLobbyData.anchor.set(0.5)
        textLobbyData.scale.setTo(0.5,0.5)

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
                        printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
                    break
                case ('TANK'):
                    if(chosen == null){
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'tanqueCol')
                        chosen.anchor.setTo(0.5, 0.5);
                        chosen.scale.setTo(0.4, 0.4)
                    }                           
                        textName.setText("Panzer")
                        printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
                    break   
                case ('BAGUETTE'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'frenchCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        textName.setText("Baguette")
                        printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
                    break    
                case ('MIAU'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'catCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Schrodinger")
                       printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
                    break    
                case ('MERCA'):
                         if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'slugCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        
                        textName.setText("Jabba el Creep")
                        printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
                    break     
                case ('SEA'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'seaCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Maricol")
                        printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
                    break
                case ('ROBA'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'thiefCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Bárcenas")
                        printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
                    break
                case ('IRIS'):
                        if(chosen == null){
                            chosen = game.add.image(game.world.centerX-380, game.world.centerY-170, 'irisCol')
                            chosen.anchor.setTo(0.5, 0.5);
                            chosen.scale.setTo(0.4, 0.4)
                        } 
                        
                        textName.setText("Iris")
                        printStats(game.global.statSpeed,game.global.statAc,
                            game.global.statWeight,
                            game.global.statStamina,game.global.statRegen)
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


        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }
        function actionOnClickOK(){
            buttonBack.inputEnabled = false
            buttonBack.alpha = 0.6
            textButtonBack.alpha = 0.6

            buttonOK.inputEnabled = false
            buttonOK.alpha = 0.6
            textButtonOK.alpha = 0.6

            let msg = {
                event: 'CHOOSESNAIL',
                chooseSnail: 'NORMAL'
            }
            game.global.socket.send(JSON.stringify(msg))
            console.log(this.game.global.roomNameMulti)
            let msg2 = {
                event: 'MULTIPLAYER',
                roomName : this.game.global.roomNameMulti
            }
            game.global.socket.send(JSON.stringify(msg2))
            console.log('chooseSnail y multiplayer mandados')
        }

        function chooseCharacter(){
            let msg3 = {
                event: 'CHOOSECHARSNAIL'
            }
            game.global.socket.send(JSON.stringify(msg3))
        }
    },

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update : function() {
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
		
	}
}