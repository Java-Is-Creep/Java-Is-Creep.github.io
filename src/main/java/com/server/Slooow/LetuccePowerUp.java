package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class LetuccePowerUp extends GenericPowerUp {

    int staminaRecover;



    public LetuccePowerUp(PlayerConected player, int timeMax, int staminaRecover,powerType myType,int id,Room room) {
        super(player,0,myType,id,room);
        this.staminaRecover = staminaRecover;
    }

    @Override
    public void usePowerUp(){
        player.mySnail.setUsingPowerUp(false);
        player.mySnail.powerUpList.removeFirst();
        player.mySnail.stamina += staminaRecover;
        if(player.mySnail.stamina > player.mySnail.MAXSTAMINA){
            player.mySnail.stamina = player.mySnail.MAXSTAMINA;
        }
          if(room.myType.compareTo("MULTI") == 0){
            sendMessageMulti();
        } else {
            sendMessageSingle();
        }
    }
    
}