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

            GenericPowerUp aux = new GenericPowerUp(snail, 200);

            // int index = (int) (Math.random() * NUMPOWERS);
            int index = 4;

            // dependiendo del valor se generaria un power up u otro
            switch (index) {
            case 0:
                aux = new ShieldPowerUp(snail);
                System.out.println("Se ha creado un power up de escudo");
                break;
            case 1:
                aux = new BoostStaminaPowerUp(snail, 60);
                System.out.println("Se ha creado un power de stamina");
                break;
            case 2:
                aux = new LigthWeigthPowerUp(snail, 60, 0.1f);
                System.out.println("Se ha creado power up de ligth weigth");
                break;
            case 3:
                aux = new LetuccePowerUp(snail, 0, 300);
                System.out.println("Se ha creado un power up de Lechuga");
                break;
            case 4:
                aux = new SpeedPowerUp(snail, 60, 4f, 4f, 4f, 4f);
                System.out.println("Aumento velocidades");
            default:
            }

            snail.powerUp = aux;
            System.out.println("POWER GENERADO CON EXITO");
        }

    }

}