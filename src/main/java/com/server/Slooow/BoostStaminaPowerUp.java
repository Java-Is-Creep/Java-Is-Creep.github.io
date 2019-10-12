package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class BoostStaminaPowerUp extends GenericPowerUp {

    public BoostStaminaPowerUp(PlayerConected player,int timeMax,powerType myType) {
        super(player,timeMax,myType);
    }

    @Override
    public void usePowerUp(){
        player.mySnail.setUsingPowerUp(true);
        player.mySnail.hasBoostStamina = true;
        sendMessage();
    }

    public void decrementTime() { // se le debe pasar el tiempo por refresco
		timeRemaining -= timeRest;
		System.out.println(timeRemaining);
		if(timeRemaining == 0) {
			player.mySnail.restoreValues();
            player.mySnail.setUsingPowerUp(false);
			System.out.println("Se acabo el tiempo de powerUp");
		}
	}
    

}