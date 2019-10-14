package com.server.Slooow;


public class PlayerRegistered {

    private String name;
    private String pass;
	private int lifes;
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
        this.lifes = 3;
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


}
