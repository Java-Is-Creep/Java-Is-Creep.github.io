package com.server.Slooow;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

import com.server.Slooow.SnailInGame.SnailType;

import org.springframework.web.socket.WebSocketSession;

public class PlayerConected {

	SnailType snailType = SnailType.NORMAL;
	private WebSocketSession session;
	private String nombre;
	public SnailInGame mySnail;
	private int lifes;
	private int points;
	private int cash;
	public final int MAXNUMLIFES = 5;
	// actualmente 1 hora
	public final int SECONDSTOGETALIFE = 30;
	public int secondsWaitingForLife = 0;
	ReentrantLock sessionLock;
	ConcurrentHashMap<String, Integer> records = new ConcurrentHashMap<String, Integer>();

	  public final int POINTSFORFINISH = 100;

	  // usado para los logros
	AtomicInteger gamesPlayed;
	AtomicInteger gamesWon;
	AchivementList myAchievements;

	public boolean isReady = false;


	// Se guarda su sesion, su nombre y una instancia del caracol generico (Cambiara
	// cuando haya mas de uno)
	public PlayerConected(WebSocketSession session, String nombre, ReentrantLock sessionLock) {
		this.session = session;
		this.nombre = nombre;
		this.sessionLock = sessionLock;
		lifes = MAXNUMLIFES;
		restartSnail();
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

	public void incrementLifes() {
		lifes++;
		if (lifes > MAXNUMLIFES) {
			lifes = MAXNUMLIFES;
		}
	}

	public void decrementLifes() {
		lifes--;
		if (lifes < 0) {
			lifes = 0;
		}

	}

	public void incrementWaitingTime() {
		secondsWaitingForLife++;

		if (secondsWaitingForLife >= SECONDSTOGETALIFE) {
			lifes++;
			secondsWaitingForLife = 0;
		}
	}

	
    public int getPointsInRace(int time){
		int pointsAux = 0;
        pointsAux += POINTSFORFINISH;
		pointsAux += (int) (200-(time/500));
		if(pointsAux <0){
			pointsAux = 0;
		}
		points += pointsAux;
        return pointsAux;
    }

	public void playerConCast(PlayerRegistered player) {
		this.lifes = player.getLifes();
		this.points = player.getPoints();
		this.cash = player.getCash();
		this.records = player.records;
		this.gamesPlayed = player.gamesPlayed;
		this.gamesWon = player.gamesWon;
		this.myAchievements = player.myAchievements;
		this.secondsWaitingForLife = player.secondsWaitingForLife;
	}

	public float matchMakingPunt(){

			float average = 0;
			if(gamesPlayed.get() !=0 ){
				average = (points/gamesPlayed.get());
			}
			return average;

	}

	public void setLifes(int lifes) {
		this.lifes = lifes;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public void addPoints(int points){
		this.points += points;
	}

	public int getCash() {
		return cash;
	}

	public void addCash(int cash){
		this.cash += cash;
	}

	public void setCash(int cash) {
		this.cash = cash;
	}

	public void restartSnail() {
		switch (snailType) {
		case NORMAL:
			mySnail = new normalSnail(this.session, this.sessionLock);
			break;
		case TANK:
			mySnail = new TankSnail(this.session, this.sessionLock);
			break;
		case BAGUETTE:
			mySnail = new BaguetteSnail(this.session, this.sessionLock);
			break;
		case MIAU:
			mySnail = new MiauSnail(this.session, this.sessionLock);
			break;
		case MERCA:
			mySnail = new MercaSnail(this.session, this.sessionLock);
			break;
		case SEA:
			mySnail = new SeaSnail(this.session, this.sessionLock);
			break;
		case ROBA:
			mySnail = new RobaSnail(this.session, this.sessionLock);
			break;
		case IRIS:
			mySnail = new IrisSnail(this.session, this.sessionLock);
			break;
		default:
		}
	}

}
