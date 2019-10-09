package com.server.Slooow;


public  class GenericPowerUp {
	
	int timeRemaining;
	//se restarian 30 por seg
	 protected int TIMEMAX; 
	final int timeRest = 1;
	SnailInGame snailTarget;
	
	public GenericPowerUp(SnailInGame snailTarget,int timeMax) {
		this.snailTarget = snailTarget;
		TIMEMAX = timeMax;
		timeRemaining = timeMax;
	}
	
	public void usePowerUp() {
		System.out.println("ACTIVACION POWER UP SIN IMPLEMENTAR");
		snailTarget.setUsingPowerUp(true);
	}
	
	public void decrementTime() { // se le debe pasar el tiempo por refresco
		timeRemaining -= timeRest;
		System.out.println(timeRemaining);
		if(timeRemaining == 0) {
			snailTarget.restoreValues();
			snailTarget.setUsingPowerUp(false);
			System.out.println("Se acabo el tiempo de powerUp");
		}
	}

}
