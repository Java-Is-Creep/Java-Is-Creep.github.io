package server;

public class DoorMap extends MapObject{

    enum estadoPuerta {OPEN,CLOSE,OPENNING,CLOSSING}

    estadoPuerta miEstado = estadoPuerta.OPEN;

    public DoorMap(int width, int height, int posX, int posY, type myTipe) {
        super(width, height, posX, posY, myTipe);
    }

}