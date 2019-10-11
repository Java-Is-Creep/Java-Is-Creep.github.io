package com.server.Slooow;

public class SpeedPowerUp extends GenericPowerUp {
    float normalSpeedIncrease;
    float aceleratingSpeedIncrease;
    float normalAcelerationIncrease;
    float aceleratingAcelerationIncrease;

    public SpeedPowerUp(PlayerConected player, int timeMax, float normalSpeedIncrease, float aceleratingSpeedIncrease,
            float normalAcelerationIncrease, float aceleratingAcelerationIncrease) {
        super(player, timeMax);
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