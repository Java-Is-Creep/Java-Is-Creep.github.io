package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import com.google.gson.JsonObject;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class SnailGame {
	// TODO HashMap de salas del juego

	// executor para sumar vidas a nuestros jugadores
	ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

	// aunque el mapa es concurrente e snecesario protegerlo porque va a haber un
	// hilo recorriendolo
	// constantemente
	ReentrantLock conectedPlayersLock = new ReentrantLock();
	ReentrantLock registeredPlayersLock = new ReentrantLock();
	ReentrantLock generalRecords = new ReentrantLock();
	ReentrantLock multiPlayerLock = new ReentrantLock();

	ConcurrentHashMap<WebSocketSession, PlayerConected> jugadoresConectados = new ConcurrentHashMap<WebSocketSession, PlayerConected>();

	ConcurrentHashMap<String, SinglePlayerRoom> singlePlayerRoomMaps = new ConcurrentHashMap<String, SinglePlayerRoom>();

	ConcurrentHashMap<String, MultiplayerRoom> multiPlayerRoomMap = new ConcurrentHashMap<String, MultiplayerRoom>();

	ConcurrentHashMap<String, PlayerRegistered> playerRegistered = new ConcurrentHashMap<String, PlayerRegistered>();

	HashMap<String, ArrayList<RecordInMap>> records = new HashMap<String, ArrayList<RecordInMap>>();

	public final int RECORDSTOSTORE = 10;

	public final int TIMETOPASSMAP1 =60;
	public final int TIMETOPASSMAP2 =100;
	public final int TIMETOPASSMAP3 =75;

	public SnailGame() {
		checkLifesTime();
		PlayerRegistered aux = new PlayerRegistered("a", "a");
		playerRegistered.putIfAbsent(aux.getName(), aux);
		initRecords();
	}

	public void initRecords() {
		ArrayList<RecordInMap> recordsTime = new ArrayList<>();
		for (int i = 0; i < RECORDSTOSTORE; i++) {
			RecordInMap recordAux = new RecordInMap("none", 1000000000);
			recordsTime.add(recordAux);
		}
		Collections.sort(recordsTime, new RecordsComparator());
		records.put("mapa1", recordsTime);

		recordsTime = new ArrayList<>();
		for (int i = 0; i < RECORDSTOSTORE; i++) {
			RecordInMap recordAux = new RecordInMap("none", 1000000000);
			recordsTime.add(recordAux);
		}
		Collections.sort(recordsTime, new RecordsComparator());
		records.put("mapa2", recordsTime);

		recordsTime = new ArrayList<>();
		for (int i = 0; i < RECORDSTOSTORE; i++) {
			RecordInMap recordAux = new RecordInMap("none", 1000000000);
			recordsTime.add(recordAux);
		}
		Collections.sort(recordsTime, new RecordsComparator());
		records.put("mapa3", recordsTime);

	}

	public void actualiceRecords(String mapName, int time, PlayerConected player){
		generalRecords.lock();
		if (records.containsKey(mapName)) {
			ArrayList<RecordInMap> recordsTime = records.get(mapName);
			if (time < recordsTime.get(9).time) {
				recordsTime.remove(9);
				RecordInMap recordAux = new RecordInMap(player.getNombre(), time);
				recordsTime.add(recordAux);
				Collections.sort(recordsTime, new RecordsComparator());
			}
		} else {
			ArrayList<RecordInMap> recordsTime = new ArrayList<RecordInMap>();
			for (int i = 0; i < RECORDSTOSTORE; i++) {
				recordsTime.add(new RecordInMap("", 1000000000));
			}
			if (time < recordsTime.get(9).time) {
				recordsTime.remove(9);
				RecordInMap recordAux = new RecordInMap(player.getNombre(), time);
				recordsTime.add(recordAux);
				Collections.sort(recordsTime, new RecordsComparator());
			}
			records.putIfAbsent(mapName, recordsTime);
		}

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

	public PlayerRegistered findRegistered(PlayerConected player) {
		registeredPlayersLock.lock();
		PlayerRegistered pr = playerRegistered.get(player.getNombre());
		registeredPlayersLock.unlock();
		return pr;
	}

	public PlayerConected bucarJugadorConectado(WebSocketSession session) {
		conectedPlayersLock.lock();
		PlayerConected aux = jugadoresConectados.get(session);
		conectedPlayersLock.unlock();
		return aux;
	}

	public void checkLifesTime() {
		Runnable task = () -> {
			conectedPlayersLock.lock();
			for (PlayerConected player : jugadoresConectados.values()) {
				if (player.getLifes() < player.MAXNUMLIFES) {
					player.incrementWaitingTime();
					JsonObject msg3 = new JsonObject();
					msg3.addProperty("event", "LIVEUP");
					player.sessionLock.lock();
					try {
						player.getSession().sendMessage(new TextMessage(msg3.toString()));
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} finally{
						player.sessionLock.unlock();
					}
						

				}

			}
			conectedPlayersLock.unlock();

			registeredPlayersLock.lock();
			for(PlayerRegistered play : playerRegistered.values()){
				if(!play.isConnected()){
					if(play.getLifes() < play.MAXNUMLIFES){
						play.incrementWaitingTime();
					}
				}
			}
			registeredPlayersLock.unlock();
		};
		executor.scheduleAtFixedRate(task, 1, 1, TimeUnit.SECONDS);
	}

	public void createSingleRoom(String roomName, PlayerConected jug, String mapName) {
		int secondsToPass = 0;
		switch(mapName){
			case "mapa1":
				secondsToPass= TIMETOPASSMAP1;
			break;
			
			case "mapa2":
				secondsToPass= TIMETOPASSMAP2;
			break;

			case "mapa3":
				secondsToPass= TIMETOPASSMAP3;
			break;
			default:
			break;
		}

		SinglePlayerRoom roomAux = new SinglePlayerRoom(roomName, jug, this, mapName,"SINGLE",secondsToPass);
		singlePlayerRoomMaps.putIfAbsent(roomAux.name, roomAux);
	}

	public void createMultiRoom(String roomName, PlayerConected jug, String mapName){
		multiPlayerLock.lock();
		MultiplayerRoom roomAux = new MultiplayerRoom(roomName, jug, this, mapName,"MULTI");
		multiPlayerRoomMap.putIfAbsent(roomAux.name, roomAux);
		roomAux.anadirJugador(jug);
		multiPlayerLock.unlock();
	}

	public void deleteRoom(Room room) {
		if (room.getClass() == SinglePlayerRoom.class) {
			singlePlayerRoomMaps.remove(room.name);
		} else {
			multiPlayerLock.lock();
			multiPlayerRoomMap.remove(room.name);
			multiPlayerLock.unlock();
		}

	}



}
