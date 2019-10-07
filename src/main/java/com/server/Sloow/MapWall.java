package com.server.Sloow;

public class MapWall extends MapObject{

	public MapWall(int width, int height, int posX, int posY, type myTipe) {
		super(width, height, posX, posY, myTipe);
		// TODO Auto-generated constructor stub
	} //paredes de nuestro mapa
	
	public void collisionInfo() {
		System.out.println("Wall collision at the ground: x: " + posX + " y: " +posY);
	}


}
