package com.server.Slooow;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;
import com.google.gson.JsonObject;

import org.springframework.web.socket.WebSocketSession;

public class SnailGame {
	//TODO HashMap de salas del juego


	// executor para sumar vidas a nuestros jugadores
	ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

	// aunque el mapa es concurrente e snecesario protegerlo porque va a haber un hilo recorriendolo 
	//constantemente
	ReentrantLock conectedPlayersLock = new ReentrantLock();
	
	ConcurrentHashMap<WebSocketSession,PlayerConected> jugadoresConectados = new ConcurrentHashMap<WebSocketSession, PlayerConected>();

	ConcurrentHashMap<String,SinglePlayerRoom> singlePlayerRoomMaps = new ConcurrentHashMap<String,SinglePlayerRoom>();

	ConcurrentHashMap<String,MultiplayerRoom> multiPlayerRoomMap = new ConcurrentHashMap<String,MultiplayerRoom>();

	ConcurrentHashMap<String,PlayerRegistered> playerRegistered = new ConcurrentHashMap<String,PlayerRegistered>();
	

	public SnailGame() {
		checkLifesTime();
	}

	public void recoverRegisteredPlayers() {
		JsonObject registeredPlayers = new JsonObject();
	}

	public void conectarJugador(PlayerConected jugador) {
		conectedPlayersLock.lock();
		jugadoresConectados.putIfAbsent(jugador.getSession(), jugador);
		conectedPlayersLock.unlock();
	}
	
	public PlayerConected bucarJugadorConectado(WebSocketSession session) {
		conectedPlayersLock.lock();
		PlayerConected aux = jugadoresConectados.get(session);
		conectedPlayersLock.unlock();
		return aux;
	}

	public void checkLifesTime(){
		Runnable task = () -> {
			conectedPlayersLock.lock();
			for(PlayerConected player : jugadoresConectados.values()){
				if(player.getLifes() < player.MAXNUMLIFES){
					player.incrementWaitingTime();
				}

			}
			conectedPlayersLock.unlock();
		};
		executor.scheduleAtFixedRate(task, 1, 1, TimeUnit.SECONDS);
	}
	
	public void createSingleRoom(String roomName, PlayerConected jug, String mapName){
		
		SinglePlayerRoom roomAux = new SinglePlayerRoom(roomName, jug,this, mapName);
		singlePlayerRoomMaps.putIfAbsent(roomAux.name, roomAux);
	}

	public void deleteRoom(Room room){
		if(room.getClass() == SinglePlayerRoom.class){
			singlePlayerRoomMaps.remove(room.name);
		} else {
			multiPlayerRoomMap.remove(room.name);
		}
		
	}


}
