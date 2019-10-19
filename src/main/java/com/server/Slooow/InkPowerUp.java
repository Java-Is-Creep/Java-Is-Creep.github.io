package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class InkPowerUp extends GenericPowerUp{

      public InkPowerUp(PlayerConected player,int time,powerType myType,int id,Room room) {
        super(player,time,myType,id,room);
    }
    
    @Override
    public void usePowerUp(){
        //TO DO:  La sala debe mandar tinta a todos menos a mi
        player.mySnail.setUsingPowerUp(false);
        player.mySnail.powerUpList.removeFirst();
         if(room.myType.compareTo("MULTI") == 0){
            sendMessageMulti();
        } else {
            sendMessageSingle();
        }
        System.out.println("Caracol ha lanzado tinta");
    }



}