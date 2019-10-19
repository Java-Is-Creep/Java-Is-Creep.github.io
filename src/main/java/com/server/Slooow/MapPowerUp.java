package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonObject;

import org.springframework.web.socket.TextMessage;

public class MapPowerUp extends MapObject {

    private final int NUMPOWERS = 5;
    ArrayList<PlayerConected> playerTargets = new ArrayList<>();

    enum powerType {
        SHIELD, STAMINA, WEIGHT, LETUCCE, SPEED, INK, NULL
    }

    powerType powerCreated = powerType.NULL;

    public MapPowerUp(int width, int height, int posX, int posY, type myTipe) {
        super(width, height, posX, posY, myTipe);
    }

    // Asigna al caracol el power up.
    public void playerCrash(PlayerConected player, int id, Room myRoom,int idPlayer) {

        // comprobamos si ha cogido el power up
        int playerIndex = playerTargets.indexOf(player);
        if (playerIndex == -1) {
            playerTargets.add(player);

            GenericPowerUp aux = new GenericPowerUp(player, 200, powerCreated,id,myRoom);

            int index = (int) (Math.random() * NUMPOWERS);

            // dependiendo del valor se generaria un power up u otro
            switch (index) {
            case 0:
                powerCreated = powerType.SHIELD;
                aux = new ShieldPowerUp(player, powerCreated,idPlayer,myRoom);

                System.out.println("Se ha creado un power up de escudo");
                break;
            case 1:
                powerCreated = powerType.STAMINA;
                aux = new BoostStaminaPowerUp(player, 120, powerCreated,idPlayer,myRoom);

                System.out.println("Se ha creado un power de stamina");
                break;
            case 2:
                powerCreated = powerType.WEIGHT;
                aux = new LigthWeigthPowerUp(player, 180, 0.1f, powerCreated,idPlayer,myRoom);

                System.out.println("Se ha creado power up de ligth weigth");
                break;
            case 3:
                powerCreated = powerType.LETUCCE;
                aux = new LetuccePowerUp(player, 0, 300, powerCreated,idPlayer,myRoom);

                System.out.println("Se ha creado un power up de Lechuga");
                break;
            case 4:
                powerCreated = powerType.SPEED;
                aux = new SpeedPowerUp(player, 90, 2.5f, 2f, 2f, 2f, powerCreated,idPlayer,myRoom);

                System.out.println("Aumento velocidades");
                break;
            case 5:
                powerCreated = powerType.INK;
                aux = new InkPowerUp(player, 300, powerCreated,idPlayer,myRoom);

                System.out.println("Se ha creado un power de tinta");
                break;
            default:
            }

            if (player.mySnail.usingPowerUp) {
                player.mySnail.powerUpList.add(aux);
            } else {
                if (player.mySnail.powerUpList.size() > 0) {
                    player.mySnail.powerUpList.add(aux);
                    player.mySnail.powerUpList.remove();
                } else {
                    player.mySnail.powerUpList.add(aux);
                }

            }

            if (myRoom.myType.compareTo("MULTI") == 0) {
                sendMessageMulti(player,id,idPlayer);
            } else {
                sendMessageSingle(player, id);
            }
            
            
            System.out.println("POWER GENERADO CON EXITO");
        }

    }

    public void sendMessageMulti(PlayerConected player, int id, int idPlayer){
         JsonObject msg = new JsonObject();
            msg.addProperty("event", "TAKEPOWERUPMULTI");
            msg.addProperty("type", powerCreated.toString());
            msg.addProperty("id", id);
            msg.addProperty("idPlayer",idPlayer);

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

    public void sendMessageSingle(PlayerConected player, int id) {
       
            JsonObject msg = new JsonObject();
            msg.addProperty("event", "TAKEPOWERUP");
            msg.addProperty("type", powerCreated.toString());
            msg.addProperty("id", id);

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