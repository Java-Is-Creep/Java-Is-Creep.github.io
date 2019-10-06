Slooow.preloadState = function(game) {

}

Slooow.preloadState.prototype = {

	// Se añaden las imagenes de carga. Si tarda demasiado, habria que hacer una
	// pantalla de carga en el boot
	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** state");
		}
	},

	// Hasta que este preload no acabe, no se pasa al siguiente estado
	preload : function() {
		game.load.image('background', './assets/img/background.jpg');
		game.load.image('seaSnail', './assets/img/seaSnail.png');
		game.load.image('button', './assets/img/button.png');
	},

	// Pasa al inicio de sesion - crear nuevo usuario
	create : function() {

	},

	update : function() {
		//if (typeof game.global.myPlayer.id !== 'undefined') {
			game.state.start('initGameState')
		//}
	}
}