package com.server.Slooow;

import java.util.concurrent.ConcurrentHashMap;
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

    public void castFromPlayerCon(PlayerConected player){
        this.name = player.getNombre();
        this.cash = player.getCash();
        this.lifes = player.getLifes();
        this.points = player.getPoints();
        this.records = player.records;
    }

    public boolean isConnected() {
        return connected;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
    }


}
