package com.server.Slooow;

import java.io.IOException;

import com.google.gson.JsonObject;
import com.server.Slooow.MapPowerUp.powerType;

import org.springframework.web.socket.TextMessage;

public  class GenericPowerUp {
	
	int timeRemaining;
	//se restarian 30 por seg
	 protected int TIMEMAX;
	 // El juego va a 30fps 
	final int timeRest = 1;
	PlayerConected player;
	protected powerType myType;
	protected int id;
	protected Room room;
	
	public GenericPowerUp(PlayerConected player,int timeMax,powerType myType,int id,Room room) {
		this.player = player;
		TIMEMAX = timeMax;
		timeRemaining = timeMax;
		this.myType = myType;
		this.id = id;
		this.room = room;
	}
	
	public void usePowerUp() {
		player.mySnail.setUsingPowerUp(true);
		if(room.myType.compareTo("MULTI")== 0){
			sendMessageMulti();
		} else {
			sendMessageSingle();
		}
		
	}
	
	public void decrementTime() { // se le debe pasar el tiempo por refresco
		timeRemaining -= timeRest;
		if(timeRemaining == 0) {
			player.mySnail.restoreValues();
			player.mySnail.setUsingPowerUp(false);
		}
	}

	public void sendMessageMulti(){
		JsonObject msg = new JsonObject();
			msg.addProperty("event", "OBJECTUSEDMULTI");
			msg.addProperty("type", myType.toString());
			msg.addProperty("id", id);
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

	public void sendMessageSingle(){
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
