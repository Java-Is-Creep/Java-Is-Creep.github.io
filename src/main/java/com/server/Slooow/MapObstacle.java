package com.server.Slooow;

public class MapObstacle  extends MapObject{

	protected float MAXTIMEACTIVE;
	protected float timeActive;
	protected float tickTime;
	protected float timeToActive;
    protected float MAXTIMETOACTIVE;
	


	public MapObstacle(int width, int height, int posX, int posY, type myType,int timeToActive, int timeActive, int tickTime) {
		super(width, height, posX, posY, myType);
		MAXTIMEACTIVE = timeActive;
		this.timeActive = timeActive;
		this.tickTime = tickTime;
		MAXTIMETOACTIVE = timeToActive;
		this.timeToActive = timeToActive;
		
	}

	public boolean update(){
		return false;
	}

	public boolean restActiveTime(){
		return false;
	}

}
