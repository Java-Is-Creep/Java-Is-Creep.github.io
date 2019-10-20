package com.server.Slooow;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.server.Slooow.SnailInGame.SnailType;
public class PlayerRegistered {

    private String name;
    private String pass;
	private int lifes;
    private int points;
    private int cash;
    private boolean connected = false;
    ConcurrentHashMap<String,Integer> records = new ConcurrentHashMap<String,Integer>();
    ConcurrentHashMap<SnailType,Boolean> mySnails = new ConcurrentHashMap<SnailType,Boolean>(); 
	public final int MAXNUMLIFES= 5;
	// actualmente 1 hora
	public final int SECONDSTOGETALIFE = 30;
    public int secondsWaitingForLife = 0;

    AtomicInteger gamesPlayed = new AtomicInteger(0);
    AtomicInteger gamesWon = new AtomicInteger(0);
    AchivementList myAchievements = new AchivementList();
    

  


    
    
    
    /** 
     * @param name Nombre del jugador a registrar
     * @param pass Contraseña del jugador a registrar
     * @return 
     */
    public PlayerRegistered(String name, String pass){
        this.name = name;
        this.pass = pass;
        this.lifes = MAXNUMLIFES;
        this.cash = 0;
        this.points = 0;
        for (SnailType snail : SnailType.values()){
            if(snail == SnailType.NORMAL){
                mySnails.putIfAbsent(snail, true);
            } else {
                mySnails.putIfAbsent(snail, false);
            }
        }
        initRecords();
    }

    public void initRecords(){
        records.putIfAbsent("mapa1", 1000000000);
        records.putIfAbsent("mapa2", 1000000000);
        records.putIfAbsent("mapa3", 1000000000);
    }


    
    /** 
     * @return String Devuelve el nombre del jugador
     */
    public String getName() {
        return this.name;
    }

    
    /** 
     * @return String Devuelve el pass del jugador
     */
    public String getPass() {
        return this.pass;
    }

    
    /** 
     * @param name Nuevo nombre del jugador
     */
    public void setName(String name) {
        this.name = name;
    }

    
    /** 
     * @param pass Nueva contraseña del jugador
     */
    public void setPass(String pass){
        this.pass = pass;
    }

    public int getLifes() {
        return lifes;
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

    public int getCash() {
        return cash;
    }

    public void setCash(int cash) {
        this.cash = cash;
    }

    public ConcurrentHashMap<String, Integer> getRecords() {
        return records;
    }

    public void setRecords(ConcurrentHashMap<String, Integer> records) {
        this.records = records;
    }

    public int getMAXNUMLIFES() {
        return MAXNUMLIFES;
    }

    public int getSECONDSTOGETALIFE() {
        return SECONDSTOGETALIFE;
    }

    public int getSecondsWaitingForLife() {
        return secondsWaitingForLife;
    }

    public void setSecondsWaitingForLife(int secondsWaitingForLife) {
        this.secondsWaitingForLife = secondsWaitingForLife;
    }

    public boolean incrementWaitingTime() {
		secondsWaitingForLife++;

		if (secondsWaitingForLife >= SECONDSTOGETALIFE) {
            lifes++;
			secondsWaitingForLife = 0;
            return true;
        }
        return false;
	}

    public void castFromPlayerCon(PlayerConected player){
        this.name = player.getNombre();
        this.cash = player.getCash();
        this.lifes = player.getLifes();
        this.points = player.getPoints();
        this.records = player.records;
        this.gamesPlayed = player.gamesPlayed;
        this.gamesWon = player.gamesWon;
        this.myAchievements = player.myAchievements;
        this.secondsWaitingForLife = player.secondsWaitingForLife;
    }

    public boolean isConnected() {
        return connected;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
    }


}
