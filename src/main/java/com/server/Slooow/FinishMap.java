package com.server.Slooow;

public class FinishMap extends MapObject{
    Room room;

    public FinishMap(int width, int height, int posX, int posY, type myType, Room room){
        super(width, height, posX, posY, myType);
        this.room = room;
    }

    

}