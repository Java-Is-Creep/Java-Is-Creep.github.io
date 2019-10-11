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
    public boolean restActiveTime(){
        timeActive -= tickTime;
        if(timeActive < 0){
            estate = generalEstate.CLOSSING;
            timeActive = MAXTIMEACTIVE;
            //System.out.println("PUERTA CERRANDO");
            
        }
        return false;
    }

    public boolean clossing(){
        timeClossing -= tickTime;
        if(timeClossing <0){
            estate = generalEstate.CLOSE;
            timeClossing = MAXTIMECLOSSING;
            myType = type.WALL;
            return true;
            //System.out.println("PUERTA CERRADA");
        }
        return false;
    }

    public boolean openning(){
        timeOpenning -= tickTime;
        if(timeOpenning <0){
            estate = generalEstate.OPEN;
            timeOpenning = MAXTIMEOPPENING;
            myType = type.DOOR;
            return true;
            //System.out.println("PUERTA ABIERTA");
        }
        return false;
    }

    public boolean restNotActiveTime(){
        timeToActive -= tickTime;
        if(timeToActive < 0){
            estate = generalEstate.OPENNING;
            timeToActive = MAXTIMETOACTIVE;
            
            //System.out.println("PUERTA ABRIENDO");
        }
        return false;
    }



    @Override
    public boolean update() {
        switch (estate) {
            case OPEN:
                return restActiveTime();
                
            case CLOSE:
                return restNotActiveTime();
               
            case OPENNING:
                return openning();
                
            case CLOSSING:
                return clossing();
                
        
            default:
            return false;
                
        }
    }
}