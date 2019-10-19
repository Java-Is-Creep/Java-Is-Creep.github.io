Slooow.buyShellsState = function (game) {

}

Slooow.buyShellsState.prototype = {

	init: function () {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **TROPHIES** state");
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

        //Boton shells
		buttonShells = game.add.image(game.world.centerX ,
            60, 'button')
        buttonShells.anchor.set(0.5)
        buttonShells.scale.setTo(0.7, 0.5)

        //Img shells
        moneyShell = game.add.image(game.world.centerX - 60,
           60, 'moneyShell')
        moneyShell.anchor.set(0.5)
        moneyShell.scale.setTo(0.4,0.4)

        //Text shells
        if (game.global.money == null){
            game.global.money = 0;
        }
        textMoneyShells = game.add.text(game.world.centerX + 50,
            60, game.global.money, game.global.style)
        textMoneyShells.anchor.set(0.5)
        textMoneyShells.scale.setTo(0.6,0.6)

        //Bg cambio divisas
        bgChange = game.add.image(game.world.centerX ,
            game.world.centerY + 50, 'button')
        bgChange.anchor.set(0.5)
        bgChange.scale.setTo(2.2, 2.7)
        
        //btn shell1
        btnShell1 = game.add.button(game.world.centerX ,
            game.world.centerY-110, 'button', buy1, this,
            0, 0, 0)
        btnShell1.anchor.set(0.5)
        btnShell1.scale.setTo(1.2, 0.5)
        //Img shells
        moneyShell1 = game.add.image(game.world.centerX + 130,
           game.world.centerY-110, 'moneyShell')
        moneyShell1.anchor.set(0.5)
        moneyShell1.scale.setTo(0.4,0.4)
        tMoneyShells1 = game.add.text(game.world.centerX - 130,
            game.world.centerY-110, "2.99 €", game.global.style)
        tMoneyShells1.anchor.set(0.5)
        tMoneyShells1.scale.setTo(1,1)
        tSlash = game.add.text(game.world.centerX - 45,
            game.world.centerY-110, "/" , game.global.style)
        tSlash.anchor.set(0.5)
        tSlash.scale.setTo(1,1)
        tShells1 = game.add.text(game.world.centerX - 20 ,
            game.world.centerY-110, "120" , game.global.style)
        tShells1.anchor.set(0, 0.5)
        tShells1.scale.setTo(1,1)

        btnShell2 = game.add.button(game.world.centerX ,
            game.world.centerY, 'button')
        btnShell2.anchor.set(0.5)
        btnShell2.scale.setTo(1.2, 0.5)
        //Img shells
        moneyShell2 = game.add.image(game.world.centerX + 130,
           game.world.centerY, 'moneyShell')
        moneyShell2.anchor.set(0.5)
        moneyShell2.scale.setTo(0.4,0.4)
        tMoneyShells2 = game.add.text(game.world.centerX - 130,
            game.world.centerY, "5.99 €", game.global.style)
        tMoneyShells2.anchor.set(0.5)
        tMoneyShells2.scale.setTo(1,1)
        tSlash2 = game.add.text(game.world.centerX - 45,
            game.world.centerY, "/" , game.global.style)
        tSlash2.anchor.set(0.5)
        tSlash2.scale.setTo(1,1)
        tShells2 = game.add.text(game.world.centerX - 20 ,
            game.world.centerY, "250" , game.global.style)
        tShells2.anchor.set(0, 0.5)
        tShells2.scale.setTo(1,1)

        btnShell3 = game.add.button(game.world.centerX ,
            game.world.centerY+110, 'button')
        btnShell3.anchor.set(0.5)
        btnShell3.scale.setTo(1.2, 0.5)
        //Img shells
        moneyShell3 = game.add.image(game.world.centerX + 130,
           game.world.centerY+110, 'moneyShell')
        moneyShell3.anchor.set(0.5)
        moneyShell3.scale.setTo(0.4,0.4)
        tMoneyShells3 = game.add.text(game.world.centerX - 130,
            game.world.centerY+110, "10.99 €", game.global.style)
        tMoneyShells3.anchor.set(0.5)
        tMoneyShells3.scale.setTo(1,1)
        tSlash3 = game.add.text(game.world.centerX - 45,
            game.world.centerY+110, "/" , game.global.style)
        tSlash3.anchor.set(0.5)
        tSlash3.scale.setTo(1,1)
        tShells3 = game.add.text(game.world.centerX - 20 ,
            game.world.centerY+110, "520" , game.global.style)
        tShells3.anchor.set(0, 0.5)
        tShells3.scale.setTo(1,1)

        btnShell4 = game.add.button(game.world.centerX ,
            game.world.centerY+220, 'button')
        btnShell4.anchor.set(0.5)
        btnShell4.scale.setTo(1.2, 0.5)
        //Img shells
        moneyShell4 = game.add.image(game.world.centerX + 130,
           game.world.centerY+220, 'moneyShell')
        moneyShell4.anchor.set(0.5)
        moneyShell4.scale.setTo(0.4,0.4)
        tMoneyShells4 = game.add.text(game.world.centerX - 130,
            game.world.centerY+220, "20.99 €", game.global.style)
        tMoneyShells4.anchor.set(0.5)
        tMoneyShells4.scale.setTo(1,1)
        tSlash4 = game.add.text(game.world.centerX - 45,
            game.world.centerY+220, "/" , game.global.style)
        tSlash4.anchor.set(0.5)
        tSlash4.scale.setTo(1,1)
        tShells4 = game.add.text(game.world.centerX - 20 ,
            game.world.centerY+220, "1050" , game.global.style)
        tShells4.anchor.set(0, 0.5)
        tShells4.scale.setTo(1,1)


        //Pop up confirm
        bgPopUp = game.add.image(game.world.centerX ,
            game.world.centerY, 'squareBtn')
        bgPopUp.anchor.set(0.5)
        bgPopUp.scale.setTo(3, 3)
        bgPopUp.alpha = 0;

        tPopUp = game.add.text(game.world.centerX,
            game.world.centerY - 120, game.global.activeLanguage.Sure, game.global.style)
        tPopUp.anchor.set(0.5)
        tPopUp.scale.setTo(1,1)
        tPopUp.alpha = 0

        btnYes = game.add.button(game.world.centerX ,
            game.world.centerY+220, 'button')
        btnYes.anchor.set(0.5)
        btnYes.scale.setTo(1.2, 0.5)
        btnYes.alpha = 0
        tYes = game.add.text(game.world.centerX,
            game.world.centerY - 120, game.global.activeLanguage.Sure, game.global.style)
        tYes.anchor.set(0.5)
        tYes.scale.setTo(1,1)
        tYes.alpha = 0

        btnNo = game.add.button(game.world.centerX ,
            game.world.centerY+220, 'button')
        btnNo.anchor.set(0.5)
        btnNo.scale.setTo(1.2, 0.5)
        btnNo.alpha = 0
        tNo = game.add.text(game.world.centerX,
            game.world.centerY - 120, game.global.activeLanguage.Sure, game.global.style)
        tNo.anchor.set(0.5)
        tNo.scale.setTo(1,1)
        tNo.alpha = 0

        function actionOnClickBack(){
            game.state.start('shopState')
        }

        function buy1(){
            bgPopUp.alpha = 1;
            tPopUp.alpha = 1;
        }

        function buy2(){

        }

        function buy3(){

        }

        function buy4(){

        }
    },

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update : function() {
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
		
	}
}