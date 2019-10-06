package server;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.JsonObject;

public class MultiplayerRoom {
	String nombre;
	public final int MAXNUMPLAYERS = 4;
	int numPlayers = 0;
	boolean hasStart = false;
	ReentrantLock lock = new ReentrantLock();
	HashMap<WebSocketSession, PlayerConected> jugadoresEnSala = new HashMap<WebSocketSession, PlayerConected>();

	ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);

	public MultiplayerRoom(String nombre) {
		this.nombre = nombre;
	}

	/*
	 * public void tick() { lock.lock(); for(JugadorConectado jug :
	 * jugadoresEnSala.values()) {
	 * 
	 * } lock.unlock(); }
	 */

	public void anadirJugador(PlayerConected jug) {
		lock.lock();
		if (jugadoresEnSala.putIfAbsent(jug.getSession(), jug) == null) {
			numPlayers++;
			System.out.println("Jugador: " + jug.getNombre());
		}
		;
		if (numPlayers == MAXNUMPLAYERS) {
			System.out.println("empezando room");
			hasStart = true;
			Runnable task = () -> {
				lock.lock();
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
				lock.unlock();
			};
			executor.scheduleAtFixedRate(task, 1, 1, TimeUnit.SECONDS); // 6 frames por segundo
		}
		lock.unlock();
	}

	public void quitarJugador(PlayerConected jug) {
		lock.lock();
		if (jugadoresEnSala.remove(jug.getSession()) != null) {
			numPlayers--;
		}
		;
		lock.unlock();
	}

}
