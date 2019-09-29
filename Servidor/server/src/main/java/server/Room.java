package server;


import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.WebSocketSession;

public class Room {
	String nombre;
	public final int maxNumPlayers = 4;
	ConcurrentHashMap<WebSocketSession,JugadorConectado> jugadoresEnSala = new ConcurrentHashMap<WebSocketSession, JugadorConectado>();
	
}
