Slooow.buySnail = function(game) {
}

Slooow.buySnail.prototype = {

    init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **LOBBY** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
	},

	preload : function() {
        this.background = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'backgroundMenu')
		this.background.tileScale.set(0.4, 0.4)
        this.background.anchor.set(0.5, 0.5)
	},

	create : function() {

	},

	update : function() {
			
		this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
	}
}