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
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// BACKGROUNDS																					//
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// Fondo global
		game.load.image('background', './assets/img/bg/bg.png');				
		// TODO Fondo pradera												
		// Fondo cocina							
		game.load.image('cocinaBg', './assets/img/bg/fondoCocinaColor.png');
		// TODO Fondo Hielo																			
				
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// SNAILS																						//
		//////////////////////////////////////////////////////////////////////////////////////////////////			
		game.load.image('seaCol', './assets/img/snails/sprites/seaCol.png');
		game.load.image('thiefCol', './assets/img/snails/sprites/thiefCol.png');
		game.load.image('irisCol', './assets/img/snails/sprites/irisCol.png');
		game.load.image('catCol', './assets/img/snails/sprites/catCol.png');
		game.load.image('frenchCol', './assets/img/snails/sprites/frenchCol.png');
		game.load.image('normalCol', './assets/img/snails/sprites/normalCol.png');
		game.load.image('slugCol', './assets/img/snails/sprites/slugCol.png');
		game.load.image('tanqueCol', './assets/img/snails/sprites/tanqueCol.png');
		// Snails SpriteSheet (los anteriores no valen, se cambiaran por estos)
		game.load.spritesheet ('normalColWalk', './assets/img/snails/anim/normalColWalk.png', 360, 216, 8)
		game.load.spritesheet ('seaColWalk', './assets/img/snails/anim/seaColWalk.png', 500, 300, 4)
		game.load.spritesheet ('catColWalk', './assets/img/snails/anim/catColWalk.png', 500, 300, 8)
		game.load.spritesheet ('irisColWalk', './assets/img/snails/anim/irisColWalk.png', 500, 300, 8)
		game.load.spritesheet ('tanqueColWalk', './assets/img/snails/anim/tanqueColWalk.png', 500, 300, 8)
		game.load.spritesheet ('frenchColWalk', './assets/img/snails/anim/frenchColWalk.png', 500, 300, 8)
		game.load.spritesheet ('slugColWalk', './assets/img/snails/anim/slugColWalk.png', 500, 300, 8)
		game.load.spritesheet ('thiefWalk', './assets/img/snails/anim/thiefColWalk.png', 500, 300, 8)

		//////////////////////////////////////////////////////////////////////////////////////////////////
		// TILES Y ANIMACIONES POR AMBIENTACION															//																			//
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// TODO Tiles Pradera																			
		// Tiles Cocina		
		game.load.image('groundTile', './assets/img/props/sprites/sueloCocinaPeq.png')
		game.load.image('wallTile', './assets/img/props/sprites/paredCocina.png')
		game.load.image('slopeDown', './assets/img/props/sprites/tenedorHor.png')
		game.load.image('sartenSprite', './assets/img/props/sprites/sarten.png')
		game.load.spritesheet('trapdoor', './assets/img/props/anim/trampillaSpriteSheet.png', 600, 300, 2)
		game.load.spritesheet('sartenSpritesheet', './assets/img/props/anim/sartenSpriteSheet.png', 600, 600, 9)
		game.load.spritesheet('fireSpritesheet', './assets/img/props/anim/fuegoSpriteSheet.png', 500, 500, 6)
		// TODO Tiles Hielo

		//////////////////////////////////////////////////////////////////////////////////////////////////
		// INTERFAZ																						//
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// Interfaz de Juego
		game.load.image ('bar_Estamina1', './assets/img/UI/hpBar1.png')
		game.load.image ('bar_Estamina2', './assets/img/UI/hpBar2.png')

		// Interfaz Global
		game.load.image('button', './assets/img/btn/defaultBtn.png');
		game.load.image('roundBtn', './assets/img/btn/roundBtn.png');

		// Social-btn
		game.load.image('twitterBtn', './assets/img/btn/twitterBtn.png');
		game.load.image('instaBtn', './assets/img/btn/instaBtn.png');
		game.load.image('facebookBtn', './assets/img/btn/facebookBtn.png');
		game.load.image('youTubeBtn', './assets/img/btn/roundBtn.png');
		game.load.image('jTeamBtn', './assets/img/btn/javaIsCreepBtn.png');

		//Menu-btn
		game.load.image('settingsBtn', './assets/img/btn/settingsBtn.png');
		game.load.image('storeBtn', './assets/img/btn/shopBtn.png');
		game.load.image('logOffBtn', './assets/img/btn/logoffBtn.png');
		game.load.image('ESPAÑITABtn', './assets/img/btn/spnBtn.png');
		game.load.image('engBtn', './assets/img/btn/engBtn.png');
		game.load.image('playBtn', './assets/img/btn/playBtn.png');
		game.load.image('achiveBtn', './assets/img/btn/achiveBtn.png');
		game.load.image('soundOnBtn', './assets/img/btn/soundOnBtn.png');
		game.load.image('soundOffBtn', './assets/img/btn/soundOffBtn.png');

		$.getJSON("./assets/language.json", function (data) {
			game.global.languageData = (data);
		});
	},

	// Pasa al inicio de sesion - crear nuevo usuario
	create : function() {},

	update : function() {
		//if (typeof game.global.player.id !== 'undefined') {
			game.state.start('initGameState')
		//}
	}
}