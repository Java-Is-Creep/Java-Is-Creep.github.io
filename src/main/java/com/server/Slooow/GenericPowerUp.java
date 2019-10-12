package com.server.Slooow;

import java.io.IOException;

import com.google.gson.JsonObject;
import com.server.Slooow.MapPowerUp.powerType;

import org.springframework.web.socket.TextMessage;

public  class GenericPowerUp {
	
	int timeRemaining;
	//se restarian 30 por seg
	 protected int TIMEMAX; 
	final int timeRest = 1;
	PlayerConected player;
	powerType myType;
	
	public GenericPowerUp(PlayerConected player,int timeMax,powerType myType) {
		this.player = player;
		TIMEMAX = timeMax;
		timeRemaining = timeMax;
		this.myType = myType;
	}
	
	public void usePowerUp() {
		System.out.println("ACTIVACION POWER UP SIN IMPLEMENTAR");
		player.mySnail.setUsingPowerUp(true);
		sendMessage();
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

	public void sendMessage(){
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "OBJECTUSED");
			msg.addProperty("type", myType.toString());
			try {
				player.sessionLock.lock();
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				player.sessionLock.unlock();
			}
	}

}
