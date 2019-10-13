
package com.server.Slooow;

public class SpikesObstacle extends MapObstacle {
    private int increment = 1;
    public int sparkDelay;
    int timeToDelay;

    boolean playerCrash = false;

    enum Estate { ACTIVE, NOTACTIVE, PREACTIVATE}
    Estate estate = Estate.NOTACTIVE;

    public SpikesObstacle(int width, int height, int posX, int posY, type myType, int timeToActive,int timeActive, int sparkDelay,int tickTime) {
        super(width, height, posX, posY, myType,timeToActive,timeActive,tickTime);
        this.timeToActive = timeToActive ;
        MAXTIMETOACTIVE = timeToActive ;
        this.sparkDelay = sparkDelay;
        timeToDelay = sparkDelay;

        estate = Estate.ACTIVE;

    }
    

    public boolean restActiveTime(){
        timeActive -= tickTime;
        if(timeActive <= 0){
            estate = Estate.NOTACTIVE;
            timeActive = MAXTIMEACTIVE;
            return true;

        }
        return false;
    }



    public boolean restNotActiveTime(){
        timeToActive -= tickTime;
        if(timeToActive <= 0){
            estate = Estate.PREACTIVATE;
            timeToActive = MAXTIMETOACTIVE;
            return true;
        }
        return false;
    }

    public boolean sparkDelay(){
        
        timeToDelay -= tickTime;
        if(timeToDelay <= 0){
            estate = Estate.ACTIVE;
            timeToDelay = sparkDelay;
            return true;
        }
        return false;

    }


    // el devolver un boolean es necesario para las animaciones d elas puerta
    @Override
    public boolean update() {
        switch(estate){
            case ACTIVE:
                
                return restActiveTime();
           
            case NOTACTIVE:
                return restNotActiveTime();
            case PREACTIVATE:
                return sparkDelay();

                
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
        estate = Estate.NOTACTIVE;
        timeToActive = MAXTIMETOACTIVE;
        playerCrash = true;

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

    public int getIncrement() {
        return increment;
    }

    public void setIncrement(int increment) {
        this.increment = increment;
    }


}
