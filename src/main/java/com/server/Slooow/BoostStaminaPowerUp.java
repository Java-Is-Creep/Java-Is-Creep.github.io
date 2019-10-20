package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class BoostStaminaPowerUp extends GenericPowerUp {

      public BoostStaminaPowerUp(PlayerConected player,int time ,powerType myType,int id,Room room) {
        super(player,time,myType,id,room);
    }


    @Override
    public void usePowerUp(){
        player.mySnail.setUsingPowerUp(true);
        player.mySnail.hasBoostStamina = true;
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