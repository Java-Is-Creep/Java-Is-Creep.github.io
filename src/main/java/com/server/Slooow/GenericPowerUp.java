package com.server.Slooow;


public  class GenericPowerUp {
	
	int timeRemaining;
	//se restarian 30 por seg
	 protected int TIMEMAX; 
	final int timeRest = 1;
	PlayerConected player;
	
	public GenericPowerUp(PlayerConected player,int timeMax) {
		this.player = player;
		TIMEMAX = timeMax;
		timeRemaining = timeMax;
	}
	
	public void usePowerUp() {
		System.out.println("ACTIVACION POWER UP SIN IMPLEMENTAR");
		player.mySnail.setUsingPowerUp(true);
	}
	
	public void decrementTime() { // se le debe pasar el tiempo por refresco
		timeRemaining -= timeRest;
		System.out.println(timeRemaining);
		if(timeRemaining == 0) {
			player.mySnail.restoreValues();
			player.mySnail.setUsingPowerUp(false);
			System.out.println("Se acabo el tiempo de powerUp");
		}
	}

}
