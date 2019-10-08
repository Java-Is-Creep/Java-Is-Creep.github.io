package com.server.Slooow;


public class ObstaclePoint extends MapObject {
	MapObstacle obstacle;
	int probabilityNeed; // probabilidad de que algo aparezca del 0 al 100
	boolean exits = false;
	int actualProbability;
	
	public ObstaclePoint(MapObstacle obstacle, int width, int height, int posX, int posY, type myTipe,int colliderOfsetX,int colliderOfsetY) {
		super(width,height,posX,posY,myTipe);
		this.obstacle = obstacle;
		actualProbability = (int) (Math.random() *100);
		if(actualProbability > probabilityNeed) {
			exits = true;
		}
	}
	
	
}
