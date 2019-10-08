package com.server.Slooow;

import java.util.ArrayList;

public class MapPowerUp extends MapObject {

    private final int NUMPOWERS = 10;
    ArrayList<SnailInGame> snailTargets = new ArrayList<>();

    public MapPowerUp(int width, int height, int posX, int posY, type myTipe) {
        super(width, height, posX, posY, myTipe);
    }

    // Asigna al caracol el power up.
    public void playerCrash(SnailInGame snail) {

        // comprobamos si ha cogido el power up
        int playerIndex = snailTargets.indexOf(snail);
        if (playerIndex == -1) {
            snailTargets.add(snail);

            GenericPowerUp aux = new GenericPowerUp(snail);

            int index = (int) (Math.random() * NUMPOWERS);

            // dependiendo del valor se generaria un power up u otro
            switch (index) {
            case 0:
                break;
            case 1:
                break;
            default:
            }

            snail.powerUp = aux;
            System.out.println("POWER GENERADO CON EXITO");
        }

    }

}