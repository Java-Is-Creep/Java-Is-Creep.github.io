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

public class SinglePlayerRoom extends Room {
	// String name;
	// ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	// TODO width del mapa de momento no es responsive

	final int MAPSIZE = 5;
	final int NUMSECONS = 16;
	final int TIMETOSUCESS = NUMSECONS * 1000; // se multiplica por mil porque TICKTIME esta en milisegundos

	// sirve para comprobar el tipo de clase con la que chocas, puerta o suelo

	// Crear la sala, asigna el jugador, creas el map y lo envias al cliente y
	// comienza el juego
	public SinglePlayerRoom(String name, PlayerConected player, SnailGame game, String mapName) {
		super(name, player, game, mapName);
		startRoom();

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
							if (!lastFrameWallCollision) {
								sendWallCollision = true;
							}
						}
					} else {
						if(object.getClass() == DoorMap.class){
							isClimbingADoor = true;
						} else {
							if (!lastFrameWallCollision) {
								sendWallCollision = true;
							}
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
					powerAux.playerCrash(owner, powerArray.indexOf(powerAux));
					break;
				case DOOR:
					owner.mySnail.hasPassedDoor = true;
					break;
				case TRAPDOOR:
					owner.mySnail.hasFallenTrap = true;
					owner.mySnail.trapDoorPosY = object.posY;
					// System.out.println("colision trampilla");
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
				System.out.println("TOCANDO PUERTA Y SUELO");
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

		/*
		 * System.out.println(" collision con suelo es: " + groundCollision);
		 * System.out.println(" collision con pared es: " + wallCollision);
		 * System.out.println(" collision con slope es: " + slopeCollision);
		 */

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

	

	public void updateDoors() {
		int i = 0;
		for (DoorMap door : doorArray) {
			if (door.update()) {

				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATEDOOR");
				msg.addProperty("id", i);

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

	public void finishRace() {
		boolean success = false;
		// acummulative time esta en ml, para pasarlo a segundos se divide entre 1000
		if (acummulativeTime > TIMETOSUCESS) {
			System.out.println("Has perdido, tu tiempo ha sido: " + acummulativeTime);
			owner.decrementLifes();

		} else {
			success = true;
			System.out.println("Has ganado, tu tiempo ha sido: " + acummulativeTime);
		}

		JsonObject msg = new JsonObject();
		msg.addProperty("event", "FINISH");
		msg.addProperty("winner", success);
		msg.addProperty("time", (int)(acummulativeTime));
		msg.addProperty("maxTime", TIMETOSUCESS);

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
			System.out.println(msg.toString());
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

			updateDoors();
			updateTrapDoor();
			updateTrampoline();
			updateWind();
			checkCollisions();
			updateObstacles();

			owner.mySnail.updateSnail();
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
