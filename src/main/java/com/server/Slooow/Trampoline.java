package com.server.Slooow;

public class Trampoline extends MapObstacle{

    enum trampolineEstate { ACTIVE,NOTACTIVE}

    trampolineEstate trampoEstate = trampolineEstate.ACTIVE;

    private int forceX;
    private int forceY;

    public Trampoline(int width, int height, int posX, int posY, type myType, int timeToActive, int timeActive,
            int tickTime, int forceX, int forceY) {
        super(width, height, posX, posY, myType, timeToActive, timeActive, tickTime);
        this.forceX = forceX;
        this.forceY = forceY;
    }

    public boolean update(){
        switch(trampoEstate){
            case ACTIVE:
               return restActiveTime();
            case NOTACTIVE:
                return restNotActiveTime();
            default:
            return false;
        }
    }

    public boolean restActiveTime(){
        timeActive -= tickTime;
        if(timeActive < 0){
            trampoEstate = trampolineEstate.NOTACTIVE;
            timeActive = MAXTIMEACTIVE;
            return true;
        }
        return false;
    }

    public boolean restNotActiveTime(){
        timeToActive -= tickTime;
        if(timeToActive < 0){
            trampoEstate = trampolineEstate.ACTIVE;
            timeToActive = MAXTIMETOACTIVE;
            return true;
        }
        return false;
    }

    public void throwSnail(SnailInGame snail){
        snail.trampoThrow(forceX,forceY);
    }
    


}