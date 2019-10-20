package com.server.Slooow;

public class Trampoline extends MapObstacle{

    enum trampolineEstate { ACTIVE,NOTACTIVE,PREACTIVATE}

    trampolineEstate trampoEstate = trampolineEstate.ACTIVE;

    private int forceX;
    private int forceY;
    public int animationTime;
    public int animationLeft;

    public Trampoline(int width, int height, int posX, int posY, type myType, int timeToActive, int timeActive,int animationTime,
            int tickTime, int forceX, int forceY) {
        super(width, height, posX, posY, myType, timeToActive, timeActive, tickTime);
        this.forceX = forceX;
        this.forceY = forceY;
        this.animationTime = animationTime;
        animationLeft = animationTime;
    }

    public boolean update(){
        switch(trampoEstate){
            case ACTIVE:
               return restActiveTime();
            case NOTACTIVE:
                return restNotActiveTime();
                case PREACTIVATE:
                return restAnimationTime();
                
            default:
            return false;
        }
    }

    public boolean restAnimationTime(){
        animationLeft -= tickTime;
        if(animationLeft<0){
            trampoEstate= trampolineEstate.ACTIVE;
            animationLeft = animationTime;
            return true;
        }
        return false;


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
            trampoEstate = trampolineEstate.PREACTIVATE;
            timeToActive = MAXTIMETOACTIVE;
            return true;
        }
        return false;
    }

    public void throwSnail(SnailInGame snail){
        snail.trampoThrow(forceX,forceY);
    }
    


}