package com.server.Slooow;

public class RecordInMap {

 
 /** 
  * @param name nombre del jugador que consigue el record
  * @param time tiempo en milisegundos
  * @return 
  */
    
	public RecordInMap(String name, int time) {
        playerName = name;
        this.time = time;
	}

    String playerName;
    Integer time;
    
}