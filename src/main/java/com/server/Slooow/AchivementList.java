package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonObject;

import org.springframework.web.socket.TextMessage;

public class AchivementList {
    enum ACHIVETYPE {
        GAMESPLAYED, GAMESWON
    }

    ArrayList<Achievement> achievementsList = new ArrayList<>();

    public AchivementList(){
        initAchievements();
    }

    public void initAchievements() {
        Achievement aux = new Achievement("Juega 3 carreras", 3, ACHIVETYPE.GAMESPLAYED, 200);
        achievementsList.add(aux);
        aux = new Achievement("Juega 10 carreras", 10, ACHIVETYPE.GAMESPLAYED, 500);
        achievementsList.add(aux);
        aux = new Achievement("Gana tu primera Carrera", 1, ACHIVETYPE.GAMESWON, 150);
        achievementsList.add(aux);
        aux = new Achievement("Gana 3 Carreras", 3, ACHIVETYPE.GAMESWON, 300);
    }

    public void checkAchievements(PlayerConected player) {
        for (Achievement aux : achievementsList) {
            if (!aux.isConseguido()) {
                switch (aux.getType()) {
                case GAMESPLAYED:
                    if (player.gamesPlayed.get() >= aux.getNumericCondition()) {
                        aux.setConseguido(true);
                        JsonObject msg3 = new JsonObject();
                        msg3.addProperty("event", "ACHIEVE");
                        msg3.addProperty("text", aux.getText());
                        msg3.addProperty("points", aux.getPoints());
                        System.out.println(aux.toString());
                        player.sessionLock.lock();
                        try {
                            player.getSession().sendMessage(new TextMessage(msg3.toString()));
                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
				        player.sessionLock.unlock();
                    }
                break;
                case GAMESWON:
                    if(player.gamesWon.get() >= aux.getNumericCondition()){
                        aux.setConseguido(true);
                        JsonObject msg3 = new JsonObject();
                        msg3.addProperty("event", "ACHIEVE");
                        msg3.addProperty("text", aux.getText());
                        msg3.addProperty("points", aux.getPoints());
                        System.out.println(aux.toString());
                        player.sessionLock.lock();
                        try {
                            player.getSession().sendMessage(new TextMessage(msg3.toString()));
                        } catch (IOException e) {
                            // TODO Auto-generated catch block
                            e.printStackTrace();
                        }
				        player.sessionLock.unlock();
                    }
                break;
                }
            }
            
        }
    }

}