package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.server.Slooow.MapObject.type;
import com.server.Slooow.SpikesObstacle.Estate;
import com.server.Slooow.Trampoline.trampolineEstate;

public class MultiplayerRoom extends Room {
	// String name;
	// ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	// TODO width del mapa de momento no es responsive

	final int MAPSIZE = 5;
	final int NUMSECONS = 16;
	final int TIMETOSUCESS = NUMSECONS * 1000; // se multiplica por mil porque TICKTIME esta en milisegundos

	// sirve para comprobar el tipo de clase con la que chocas, puerta o suelo

	// Crear la sala, asigna el jugador, creas el map y lo envias al cliente y
	// comienza el juego
	public final int MAXNUMPLAYERS = 4;
	int numPlayers = 0;
	boolean hasStart = false;
	ReentrantLock playerLock = new ReentrantLock();
	HashMap<WebSocketSession, PlayerConected> jugadoresEnSala = new HashMap<WebSocketSession, PlayerConected>();

	public MultiplayerRoom(String nombre, PlayerConected owner, SnailGame game, String mapName) {
		super(nombre, owner, game, mapName);
	}

	/*
	 * public void tick() { lock.lock(); for(JugadorConectado jug :
	 * jugadoresEnSala.values()) {
	 * 
	 * } lock.unlock(); }
	 */

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
			if (obj.myType == type.WIND) {
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

		broadcast(msgMap);
	}

