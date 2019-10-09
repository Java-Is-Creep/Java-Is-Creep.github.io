package com.server.Slooow;


public  class GenericPowerUp {
	
	int timeRemaining;
	//se restarian 30 por seg
	final int TIMEMAX = 200; 
	final int timeRest = 1;
	SnailInGame snailTarget;
	
	public GenericPowerUp(SnailInGame snailTarget) {
		this.snailTarget = snailTarget;
		timeRemaining = TIMEMAX;
	}
	
	public void usePowerUp() {
		System.out.println("ACTIVACION POWER UP SIN IMPLEMENTAR");
		snailTarget.setUsingPowerUp(true);
	}
	
	public void decrementarTiempo() { // se le debe pasar el tiempo por refresco
		timeRemaining -= timeRest;
		System.out.println(timeRemaining);
		if(timeRemaining == 0) {
			snailTarget.restoreValues();
			snailTarget.setUsingPowerUp(false);
			snailTarget.powerUp = null;
			System.out.println("Se acabo el tiempo de powerUp");
		}
	}

}
