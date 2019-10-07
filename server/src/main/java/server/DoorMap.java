package server;

public class DoorMap extends MapObstacle  {

    private int timeOpenning;
    private int MAXTIMEOPPENING;
    private int MAXTIMECLOSSING;
    private int timeClossing;

    enum doorEstate {
           
    
        OPEN, CLOSE, OPENNING, CLOSSING
    }

    doorEstate estate;

    public DoorMap(int width, int height, int posX, int posY, type myType,int timeToActive, int timeActive, int tickTime,int timeOpenning,int timeClossing) {
        super(width, height, posX, posY, myType,timeToActive,timeActive,tickTime);
        estate = doorEstate.OPEN;
        this.timeOpenning = timeOpenning;
        this.timeClossing = timeClossing;
        MAXTIMEOPPENING = timeOpenning;
        MAXTIMECLOSSING = timeClossing;
    } 

    @Override
    public void restActiveTime(){
        timeActive -= tickTime;
        if(timeActive < 0){
            estate = doorEstate.CLOSSING;
            timeActive = MAXTIMEACTIVE;
            System.out.println("PUERTA CERRANDO");
            
        }
    }

    public void clossing(){
        timeClossing -= tickTime;
        if(timeClossing <0){
            estate = doorEstate.CLOSE;
            timeClossing = MAXTIMECLOSSING;
            myType = type.WALL;
            System.out.println("PUERTA CERRADA");
        }
    }

    public void openning(){
        timeOpenning -= tickTime;
        if(timeOpenning <0){
            estate = doorEstate.OPEN;
            timeOpenning = MAXTIMEOPPENING;
            myType = type.DOOR;
            System.out.println("PUERTA ABIERTA");
        }
    }

    public void restNotActiveTime(){
        timeToActive -= tickTime;
        if(timeToActive < 0){
            estate = doorEstate.OPENNING;
            timeToActive = MAXTIMETOACTIVE;
            System.out.println("PUERTA ABRIENDO");
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