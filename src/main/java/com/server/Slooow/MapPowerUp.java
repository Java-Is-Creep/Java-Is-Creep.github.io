package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonObject;

import org.springframework.web.socket.TextMessage;

public class MapPowerUp extends MapObject {

    private final int NUMPOWERS = 6;
    ArrayList<PlayerConected> playerTargets = new ArrayList<>();

    enum powerType {SHIELD,STAMINA,WEIGTH,LETUCCE,SPEED,INK,NULL}

    powerType powerCreated = powerType.NULL;

    public MapPowerUp(int width, int height, int posX, int posY, type myTipe) {
        super(width, height, posX, posY, myTipe);
    }

    // Asigna al caracol el power up.
    public void playerCrash(PlayerConected player) {

        // comprobamos si ha cogido el power up
        int playerIndex = playerTargets.indexOf(player);
        if (playerIndex == -1) {
            playerTargets.add(player);

            GenericPowerUp aux = new GenericPowerUp(player, 200);

             int index = (int) (Math.random() * NUMPOWERS);
            

            // dependiendo del valor se generaria un power up u otro
            switch (index) {
            case 0:
                aux = new ShieldPowerUp(player);
                powerCreated = powerType.SHIELD;
                System.out.println("Se ha creado un power up de escudo");
                break;
            case 1:
                aux = new BoostStaminaPowerUp(player, 60);
                powerCreated = powerType.STAMINA;
                System.out.println("Se ha creado un power de stamina");
                break;
            case 2:
                aux = new LigthWeigthPowerUp(player, 60, 0.1f);
                powerCreated = powerType.WEIGTH;
                System.out.println("Se ha creado power up de ligth weigth");
                break;
            case 3:
                aux = new LetuccePowerUp(player, 0, 300);
                powerCreated = powerType.LETUCCE;
                System.out.println("Se ha creado un power up de Lechuga");
                break;
            case 4:
                aux = new SpeedPowerUp(player, 60, 4f, 4f, 4f, 4f);
                powerCreated = powerType.SPEED;
                System.out.println("Aumento velocidades");
            case 5:
                aux = new InkPowerUp(player, 200);
                powerCreated = powerType.INK;
                System.out.println("Se ha creado un power de tinta");
                break;
            default:
            }

            player.mySnail.powerUp = aux;
            sendMessage(player);
            System.out.println("POWER GENERADO CON EXITO");
        }

    }

    public void sendMessage(PlayerConected player){
        JsonObject msg = new JsonObject();
			msg.addProperty("event", "TAKEPOWERUP");
			msg.addProperty("type", powerCreated.toString());

			try {
				player.sessionLock.lock();
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				player.sessionLock.unlock();
			}
    }

}