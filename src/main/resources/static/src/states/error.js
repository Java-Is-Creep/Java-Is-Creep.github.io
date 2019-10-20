Slooow.errorState = function(game) {
}

Slooow.errorState.prototype = {

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
        bgEnd = game.add.button(game.world.centerX,
            game.world.centerY-100, 'button', null, this,
            0, 0, 0)
        bgEnd.anchor.set(0.5)
        bgEnd.angle = 270
        bgEnd.scale.setTo(1.1, 2.9)

        //Texto time
		textTime = game.add.text(game.world.centerX,
            game.world.centerY - 100, game.global.activeLanguage.LostCon, game.global.style)
        textTime.scale.setTo(0.7,0.7)
        textTime.anchor.set(0.5)

	},

	update : function() {
			
		this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
	}
}