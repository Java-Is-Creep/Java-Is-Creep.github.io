package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class LigthWeigthPowerUp extends GenericPowerUp {

    float massDecrease;

    public LigthWeigthPowerUp(PlayerConected player, int timeMax, float massDecrease,powerType myType,int id,Room room) {
        super(player,timeMax,myType,id,room);
        this.massDecrease = massDecrease;
    }

    public void usePowerUp(){
        player.mySnail.setUsingPowerUp(true);
        player.mySnail.mass *= massDecrease;
          if(room.myType.compareTo("MULTI") == 0){
            sendMessageMulti();
        } else {
            sendMessageSingle();
        }
    }


    public void decrementTime() { // se le debe pasar el tiempo por refresco
		timeRemaining -= timeRest;
		if(timeRemaining == 0) {
            player.mySnail.restoreValues();
            player.mySnail.setUsingPowerUp(false);
		}
	}


}