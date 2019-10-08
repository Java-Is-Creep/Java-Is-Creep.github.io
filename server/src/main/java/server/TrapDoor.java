package server;


public class TrapDoor extends DoorMap{

    public TrapDoor(int width, int height, int posX, int posY, type myType, int timeToActive, int timeActive,
            int tickTime, int timeOpenning, int timeClossing) {
        super(width, height, posX, posY, myType, timeToActive, timeActive, tickTime, timeOpenning, timeClossing);
    }

    @Override
    public void clossing(){
        timeClossing -= tickTime;
        if(timeClossing <0){
            estate = generalEstate.CLOSE;
            timeClossing = MAXTIMECLOSSING;
            myType = type.GROUND;
            System.out.println("Trampilla CERRADA");
        }
    }

    @Override
    public void openning(){
        timeOpenning -= tickTime;
        if(timeOpenning <0){
            estate = generalEstate.OPEN;
            timeOpenning = MAXTIMEOPPENING;
            myType = type.TRAPDOOR;
            System.out.println("Trampilla ABIERTA");
        }
    }


    
}