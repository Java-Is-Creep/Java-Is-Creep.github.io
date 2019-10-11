package com.server.Slooow;

public class LetuccePowerUp extends GenericPowerUp{

    int staminaRecover;

    public LetuccePowerUp(PlayerConected player, int timeMax, int staminaRecover) {
        super(player, timeMax);
        this.staminaRecover = staminaRecover;
    }

    @Override
    public void usePowerUp(){
        System.out.println("Lechuga usada");
        player.mySnail.setUsingPowerUp(false);
        player.mySnail.powerUp = null;
        player.mySnail.stamina += staminaRecover;
        if(player.mySnail.stamina > player.mySnail.MAXSTAMINA){
            player.mySnail.stamina = player.mySnail.MAXSTAMINA;
        }
    }
    
}