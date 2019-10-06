Slooow.initGameState = function(game) {
}

Slooow.initGameState.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **INITGAME** state");
		}
	},

	preload : function() {
		
	},

	create : function() {
        //Background
        var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)

        var style = {
			font : "100px Arial",
			fill : "#ffffff",
			align : "center"
		};

        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);        

        //Texto desconectar
		textButtonBack = game.add.text(game.world.centerX,
            game.world.centerY, 'Click anywhere to start', style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        this.game.input.onDown.add(itemTouched, this);

        function itemTouched (){
			game.state.start('initSesionState')
        }
	},

	update : function() {
			
		if (this.wKey.isDown) {
			game.state.start('initSesionState')
		}
	}
}