package server;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class PlayerConected {

	private WebSocketSession session;
	private String nombre;
	public SnailInGame mySnail;
	ReentrantLock sessionLock;

	//Se guarda su sesion, su nombre y una instancia del caracol generico (Cambiara cuando haya mas de uno)
	public PlayerConected(WebSocketSession session, String nombre,ReentrantLock sessionLock) {
		this.session = session;
		this.nombre = nombre;
		this.sessionLock = sessionLock;
		mySnail = new SnailInGame();
	}
	public WebSocketSession getSession() {
		return session;
	}
	public void setSession(WebSocketSession session) {
		this.session = session;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
}
