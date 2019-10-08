package com.server.Slooow;

public class DoorMap extends MapObstacle  {

    protected int timeOpenning;
    protected int MAXTIMEOPPENING;
    protected int MAXTIMECLOSSING;
    protected int timeClossing;

    enum generalEstate {
           
    
        OPEN, CLOSE, OPENNING, CLOSSING
    }

    generalEstate estate;

    public DoorMap(int width, int height, int posX, int posY, type myType,int timeToActive, int timeActive, int tickTime,int timeOpenning,int timeClossing) {
        super(width, height, posX, posY, myType,timeToActive,timeActive,tickTime);
        estate = generalEstate.OPEN;
        this.timeOpenning = timeOpenning;
        this.timeClossing = timeClossing;
        MAXTIMEOPPENING = timeOpenning;
        MAXTIMECLOSSING = timeClossing;
    } 

    @Override
    public void restActiveTime(){
        timeActive -= tickTime;
        if(timeActive < 0){
            estate = generalEstate.CLOSSING;
            timeActive = MAXTIMEACTIVE;
            //System.out.println("PUERTA CERRANDO");
            
        }
    }

    public void clossing(){
        timeClossing -= tickTime;
        if(timeClossing <0){
            estate = generalEstate.CLOSE;
            timeClossing = MAXTIMECLOSSING;
            myType = type.WALL;
            //System.out.println("PUERTA CERRADA");
        }
    }

    public void openning(){
        timeOpenning -= tickTime;
        if(timeOpenning <0){
            estate = generalEstate.OPEN;
            timeOpenning = MAXTIMEOPPENING;
            myType = type.DOOR;
            //System.out.println("PUERTA ABIERTA");
        }
    }

    public void restNotActiveTime(){
        timeToActive -= tickTime;
        if(timeToActive < 0){
            estate = generalEstate.OPENNING;
            timeToActive = MAXTIMETOACTIVE;
            //System.out.println("PUERTA ABRIENDO");
        }
    }



    @Override
    public void update() {
        switch (estate) {
            case OPEN:
                restActiveTime();
                break;
            case CLOSE:
                restNotActiveTime();
                break;
            case OPENNING:
                openning();
                break;
            case CLOSSING:
                clossing();
                break;
        
            default:
                break;
        }
    }
}