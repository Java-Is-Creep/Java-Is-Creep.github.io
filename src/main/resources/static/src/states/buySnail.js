Slooow.buySnailState = function(game) {
}

Slooow.buySnailState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOBBY** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
	},

	preload : function() {
        
	},

	create : function() {
        this.background = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'backgroundMenu')
		this.background.tileScale.set(0.4, 0.4)
        this.background.anchor.set(0.5, 0.5)

        var chosenShell = game.add.image(game.world.centerX-380, game.world.centerY-110, 'roundBtn')
        chosenShell.anchor.setTo(0.5, 0.5);
        chosenShell.scale.setTo(1.3, 1.3)
        var chosen
        switch (game.global.snailToBuy){
                case ('NORMAL'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'normalCol')
                    break
                case ('TANK'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'tanqueCol')
                    break   
                case ('BAGUETTE'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'frenchCol')
                    break    
                case ('MIAU'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'catCol')
                    break    
                case ('MERCA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'slugCol')
                    break     
                case ('SEA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'seaCol')
                    break
                case ('ROBA'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'thiefCol')
                    break
                case ('IRIS'):
                        chosen = game.add.image(game.world.centerX-380, game.world.centerY-110, 'irisCol')
                    break
                default:
                    console.log('snail sprite no identificado')
                    break    
            }
        chosen.anchor.setTo(0.5, 0.5);
        chosen.scale.setTo(0.5, 0.5)

        //Stats bg
        var statsBg = game.add.image(game.world.centerX+200, game.world.centerY-70, 'squareBtn')
        statsBg.anchor.setTo(0.5, 0.5);
        statsBg.scale.setTo(2.8, 1.7)
        switch (game.global.snailToBuy){
                case ('NORMAL'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Caralcol" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break
                case ('TANK'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Panzer" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break   
                case ('BAGUETTE'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Baguette" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break    
                case ('MIAU'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Schoringer" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break    
                case ('MERCA'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Jabba el Creep" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break     
                case ('SEA'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Maricol" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break
                case ('ROBA'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Bárcenas" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break
                case ('IRIS'):
                        textName = game.add.text(game.world.centerX+200, game.world.centerY-200, "Iris" , game.global.style)
                        textName.anchor.set(0.5)
                        textName.scale.setTo(0.7,0.7)

                        textSpeed = game.add.text(game.world.centerX-20, game.world.centerY-160, game.global.activeLanguage.Speed , game.global.style)
                        textSpeed.scale.setTo(0.5,0.5)

                        textAc = game.add.text(game.world.centerX-20, game.world.centerY-120, game.global.activeLanguage.Ac , game.global.style)
                        textAc.scale.setTo(0.5,0.5)

                        textWeight = game.add.text(game.world.centerX-20, game.world.centerY-80, game.global.activeLanguage.Weight , game.global.style)
                        textWeight.scale.setTo(0.5,0.5)

                        textStamina = game.add.text(game.world.centerX-20, game.world.centerY-40, game.global.activeLanguage.Stamina , game.global.style)
                        textStamina.scale.setTo(0.5,0.5)
                        
                        textRegen = game.add.text(game.world.centerX-20, game.world.centerY, game.global.activeLanguage.Regen , game.global.style)
                        textRegen.scale.setTo(0.5,0.5)
                    break
                default:
                    console.log('snail sprite no identificado')
                    break 
                  
            }  
        var offset = 0;
        for (var i = 0; i < game.global.statSpeed; i++){
            stat1 = game.add.image(game.world.centerX + 160 + parseInt(offset), game.world.centerY - 150, 'statBtn')
            stat1.anchor.set(0.5)
            stat1.scale.setTo(0.1,0.1)
            offset +=50
            
        }
        offset = 0;  
        for (var i = 0; i < game.global.statAc; i++){
            stat2 = game.add.image(game.world.centerX + 160 + parseInt(offset), game.world.centerY - 110, 'statBtn')
            stat2.anchor.set(0.5)
            stat2.scale.setTo(0.1,0.1)
            offset +=50
            
        }
        offset = 0;   
        for (var i = 0; i < game.global.statWeight; i++){
            stat3 = game.add.image(game.world.centerX + 160 + parseInt(offset), game.world.centerY - 70, 'statBtn')
            stat3.anchor.set(0.5)
            stat3.scale.setTo(0.1,0.1)
            offset +=50

        }
        offset = 0;   
        for (var i = 0; i < game.global.statStamina; i++){
            stat4 = game.add.image(game.world.centerX + 160 + parseInt(offset), game.world.centerY - 30, 'statBtn')
            stat4.anchor.set(0.5)
            stat4.scale.setTo(0.1,0.1)
            offset +=50

        }  
        offset = 0; 
        for (var i = 0; i < game.global.statRegen; i++){
            stat5 = game.add.image(game.world.centerX + 160 + parseInt(offset), game.world.centerY +10, 'statBtn')
            stat5.anchor.set(0.5)
            stat5.scale.setTo(0.1,0.1)
            offset +=50
            
        } 
        offset = 0;   
        

        //Boton back
		buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)

        //Texto back
		textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back, game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Boton shells
		buttonShells = game.add.image(game.world.centerX + 240,
            40, 'button')
        buttonShells.anchor.set(0.5)
        buttonShells.scale.setTo(0.5, 0.3)

        //Img shells
        moneyShell = game.add.image(game.world.centerX + 180,
            40, 'moneyShell')
        moneyShell.anchor.set(0.5)
        moneyShell.scale.setTo(0.25,0.25)

        //Text shells
        if (game.global.money == null){
            game.global.money = 0;
        }
        textMoneyShells = game.add.text(game.world.centerX + 260,
            40, game.global.money, game.global.style)
        textMoneyShells.anchor.set(0.5)
        textMoneyShells.scale.setTo(0.5,0.5)

        //Boton baba
		buttonBaba = game.add.image(game.world.centerX,
            40, 'button')
        buttonBaba.anchor.set(0.5)
        buttonBaba.scale.setTo(0.5, 0.3)
        
        //Img baba
        moneyBaba = game.add.image(game.world.centerX - 60,
            40, 'moneyBaba')
        moneyBaba.anchor.set(0.5)
        moneyBaba.scale.setTo(0.3,0.3)

        //Text baba
        if (game.global.points == null){
            game.global.points = 0;
        }
        textMoneyBaba = game.add.text(game.world.centerX+20,
            40, game.global.points, game.global.style)
        textMoneyBaba.anchor.set(0.5)
        textMoneyBaba.scale.setTo(0.5,0.5)

        function actionOnClickBack(){
            game.state.start('shopState')
        }
	},

	update : function() {
			
		this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
	}
}