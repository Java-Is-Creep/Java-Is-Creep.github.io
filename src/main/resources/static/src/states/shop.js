Slooow.shopState = function(game) {
    var sales 
    var id
}

Slooow.shopState.prototype = {

    init : function() {
        if (game.global.DEBUG_MODE) {
            console.log("[DEBUG] Entering **SHOP** state");
        }
        game.world.setBounds(0, 0, 1280, 720);
    },

    preload : function() {
    },

    create : function() {     
        
        //Background
        this.background = game.add.tileSprite(game.world.centerX, game.world.centerY, game.world.width, game.world.height, 'backgroundMenu')
		this.background.tileScale.set(0.4, 0.4)
        this.background.anchor.set(0.5, 0.5)

        //Boton back
		buttonBack = game.add.button(50,
            40, 'button', actionOnClickBack, this,
            0, 0, 0)
        buttonBack.anchor.set(0.5)
        buttonBack.scale.setTo(0.2, 0.3)

        //Texto back
		textButtonBack = game.add.text(50,
            40, game.global.activeLanguage.Back, game.global.style)
        textButtonBack.anchor.set(0.5)
        textButtonBack.scale.setTo(0.5,0.5)

        //Boton buy
		buttonBuy = game.add.button(game.world.centerX + 500,
            40, 'button', actionOnClickMoney, this,
            0, 0, 0)
        buttonBuy.anchor.set(0.5)
        buttonBuy.scale.setTo(0.5, 0.3)

        //Texto buy
		textButtonBuy = game.add.text(game.world.centerX + 455,
            40, game.global.activeLanguage.Buy, game.global.style)
        textButtonBuy.anchor.set(0.5)
        textButtonBuy.scale.setTo(0.5,0.5)
        
        //Img buy
        moneyShellB = game.add.image(game.world.centerX + 530,
            40, 'moneyShell')
        moneyShellB.anchor.set(0.5)
        moneyShellB.scale.setTo(0.25,0.25)

        //Boton shells
		buttonShells = game.add.image(game.world.centerX + 240,
            40, 'button')
        buttonShells.anchor.set(0.5)
        buttonShells.scale.setTo(0.5, 0.3)

        //Img shells
        moneyShell = game.add.image(game.world.centerX + 180,
            40, 'moneyShell')
        moneyShell.anchor.set(0.5)
        moneyShell.scale.setTo(0.25,0.25)

        //Text shells
        if (game.global.money == null){
            game.global.money = 0;
        }
        textMoneyShells = game.add.text(game.world.centerX + 260,
            40, game.global.money, game.global.style)
        textMoneyShells.anchor.set(0.5)
        textMoneyShells.scale.setTo(0.5,0.5)

        //Boton baba
		buttonBaba = game.add.image(game.world.centerX,
            40, 'button')
        buttonBaba.anchor.set(0.5)
        buttonBaba.scale.setTo(0.5, 0.3)
        
        //Img baba
        moneyBaba = game.add.image(game.world.centerX - 60,
            40, 'moneyBaba')
        moneyBaba.anchor.set(0.5)
        moneyBaba.scale.setTo(0.3,0.3)

        //Text baba
        if (game.global.points == null){
            game.global.points = 0;
        }
        textMoneyBaba = game.add.text(game.world.centerX+20,
            40, game.global.points, game.global.style)
        textMoneyBaba.anchor.set(0.5)
        textMoneyBaba.scale.setTo(0.5,0.5)
        
        //Sales
        var salesBg = game.add.button(game.world.centerX-340, game.world.centerY, 'squareBtn', actionOnClickSales, this,
            0, 0, 0)
        salesBg.anchor.setTo(0.5, 0.5);
        salesBg.scale.setTo(2, 2)
        var salesBtn = game.add.image(0, 110, 'storeBtn')
        salesBg.addChild(salesBtn)
        salesBtn.anchor.setTo(0.5, 0.5)
        salesBtn.scale.setTo(0.2, 0.2)
        
        sales = [];

        sales[0] = game.add.image(0, 0, 'irisCol')
        sales[0].anchor.setTo(0.5, 0.5);
        sales[0].scale.setTo(0.4, 0.4)
        salesBg.addChild(sales[0])
        id = 0
        

        sales[1] = game.add.image(0, 0, 'tanqueCol')
        sales[1].anchor.setTo(0.5, 0.5);
        sales[1].scale.setTo(0.4, 0.4)
        salesBg.addChild(sales[1])
        sales[1].alpha = 0;

        sales[2] = game.add.image(0, 0, 'slugCol')
        sales[2].anchor.setTo(0.5, 0.5);
        sales[2].scale.setTo(0.4, 0.4)
        salesBg.addChild(sales[2])
        sales[2].alpha = 0;


        var saleText = game.add.text(0,
            -80, game.global.activeLanguage.Sales, game.global.style)
        saleText.anchor.set(0.5)
        saleText.scale.setTo(0.5,0.5)
        salesBg.addChild(saleText)

        //Print image gatocol
        var catShell = game.add.button(game.world.centerX+400, game.world.centerY-130, 'roundBtn')
        catShell.anchor.setTo(0.5, 0.5);
        catShell.scale.setTo(0.6, 0.6)
        var catSnail = game.add.image(0, -10, 'catCol')
        catShell.addChild(catSnail)
		catSnail.anchor.setTo(0.5, 0.5);
        catSnail.scale.setTo(0.45, 0.45)

        catShell.inputEnabled = true
        catShell.events.onInputDown.add(chooseCharacterCat, this)

        //Print image frenchSnail
        var frenchShell = game.add.button(game.world.centerX+250, game.world.centerY-130, 'roundBtn')
        frenchShell.anchor.setTo(0.5, 0.5);
        frenchShell.scale.setTo(0.6, 0.6)
        var frenchSnail = game.add.image(0, -10, 'frenchCol')
        frenchShell.addChild(frenchSnail)
		frenchSnail.anchor.setTo(0.5, 0.5);
        frenchSnail.scale.setTo(0.45, 0.45)

        frenchShell.inputEnabled = true
        frenchShell.events.onInputDown.add(chooseCharacterFrench, this)

        //Print image normal
        var normalShell = game.add.button(game.world.centerX+100, game.world.centerY-130, 'roundBtn')
        normalShell.anchor.setTo(0.5, 0.5);
        normalShell.scale.setTo(0.6, 0.6)
        var normalSnail = game.add.image(0, -10, 'normalCol')
        normalShell.addChild(normalSnail)
		normalSnail.anchor.setTo(0.5, 0.5);
        normalSnail.scale.setTo(0.45, 0.45)

        normalShell.inputEnabled = true
        normalShell.events.onInputDown.add(chooseCharacterNormal, this)

        //Print image thief
        var thiefShell = game.add.button(game.world.centerX+170, game.world.centerY, 'roundBtn')
        thiefShell.anchor.setTo(0.5, 0.5);
        thiefShell.scale.setTo(0.6, 0.6)
        var thiefSnail = game.add.image(0, -10, 'thiefCol')
        thiefShell.addChild(thiefSnail)
		thiefSnail.anchor.setTo(0.5, 0.5);
        thiefSnail.scale.setTo(0.45, 0.45)

        thiefShell.inputEnabled = true
        thiefShell.events.onInputDown.add(chooseCharacterThief, this)

        //Print image seaSnail
        var seaShell = game.add.button(game.world.centerX+320, game.world.centerY, 'roundBtn')
        seaShell.anchor.setTo(0.5, 0.5);
        seaShell.scale.setTo(0.6, 0.6)
        var seaSnail = game.add.image(0, -10, 'seaCol')
        seaShell.addChild(seaSnail)
		seaSnail.anchor.setTo(0.5, 0.5);
        seaSnail.scale.setTo(0.45, 0.45)

        seaShell.inputEnabled = true
        seaShell.events.onInputDown.add(chooseCharacterSea, this)
  

        //Print image tank
        var tankShell = game.add.button(game.world.centerX+100, game.world.centerY+130, 'roundBtn')
        tankShell.anchor.setTo(0.5, 0.5);
        tankShell.scale.setTo(0.6, 0.6)
        var tankSnail = game.add.image(0,-10, 'tanqueCol')
        tankShell.addChild(tankSnail)
		tankSnail.anchor.setTo(0.5, 0.5);
        tankSnail.scale.setTo(0.45, 0.45)

        tankShell.inputEnabled = true
        tankShell.events.onInputDown.add(chooseCharacterTank, this)

        //Print image slugSnail
        var slugShell = game.add.button(game.world.centerX +250, game.world.centerY+130, 'roundBtn')
        slugShell.anchor.setTo(0.5, 0.5);
        slugShell.scale.setTo(0.6, 0.6)
        var slugSnail = game.add.image(0, -10, 'slugCol')
        slugShell.addChild(slugSnail)
		slugSnail.anchor.setTo(0.5, 0.5);
        slugSnail.scale.setTo(0.45, 0.45)

        slugShell.inputEnabled = true
        slugShell.events.onInputDown.add(chooseCharacterSlug, this)

         //Print image arcoiris
        var rainbowShell = game.add.button(game.world.centerX+400, game.world.centerY+130, 'roundBtn')
        rainbowShell.anchor.setTo(0.5, 0.5);
        rainbowShell.scale.setTo(0.6, 0.6)
        var rainbowSnail = game.add.image(0, -10, 'irisCol')
        rainbowShell.addChild(rainbowSnail)
		rainbowSnail.anchor.setTo(0.5, 0.5);
        rainbowSnail.scale.setTo(0.45, 0.45)

        rainbowShell.inputEnabled = true
        rainbowShell.events.onInputDown.add(chooseCharacterRainbow, this)


        function chooseCharacterSea(){
            game.global.snailToBuy = 'SEA'
            let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('buySnailState')
        }
        
        function chooseCharacterThief(){
           game.global.snailToBuy = 'ROBA'
           let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
           //game.state.start('buySnailState')
        }

        function chooseCharacterRainbow(){
           game.global.snailToBuy = 'IRIS'
           let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
           //game.state.start('buySnailState')
        }

        function chooseCharacterCat(){
           game.global.snailToBuy = 'MIAU'
           let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
           //game.state.start('buySnailState')
        }

        function chooseCharacterFrench(){
           game.global.snailToBuy = 'BAGUETTE'
           let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
           //game.state.start('buySnailState')
        }

        function chooseCharacterNormal(){
           game.global.snailToBuy = 'NORMAL'
           let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
           //game.state.start('buySnailState')
        }

        function chooseCharacterTank(){
           game.global.snailToBuy = 'TANK'
           let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
           //game.state.start('buySnailState')
        }

        function chooseCharacterSlug(){
            game.global.snailToBuy = 'MERCA'
            let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('buySnailState')
        }

        function actionOnClickMoney(){
            
        }

        function actionOnClickSales(){
            if(id == 0) {
                game.global.snailToBuy = 'IRIS'
                game.global.skinToBuy = 1
            } else if (id == 1){
                game.global.snailToBuy = 'TANK'
                game.global.skinToBuy = 1
            } else if (id == 2){
                game.global.snailToBuy = 'SLUG'
                game.global.skinToBuy = 1
            }
            let msg = {
                event: 'SEESNAIL',
                snailToSee : game.global.snailToBuy
            }
            game.global.socket.send(JSON.stringify(msg))
            //game.state.start('buySnailState')
            
        }

        function actionOnClickBack(){
            game.state.start('mainMenuState')
        }
    },

    update : function() {
        sales[id].alpha -= .005;
        if(sales[id].alpha < 0){
            id = (id + 1) % sales.length
            sales[id].alpha = 1
        }
        this.background.tilePosition.x+=0.5
        this.background.tilePosition.y-=0.5
    }
}