	public void checkCollisions() {
		int id = 0;

		for (PlayerConected player : jugadoresEnSala.values()) {
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
						if (player.mySnail.hasFallenTrap) {
							if (object.getClass() == TrapDoor.class) {
							} else {
								if (player.mySnail.trapDoorPosY != object.posY) {
									groundCollision = true;
									player.mySnail.isJumping = false;
									if (!lastFrameGroundCollision) {
										sendGroundCollision = true;
									}
								}

							}
						} else {

							groundCollision = true;
							player.mySnail.hasFallenTrap = false;
							player.mySnail.isJumping = false;
							if (!lastFrameGroundCollision) {
								sendGroundCollision = true;
							}
						}
						break;
					case WALL:
						if (player.mySnail.hasPassedDoor) {
							if (object.getClass() == DoorMap.class) {

							} else {
								wallCollision = true;
								if (!lastFrameWallCollision) {
									sendWallCollision = true;
								}
							}
						} else {
							if (object.getClass() == DoorMap.class) {
								isClimbingADoor = true;
							} else {
								if (!lastFrameWallCollision) {
									sendWallCollision = true;
								}
							}
							wallCollision = true;

							player.mySnail.hasPassedDoor = false;
							player.mySnail.isJumping = false;

						}

						break;
					case SLOPE:
						// Casteamos el obj con el que choca a cuesta para poder recoger su inclinación
						MapSlope auxSlope = (MapSlope) object;
						slopeCollision = true;
						slopeRadians = auxSlope.radians;
						degrees = (int) auxSlope.degrees;
						player.mySnail.isJumping = false;
						if (!lastFrameWallSlopeCollision) {
							sendSlopeCollision = true;
						}
						break;
					case OBSTACLE:
						SpikesObstacle auxSpikes = (SpikesObstacle) object;
						if ((auxSpikes.estate) == Estate.ACTIVE) {
							player.mySnail.spikes = auxSpikes;
							obstacleCollision = true;
						}

						break;
					case POWERUP:
						MapPowerUp powerAux = (MapPowerUp) object;
						powerAux.playerCrash(owner, powerArray.indexOf(powerAux));
						break;
					case DOOR:
						player.mySnail.hasPassedDoor = true;
						break;
					case TRAPDOOR:
						player.mySnail.hasFallenTrap = true;
						player.mySnail.trapDoorPosY = object.posY;
						// System.out.println("colision trampilla");
						break;
					case TRAMPOLINE:

						Trampoline auxTrampoline = (Trampoline) object;
						if (auxTrampoline.trampoEstate == trampolineEstate.ACTIVE) {
							player.mySnail.isJumping = true;
							auxTrampoline.throwSnail(player.mySnail);
						} else {
							groundCollision = true;
							player.mySnail.hasFallenTrap = false;
							player.mySnail.isJumping = false;
						}

						break;
					case FINISH:
						//finishRace();
						break;
					case WIND:
						player.mySnail.isInWind = true;
						player.mySnail.wind = (Wind) object;
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
				if (!isClimbingADoor) {
					sendGroundCollision(id);
				} else {
					System.out.println("TOCANDO PUERTA Y SUELO");
				}
			}

			if (sendWallCollision) {
				sendWallCollision(id);
			}

			if (sendSlopeCollision) {
				sendSlopeCollision(degrees, id);
			}

			// Envia los datos al caracol el cual calcula sus fisicas
			player.mySnail.isOnFloor = groundCollision;
			player.mySnail.isOnWall = wallCollision;
			player.mySnail.isOnSlope = slopeCollision;
			player.mySnail.slopeRadians = slopeRadians;
			player.mySnail.isOnObstacle = obstacleCollision;
			id++;

		}
	}

	public void sendSlopeCollision(int degrees, int id) {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "SLOPECOLLISION");
		msg.addProperty("id", id);
		msg.addProperty("degrees", degrees);

		broadcast(msg);
	}

	public void sendWallCollision(int id) {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "WALLCOLLISIONMULTI");
		msg.addProperty("id", id);

		broadcast(msg);
	}

	public void sendGroundCollision(int id) {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "GROUNDCOLLISIONMULTI");
		msg.addProperty("id", id);

		broadcast(msg);
	}

	public void anadirJugador(PlayerConected jug) {
		playerLock.lock();
		if (jugadoresEnSala.putIfAbsent(jug.getSession(), jug) == null) {
			numPlayers++;
			System.out.println("Jugador: " + jug.getNombre());
		}
		if (numPlayers == MAXNUMPLAYERS) {
			System.out.println("empezando room");
			hasStart = true;
			startRoom();
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "WAITINGROOMSTART");
			msg.addProperty("roomName", name);
			try {
				jug.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		playerLock.unlock();
	}

	public void tick() {
		Runnable task = () -> {
			/*
			acummulativeTime += TICKTIME;
			updateDoors();
			updateTrapDoor();
			updateTrampoline();
			updateWind();
			checkCollisions();
			updateObstacles();

			for (PlayerConected player : jugadoresEnSala.values()) {
				player.mySnail.updateSnail();
				checkSnailState();
			}
			*/
			ArrayList<Float> posX = new ArrayList<>();
			ArrayList<Float> posY = new ArrayList<>();
			ArrayList<Float> stamina = new ArrayList<>();
			ArrayList<String> names = new ArrayList<>();

			for (PlayerConected player : jugadoresEnSala.values()) {
				posX.add((Float) player.mySnail.posX);
				posY.add((Float) player.mySnail.posY);
				stamina.add((Float) player.mySnail.stamina);
				names.add(player.getNombre());

			}

			Gson gson = new Gson();
			String posXArray = gson.toJson(posX);
			String posYArray = gson.toJson(posY);
			String staminaArray = gson.toJson(stamina);
			String namesArray = gson.toJson(names);

			JsonObject msg = new JsonObject();
			msg.addProperty("event", "TICKMULTI");
			msg.addProperty("posX", posXArray);
			msg.addProperty("posY", posYArray);
			msg.addProperty("stamina", staminaArray);
			msg.addProperty("name", namesArray);

			broadcast(msg);
		};

		// Delay inicial de la sala, empieza un segundo y continua ejecutando el tick
		// cada 33 milisegundos
		executor.scheduleAtFixedRate(task, TICKTIME, TICKTIME, TimeUnit.MILLISECONDS);
	}

	public void quitarJugador(PlayerConected jug) {
		playerLock.lock();
		if (jugadoresEnSala.remove(jug.getSession()) != null) {
			numPlayers--;
		}
		;
		playerLock.unlock();
	}

	public void broadcast(JsonObject msg) {
		for (PlayerConected player : jugadoresEnSala.values()) {
			player.sessionLock.lock();
			try {
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				player.sessionLock.unlock();
			}
		}
	}
}
