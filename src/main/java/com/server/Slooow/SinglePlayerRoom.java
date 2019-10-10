package com.server.Slooow;

import static com.server.Slooow.SpikesObstacle.Estate.ACTIVE;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.springframework.web.socket.TextMessage;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import com.server.Slooow.MapObject.type;
import com.server.Slooow.Trampoline.trampolineEstate;

public class SinglePlayerRoom extends Room{
	//String name;
	//ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	// TODO width del mapa de momento no es responsive
	
	final int MAPSIZE = 5;
	final int NUMSECONS = 16;
	final int TIMETOSUCESS = NUMSECONS*1000; // se multiplica por mil porque TICKTIME esta en milisegundos



	//sirve para comprobar el tipo de clase con la que chocas, puerta o suelo
	
	


	// Crear la sala, asigna el jugador, creas el map y lo envias al cliente y
	// comienza el juego
	public SinglePlayerRoom(String name, PlayerConected player,SnailGame game) {
		super(name,player,game);

		
	}

	public void sendObstacleUpdate() {
		ArrayList<Integer> posX = new ArrayList<>();
		ArrayList<Integer> posY = new ArrayList<>();
		for (SpikesObstacle spike : spikesArray) {
			posX.add(spike.posX);
			posY.add(spike.posY);
		}
		Gson gson = new Gson();
		String posXArray = gson.toJson(posX);
		String posYArray = gson.toJson(posY);
		JsonObject msgMap = new JsonObject();
		msgMap.addProperty("event", "SPIKEOBSTACLEUPDATE");
		msgMap.addProperty("posX", posXArray);
		msgMap.addProperty("posY", posYArray);
		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msgMap.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}

	}

	public void sendMap() {

		// Inicializamos arraylist para cada atributo de cada elemento
		ArrayList<Integer> posX = new ArrayList<>();
		ArrayList<Integer> posY = new ArrayList<>();
		ArrayList<Integer> height = new ArrayList<>();
		ArrayList<Integer> width = new ArrayList<>();
		ArrayList<type> myType = new ArrayList<>();

		for (MapObject obj : map.map) {
			posX.add(obj.posX);
			posY.add(obj.posY);
			height.add(obj.height);
			width.add(obj.width);
			myType.add(obj.myType);
		}

		// Se prepara un JSON para poder mandar el mensaje
		Gson gson = new Gson();
		String posXArray = gson.toJson(posX);
		String posYArray = gson.toJson(posY);
		String heightArray = gson.toJson(height);
		String widthArray = gson.toJson(width);
		String myTypeArray = gson.toJson(myType);

		JsonObject msgMap = new JsonObject();
		msgMap.addProperty("event", "DRAWMAP");
		msgMap.addProperty("posX", posXArray);
		msgMap.addProperty("posY", posYArray);
		msgMap.addProperty("height", heightArray);
		msgMap.addProperty("width", widthArray);
		msgMap.addProperty("myType", myTypeArray);
		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msgMap.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}
	}

	

	public void checkCollisions() {

		boolean groundCollision = false;
		boolean wallCollision = false;
		boolean slopeCollision = false;
		boolean obstacleCollision = false;
		double slopeRadians = 0;

		for (MapObject object : map.map) {
			switch (object.myType) {
			case OBSTACLE:
				SpikesObstacle auxSpikes = (SpikesObstacle) object;
				auxSpikes.update();
				break;
			default:
			}

			if (object.collider.hayColision(owner)) {
				switch (object.myType) {
				case GROUND:
					if(owner.mySnail.hasFallenTrap){
						if(object.getClass() == TrapDoor.class){
						} else {
							groundCollision = true;
							owner.mySnail.isJumping = false;
						}
					} else {
						groundCollision = true;
						owner.mySnail.hasFallenTrap = false;
						owner.mySnail.isJumping = false;
					}
					break;
				case WALL:
					if(owner.mySnail.hasPassedDoor){
						if(object.getClass() == DoorMap.class){

						} else {
							wallCollision = true;
						}
					} else {
						wallCollision = true;
						owner.mySnail.hasPassedDoor = false;
						owner.mySnail.isJumping = false;
						
					}
					
					break;
				case SLOPE:
					// Casteamos el obj con el que choca a cuesta para poder recoger su inclinación
					MapSlope auxSlope = (MapSlope) object;
					slopeCollision = true;
					slopeRadians = auxSlope.radians;
					owner.mySnail.isJumping = false;
					break;
				case OBSTACLE:
					SpikesObstacle auxSpikes = (SpikesObstacle) object;
					if ((auxSpikes.estate) == ACTIVE) {
						owner.mySnail.spikes = auxSpikes;
						obstacleCollision = true;
					}

					break;
				case POWERUP:
					MapPowerUp powerAux = (MapPowerUp) object;
					powerAux.playerCrash(owner);
					break;
				case DOOR:
					owner.mySnail.hasPassedDoor = true;
					//System.err.println("Colision puerta");
					break;
				case TRAPDOOR:
					owner.mySnail.hasFallenTrap = true;
					//System.out.println("colision trampilla");
					break;
				case TRAMPOLINE:
					
					Trampoline auxTrampoline = (Trampoline) object;
					if(auxTrampoline.trampoEstate == trampolineEstate.ACTIVE){
						owner.mySnail.isJumping = true;
						auxTrampoline.throwSnail(owner.mySnail);
					} else {
						groundCollision = true;
						owner.mySnail.hasFallenTrap = false;
						owner.mySnail.isJumping = false;
					}
					
					break;
				case FINISH:
						finishRace();
					break;
				default:
					System.out.println("COLISION RARA");
				}

			}
		}
		// Envia los datos al caracol el cual calcula sus fisicas
		owner.mySnail.isOnFloor = groundCollision;
		owner.mySnail.isOnWall = wallCollision;
		owner.mySnail.isOnSlope = slopeCollision;
		owner.mySnail.slopeRadians = slopeRadians;
		owner.mySnail.isOnObstacle = obstacleCollision;

		/*
		 * System.out.println(" collision con suelo es: " + groundCollision);
		 * System.out.println(" collision con pared es: " + wallCollision);
		 * System.out.println(" collision con slope es: " + slopeCollision);
		 */

	}

	public void updateDoors() {
		for (DoorMap door : doorArray) {
			door.update();
		}
	}

	public void updateTrampoline(){
		for(Trampoline trampoline : trampolineArray){
			trampoline.update();
		}
	}

	public void finishRace(){
		//acummulative time esta en ml, para pasarlo a segundos se divide entre 1000
		if(acummulativeTime > TIMETOSUCESS){
			System.out.println("Has perdido, tu tiempo ha sido: "+ acummulativeTime);
			owner.decrementLifes();
		} else {
			System.out.println("Has ganado, tu timepo ha sido: "+ acummulativeTime);
		}
		executor.shutdown();
		destroyRoom();
	}

	public void tick() {
		Runnable task = () -> {
			acummulativeTime+= TICKTIME;

			updateDoors();
			updateTrampoline();
			checkCollisions();
			sendObstacleUpdate();

			owner.mySnail.updateSnail();
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "TICK");
			msg.addProperty("posX", owner.mySnail.posX);
			msg.addProperty("posY", owner.mySnail.posY);
			msg.addProperty("stamina", owner.mySnail.stamina);

			try {
				owner.sessionLock.lock();
				owner.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				owner.sessionLock.unlock();
			}
		};

		// Delay inicial de la sala, empieza un segundo y continua ejecutando el tick
		// cada 33 milisegundos
		executor.scheduleAtFixedRate(task, TICKTIME, TICKTIME, TimeUnit.MILLISECONDS);
	}

}
