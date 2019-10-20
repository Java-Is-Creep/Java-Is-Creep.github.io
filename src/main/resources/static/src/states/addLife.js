Slooow.addLifeState = function(game) {
}

Slooow.addLifeState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOBBY** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
	},

	preload : function() {
        //Background
        /*
        this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
        this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)*/
        this.background = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'backgroundMenu')
		this.background.tileScale.set(0.4, 0.4)
        this.background.anchor.set(0.5, 0.5)
	},

	create : function() {

        //bg resumen
        //Boton Fondo 
        bgAdd = game.add.image(game.world.centerX , game.world.centerY , 'button')
        bgAdd.anchor.set(0.5, 0.5)
        bgAdd.scale.setTo(2, 2.5)

        addImg = game.add.image(game.world.centerX , game.world.centerY , 'add')
        addImg.anchor.set(0.5, 0.5)
        addImg.scale.setTo(.5, .5)
        //Boton crear cuenta
        btnBack = game.add.button(game.world.centerX ,
            game.world.centerY + 240, 'button', back, this,
            0, 0, 0)
        btnBack.anchor.set(0.5)
        btnBack.scale.setTo(0.65, 0.65)
        //Texto boton crear cuenta
        tBack = game.add.text(game.world.centerX ,
            game.world.centerY + 240, game.global.activeLanguage.Back, game.global.style)
        tBack.anchor.set(0.5)
        tBack.scale.setTo(1, 1)

        function back(){
            game.state.start('mainMenuState')
        }

	},

	update : function() {
			
		this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
	}
}