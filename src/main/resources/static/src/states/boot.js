var Slooow = {}

Slooow.bootState = function (game) {

}

Slooow.bootState.prototype = {

	// Solo calculos de pantalla, pero se puede meter animacion para cargar los assets

	// Solo se ejecuta una vez, se pasa a preload (funcion), las funciones se van a guardar en un mapa (global)
	init: function () {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BOOT** state");
		}
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