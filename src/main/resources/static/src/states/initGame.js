Slooow.initGameState = function(game) {
}

Slooow.initGameState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **INITGAME** state");
		}
	},

	preload : function() {
        // Cargamos el Background Global y lo actualizamos al tamaño de la pantalla
		this.background = game.add.image(game.world.centerX, game.world.centerY, 'background')
        this.background.height = this.game.height;
	    this.background.width = this.game.width;
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

	update : function() {}
}