Slooow.gameOverState = function(game) {
}

Slooow.gameOverState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **GAMEOVER** state");
        }
    },

    preload : function() {
    },

    create : function() {

        var style = {
			font : "40px Arial",
			fill : "#000000",
			align : "center"
        };

        var style2 = {
			font : "40px Arial",
			fill : "#ffffff",
			align : "center"
        };
        
        //Background
        var b = game.add.image (game.world.centerX, game.world.centerY, 'background')
		b.anchor.set (0.5, 0.5)
        b.scale.setTo (1.2,1.2)

        //Boton volver a jugar
		buttonReplay = game.add.button(game.world.centerX - 200,
            game.world.centerY + 250, 'replayBtn', actionOnClickReplay, this,
            0, 0, 0)
        buttonReplay.anchor.set(0.5)
        buttonReplay.scale.setTo(0.2, 0.3)

        //Boton menu
		buttonMenu = game.add.button(game.world.centerX + 200,
            game.world.centerY + 250, 'button', actionOnClickMainMenu, this,
            0, 0, 0)
        buttonMenu.anchor.set(0.5)
        buttonMenu.scale.setTo(0.3, 0.3)

        //Texto menu
		textButtonMenu = game.add.text(game.world.centerX + 200,
            game.world.centerY + 250, 'Main menu', style)
        textButtonMenu.anchor.set(0.5)
        textButtonMenu.scale.setTo(0.5,0.5)

        //Texto puntos
		textScore = game.add.text(game.world.centerX - 200,
            game.world.centerY -300, game.global.activeLanguage.Score, style2)
        textScore.anchor.set(0.5)
        textScore.scale.setTo(0.5,0.5)

        //Texto premio
		textReward = game.add.text(game.world.centerX + 200,
            game.world.centerY -300, game.global.activeLanguage.Reward, style2)
        textReward.anchor.set(0.5)
        textReward.scale.setTo(0.5,0.5)

        function actionOnClickMainMenu(){
            game.state.start('mainMenuState')
        }

        function actionOnClickReplay(){
            game.state.start('lobbyState')
        }
    },

    update : function() {
    }
}