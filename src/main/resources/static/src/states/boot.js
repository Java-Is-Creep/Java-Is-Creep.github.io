var Slooow = {}

Slooow.Params = {
	baseWidth: 1280,
	baseHeight: 720,
	minPadding: 0,
	horizontalMargin: 0,
	verticalMargin: 0
};

Slooow.bootState = function (game) {}

Slooow.bootState.prototype = {

	// Solo calculos de pantalla, pero se puede meter animacion para cargar los assets

	// Solo se ejecuta una vez, se pasa a preload (funcion), las funciones se van a guardar en un mapa (global)
	init: function () {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BOOT** state");
		}
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
	},

	preload: function () {
		this.game.add.plugin(PhaserInput.Plugin)
		this.game.renderer.renderSession.roundPixels = true
		this.time.desiredFps = game.global.FPS
	},

	create: function () {
		
	},

	// Se ejecuta siempre hasta que se consigue conexion, en ese caso, pasa a preload (escena)
	update : function() {
		//if (typeof game.global.socket !== 'undefined') {
		game.state.start('preloadState')
		//}
	}
}