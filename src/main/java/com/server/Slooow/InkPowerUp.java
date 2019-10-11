package com.server.Slooow;


public class InkPowerUp extends GenericPowerUp{

    public InkPowerUp(PlayerConected player, int timeMax) {
        super(player, timeMax);
    }
    
    @Override
    public void usePowerUp(){
        //TO DO:  La sala debe mandar tinta a todos menos a mi
        player.mySnail.setUsingPowerUp(false);
        player.mySnail.powerUp = null;
        System.out.println("Caracol ha lanzado tinta");
    }



}