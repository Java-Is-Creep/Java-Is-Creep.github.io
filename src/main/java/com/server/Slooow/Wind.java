package com.server.Slooow;


public class Wind extends MapObject{

    public boolean goingRigth;
    public float windForce;
    public int maxtime;
    public boolean changeWind;
    public int time;
    public int tickTime;


    public Wind(int width, int height, int posX, int posY, type myType, boolean rigth, float windForce, boolean changeWind,int maxtime,int tickTime) {
        super(width, height, posX, posY, myType);
        goingRigth = rigth;
        this.windForce = windForce;
        this.changeWind = changeWind;
        this.maxtime = maxtime;
        time = maxtime;
        this.tickTime = tickTime;
        
    }


    public void update(){
        if(changeWind){
            time -= tickTime;
            if(time <0){
                goingRigth = !goingRigth;
                //System.out.println(" Cambio en el viento, ahora va a: " + goingRigth);
                time = maxtime;
            }
        }

    }





}