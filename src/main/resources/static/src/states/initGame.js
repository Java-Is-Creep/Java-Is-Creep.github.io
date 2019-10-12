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
        var style = {
			font : "100px Arial",
			fill : "#ffffff",
			align : "center"
		};     
		
		this.textButtonBack = game.add.text(game.world.centerX,
            game.world.centerY, 'Click anywhere to start', style)
		this.textButtonBack.anchor.set(0.5)
		this.textButtonBack.scale.setTo(0.5,0.5)
		
        this.game.input.onDown.add(itemTouched, this);

		// Pasa al state initSesion
        function itemTouched (){
			game.state.start('initSesionState')
		}
	},

	update : function() {}
}