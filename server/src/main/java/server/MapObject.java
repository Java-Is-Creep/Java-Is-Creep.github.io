package server;

public class MapObject { // clase principal de la que heredaran todos los objetos del juego
	int width;
	int height;
	int posX;
	int posY;
	SquareCollider collider;
	enum type {
		GROUND,WALL,OBSTACLE,POWERUP,OBSTACLEPOINT,SLOPE,GENERICPOWERUP,DOOR,TRAPDOOR
	}
	
	type myType;

	public MapObject(int width, int height, int posX, int posY, type myType) {
		collider = new SquareCollider(width,height,posX,posY);
		this.width = width;
		this.height = height;
		this.posX = posX;
		this.posY = posY;
		this.myType = myType;
	}
	
	public void collisionInfo() {
		System.out.println("Hay collision");
	}
}
