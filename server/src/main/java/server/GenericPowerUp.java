package server;

public  class GenericPowerUp extends MapObject{
	
	int duracionRestante;
	final int DURACIONMAX = 200;
	SnailInGame snailTarget;
	
	public GenericPowerUp(int width, int height, int posX, int posY, type myTipe) {
		super(width, height, posX, posY, myTipe);
	}
	
	
	
	
	public void consumirPowerUp() {
		System.out.println("ACTIVACION POWER UP SIN IMPLEMENTAR");
	}
	
	public void decrementarTiempo(int tiempo) { // se le debe pasar el tiempo por refresco
		duracionRestante -= tiempo;
		if(duracionRestante <= 0) {
			snailTarget.restoreValues();
			System.out.println("Se acabo el tiempo de powerUp");
		}
	}

}
