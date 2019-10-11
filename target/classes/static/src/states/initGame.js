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
		this.background = game.add.sprite(game.world.centerX, game.world.centerY, 'background')
        //this.background.height = this.game.height;
	    //this.background.width = this.game.width;
        this.background.anchor.set(0.5, 0.5)

		/*this.background = this.add.image(0, 0, "background");
        this.background.height = this.game.height;
        this.background.width = this.game.width;
		
        this.title = this.game.add.image(this.world.centerX, this.world.centerY - this.game.height / 3, "catSnail");
        this.title.anchor.setTo(0.5);
		this.scaleSprite(this.title, this.game.width, this.game.height / 3, 50, 1);*/
		
        var style = {
			font : "100px Arial",
			fill : "#ffffff",
			align : "center"
		};
		
        this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]);        
		
        //Texto desconectar
		this.textButtonBack = game.add.text(game.world.centerX,
            game.world.centerY, 'Click anywhere to start', style)
		this.textButtonBack.anchor.set(0.5)
		this.textButtonBack.scale.setTo(0.5,0.5)
		
        this.game.input.onDown.add(itemTouched, this);

        function itemTouched (){
			game.state.start('initSesionState')
		}

		this.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		game.input.keyboard.addKeyCapture([Phaser.Keyboard.W]); 
	},

	/*scaleSprite: function (sprite, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
		console.dir (sprite)
		var scale = this.getSpriteScale(sprite._frame.width, sprite._frame.height, availableSpaceWidth, availableSpaceHeight, padding);
		sprite.scale.x = scale * scaleMultiplier;
		sprite.scale.y = scale * scaleMultiplier;
	},
	getSpriteScale: function (spriteWidth, spriteHeight, availableSpaceWidth, availableSpaceHeight, minPadding) {
		var ratio = 1;
		var currentDevicePixelRatio = window.devicePixelRatio;
		// Sprite needs to fit in either width or height
		var widthRatio = (spriteWidth * currentDevicePixelRatio + 2 * minPadding) / availableSpaceWidth;
		var heightRatio = (spriteHeight * currentDevicePixelRatio + 2 * minPadding) / availableSpaceHeight;
		if(widthRatio > 1 || heightRatio > 1){
			ratio = 1 / Math.max(widthRatio, heightRatio);
		} 
		return ratio * currentDevicePixelRatio;	
	},
	resize: function (width, height) {
		this.background.height = height;
		this.background.width = width;
 
		this.scaleSprite(this.title, width, height / 3, 50, 1);
		this.title.x = this.world.centerX;
		this.title.y = this.world.centerY - height / 3;
 
		this.scaleSprite(this.playButton, width, height / 3, 50, 1);
		this.playButton.x = this.world.centerX;
		this.playButton.y = this.world.centerY ;
 
		this.scaleSprite(this.infoButton, width, height / 3, 50, 0.5);
		this.infoButton.x = this.world.centerX - this.infoButton.width / 2;
		this.infoButton.y = this.world.centerY + height / 3;
 
		this.scaleSprite(this.audioButton, width, height / 3, 50, 0.5);
		this.audioButton.x = this.world.centerX + this.audioButton.width / 2;
		this.audioButton.y = this.world.centerY + height / 3;
 
	},*/

	update : function() {

	}
}