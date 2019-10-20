package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import com.google.gson.JsonObject;
import com.server.Slooow.MapObject.type;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class Room {
	protected Map map;
	protected String mapName;
	protected PlayerConected owner;
	protected HashMap<WebSocketSession, PlayerConected> jugadoresEnSala = new HashMap<WebSocketSession, PlayerConected>();
	protected String name;
	protected ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	protected final int TICKTIME = 33;
	protected int acummulativeTime = 0;
	protected String myType;

	SnailGame game;

	protected boolean lastFrameGroundCollision = false;
	protected boolean lastFrameWallCollision = false;
	protected boolean lastFrameWallSlopeCollision = false;

	protected ArrayList<SpikesObstacle> spikesArray = new ArrayList<>();
	protected ArrayList<DoorMap> doorArray = new ArrayList<>();
	protected ArrayList<TrapDoor> trapDoorArray = new ArrayList<>();
	protected ArrayList<Trampoline> trampolineArray = new ArrayList<>();
	protected ArrayList<Wind> windArray = new ArrayList<>();
	protected ArrayList<MapPowerUp> powerArray = new ArrayList<>();

	public Room(String name, PlayerConected owner, SnailGame game, String mapName,String myType) {
		this.owner = owner;
		this.name = name;
		this.game = game;
		this.mapName = mapName;
		this.myType = myType;
		jugadoresEnSala.putIfAbsent(owner.getSession(), owner);	
	}

	public void startRoom(){
		map = new Map(2000, mapName);
		createMap();
		sendMap();
		tick();
	}

	public void sendMap() {

	}

	public void tick() {
	};

	public void destroyRoom() {
		game.deleteRoom(this);
	}

	public void createMap() {
		switch(mapName){
			case "mapa1":
			createLevel1();
			break;
			case "mapa2":
			createLevel2();
			break;
			case "mapa3":
			createLevel3();
			break;
			default:
			System.out.println("Mapa no existe");
		}
		

	}

	public void updateTrapDoor() {
		int i = 0;
		for (TrapDoor trap : trapDoorArray) {
			boolean cambio = trap.update();

			if (cambio) {

				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATETRAPDOOR");
				msg.addProperty("id", i);
				msg.addProperty("state", trap.estate.toString());

				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}

			}
			i++;
		}
	}

	public void updateDoors() {
		int i = 0;
		for (DoorMap door : doorArray) {
			if (door.update()) {

				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATEDOOR");
				msg.addProperty("id", i);
				msg.addProperty("state", door.estate.toString());

				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}

			}
			i++;
		}
	}

	public void updateWind() {
		int i = 0;
		for (Wind wind : windArray) {
			if(wind.update()){
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "WINDUPDATE");
				msg.addProperty("id", i);
				msg.addProperty("direction", wind.goingRigth);
				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}
			}
			i++;
		}
	}

	public void updateTrampoline() {
		int i = 0;
		for (Trampoline trampoline : trampolineArray) {
			if (trampoline.update()) {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATETRAMPOLINE");
				msg.addProperty("id", i);
				msg.addProperty("estate", trampoline.trampoEstate.toString());

				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}

			}
			i++;
		}
	}

	public void updateObstacles() {
		int i = 0;
		for (SpikesObstacle obstacle : spikesArray) {

			if (obstacle.update() || obstacle.playerCrash) {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "OBSTACLEUPDATE");
				msg.addProperty("id", i);
				msg.addProperty("estate", obstacle.estate.toString());
				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}
			}
			obstacle.playerCrash = false;
			i++;
		}

	}


	public void createLevel3(){
		int unit = owner.mySnail.colliderOfsetX;
		int acumulativePosX = 100;
		int acumulativePosY = 400;
		int groundHeigth = 10;
		int wallDisplacement = 0;
		map.addMapObject(new MapGround(216* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;

		
		map.addMapObject(new MapGround(3* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		Trampoline trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 6,25);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;
		acumulativePosY -= unit;

		

		//Preparamos camino negro

		int acumulativeCaminoNegroX = acumulativePosX + 4*unit;
		int acumulativeCaminoNegroY = acumulativePosY + 20*unit;

		SpikesObstacle spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 2 * unit, acumulativePosY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);



		map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 8 * unit;

		 trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 6,20);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;
		acumulativePosY -= unit;

		//CaminoRojo

		int acumulativeCaminoRojoX = acumulativePosX + 3*unit;
		int acumulativeCaminoRojoY = acumulativePosY + 15*unit;


		Wind windAux = new Wind(4 * unit, 2 * unit, acumulativePosX+ 1 * unit, acumulativePosY, type.WIND, true, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 8 * unit;

		 trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 3,17);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;


		//Camino Negro discontinuo
		int acumulativeCaminoNegroDiscontinuoX = acumulativePosX;
		int acumulativeCaminoNegroDiscontinuoY = acumulativePosY + 10*unit;
		

		// llegamos al suelo

		acumulativePosX += 6* unit;
		acumulativePosY = 400;

		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 2 * unit, acumulativePosY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(6* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 6 * unit;

		map.addMapObject(new MapWall(20, 6 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 6 * unit;

		map.addMapObject(new MapGround(5* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;

		trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 6,16);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;

		map.addMapObject(new MapGround(3* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		//Preparacion Camino negro bajo azul trampilla

		int acumulativeCaminoNegro2X = acumulativePosX;
		int acumulativeCaminoNegro2Y = acumulativePosY + unit*4;

		map.addMapObject(new MapWall(20, 11 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 11 * unit;

		map.addMapObject(new MapGround(3* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		TrapDoor trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		MapPowerUp auxPower = new MapPowerUp(unit, unit, acumulativePosX+ 5 * unit, acumulativePosY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		map.addMapObject(new MapGround(5* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;

		//Creacion Camino Negro2 

		windAux = new Wind(6 * unit, 2 * unit, acumulativeCaminoNegro2X+ 3 * unit, acumulativeCaminoNegro2Y, type.WIND, true, 1.5f, true,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);


		map.addMapObject(new MapGround(14* unit, groundHeigth*2, acumulativeCaminoNegro2X + unit, acumulativeCaminoNegro2Y, type.GROUND));
		acumulativeCaminoNegro2X += 15 * unit;

		//ACABAMOS CAMINO NEGRO

		acumulativePosX = acumulativeCaminoNegro2X;
		acumulativePosY = acumulativeCaminoNegro2Y - 3*unit;

				map.addMapObject(new MapGround(2* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 2 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		map.addMapObject(new MapGround(2* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 2 * unit;
		acumulativePosY -= 5 * unit;

		map.addMapObject(new MapGround(4* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;
		acumulativePosY -= 4 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 2 * unit, acumulativePosY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 8 * unit;
		acumulativePosY -= 4 * unit;

		// Hacemos la parte Negra arriba

		map.addMapObject(new MapGround(2* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 2 * unit;
		

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativeCaminoNegroX, acumulativeCaminoNegroY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativeCaminoNegroX += 3 * unit;


		
		map.addMapObject(new MapGround(10* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 10 * unit;


		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.WALL));
		acumulativeCaminoNegroY += 4 * unit;

		map.addMapObject(new MapGround(5* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 5 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativeCaminoNegroX, acumulativeCaminoNegroY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativeCaminoNegroX += 3 * unit;


				map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 8 * unit;

		//FIN PARTE NEGRA ARRIBA1

		//CAMINO ROJO

		windAux = new Wind(8 * unit, 2 * unit, acumulativeCaminoRojoX + 5*unit,acumulativeCaminoRojoY, type.WIND, true, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		map.addMapObject(new MapGround(13* unit, groundHeigth*2, acumulativeCaminoRojoX,acumulativeCaminoRojoY, type.GROUND));
		acumulativeCaminoRojoX+= 13 * unit;

		// FIN CAMINO ROJO

		//Camino Discontinuo Negro

				map.addMapObject(new MapGround(6* unit, groundHeigth*2, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.GROUND));
		acumulativeCaminoNegroDiscontinuoX+= 6 * unit;

				map.addMapObject(new MapWall(20, 8 * unit - wallDisplacement, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.WALL));
		acumulativeCaminoNegroDiscontinuoY += 8 * unit;

		//Cogemos coordenadas para camino rojo discontinuo

		int acumulativeCaminoDiscontinuoRojoX = acumulativeCaminoNegroDiscontinuoX;
		int acumulativeCaminoDiscontinuoRojoY = acumulativeCaminoNegroDiscontinuoY;

		DoorMap doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativeCaminoNegroDiscontinuoX, acumulativeCaminoNegroDiscontinuoY, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativeCaminoNegroDiscontinuoY += 2 * unit;

		map.addMapObject(new MapWall(20, 2 * unit - wallDisplacement, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.WALL));
		acumulativeCaminoNegroDiscontinuoY += 2 * unit;

		//Pasamos al camino negro de arriba

		auxPower = new MapPowerUp(unit, unit, acumulativeCaminoNegroDiscontinuoX+ 5 * unit, acumulativeCaminoNegroDiscontinuoY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);


				spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativeCaminoNegroDiscontinuoX+ 15 * unit, acumulativeCaminoNegroDiscontinuoY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);


		map.addMapObject(new MapGround(17* unit, groundHeigth*2, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.GROUND));
		acumulativeCaminoNegroDiscontinuoX+= 17 * unit;

		//Hacemos discontinuoRojo

				auxPower = new MapPowerUp(unit, unit, acumulativeCaminoDiscontinuoRojoX+ 5 * unit, acumulativeCaminoDiscontinuoRojoY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);


				map.addMapObject(new MapGround(10* unit, groundHeigth*2, acumulativeCaminoDiscontinuoRojoX, acumulativeCaminoDiscontinuoRojoY, type.GROUND));
		acumulativeCaminoDiscontinuoRojoX+= 10 * unit;

		//REPETIMOS MAPA

		acumulativePosX += acumulativePosX + 5*unit;
		acumulativePosY = 400;

				map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;

		
		map.addMapObject(new MapGround(3* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 6,25);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;
		acumulativePosY -= unit;

		

		//Preparamos camino negro

		acumulativeCaminoNegroX = acumulativePosX + 4*unit;
		acumulativeCaminoNegroY = acumulativePosY + 20*unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 2 * unit, acumulativePosY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);



		map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 8 * unit;

		 trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 6,20);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;
		acumulativePosY -= unit;

		//CaminoRojo

		acumulativeCaminoRojoX = acumulativePosX + 3*unit;
		acumulativeCaminoRojoY = acumulativePosY + 15*unit;


		windAux = new Wind(4 * unit, 2 * unit, acumulativePosX+ 1 * unit, acumulativePosY, type.WIND, true, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 8 * unit;

		 trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 3,17);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;


		//Camino Negro discontinuo
		 acumulativeCaminoNegroDiscontinuoX = acumulativePosX;
		acumulativeCaminoNegroDiscontinuoY = acumulativePosY + 10*unit;
		

		// llegamos al suelo

		acumulativePosX += 6* unit;
		acumulativePosY = 400;

		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 2 * unit, acumulativePosY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(6* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 6 * unit;

		map.addMapObject(new MapWall(20, 6 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 6 * unit;

		map.addMapObject(new MapGround(5* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;

		trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 6,16);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;

		map.addMapObject(new MapGround(3* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		//Preparacion Camino negro bajo azul trampilla

		acumulativeCaminoNegro2X = acumulativePosX;
		 acumulativeCaminoNegro2Y = acumulativePosY + unit*4;

		map.addMapObject(new MapWall(20, 11 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 11 * unit;

		map.addMapObject(new MapGround(3* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		 trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		 auxPower = new MapPowerUp(unit, unit, acumulativePosX+ 5 * unit, acumulativePosY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		map.addMapObject(new MapGround(5* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;

		//Creacion Camino Negro2 

		windAux = new Wind(6 * unit, 2 * unit, acumulativeCaminoNegro2X+ 3 * unit, acumulativeCaminoNegro2Y, type.WIND, true, 1.5f, true,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);


		map.addMapObject(new MapGround(14* unit, groundHeigth*2, acumulativeCaminoNegro2X + unit, acumulativeCaminoNegro2Y, type.GROUND));
		acumulativeCaminoNegro2X += 15 * unit;

		//ACABAMOS CAMINO NEGRO

		acumulativePosX = acumulativeCaminoNegro2X;
		acumulativePosY = acumulativeCaminoNegro2Y - 3*unit;

				map.addMapObject(new MapGround(2* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 2 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		map.addMapObject(new MapGround(2* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 2 * unit;
		acumulativePosY -= 5 * unit;

		map.addMapObject(new MapGround(4* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;
		acumulativePosY -= 4 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 2 * unit, acumulativePosY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 8 * unit;
		acumulativePosY -= 4 * unit;

		// Hacemos la parte Negra arriba

		map.addMapObject(new MapGround(2* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 2 * unit;
		

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativeCaminoNegroX, acumulativeCaminoNegroY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativeCaminoNegroX += 3 * unit;


		
		map.addMapObject(new MapGround(10* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 10 * unit;


		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.WALL));
		acumulativeCaminoNegroY += 4 * unit;

		map.addMapObject(new MapGround(5* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 5 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativeCaminoNegroX, acumulativeCaminoNegroY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativeCaminoNegroX += 3 * unit;


				map.addMapObject(new MapGround(8* unit, groundHeigth*2, acumulativeCaminoNegroX,acumulativeCaminoNegroY, type.GROUND));
		acumulativeCaminoNegroX+= 8 * unit;

		//FIN PARTE NEGRA ARRIBA1

		//CAMINO ROJO

		windAux = new Wind(8 * unit, 2 * unit, acumulativeCaminoRojoX + 5*unit,acumulativeCaminoRojoY, type.WIND, true, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		map.addMapObject(new MapGround(13* unit, groundHeigth*2, acumulativeCaminoRojoX,acumulativeCaminoRojoY, type.GROUND));
		acumulativeCaminoRojoX+= 13 * unit;

		// FIN CAMINO ROJO

		//Camino Discontinuo Negro

				map.addMapObject(new MapGround(6* unit, groundHeigth*2, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.GROUND));
		acumulativeCaminoNegroDiscontinuoX+= 6 * unit;

				map.addMapObject(new MapWall(20, 8 * unit - wallDisplacement, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.WALL));
		acumulativeCaminoNegroDiscontinuoY += 8 * unit;

		//Cogemos coordenadas para camino rojo discontinuo

		 acumulativeCaminoDiscontinuoRojoX = acumulativeCaminoNegroDiscontinuoX;
		acumulativeCaminoDiscontinuoRojoY = acumulativeCaminoNegroDiscontinuoY;

		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativeCaminoNegroDiscontinuoX, acumulativeCaminoNegroDiscontinuoY, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativeCaminoNegroDiscontinuoY += 2 * unit;

		map.addMapObject(new MapWall(20, 2 * unit - wallDisplacement, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.WALL));
		acumulativeCaminoNegroDiscontinuoY += 2 * unit;

		//Pasamos al camino negro de arriba

		auxPower = new MapPowerUp(unit, unit, acumulativeCaminoNegroDiscontinuoX+ 5 * unit, acumulativeCaminoNegroDiscontinuoY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);


				spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativeCaminoNegroDiscontinuoX+ 15 * unit, acumulativeCaminoNegroDiscontinuoY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);


		map.addMapObject(new MapGround(17* unit, groundHeigth*2, acumulativeCaminoNegroDiscontinuoX,acumulativeCaminoNegroDiscontinuoY, type.GROUND));
		acumulativeCaminoNegroDiscontinuoX+= 17 * unit;

		//Hacemos discontinuoRojo

				auxPower = new MapPowerUp(unit, unit, acumulativeCaminoDiscontinuoRojoX+ 5 * unit, acumulativeCaminoDiscontinuoRojoY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);


				map.addMapObject(new MapGround(10* unit, groundHeigth*2, acumulativeCaminoDiscontinuoRojoX, acumulativeCaminoDiscontinuoRojoY, type.GROUND));
		acumulativeCaminoDiscontinuoRojoX+= 10 * unit;

		map.addMapObject(new FinishMap(unit*6, unit, acumulativePosX + 5*unit, 400, type.FINISH, this));






	}

	public void createLevel2() {
		int unit = owner.mySnail.colliderOfsetX;
		int acumulativePosX = 100;
		int acumulativePosY = 400;
		int groundHeigth = 10;
		int wallDisplacement = 0;


		map.addMapObject(new MapGround(216* unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;

		map.addMapObject(new MapGround(5 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;

				//// PREPARAMOS EL DESVIO ROJO
		int acumulativePosXRedPath = acumulativePosX;
		int acumulativePosYRedPath = acumulativePosY;

			map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;



		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		TrapDoor trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		//CREACION PARTE CAMINO NEGRO
		int acumulativePosXNegro = acumulativePosX;
		int acumulativePosYNegro = acumulativePosY;

		DoorMap doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;



		map.addMapObject(new MapWall(20, 3 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 3 * unit;

		map.addMapObject(new MapGround(2 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 1 * unit;

		Trampoline trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 9, 22);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;

		//preparamos caminos encima tramplolin
		int acumulativeDiscontinuoNegroX = acumulativePosX + 3*unit;
		int acumulativeDiscontinuoNegroY = acumulativePosY + 9*unit;
		int acumulativeDiscontinuoRojoX = acumulativePosX + 3*unit;
		int acumulativeDiscontinuoRojoY = acumulativePosY + 15*unit;

		map.addMapObject(new MapGround(2 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 2 * unit;

		//Camino discontinuo Negro

		map.addMapObject(new MapGround(16 * unit, groundHeigth*2, acumulativeDiscontinuoNegroX, acumulativeDiscontinuoNegroY, type.GROUND));
		
		MapPowerUp auxPower = new MapPowerUp(unit, unit, acumulativeDiscontinuoNegroX+ 6 * unit, acumulativeDiscontinuoNegroY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		
		Wind windAux = new Wind(8 * unit, 2 * unit, acumulativeDiscontinuoNegroX+ 3 * unit, acumulativeDiscontinuoNegroY, type.WIND, true, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		//FIN CAMINO NEGRO DISCONTINUO

		//Camino rojo discontinuo

		map.addMapObject(new MapGround(50 * unit, groundHeigth*2, acumulativeDiscontinuoRojoX, acumulativeDiscontinuoRojoY, type.GROUND));
		

		windAux = new Wind(30 * unit, 2 * unit, acumulativeDiscontinuoRojoX+ 10 * unit, acumulativeDiscontinuoRojoY, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		auxPower = new MapPowerUp(unit, unit, acumulativeDiscontinuoRojoX+ 45 * unit, acumulativeDiscontinuoRojoY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		//Hacemos primer camino negro

		SpikesObstacle spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosXNegro + 12 * unit, acumulativePosYNegro ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(25 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 25 * unit;

		//Volvemos al camino azul
		acumulativePosX = acumulativePosXNegro;
		acumulativePosY = acumulativePosYNegro;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;
		acumulativePosYNegro += 4*unit;

		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		//hacemos caminoNegro2

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosX += 3 * unit;

		//Desvio Rojo1

		map.addMapObject(new MapGround(5 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 5 * unit;
		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXRedPath, acumulativePosYRedPath, type.SLOPE));

		acumulativePosXRedPath += 5 * unit;
		acumulativePosYRedPath = 400;

		windAux = new Wind(10 * unit, 2 * unit, acumulativePosXRedPath+ 3 * unit, acumulativePosYRedPath, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		map.addMapObject(new MapGround(30 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 30 * unit;


		map.addMapObject(new MapWall(20, 3 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 3 * unit;

		map.addMapObject(new MapGround(1 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 1 * unit;

		trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 9, 22);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosXRedPath += 4 * unit;

		map.addMapObject(new MapGround(4 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 4 * unit;

		map.addMapObject(new MapWall(20, 9 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 9 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosXRedPath + 4 * unit, acumulativePosYRedPath ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		auxPower = new MapPowerUp(unit, unit, acumulativePosXRedPath+ 9 * unit, acumulativePosYRedPath + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		map.addMapObject(new MapGround(11 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 11 * unit;


		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 4 * unit;

		//Preparando discontinuo Negro2

		acumulativeDiscontinuoNegroX = acumulativePosXRedPath;
		acumulativeDiscontinuoNegroY = acumulativePosYRedPath;

		
		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosYRedPath += 2 * unit;

		//PREPARANDO DESVIO AZUL
		acumulativePosX = acumulativePosXRedPath + 6*unit;
		acumulativePosY = acumulativePosYRedPath + 2 * unit;


			map.addMapObject(new MapWall(20, 6 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 6 * unit;


		map.addMapObject(new MapGround(8 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 8 * unit;


		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosXRedPath += 3 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosXRedPath + 4 * unit, acumulativePosYRedPath ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(14 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 14 * unit;

		//Hacemos Camino Azul
		map.addMapObject(new MapGround(4 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		windAux = new Wind(10 * unit, 2 * unit, acumulativePosX+ 3 * unit, acumulativePosY, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);



		map.addMapObject(new MapGround(15 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 15 * unit;


		// hacemos el camino negro 

		acumulativePosXNegro =   acumulativeDiscontinuoNegroX+8*unit;
		acumulativePosYNegro =  acumulativeDiscontinuoNegroY;
		

		


		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 3 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosXNegro += 3 * unit;

		auxPower = new MapPowerUp(unit, unit, acumulativePosXNegro+ 9 * unit, acumulativePosYNegro + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);



		map.addMapObject(new MapGround(17 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosX += 17 * unit;

		//CAMINO DISCONTINUO NEGRO ABAJO

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativeDiscontinuoNegroX, acumulativeDiscontinuoNegroY, type.GROUND));
		acumulativeDiscontinuoNegroX += 3 * unit;

		acumulativeDiscontinuoNegroY -= 5 * unit;

		windAux = new Wind(10 * unit, 2 * unit, acumulativeDiscontinuoNegroX+ 8 * unit, acumulativeDiscontinuoNegroY, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativeDiscontinuoNegroX + 20 * unit, acumulativeDiscontinuoNegroY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);



		map.addMapObject(new MapGround(30 * unit, groundHeigth*2, acumulativeDiscontinuoNegroX, acumulativeDiscontinuoNegroY, type.GROUND));
		acumulativeDiscontinuoNegroX += 30 * unit;

		acumulativePosX =  acumulativeDiscontinuoNegroX + 5*unit;
		acumulativePosY = 400;


		//REPETICION MAPA

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;

		map.addMapObject(new MapGround(5 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;

				//// PREPARAMOS EL DESVIO ROJO
		 acumulativePosXRedPath = acumulativePosX;
		 acumulativePosYRedPath = acumulativePosY;

			map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;



		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		//CREACION PARTE CAMINO NEGRO
		 acumulativePosXNegro = acumulativePosX;
		 acumulativePosYNegro = acumulativePosY;

		 doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;



		map.addMapObject(new MapWall(20, 3 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 3 * unit;

		map.addMapObject(new MapGround(2 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 1 * unit;

		 trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 9, 22);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;

		//preparamos caminos encima tramplolin
		acumulativeDiscontinuoNegroX = acumulativePosX + 3*unit;
		acumulativeDiscontinuoNegroY = acumulativePosY + 9*unit;
		acumulativeDiscontinuoRojoX = acumulativePosX + 3*unit;
		acumulativeDiscontinuoRojoY = acumulativePosY + 15*unit;

		map.addMapObject(new MapGround(2 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 2 * unit;

		//Camino discontinuo Negro

		map.addMapObject(new MapGround(16 * unit, groundHeigth*2, acumulativeDiscontinuoNegroX, acumulativeDiscontinuoNegroY, type.GROUND));
		
		auxPower = new MapPowerUp(unit, unit, acumulativeDiscontinuoNegroX+ 6 * unit, acumulativeDiscontinuoNegroY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		
		windAux = new Wind(8 * unit, 2 * unit, acumulativeDiscontinuoNegroX+ 3 * unit, acumulativeDiscontinuoNegroY, type.WIND, true, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);
		

		//FIN CAMINO NEGRO DISCONTINUO

		//Camino rojo discontinuo

		map.addMapObject(new MapGround(50 * unit, groundHeigth*2, acumulativeDiscontinuoRojoX, acumulativeDiscontinuoRojoY, type.GROUND));
		

		windAux = new Wind(30 * unit, 2 * unit, acumulativeDiscontinuoRojoX+ 10 * unit, acumulativeDiscontinuoRojoY, type.WIND, true, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);
		

		auxPower = new MapPowerUp(unit, unit, acumulativeDiscontinuoRojoX+ 45 * unit, acumulativeDiscontinuoRojoY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		//Hacemos primer camino negro

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosXNegro + 12 * unit, acumulativePosYNegro ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(25 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 25 * unit;

		//Volvemos al camino azul
		acumulativePosX = acumulativePosXNegro;
		acumulativePosY = acumulativePosYNegro;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;
		acumulativePosYNegro += 4*unit;

		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 4 * unit;

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		//hacemos caminoNegro2

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosX += 3 * unit;

		//Desvio Rojo1

		map.addMapObject(new MapGround(5 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 5 * unit;
		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXRedPath, acumulativePosYRedPath, type.SLOPE));

		acumulativePosXRedPath += 5 * unit;
		acumulativePosYRedPath = 400;

		windAux = new Wind(10 * unit, 2 * unit, acumulativePosXRedPath+ 3 * unit, acumulativePosYRedPath, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		map.addMapObject(new MapGround(30 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 30 * unit;


		map.addMapObject(new MapWall(20, 3 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 3 * unit;

		map.addMapObject(new MapGround(1 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 1 * unit;

		trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 9, 22);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosXRedPath += 4 * unit;

		map.addMapObject(new MapGround(4 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 4 * unit;

		map.addMapObject(new MapWall(20, 9 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 9 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosXRedPath + 4 * unit, acumulativePosYRedPath ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		auxPower = new MapPowerUp(unit, unit, acumulativePosXRedPath+ 9 * unit, acumulativePosYRedPath + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		map.addMapObject(new MapGround(11 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 11 * unit;


		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 4 * unit;

		//Preparando discontinuo Negro2

		acumulativeDiscontinuoNegroX = acumulativePosXRedPath;
		acumulativeDiscontinuoNegroY = acumulativePosYRedPath;

		
		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.DOOR,
		1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosYRedPath += 2 * unit;

		//PREPARANDO DESVIO AZUL
		acumulativePosX = acumulativePosXRedPath + 6*unit;
		acumulativePosY = acumulativePosYRedPath + 2 * unit;


			map.addMapObject(new MapWall(20, 6 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 6 * unit;


		map.addMapObject(new MapGround(8 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 8 * unit;


		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosXRedPath += 3 * unit;

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosXRedPath + 4 * unit, acumulativePosYRedPath ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(14 * unit, groundHeigth*2, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 14 * unit;

		//Hacemos Camino Azul
		map.addMapObject(new MapGround(4 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		windAux = new Wind(10 * unit, 2 * unit, acumulativePosX+ 3 * unit, acumulativePosY, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);



		map.addMapObject(new MapGround(15 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 15 * unit;


		// hacemos el camino negro 

		acumulativePosXNegro =   acumulativeDiscontinuoNegroX+8*unit;
		acumulativePosYNegro =  acumulativeDiscontinuoNegroY;

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 3 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.TRAPDOOR, 1800,
		2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosXNegro += 3 * unit;

		auxPower = new MapPowerUp(unit, unit, acumulativePosXNegro+ 9 * unit, acumulativePosYNegro + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);



		map.addMapObject(new MapGround(17 * unit, groundHeigth*2, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosX += 17 * unit;

		//CAMINO DISCONTINUO NEGRO ABAJO

		map.addMapObject(new MapGround(3 * unit, groundHeigth*2, acumulativeDiscontinuoNegroX, acumulativeDiscontinuoNegroY, type.GROUND));
		acumulativeDiscontinuoNegroX += 3 * unit;

		acumulativeDiscontinuoNegroY -= 5 * unit;

		windAux = new Wind(10 * unit, 2 * unit, acumulativeDiscontinuoNegroX+ 8 * unit, acumulativeDiscontinuoNegroY, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		
		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativeDiscontinuoNegroX + 20 * unit, acumulativeDiscontinuoNegroY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);


		map.addMapObject(new MapGround(30 * unit, groundHeigth*2, acumulativeDiscontinuoNegroX, acumulativeDiscontinuoNegroY, type.GROUND));
		acumulativeDiscontinuoNegroX += 30 * unit;


		acumulativePosX =  acumulativeDiscontinuoNegroX + 5*unit;
		acumulativePosY = 400;

		map.addMapObject(new FinishMap(unit*6, unit, acumulativePosX, 400, type.FINISH, this));
	}

	public void createLevel1() {
		int unit = owner.mySnail.colliderOfsetX;
		int acumulativePosX = 100;
		int acumulativePosY = 400;
		int groundHeigth = 10;
		int wallDisplacement = 0;
		map.addMapObject(new MapGround(160 * unit, groundHeigth*2, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;
		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;
		map.addMapObject(new MapGround(4 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;
		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;

		// el power up no cuenta para el aumento d elo sacumulatives
		MapPowerUp auxPower = new MapPowerUp(unit, unit, acumulativePosX + 3 * unit, acumulativePosY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		map.addMapObject(new MapGround(6 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 6 * unit;
		TrapDoor trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1800,
				2800, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;
		// DESVIO Rojo1
		int acumulativePosXRedPath = acumulativePosX + 2 * unit;
		int acumulativePosYRedPath = 400;
		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath,
				type.WALL));
		acumulativePosYRedPath += 4 * unit;
		map.addMapObject(
				new MapGround(4 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 4 * unit;
		// son 5 hacia abajo pero el tamaño real que queremos conseguir es 4, el extra
		// es para que el
		// tenedor quede bien
		map.addMapObject(new MapSlope(5 * unit, Math.toRadians(-45), acumulativePosXRedPath, acumulativePosYRedPath,
				type.SLOPE));
		// FIN DESVIO1
		map.addMapObject(new MapGround(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;
		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(45), acumulativePosX, acumulativePosY, type.SLOPE));
		acumulativePosX += 6 * unit;
		// el alto de la cuesta; 91
		acumulativePosY += 6 * unit;
		map.addMapObject(
				new MapGround(1 * unit, groundHeigth, acumulativePosX, acumulativePosY - (unit / 2), type.GROUND));
		acumulativePosX += 1 * unit;

		Trampoline trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY -unit ,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 9, 22);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;

		// map.addMapObject(new MapGround(4*unit, groundHeigth,
		// acumulativePosX,acumulativePosY, type.GROUND));

		// Desvio Negro1
		int acumulativePosXNegro = acumulativePosX;
		int acumulativePosYNegro = acumulativePosY;
		acumulativePosXNegro += 6 * unit;
		acumulativePosYNegro += 11 * unit;

		map.addMapObject(
				new MapGround(6 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 6 * unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXNegro, acumulativePosYNegro, type.SLOPE));

		acumulativePosXNegro += 5 * unit;
		acumulativePosYNegro -= 5 * unit;

		// Las posiciones del power up no cuentan para le aumento global
		auxPower = new MapPowerUp(unit, unit, acumulativePosXNegro + 3 * unit, acumulativePosYNegro + unit / 2,
				type.POWERUP);
		map.addMapObject(auxPower);

		powerArray.add(auxPower);

		map.addMapObject(
				new MapGround(8 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 8 * unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXNegro, acumulativePosYNegro, type.SLOPE));

		acumulativePosXNegro += 6 * unit;
		acumulativePosYNegro -= unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXNegro, acumulativePosYNegro, type.SLOPE));

		acumulativePosXNegro += 6 * unit;
		acumulativePosYNegro -= unit;

		// despues del trampolin sarten, volvemos camino azul
		map.addMapObject(
				new MapGround(4 * unit, groundHeigth, acumulativePosX, acumulativePosY - 2 * unit, type.GROUND));
		acumulativePosX += 4 * unit;
		acumulativePosY -= 2 * unit;

		map.addMapObject(new MapSlope(4 * unit, Math.toRadians(-60), acumulativePosX, acumulativePosY, type.SLOPE));
		acumulativePosX += 4 * unit;

		// volvemos a llegar al suelo
		acumulativePosX += 3 * unit;
		acumulativePosY = 400;

		SpikesObstacle spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 6 * unit, acumulativePosY ,
		type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);


		Wind windAux = new Wind(11 * unit, 2 * unit, acumulativePosX, acumulativePosY, type.WIND, false, 1.5f, false,
				5800, TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		acumulativePosX += 12 * unit;

		map.addMapObject(
				new MapWall(20, 6 * unit - wallDisplacement, acumulativePosX + 4 * unit, acumulativePosY, type.WALL));

		acumulativePosX += 4 * unit;
		acumulativePosY += 6 * unit;

		auxPower = new MapPowerUp(unit, unit, acumulativePosX + 2 * unit, acumulativePosY + unit / 2, type.POWERUP);
		map.addMapObject(auxPower);

		powerArray.add(auxPower);

		map.addMapObject(new MapGround(7 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));

		acumulativePosX += 7 * unit;

		// devio Rojo 1ª puerta
		acumulativePosXRedPath = acumulativePosX + 1 * unit;
		acumulativePosYRedPath = acumulativePosY;

		DoorMap doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR,
				1800, 2000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		map.addMapObject(new MapWall(20, 6 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

		acumulativePosY += 6 * unit;

		 spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 10 * unit, acumulativePosY,
				type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(19 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));

		acumulativePosX += 19 * unit;

		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR, 1500, 1000,
				TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		// Empieza el camino gris
		int acumulativePosXGris = acumulativePosX;
		int acumulativePosYGris = acumulativePosY - 2 * unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXGris, acumulativePosYGris, type.SLOPE));
		acumulativePosXGris += 4 * unit;
		acumulativePosYGris -= 4 * unit;


		// FIN DESVIOGRIS

		map.addMapObject(new MapWall(20, 10 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

		acumulativePosY += 10 * unit;

		map.addMapObject(new MapGround(5 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));

		acumulativePosX += 5 * unit;

		// DesvioCaminoNegro2
		acumulativePosXNegro = acumulativePosX - 3 * unit;
		acumulativePosYNegro = acumulativePosY - 7 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosX, acumulativePosY, type.SLOPE));
		acumulativePosX += 4 * unit;
		acumulativePosY -= 4 * unit;

		map.addMapObject(new MapGround(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 1000, 800,
				TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		auxPower = new MapPowerUp(unit, unit, acumulativePosX + 2 * unit, acumulativePosY + unit / 2,
		type.POWERUP);
		map.addMapObject(auxPower);

		powerArray.add(auxPower);

		map.addMapObject(new MapGround(2 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 2 * unit;



		// camino azul se junta con el negro.

		map.addMapObject(
				new MapWall(20, 5 * unit - wallDisplacement, acumulativePosXNegro, acumulativePosYNegro, type.WALL));

		acumulativePosY -= 5 * unit;

		// DEBERIA IR PARTE DEL SUELO MOJADO
		map.addMapObject(
				new MapGround(20 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosX +=  20* unit;

		///// FIN CAMINO NGERO 2 SE JUNTA CON EL AZUL
		// Empezamos segundo camino rojo
		map.addMapObject(
				new MapGround(7 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 7 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXRedPath, acumulativePosYRedPath,
				type.SLOPE));

		acumulativePosXRedPath += 5 * unit;
		acumulativePosYRedPath -= 5 * unit;


		auxPower = new MapPowerUp(unit, unit, acumulativePosXRedPath + 6 * unit, acumulativePosYRedPath + unit / 2,
		type.POWERUP);
		map.addMapObject(auxPower);

		powerArray.add(auxPower);


		map.addMapObject(
				new MapGround(15 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 15 * unit;

		map.addMapObject(new MapWall(20, 10 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath, type.WALL));
		acumulativePosYRedPath += 10 * unit;

		windAux = new Wind(13 * unit, 12 * unit, acumulativePosXRedPath, acumulativePosYRedPath, type.WIND, true, 1.2f,
				false, 2000, 33);
		windArray.add(windAux);
		map.addMapObject(windAux);

		auxPower = new MapPowerUp(unit, unit, acumulativePosXRedPath + 2 * unit, acumulativePosYRedPath + unit / 2,
				type.POWERUP);
		map.addMapObject(auxPower);

		powerArray.add(auxPower);

		spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosXRedPath + 7 * unit, acumulativePosYRedPath ,
				type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(14 * unit, groundHeigth, acumulativePosXRedPath,
				acumulativePosYRedPath , type.GROUND));
		acumulativePosXRedPath += 14 * unit;

		// acaba el suelo donde se unen el segundo camino rojo y el azul
		acumulativePosX = acumulativePosXRedPath;
		acumulativePosY = acumulativePosYRedPath;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosX + 1, acumulativePosY - 1 * unit,
				type.SLOPE));

		acumulativePosX += 5 * unit;
		acumulativePosY -= 5 * unit;

		map.addMapObject(new MapGround(5 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 5 * unit;
		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;

		// preparacionCaminoRojo

		acumulativePosXRedPath = acumulativePosX;
		acumulativePosYRedPath = acumulativePosY;

		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR, 3000, 1000,
				TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

		acumulativePosY += 4 * unit;

		// PREPARACION segundoCaminO negro
		acumulativePosXNegro = acumulativePosX;
		acumulativePosYNegro = acumulativePosY;

		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR, 1700, 1500,
				TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

		acumulativePosY += 4 * unit;

		map.addMapObject(new MapGround(5 * unit, groundHeigth, acumulativePosX-2, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosX, acumulativePosY - 1, type.SLOPE));

		// CREACION CAMINO ROJO ULTIMO

		map.addMapObject(
				new MapGround(5 * unit, groundHeigth, acumulativePosXRedPath-2, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 3 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXRedPath+1*unit, acumulativePosYRedPath,
				type.SLOPE));

		acumulativePosXRedPath += 5 * unit;
		acumulativePosYRedPath -= 5 * unit;

		map.addMapObject(
				new MapGround(12 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 12 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXRedPath, acumulativePosYRedPath,
				type.SLOPE));

		acumulativePosXRedPath += 6 * unit;
		acumulativePosYRedPath -= unit;

		acumulativePosXRedPath += 8 * unit;

		map.addMapObject(new FinishMap(unit*6, unit, acumulativePosXRedPath, 400, type.FINISH, this));



		// REALIZAMOS AHORA EL CAMINO NEGRO

		map.addMapObject(
				new MapGround(5 * unit, groundHeigth, acumulativePosXNegro-2, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 3 * unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXNegro+1*unit, acumulativePosYNegro, type.SLOPE));

		acumulativePosXNegro += 5 * unit;
		acumulativePosYNegro -= 5 * unit;

		map.addMapObject(
				new MapGround(6 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 6 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXNegro, acumulativePosYNegro - 1,
				type.SLOPE));

		acumulativePosXNegro += 6 * unit;
		acumulativePosYNegro -= unit;

	}

}