package server;

public  class GenericPowerUp{
	
	int duracionRestante;
	final int DURACIONMAX = 200;
	SnailInGame snailTarget;
	
	public GenericPowerUp(SnailInGame snail) {
		snailTarget = snail;
		duracionRestante = DURACIONMAX;
	}
	
	
	public void consumirPowerUp() {
		System.out.println("ACTIVACION POWER UP SIN IMPLEMENTAR");
	}
	
	public void decrementarTiempo(int tiempo) { // se le debe pasar el tiempo por refresco
		duracionRestante -= tiempo;
		if(duracionRestante <= 0) {
			snailTarget.restoreValues();
		}
	}
	
}
