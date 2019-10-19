package com.server.Slooow;

import com.server.Slooow.MapPowerUp.powerType;

public class SpeedPowerUp extends GenericPowerUp {
    float normalSpeedIncrease;
    float aceleratingSpeedIncrease;
    float normalAcelerationIncrease;
    float aceleratingAcelerationIncrease;

    public SpeedPowerUp(PlayerConected player, int timeMax, float normalSpeedIncrease, float aceleratingSpeedIncrease,
            float normalAcelerationIncrease, float aceleratingAcelerationIncrease,powerType myType,int id,Room room) {
        super(player, timeMax, myType,id,room);
        this.normalSpeedIncrease = normalSpeedIncrease;
        this.aceleratingSpeedIncrease = aceleratingSpeedIncrease;
        this.normalAcelerationIncrease = normalAcelerationIncrease;
        this.aceleratingAcelerationIncrease = aceleratingAcelerationIncrease;
    }

    public void usePowerUp() {
        player.mySnail.setUsingPowerUp(true);
        player.mySnail.maxNormalSpeedX *= normalSpeedIncrease;
        player.mySnail.maxNormalSpeedY *= normalSpeedIncrease;
        player.mySnail.maxAceleratingSpeedX *= aceleratingSpeedIncrease;
        player.mySnail.maxAceleratingSpeedY *= aceleratingSpeedIncrease;
        player.mySnail.normalAcelerationX *= normalAcelerationIncrease;
        player.mySnail.normalAcelerationY *= normalAcelerationIncrease;
        player.mySnail.maxAcelerationAceleratingX *= aceleratingAcelerationIncrease;
        player.mySnail.maxAcelerationAceleratingY *= aceleratingAcelerationIncrease;
        if(room.myType.compareTo("MULTI") == 0){
            sendMessageMulti();
        } else {
            sendMessageSingle();
        }

        System.out.println("Velocidades Incrementadas");
    }

    public void decrementTime() { // se le debe pasar el tiempo por refresco
        timeRemaining -= timeRest;
        System.out.println(timeRemaining);
        if (timeRemaining == 0) {
            player.mySnail.restoreValues();
            System.out.println("VELOCIDADES RESTAURADAS");
            player.mySnail.setUsingPowerUp(false);
            System.out.println("Se acabo el tiempo de powerUp");
        }

    }
}