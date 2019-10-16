package com.server.Slooow;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.JsonObject;

public class MultiplayerRoom extends Room{
	public final int MAXNUMPLAYERS = 4;
	int numPlayers = 0;
	boolean hasStart = false;
	ReentrantLock playerLock = new ReentrantLock();
	HashMap<WebSocketSession, PlayerConected> jugadoresEnSala = new HashMap<WebSocketSession, PlayerConected>();


	public MultiplayerRoom(String nombre,PlayerConected owner, SnailGame game, String mapName) {
		super(nombre,owner,game,mapName);
	}

	/*
	 * public void tick() { lock.lock(); for(JugadorConectado jug :
	 * jugadoresEnSala.values()) {
	 * 
	 * } lock.unlock(); }
	 */

	public void anadirJugador(PlayerConected jug) {
		playerLock.lock();
		if (jugadoresEnSala.putIfAbsent(jug.getSession(), jug) == null) {
			numPlayers++;
			System.out.println("Jugador: " + jug.getNombre());
		}
		;
		if (numPlayers == MAXNUMPLAYERS) {
			System.out.println("empezando room");
			hasStart = true;
			Runnable task = () -> {
				playerLock.lock();
				for (PlayerConected jug2 : jugadoresEnSala.values()) {

					JsonObject msg = new JsonObject();
					msg.addProperty("event", "tick");
					msg.addProperty("date", new Date().toString());
					try {
						jug2.getSession().sendMessage(new TextMessage(msg.toString()));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				playerLock.unlock();
			};
			executor.scheduleAtFixedRate(task, 1, 1, TimeUnit.SECONDS); // 6 frames por segundo
		} else {
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "WAITINGROOMSTART");
			try {
				jug.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		playerLock.unlock();
	}

	public void quitarJugador(PlayerConected jug) {
		playerLock.lock();
		if (jugadoresEnSala.remove(jug.getSession()) != null) {
			numPlayers--;
		}
		;
		playerLock.unlock();
	}

	public void broadcast(TextMessage message){
		for(WebSocketSession session : jugadoresEnSala.keySet()){
			try {
				session.sendMessage(message);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


}
