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
            game.world.centerY + 40, 'button')
        bgChange.anchor.set(0.5)
        bgChange.scale.setTo(2.2, 2.5)
        
        //btn shell1
        btnShell1 = game.add.button(game.world.centerX ,
            game.world.centerY + 40, 'button')
            
        function actionOnClickBack(){
            game.state.start('shopState')
        }
    },

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update : function() {
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
		
	}
}