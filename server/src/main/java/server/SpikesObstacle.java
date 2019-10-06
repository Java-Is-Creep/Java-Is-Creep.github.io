
package server;

import java.io.IOException;

import com.google.gson.JsonObject;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class SpikesObstacle extends MapObstacle {
    private float timeToActive;
    private float timeActive;
    private float MAXTIMETOACTIVE;
    private float MAXTIMEACTIVE;
    private float tickTime;
    private int posYnotActive;
    private int activePosY;
    private int increment = 5;

    enum Estate { ACTIVE, NOTACTIVE, GOINGUP,GOINGDOWN}
    Estate estate = Estate.NOTACTIVE;

    public SpikesObstacle(int width, int height, int posX, int posY, type myTipe, int timeToActive,int timeActive, int tickTime) {
        super(width, height, posX, posY, myTipe);
        this.timeToActive = timeToActive ;
        MAXTIMETOACTIVE = timeToActive ;
        this.timeActive = timeActive;
        MAXTIMEACTIVE = timeActive;
        activePosY = posY;
        posYnotActive = posY - (height + 5);
        this.tickTime = tickTime;

    }

    public void restActiveTime(){
        timeActive -= tickTime;
        if(timeActive <= 0){
            estate = Estate.GOINGDOWN;
            timeActive = MAXTIMEACTIVE;

        }
    }

    public void goingDown(){
        posY -= increment;
        if(posY <= posYnotActive){
            posY = posYnotActive;
            estate = Estate.NOTACTIVE;
        }
    }

    public void restNotActiveTime(){
        timeToActive -= tickTime;
        if(timeToActive <= 0){
            estate = Estate.GOINGUP;
            timeToActive = MAXTIMETOACTIVE;
        }
    }

    public void goingUp(){
        posY += increment;
        if(posY >= activePosY){
            posY = activePosY;
            estate = Estate.ACTIVE;
        }
    }

    public void update() {
        switch(estate){
            case ACTIVE:
                restActiveTime();
            break;
            case NOTACTIVE:
                restNotActiveTime();
            break;
            case GOINGUP:
                goingUp();
            break;
            case GOINGDOWN:
                goingDown();
            break;
            default:

        }
        System.out.println(estate);
        collider.recalculatePosition(posX, posY);
    }

    /*
    public void sendObstacleUpdate() {
        JsonObject obstacleStats = new JsonObject();
        obstacleStats.addProperty("event", "SPIKEOBSTACLEUPDATE");
        obstacleStats.addProperty("posX", posX);
        obstacleStats.addProperty("posY", posX);
        try {
            playerSession.sendMessage(new TextMessage(obstacleStats.toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    */

    public void playerCrash(){
        estate = Estate.GOINGDOWN;
        timeToActive = MAXTIMETOACTIVE;
    } 

    public float getTimeToActive() {
        return timeToActive;
    }

    public void setTimeToActive(float timeToActive) {
        this.timeToActive = timeToActive;
    }


    public float getTickTime() {
        return tickTime;
    }

    public void setTickTime(float tickTime) {
        this.tickTime = tickTime;
    }

    public int getPosYnotActive() {
        return posYnotActive;
    }

    public void setPosYnotActive(int posYnotActive) {
        this.posYnotActive = posYnotActive;
    }

    public int getActivePosY() {
        return activePosY;
    }

    public void setActivePosY(int activePosY) {
        this.activePosY = activePosY;
    }

    public int getIncrement() {
        return increment;
    }

    public void setIncrement(int increment) {
        this.increment = increment;
    }


}
