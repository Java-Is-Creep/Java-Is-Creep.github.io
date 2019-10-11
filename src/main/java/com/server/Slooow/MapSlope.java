package com.server.Slooow;

public class MapSlope  extends MapObject{

	public double radians;
	public double degrees;

	public MapSlope(int width ,double radians, int posX, int posY, type myTipe) {
		super(width, (int)((Math.tan(radians))*width), posX, posY, myTipe);
		this.radians = radians;
		degrees = Math.toDegrees(radians);
		// TODO Auto-generated constructor stub
	}

}