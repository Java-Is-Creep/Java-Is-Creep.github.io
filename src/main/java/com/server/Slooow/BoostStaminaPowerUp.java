package com.server.Slooow;

public class BoostStaminaPowerUp extends GenericPowerUp {

    public BoostStaminaPowerUp(PlayerConected player,int timeMax) {
        super(player,timeMax);
    }

    @Override
    public void usePowerUp(){
        player.mySnail.setUsingPowerUp(true);
        player.mySnail.hasBoostStamina = true;
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