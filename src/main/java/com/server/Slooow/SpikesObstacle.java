
package com.server.Slooow;

public class SpikesObstacle extends MapObstacle {
    private int posYnotActive;
    private int activePosY;
    private int increment = 1;

    enum Estate { ACTIVE, NOTACTIVE, GOINGUP,GOINGDOWN}
    Estate estate = Estate.NOTACTIVE;

    public SpikesObstacle(int width, int height, int posX, int posY, type myType, int timeToActive,int timeActive, int tickTime) {
        super(width, height, posX, posY, myType,timeToActive,timeActive,tickTime);
        this.timeToActive = timeToActive ;
        MAXTIMETOACTIVE = timeToActive ;
        activePosY = posY;
        posYnotActive = posY - (height + 5);
        estate = Estate.ACTIVE;

    }

    public boolean restActiveTime(){
        timeActive -= tickTime;
        if(timeActive <= 0){
            estate = Estate.GOINGDOWN;
            timeActive = MAXTIMEACTIVE;

        }
        return false;
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

    // el devolver un boolean es necesario para las animaciones d elas puerta
    @Override
    public boolean update() {
        switch(estate){
            case ACTIVE:
                restActiveTime();
                return false;
           
            case NOTACTIVE:
                restNotActiveTime();
                return false;
            case GOINGUP:
                goingUp();
                return false;
            case GOINGDOWN:
                goingDown();
                return false;
            default:
            return false;

        }
        /*
        System.out.println(estate);
        System.out.println("PosX es: "+posX + "PosY es: " + posY);
        collider.recalculatePosition(posX, posY);
        */
    }

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
