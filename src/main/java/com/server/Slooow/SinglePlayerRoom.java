package com.server.Slooow;

import static com.server.Slooow.SpikesObstacle.Estate.ACTIVE;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.server.Slooow.MapObject.type;
import com.server.Slooow.Trampoline.trampolineEstate;

import org.springframework.web.socket.TextMessage;

public class SinglePlayerRoom extends Room {
	// String name;
	// ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	// TODO width del mapa de momento no es responsive

	final int MAPSIZE = 5;
	int NUMSECONS;
	 int TIMETOSUCESS; // se multiplica por mil porque TICKTIME esta en milisegundos

	// sirve para comprobar el tipo de clase con la que chocas, puerta o suelo

	// Crear la sala, asigna el jugador, creas el map y lo envias al cliente y
	// comienza el juego
	public SinglePlayerRoom(String name, PlayerConected player, SnailGame game, String mapName,String myType,int NUMSECONS) {
		super(name, player, game, mapName,myType);
		this.NUMSECONS = NUMSECONS;
		TIMETOSUCESS = NUMSECONS * 1000;
		}

	public void sendMap() {

		// Inicializamos arraylist para cada atributo de cada elemento
		ArrayList<Integer> posX = new ArrayList<>();
		ArrayList<Integer> posY = new ArrayList<>();
		ArrayList<Integer> height = new ArrayList<>();
		ArrayList<Integer> width = new ArrayList<>();
		ArrayList<type> myType = new ArrayList<>();
		ArrayList<Boolean> windDir = new ArrayList<>();

		for (MapObject obj : map.map) {
			posX.add(obj.posX);
			posY.add(obj.posY);
			if (obj.myType == type.SLOPE) {
				MapSlope aux = (MapSlope) obj;
				height.add((int) aux.degrees);
			} else {
				height.add(obj.height);
			}
			if(obj.myType == type.WIND){
				Wind aux = (Wind) obj;
				windDir.add(aux.goingRigth);
			}
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
		String WindDirArray = gson.toJson(windDir);

		JsonObject msgMap = new JsonObject();
		msgMap.addProperty("event", "DRAWMAP");
		msgMap.addProperty("posX", posXArray);
		msgMap.addProperty("posY", posYArray);
		msgMap.addProperty("height", heightArray);
		msgMap.addProperty("width", widthArray);
		msgMap.addProperty("myType", myTypeArray);
		msgMap.addProperty("direction", WindDirArray);
		msgMap.addProperty("roomType", "SINGLE");
		
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
		boolean isClimbingADoor = false;
		double slopeRadians = 0;
		int degrees = 0;

		// mandan mensajes para actualizar visualmente al cliente
		boolean sendGroundCollision = false;
		boolean sendWallCollision = false;
		boolean sendSlopeCollision = false;

		for (MapObject object : map.map) {

			if (object.collider.hayColision(owner)) {
				switch (object.myType) {
				case GROUND:
					if (owner.mySnail.hasFallenTrap) {
						if (object.getClass() == TrapDoor.class) {
						} else {
							if (owner.mySnail.trapDoorPosY != object.posY) {
								groundCollision = true;
								owner.mySnail.isJumping = false;
								if (!lastFrameGroundCollision) {
									sendGroundCollision = true;
								}
							}

						}
					} else {
						
						groundCollision = true;
						owner.mySnail.hasFallenTrap = false;
						owner.mySnail.isJumping = false;
						if (!lastFrameGroundCollision) {
							sendGroundCollision = true;
						}
					}
					break;
				case WALL:
					if (owner.mySnail.hasPassedDoor) {
						if (object.getClass() == DoorMap.class) {

						} else {
							wallCollision = true;
							owner.mySnail.hasPassedDoor = false;
							if (!lastFrameWallCollision) {
								sendWallCollision = true;
							}
						}
					} else {
						if(object.getClass() == DoorMap.class){
							isClimbingADoor = true;
						}
						if (!lastFrameWallCollision) {
								sendWallCollision = true;
							}
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
					degrees = (int) auxSlope.degrees;
					owner.mySnail.isJumping = false;
					if (!lastFrameWallSlopeCollision) {
						sendSlopeCollision = true;
					}
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
					powerAux.playerCrash(owner, powerArray.indexOf(powerAux),this,0);
					break;
				case DOOR:
					owner.mySnail.hasPassedDoor = true;
					break;
				case TRAPDOOR:
					owner.mySnail.hasFallenTrap = true;
					owner.mySnail.trapDoorPosY = object.posY;
					break;
				case TRAMPOLINE:

					Trampoline auxTrampoline = (Trampoline) object;
					if (auxTrampoline.trampoEstate == trampolineEstate.ACTIVE) {
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
				case WIND:
					owner.mySnail.isInWind = true;
					owner.mySnail.wind = (Wind) object;
					break;
				default:
					System.out.println("COLISION RARA");
				}

			}
		}

		lastFrameGroundCollision = groundCollision;
		lastFrameWallCollision = wallCollision;
		lastFrameWallSlopeCollision = slopeCollision;

		if (sendGroundCollision) {
			if(!isClimbingADoor){
				sendGroundCollision();
			} else {
			}
		}

		if (sendWallCollision) {
			sendWallCollision();
		}

		if (sendSlopeCollision) {
			sendSlopeCollision(degrees);
		}

		// Envia los datos al caracol el cual calcula sus fisicas
		owner.mySnail.isOnFloor = groundCollision;
		owner.mySnail.isOnWall = wallCollision;
		owner.mySnail.isOnSlope = slopeCollision;
		owner.mySnail.slopeRadians = slopeRadians;
		owner.mySnail.isOnObstacle = obstacleCollision;
	}

	public void sendSlopeCollision(int degrees) {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "SLOPECOLLISION");
		msg.addProperty("degrees", degrees);

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

	public void sendWallCollision() {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "WALLCOLLISION");

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

	public void sendGroundCollision() {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "GROUNDCOLLISION");

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


	public void finishRace() {
		boolean success = false;
		owner.gamesPlayed.incrementAndGet();
		// acummulative time esta en ml, para pasarlo a segundos se divide entre 1000
		if (acummulativeTime > TIMETOSUCESS) {
			owner.decrementLifes();

		} else {
			success = true;
			owner.gamesWon.incrementAndGet();
			
		}

		owner.myAchievements.checkAchievements(owner,mapName,success);

		Integer record = owner.records.get(mapName);
		if( record != null){
			if(acummulativeTime < record){
				owner.records.remove(mapName);
				owner.records.putIfAbsent(mapName, acummulativeTime);
				if(record != 1000000000){
					owner.myAchievements.beatRecord(owner);
				}

			}
		} else {
			owner.records.putIfAbsent(mapName, acummulativeTime);
		}

		record = owner.records.get(mapName);

		game.actualiceRecords(mapName,record,owner);

		JsonObject msg = new JsonObject();
		msg.addProperty("event", "FINISH");
		msg.addProperty("winner", success);
		msg.addProperty("time", (int)(acummulativeTime));
		msg.addProperty("maxTime", TIMETOSUCESS);
		msg.addProperty("record", record);
		msg.addProperty("points", owner.getPointsInRace((int) acummulativeTime));

		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}


		executor.shutdown();
		destroyRoom();
	}

	public void checkSnailState() {
		boolean mandar = false;

		if (owner.mySnail.sendRunOutStamina || owner.mySnail.sendRecoverStamina) {
			mandar = true;
		}

		if (mandar) {
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "SNAILUPDATE");
			msg.addProperty("runOutStamina", owner.mySnail.sendRunOutStamina);
			msg.addProperty("recoverStamina", owner.mySnail.sendRecoverStamina);
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

	}

	public void tick() {
		Runnable task = () -> {
			acummulativeTime += TICKTIME;

			if(!game.findRegistered(owner).isConnected()){
				executor.shutdown();
				destroyRoom();
			}

			updateDoors();
			updateTrapDoor();
			updateTrampoline();
			updateWind();
			checkCollisions();
			updateObstacles();

			owner.mySnail.updateSnail(this,0);
			checkSnailState();
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
