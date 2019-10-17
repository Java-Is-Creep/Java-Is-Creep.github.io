Slooow.initGameState = function(game) {
}

Slooow.initGameState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **INITGAME** state");
		}
		game.world.setBounds(0, 0, 1280, 720);
	},

	preload : function() {
        // Cargamos el Background Global y lo actualizamos al tamaño de la pantalla
		//this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
		this.background = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'backgroundMenu')
        //this.background.height = this.game.height;
        //this.background.width = this.game.width;
        //Tints chulos:  1653685.9351650865
        //               10799539.640765665
        //               4535760.527128731   
        //this.background.tint = Math.random() * 0xffffff;
		console.log(this.background.tint)
		this.background.tileScale.set(0.4, 0.4)
        this.background.anchor.set(0.5, 0.5)
	},

	create : function() {
		// Texto inicial en el centro de la pantalla
		continueBtn = game.add.button(game.world.centerX,
            game.world.centerY, 'playBtn', itemTouched, this,
            0, 0, 0)
		continueBtn.anchor.set(0.5)
		continueBtn.scale.setTo(1,1)
		

		// Pasa al state initSesion
        function itemTouched (){
			game.state.start('initSesionState')
		}
	},

	update : function() {

		this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5

	}
}