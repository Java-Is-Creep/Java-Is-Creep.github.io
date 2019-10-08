package server;

public class MapGround extends MapObject{

	public MapGround(int width, int height, int posX, int posY, type myTipe) {
		super(width, height, posX, posY, myTipe);
		// TODO Auto-generated constructor stub
	} // suelos de nuestro mapa
	
	public void collisionInfo() {
		System.out.println("Ground collision at the ground: x: " + posX + " y: " +posY);
	}

	

	
}
