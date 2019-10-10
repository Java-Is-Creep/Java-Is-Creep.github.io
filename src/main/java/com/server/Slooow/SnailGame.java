package com.server.Slooow;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class SnailGame {
	SinglePlayerRoom room1;
	MultiplayerRoom room2 = new MultiplayerRoom("sala2");
	//TODO HashMap de salas del juego


	// executor para sumar vidas a nuestros jugadores
	ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

	// aunque el mapa es concurrente e snecesario protegerlo porque va a haber un hilo recorriendolo 
	//constantemente
	ReentrantLock conectedPlayersLock = new ReentrantLock();
	
	ConcurrentHashMap<WebSocketSession,PlayerConected> jugadoresConectados = new ConcurrentHashMap<WebSocketSession, PlayerConected>();
	

	public SnailGame() {
		checkLifesTime();
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
					System.out.println("dando tiempo");
				}

			}
			conectedPlayersLock.unlock();
		};
		executor.scheduleAtFixedRate(task, 1, 1, TimeUnit.SECONDS);
	}
	
	public void createSingleRoom() {
		
	}


}
