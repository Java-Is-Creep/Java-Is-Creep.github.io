Slooow.preloadState = function(game) {

}

Slooow.preloadState.prototype = {

	// Se añaden las imagenes de carga. Si tarda demasiado, habria que hacer una
	// pantalla de carga en el boot
	init : function() {
		if (game.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** state");
		}
		game.world.setBounds(0, 0, 1280, 720);
	},

	// Hasta que este preload no acabe, no se pasa al siguiente estado
	preload : function() {
		// Pantalla de Carga
		var loading = game.add.sprite(game.world.centerX, game.world.centerY, 'loading')
		loading.anchor.setTo(0.5)
		loading.height = this.game.height;
        loading.width = this.game.width;
		var anim = loading.animations.add ('move')
		anim.play (8, true)
		
		game.global.style = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        };
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// BACKGROUNDS																					//
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// Fondo global
		game.load.image('background', './assets/img/bg/bg.png');
		game.load.image('backgroundMenu', './assets/img/bg/backgroundMenu6.png')
		game.load.image('backgroundMenu2', './assets/img/bg/backgroundMenu2.png')	
		game.load.image('backgroundMenu1', './assets/img/bg/backgroundMenu.png')			
		// TODO Fondo pradera												
		// Fondo cocina							
		game.load.image('cocinaBg', './assets/img/bg/fondoCocinaColor.jpg');
		game.load.image('cocinaBg2', './assets/img/bg/fondoCocinaColorSat3.png');
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

		game.load.image('seaCol1', './assets/img/snails/sprites/seaColAlt01.png');
		game.load.image('thiefCol1', './assets/img/snails/sprites/thiefColAlt01.png');
		game.load.image('irisCol1', './assets/img/snails/sprites/irisColAlt01.png');
		game.load.image('catCol1', './assets/img/snails/sprites/catColAlt01.png');
		game.load.image('frenchCol1', './assets/img/snails/sprites/frenchColAlt01.png');
		game.load.image('normalCol1', './assets/img/snails/sprites/normalColAlt01.png');
		game.load.image('slugCol1', './assets/img/snails/sprites/slugColAlt01.png');
		game.load.image('tanqueCol1', './assets/img/snails/sprites/tanqueColAlt01.png');

		game.load.image('seaCol2', './assets/img/snails/sprites/seaColAlt02.png');
		game.load.image('thiefCol2', './assets/img/snails/sprites/thiefColAlt02.png');
		game.load.image('irisCol2', './assets/img/snails/sprites/irisColAlt02.png');
		game.load.image('catCol2', './assets/img/snails/sprites/catColAlt02.png');
		game.load.image('frenchCol2', './assets/img/snails/sprites/frenchColAlt02.png');
		game.load.image('normalCol2', './assets/img/snails/sprites/normalColAlt02.png');
		game.load.image('slugCol2', './assets/img/snails/sprites/slugColAlt02.png');
		game.load.image('tanqueCol2', './assets/img/snails/sprites/tanqueColAlt02.png');
		// Snails SpriteSheet (los anteriores no valen, se cambiaran por estos)
		
		
		game.load.atlas('normalColAnimation', './assets/img/snails/anim/normalColSpritesheet.png', './assets/img/snails/anim/normalColSpritesheet.json');
		game.load.atlas('baguetteColAnimation', './assets/img/snails/anim/baguetteColSpritesheet.png', './assets/img/snails/anim/baguetteColSpritesheet.json');
		game.load.atlas('irisColAnimation', './assets/img/snails/anim/irisColSpritesheet.png', './assets/img/snails/anim/irisColSpritesheet.json');
		game.load.atlas('mercaColAnimation', './assets/img/snails/anim/mercaColSpritesheet.png', './assets/img/snails/anim/mercaColSpritesheet.json');
		game.load.atlas('miauColAnimation', './assets/img/snails/anim/miauColSpritesheet.png', './assets/img/snails/anim/miauColSpritesheet.json');
		game.load.atlas('robaColAnimation', './assets/img/snails/anim/robaColSpritesheet.png', './assets/img/snails/anim/robaColSpritesheet.json');
		game.load.atlas('seaColAnimation', './assets/img/snails/anim/seaColSpritesheet.png', './assets/img/snails/anim/seaColSpritesheet.json');
		game.load.atlas('tanqueColAnimation', './assets/img/snails/anim/tanqueColSpritesheet.png', './assets/img/snails/anim/tanqueColSpritesheet.json');
		
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
		game.load.spritesheet('sartenSpritesheet', './assets/img/props/anim/sartenSpriteSheet.png', 300, 300, 9)
		game.load.spritesheet('fireSpritesheet', './assets/img/props/anim/fuegoSpriteSheet.png', 240, 243, 6)
		game.load.spritesheet('doorSpritesheet', './assets/img/props/anim/puerta_sheet3.png', 400, 600, 2 )
		game.load.spritesheet('windSpritesheet', './assets/img/props/anim/sheetViento.png', 450, 600, 6)
		// TODO Tiles Hielo

		//////////////////////////////////////////////////////////////////////////////////////////////////
		// INTERFAZ																						//
		//////////////////////////////////////////////////////////////////////////////////////////////////
		// Interfaz de Juego
		game.load.image ('bar_Estamina1', './assets/img/UI/hpBar1.png')
		game.load.image ('bar_Estamina2', './assets/img/UI/hpBar2.png')
		game.load.image ('barStamina', './assets/img/UI/barra_estamina.png')
		game.load.image ('barStaminaFuera', './assets/img/UI/barra_Fuera.png')
		game.load.image ('barStaminaInterior', './assets/img/UI/barra_interior.png')
		game.load.image ('barProgressFuera', './assets/img/UI/barraprogreso_exterior.png')
		game.load.image ('barProgressInteriorNegra', './assets/img/UI/barraprogreso_interiorNegra.png')
		game.load.image ('barProgressInteriorColor', './assets/img/UI/barraprogreso_interiorColor.png')
		game.load.image ('powerUpsContainer', './assets/img/UI/contenedorPowerups.png')
		// Power Ups
		game.load.image('wingsPowerUp', './assets/img/powerUps/sprites/alas.png')
		game.load.image('shieldPowerUp', './assets/img/powerUps/sprites/escudo.png')
		game.load.image('staminaPowerUp', './assets/img/powerUps/sprites/estamina.png')
		game.load.image('lettucePowerUp', './assets/img/powerUps/sprites/lechuga.png')
		game.load.image('onPowerUp', './assets/img/powerUps/sprites/on.png')
		game.load.image('downUp', './assets/img/powerUps/sprites/ondown.png')
		game.load.image('clockPowerUp', './assets/img/powerUps/sprites/reloj.png')
		game.load.image('inkPowerUp', './assets/img/powerUps/sprites/tintero.png')
		game.load.image('speedPowerUp', './assets/img/powerUps/sprites/velocidad.png')
		//Objectos generales del mapa
		game.load.image('finishObject', './assets/img/props/sprites/banderin.png')
		game.load.image('finishGround', './assets/img/props/sprites/linea_meta.png')
		game.load.spritesheet('boxPowerUpSpritesheet', './assets/img/powerUps/anim/cajaPower_sheet.png', 500, 500, 7)

		// Interfaz Global
		game.load.image('button', './assets/img/btn/defaultBtn.png');
		game.load.image('roundBtn', './assets/img/btn/roundBtn.png');
		game.load.image('squareBtn', './assets/img/btn/squareBtn.png');
		game.load.image('blueBtn', './assets/img/btn/blueBtn.png')
		game.load.image('pinkBtn', './assets/img/btn/pinkBtn.png')

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
		game.load.image('replayBtn', './assets/img/btn/replayBtn.png');

		//Shop icons
		game.load.image('moneyShell', './assets/img/UI/monedaArcoiris.png');
		game.load.image('moneyBaba', './assets/img/UI/baba.png');
		game.load.image('statBtn', './assets/img/UI/defaultStat.png');

		//Musica
		game.load.audio('AE', './assets/audio/te-bote.mp3');
		game.load.audio('chili', './assets/audio/powerUps/chili_editado.mp3');
		game.load.audio('energicol', './assets/audio/powerUps/energicoleructo_editado.mp3');
		game.load.audio('lettuce', './assets/audio/powerUps/letuce_editado.mp3');
		game.load.audio('shield', './assets/audio/powerUps/shield_editado.mp3');
		game.load.audio('wing', './assets/audio/powerUps/wing_editado.mp3');

		$.getJSON("./assets/language.json", function (data) {
			game.global.languageData = (data);
			game.global.activeLanguage = data.eng;
		});
	},

	// Pasa al inicio de sesion - crear nuevo usuario
	create : function() {
		game.state.start('initGameState')
	},

	update : function() {
		//if (typeof game.global.player.id !== 'undefined') {
			//game.state.start('initGameState')
		//}
	}
}