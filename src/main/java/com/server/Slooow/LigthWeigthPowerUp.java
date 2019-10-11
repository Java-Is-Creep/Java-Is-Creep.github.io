package com.server.Slooow;


public class LigthWeigthPowerUp extends GenericPowerUp{

    float massDecrease;

    public LigthWeigthPowerUp(PlayerConected player, int timeMax, float massDecrease) {
        super(player, timeMax);
        this.massDecrease = massDecrease;
    }

    public void usePowerUp(){
        player.mySnail.setUsingPowerUp(true);
        player.mySnail.mass *= massDecrease;
        System.out.println("MASA INCREMENTADA, la nueva mas es: " + player.mySnail.mass);
    }


    public void decrementTime() { // se le debe pasar el tiempo por refresco
		timeRemaining -= timeRest;
		System.out.println(timeRemaining);
		if(timeRemaining == 0) {
            player.mySnail.restoreValues();
            System.out.println("MASA DISMINUIDA, la nueva mas es: " + player.mySnail.mass);
            player.mySnail.setUsingPowerUp(false);
			System.out.println("Se acabo el tiempo de powerUp");
		}
	}


}