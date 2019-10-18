package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class InkPowerUp extends GenericPowerUp{

    public InkPowerUp(PlayerConected player, int timeMax, powerType myType) {
        super(player, timeMax,myType);
    }
    
    @Override
    public void usePowerUp(){
        //TO DO:  La sala debe mandar tinta a todos menos a mi
        player.mySnail.setUsingPowerUp(false);
        player.mySnail.powerUpList.removeFirst();
        sendMessage();
        System.out.println("Caracol ha lanzado tinta");
    }



}