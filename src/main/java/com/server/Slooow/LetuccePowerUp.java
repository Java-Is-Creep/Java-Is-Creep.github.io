package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class LetuccePowerUp extends GenericPowerUp {

    int staminaRecover;

    public LetuccePowerUp(PlayerConected player, int timeMax, int staminaRecover,powerType myType) {
        super(player, timeMax,myType);
        this.staminaRecover = staminaRecover;
    }

    @Override
    public void usePowerUp(){
        System.out.println("Lechuga usada");
        player.mySnail.setUsingPowerUp(false);
        player.mySnail.powerUpList.removeFirst();
        player.mySnail.stamina += staminaRecover;
        if(player.mySnail.stamina > player.mySnail.MAXSTAMINA){
            player.mySnail.stamina = player.mySnail.MAXSTAMINA;
        }
        sendMessage();
    }
    
}