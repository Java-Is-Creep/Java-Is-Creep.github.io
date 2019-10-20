Slooow.trophiesState = function (game) {

}

Slooow.trophiesState.prototype = {

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

        conseguido = []

        for (var i = 0; i< game.global.trophiesPlayer.length; i++){
            if (game.global.trophiesPlayer[i] == true){
                conseguido[i] = game.global.activeLanguage.Conseguido
            } else {
                conseguido[i] = game.global.activeLanguage.NoConseguido
            }
        }

        //Boton 1 
        button1 = game.add.image(game.world.centerX,game.world.centerY-250, 'button')
        button1.anchor.set(0.5)
        button1.scale.setTo(2, 0.3)
        //Texto 1
        textButton1 = game.add.text(game.world.centerX,
            game.world.centerY -250, game.global.activeLanguage.Troph1 + " --> " + conseguido[0], game.global.style)
        textButton1.anchor.set(0.5)
        textButton1.scale.setTo(0.5,0.5)

        //Boton 2 
        button2 = game.add.image(game.world.centerX,game.world.centerY-180, 'button')
        button2.anchor.set(0.5)
        button2.scale.setTo(2, 0.3)
        //Texto 2
        textButton2 = game.add.text(game.world.centerX,
            game.world.centerY-180, game.global.activeLanguage.Troph2 +" --> " + conseguido[1], game.global.style)
        textButton2.anchor.set(0.5)
        textButton2.scale.setTo(0.5,0.5)

        //Boton 3 
        button3 = game.add.image(game.world.centerX,game.world.centerY-110, 'button')
        button3.anchor.set(0.5)
        button3.scale.setTo(2, 0.3)
        //Texto 3
        textButton3 = game.add.text(game.world.centerX,
            game.world.centerY-110, game.global.activeLanguage.Troph3+ " --> " + conseguido[2], game.global.style)
        textButton3.anchor.set(0.5)
        textButton3.scale.setTo(0.5,0.5)

        //Boton 4 
        button4 = game.add.image(game.world.centerX,game.world.centerY-40, 'button')
        button4.anchor.set(0.5)
        button4.scale.setTo(2, 0.3)
        //Texto 4
        textButton4 = game.add.text(game.world.centerX,
            game.world.centerY-40, game.global.activeLanguage.Troph4 +" --> " + conseguido[3], game.global.style)
        textButton4.anchor.set(0.5)
        textButton4.scale.setTo(0.5,0.5)

        //Boton 5 
        button5 = game.add.image(game.world.centerX,game.world.centerY+30, 'button')
        button5.anchor.set(0.5)
        button5.scale.setTo(2, 0.3)
        //Texto 5
        textButton5 = game.add.text(game.world.centerX,
            game.world.centerY+30, game.global.activeLanguage.Troph5 +" --> " + conseguido[4], game.global.style)
        textButton5.anchor.set(0.5)
        textButton5.scale.setTo(0.5,0.5)

        //Boton 6 
        button6 = game.add.image(game.world.centerX,game.world.centerY+100, 'button')
        button6.anchor.set(0.5)
        button6.scale.setTo(2, 0.3)
        //Texto 6
        textButton6 = game.add.text(game.world.centerX,
            game.world.centerY+100, game.global.activeLanguage.Troph6 +" --> " + conseguido[5], game.global.style)
        textButton6.anchor.set(0.5)
        textButton6.scale.setTo(0.5,0.5)

        //Boton 7 
        button7 = game.add.image(game.world.centerX,game.world.centerY+170, 'button')
        button7.anchor.set(0.5)
        button7.scale.setTo(2, 0.3)
        //Texto 7
        textButton7 = game.add.text(game.world.centerX,
            game.world.centerY+170, game.global.activeLanguage.Troph7 +" --> " + conseguido[6], game.global.style)
        textButton7.anchor.set(0.5)
        textButton7.scale.setTo(0.5,0.5)

        //Boton 8 
        button8 = game.add.image(game.world.centerX,game.world.centerY+240, 'button')
        button8.anchor.set(0.5)
        button8.scale.setTo(2, 0.3)
        //Texto 8
        textButton8 = game.add.text(game.world.centerX,
            game.world.centerY+240, game.global.activeLanguage.Troph8 +" --> " + conseguido[7], game.global.style)
        textButton8.anchor.set(0.5)
        textButton8.scale.setTo(0.5,0.5)

        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }
    },

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update : function() {
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
		
	}
}