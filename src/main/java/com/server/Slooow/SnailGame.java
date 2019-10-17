package com.server.Slooow;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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

	ReentrantLock generalRecords = new ReentrantLock();
	HashMap<String, ArrayList<RecordInMap>> records = new HashMap<String,ArrayList<RecordInMap>>();
	
	public final int RECORDSTOSTORE = 10;

	public SnailGame() {
		checkLifesTime();
		PlayerRegistered aux = new PlayerRegistered("a", "a");
		playerRegistered.putIfAbsent(aux.getName(), aux);
	}

	public  void actualiceRecords(String mapName, int time, String playerName){
		generalRecords.lock();
		if(records.containsKey(mapName)){
			ArrayList<RecordInMap> recordsTime = records.get(mapName);
			if(time < recordsTime.get(9).time){
				recordsTime.remove(9);
				RecordInMap recordAux = new RecordInMap(playerName, time);
				recordsTime.add(recordAux);
				Collections.sort(recordsTime,new RecordsComparator());
			}
		} else {
			ArrayList<RecordInMap>  recordsTime = new ArrayList<RecordInMap>();
			for(int i = 0; i <RECORDSTOSTORE; i++ ){
				recordsTime.add(new RecordInMap("",1000000000));
			}
			if(time < recordsTime.get(9).time){
				recordsTime.remove(9);
				RecordInMap recordAux = new RecordInMap(playerName, time);
				recordsTime.add(recordAux);
				Collections.sort(recordsTime,new RecordsComparator());
			}
			records.putIfAbsent(mapName, recordsTime);
		}
		/*
		int i = 0;
		for(String nombreMapa : records.keySet()){
			System.out.println(" Nombre del mapa: "+nombreMapa);
			ArrayList<RecordInMap> recordArray = records.get(nombreMapa);
			for(RecordInMap record : recordArray ){
				System.out.println("Indice " + i + "Nombre jugador: " +record.playerName + " tiempo jugador" + record.time);
				i++;
			}
			*/
		//}
		generalRecords.unlock();
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
