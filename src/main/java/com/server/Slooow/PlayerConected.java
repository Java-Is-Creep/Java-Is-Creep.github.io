package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class PlayerConected {

	private WebSocketSession session;
	private String nombre;
	public SnailInGame mySnail;
	private int lifes;
	public final int MAXNUMLIFES= 5;
	// actualmente 1 hora
	public final int SECONDSTOGETALIFE = 30;
	public int secondsWaitingForLife = 0;
	ReentrantLock sessionLock;

	//Se guarda su sesion, su nombre y una instancia del caracol generico (Cambiara cuando haya mas de uno)
	public PlayerConected(WebSocketSession session, String nombre,ReentrantLock sessionLock) {
		this.session = session;
		this.nombre = nombre;
		this.sessionLock = sessionLock;
		lifes = MAXNUMLIFES;
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

	public int getLifes() {
		return lifes;
	}

	public void incrementLifes(){
		lifes++;
		if(lifes > MAXNUMLIFES){
			lifes = MAXNUMLIFES;
		}
	}

	public void decrementLifes(){
		lifes--;
		System.out.println("Vida restada");
		if(lifes < 0){
			lifes = 0;
		}

	}

	public void incrementWaitingTime(){
		secondsWaitingForLife++;

		if(secondsWaitingForLife >= SECONDSTOGETALIFE){
			lifes++;
			secondsWaitingForLife = 0;
			System.out.println("VIDA AUMENTADA");
		}
	}
	
}
