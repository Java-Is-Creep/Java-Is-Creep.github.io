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
		// BACKGROUNDS
		game.load.image('background', './assets/img/background.jpg');				// Fondo global
																					// Fondo pradera
		game.load.image('cocina_back', './assets/img/fondo_cocina_color.png');		// Fondo cocina
																					// Fondo Hielo
				
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// SNAILS
		game.load.image('seaSnail', './assets/img/seaSnail.png');
		game.load.image('thiefSnail', './assets/img/thiefSnail.png');
		game.load.image('rainbowSnail', './assets/img/cararcoiris.png');
		game.load.image('catSnail', './assets/img/catsnail.png');
		game.load.image('frenchSnail', './assets/img/frenchSnail.png');
		game.load.image('normalSnail', './assets/img/normalSnail.png');
		game.load.image('slugSnail', './assets/img/slug.png');
		game.load.image('tankSnail', './assets/img/tanquecol.png');
		// Snails SpriteSheet (los anteriores no valen, se cambiaran por estos)
		game.load.spritesheet ('SnailWalk', './assets/img/normalCol_spritesheet.png', 500, 300, 8)

		//////////////////////////////////////////////////////////////////////////////////////////////////
		// TILES Y ANIMACIONES POR AMBIENTACION
		// Tiles Pradera
		// Tiles Cocina
		game.load.image('groundTile', './assets/img/suelo_C_Pequenio.png')
		game.load.image('wallTile', './assets/img/pared.png')
		game.load.image('slopeDown', './assets/img/tenedor_horizontal.png')
		game.load.image('sartenSprite', './assets/img/sarten_normal.png')
		game.load.spritesheet('trapdoor', './assets/img/trampilla_sheet.png', 600, 300, 2)
		game.load.spritesheet('sartenSpritesheet', './assets/img/sarten_spritesheet.png', 600, 600, 9)
		game.load.spritesheet('fireSpritesheet', './assets/img/fuego_spritesheet.png', 500, 500, 6)
		// Tiles Hielo

		//////////////////////////////////////////////////////////////////////////////////////////////////
		// INTERFAZ
		// Interfaz de Juego
		game.load.image ('bar_Estamina1', './assets/img/hp_bar_1.png')
		game.load.image ('bar_Estamina2', './assets/img/hp_bar_2.png')

		// Interfaz Global
		game.load.image('button', './assets/img/button.png');

	},

	// Pasa al inicio de sesion - crear nuevo usuario
	create : function() {},

	update : function() {
		//if (typeof game.global.player.id !== 'undefined') {
			game.state.start('initGameState')
		//}
	}
}