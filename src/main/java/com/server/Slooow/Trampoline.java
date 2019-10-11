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

    public void update(){
        switch(trampoEstate){
            case ACTIVE:
                restActiveTime();
            break;
            case NOTACTIVE:
                restNotActiveTime();
            break;
            default:
        }
    }

    public void restActiveTime(){
        timeActive -= tickTime;
        if(timeActive < 0){
            trampoEstate = trampolineEstate.NOTACTIVE;
            timeActive = MAXTIMEACTIVE;
        }
    }

    public void restNotActiveTime(){
        timeToActive -= tickTime;
        if(timeToActive < 0){
            trampoEstate = trampolineEstate.ACTIVE;
            timeToActive = MAXTIMETOACTIVE;
        }
    }

    public void throwSnail(SnailInGame snail){
        snail.trampoThrow(forceX,forceY);
    }
    


}