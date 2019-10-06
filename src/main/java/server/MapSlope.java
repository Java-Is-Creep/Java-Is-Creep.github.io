package server;

public class MapSlope  extends MapObject{

    public double radians;

	public MapSlope(int width ,double radians, int posX, int posY, type myTipe) {
		super(width, (int)((Math.tan(radians))*width), posX, posY, myTipe);
		this.radians = radians;
		System.out.println("los radianes son: " + radians);
		System.out.println(collider.toString());
		// TODO Auto-generated constructor stub
	}

}