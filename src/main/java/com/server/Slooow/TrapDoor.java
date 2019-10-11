package com.server.Slooow;


public class TrapDoor extends DoorMap{

    public TrapDoor(int width, int height, int posX, int posY, type myType, int timeToActive, int timeActive,
            int tickTime, int timeOpenning, int timeClossing) {
        super(width, height, posX, posY, myType, timeToActive, timeActive, tickTime, timeOpenning, timeClossing);
    }

    @Override
    public boolean clossing(){
        timeClossing -= tickTime;
        if(timeClossing <0){
            estate = generalEstate.CLOSE;
            timeClossing = MAXTIMECLOSSING;
            myType = type.GROUND;
            return true;
            //System.out.println("Trampilla CERRADA");
        }
        return false;
    }

    @Override
    public boolean openning(){
        timeOpenning -= tickTime;
        if(timeOpenning <0){
            estate = generalEstate.OPEN;
            timeOpenning = MAXTIMEOPPENING;
            myType = type.TRAPDOOR;
            return true;
            //System.out.println("Trampilla ABIERTA");
        }
        return false;
    }


    
}