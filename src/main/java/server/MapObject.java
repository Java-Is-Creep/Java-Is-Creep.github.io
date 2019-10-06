package server;

public class MapObject { // clase principal de la que heredaran todos los objetos del juego
	int width;
	int height;
	int posX;
	int posY;
	SquareCollider collider;
	enum type {
		GROUND,WALL,OBSTACLE,POWERUP,OBSTACLEPOINT,SLOPE
	}
	
	type myTipe;

	public MapObject(int width, int height, int posX, int posY, type myTipe) {
		collider = new SquareCollider(width,height,posX,posY);
		this.width = width;
		this.height = height;
		this.posX = posX;
		this.posY = posY;
		this.myTipe = myTipe;
	}
	
	public void collisionInfo() {
		System.out.println("Hay collision");
	}
}
