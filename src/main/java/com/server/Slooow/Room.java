package com.server.Slooow;

import java.util.ArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;


public class Room {
    protected Map map = new Map(2000);
   protected PlayerConected owner;
    protected String name;
    protected ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    protected final int TICKTIME = 33;
	protected int acummulativeTime = 0;
	
	SnailGame game;

	protected boolean lastFrameGroundCollision = false;
	protected boolean lastFrameWallCollision = false;
	protected boolean lastFrameWallSlopeCollision = false;

    protected ArrayList<SpikesObstacle> spikesArray = new ArrayList<>();
	protected ArrayList<DoorMap> doorArray = new ArrayList<>();
	protected ArrayList<TrapDoor> trapDoorArray = new ArrayList<>();
	protected ArrayList<Trampoline> trampolineArray = new ArrayList<>();
	protected ArrayList<Wind> windArray = new ArrayList<>();

    public Room(String name,PlayerConected owner, SnailGame game) {
        this.owner = owner;
		this.name = name;
		this.game = game;
		createMap();
		sendMap();
		tick();
    }

    public void sendMap(){

    }

	public void tick(){
	};
	
	public void destroyRoom(){
		game.deleteRoom(this);
		System.out.println("Sala Destruida");
	}
    
    public void createMap() {
		// MAPA 1
		/*

		map.addMapObject(new MapGround(300, 20, 0, 0, type.GROUND));
		/*TrapDoor trap = new TrapDoor(150, 20, 300, 0, type.TRAPDOOR, 3000, 3000, TICKTIME, 500, 500);
		map.addMapObject(trap);
		doorArray.add(trap);
		*/
		/*
		Trampoline trampoline = new Trampoline(100, 20, 300, 0, type.TRAMPOLINE, 99, 99, TICKTIME, 10, 30);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		map.addMapObject(new MapGround(100, 20, 400, 0, type.GROUND));
		map.addMapObject(new MapWall(20, 200, 500, 200, type.WALL));
		DoorMap door = new DoorMap(20, 200, 500, 0, type.DOOR, 3000, 3000, TICKTIME, 500, 500);
		map.addMapObject(door);
		doorArray.add(door);
		map.addMapObject(new MapGround(100, 20, 500, 400, type.GROUND));
		map.addMapObject(new MapGround(500, 20, 500, 0, type.GROUND));
		map.addMapObject(new MapGround(300, 20, 800, 400, type.GROUND));
		map.addMapObject(new MapGround(300, 20, 600, 200, type.GROUND));
		map.addMapObject(new MapWall(20, 200, 800, 200, type.WALL));
		*/

		/////////////////////////////////////////////////////////////////////////////////////
		
		/*
			map.addMapObject(new MapGround(300, 20, 0, 0, type.GROUND));
		  // Mapa2 map.addMapObject(new MapGround(100, 20, 0, 0, type.GROUND));
		  map.addMapObject(new MapWall(20, 400, 100, 0, type.WALL)); // tiene que haber debajo un suelo 
		  // minimo tiene que estar mas tiempopreparandose qu elo que tarda en recargar el // caracol. 
		  // 4000 serian 4.04 seg de preparacion y estaria activo cerca de 1 seg 
		  SpikesObstacle spike1 = new SpikesObstacle(100,100, 100, 400, type.OBSTACLE, 15000, 4000, TICKTIME);
		  map.addMapObject(spike1); 
		  spikesArray.add(spike1); 
		  map.addMapObject(new MapGround(100, 20, 100, 400, type.GROUND)); 
		  // 30º con 300u de width = 173u de height 
		  map.addMapObject(new MapSlope(300, Math.toRadians(-30), 200, 400,type.SLOPE));
		   //map.addMapObject(new MapGround(300, 20, 480, 220,type.GROUND));
		   //map.addMapObject(new MapPowerUp(40, 40, 550, 220,type.POWERUP));
		   map.addMapObject(new MapGround(200, 20, 480, 220,type.GROUND)); 
		   map.addMapObject(new MapSlope(300, Math.toRadians(30), 680, 220,type.SLOPE));
		   //map.addMapObject(new MapGround(300, 20, 780, 400,type.GROUND)); 
		   // map.addMapObject(new MapWall(20,200,900,193,type.WALL));
		   */
			/*
		  map.addMapObject(new MapGround(300, 20, 0, 0, type.GROUND));
		  map.addMapObject(new MapPowerUp(40,40,50,10,type.POWERUP));
		  map.addMapObject(new MapGround(300, 20, 300, 0, type.GROUND));
		  map.addMapObject(new MapWall(20,400,600,0,type.WALL));
		  map.addMapObject(new MapGround(300, 20, 600, 400, type.GROUND));
		  map.addMapObject(new MapGround(100, 20, 900, 400, type.GROUND));
		  map.addMapObject(new FinishMap(50,50,950,420,type.FINISH,this));
		  

		  SpikesObstacle spike1 = new SpikesObstacle(100,100, 600, 0, type.OBSTACLE, 3000, 3000, TICKTIME);
		  map.addMapObject(spike1); 
		  spikesArray.add(spike1); 
		  map.addMapObject(new MapGround(300, 20, 600, 0, type.GROUND));
		  map.addMapObject(new MapGround(100, 20, 900, 0, type.GROUND));
		  spike1 = new SpikesObstacle(100,100, 900, 0, type.OBSTACLE, 3000, 3000, TICKTIME);
		  map.addMapObject(spike1); 
		  spikesArray.add(spike1);
		  */

		 

	}



}