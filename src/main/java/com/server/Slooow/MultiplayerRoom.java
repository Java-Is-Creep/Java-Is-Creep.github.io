package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.ReentrantLock;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.server.Slooow.MapObject.type;
import com.server.Slooow.SpikesObstacle.Estate;
import com.server.Slooow.Trampoline.trampolineEstate;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

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
	AtomicBoolean isFull = new AtomicBoolean(false);
	ReentrantLock playerLock = new ReentrantLock();
	HashMap<WebSocketSession, PlayerConected> jugadoresEnSala = new HashMap<WebSocketSession, PlayerConected>();

	ArrayList<String> playerNamePosition = new ArrayList<>();
	ArrayList<Integer> playerTimePosition = new ArrayList<>();

	int matchmakingPoints = 0;

	AtomicInteger readyPlayers = new AtomicInteger(0);
	public final int TIMETOSTART = 30;
	public int timeToStartLeft = TIMETOSTART;

	ReentrantLock playerReadyLock = new ReentrantLock();
	ReentrantLock matchPointsLock = new ReentrantLock();

	public boolean deletePlayer[] = new boolean[MAXNUMPLAYERS];

	public PlayerConected playerArray[] = new PlayerConected[MAXNUMPLAYERS];

	public MultiplayerRoom(String nombre, PlayerConected owner, SnailGame game, String mapName, String myType) {
		super(nombre, owner, game, mapName, myType);
		for (int i = 0; i < MAXNUMPLAYERS; i++) {
			deletePlayer[i] = false;
		}
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
		ArrayList<String> names = new ArrayList<>();
		ArrayList<String> snails = new ArrayList<>();

		for (PlayerConected player : jugadoresEnSala.values()) {
			names.add(player.getNombre());
			snails.add(player.snailType.toString());
		}

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
		String namesArray = gson.toJson(names);
		String snailsArray = gson.toJson(snails);

		JsonObject msgMap = new JsonObject();
		msgMap.addProperty("event", "DRAWMAP");
		msgMap.addProperty("posX", posXArray);
		msgMap.addProperty("posY", posYArray);
		msgMap.addProperty("height", heightArray);
		msgMap.addProperty("width", widthArray);
		msgMap.addProperty("myType", myTypeArray);
		msgMap.addProperty("direction", WindDirArray);
		msgMap.addProperty("roomType", this.myType);
		msgMap.addProperty("name", namesArray);
		msgMap.addProperty("snails", snailsArray);

		broadcast(msgMap);
	}

	public int getMatchmakingPoints() {
		int points;
		matchPointsLock.lock();
		points = matchmakingPoints;
		matchPointsLock.unlock();
		return points;
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

				if (object.collider.hayColision(player)) {
					switch (object.myType) {
					case GROUND:
						if (player.mySnail.hasFallenTrap) {
							if (object.getClass() == TrapDoor.class) {
							} else {
								if (player.mySnail.trapDoorPosY != object.posY) {
									groundCollision = true;
									player.mySnail.isJumping = false;
									if (!player.mySnail.lastFrameGroundCollision) {
										sendGroundCollision = true;
									}
								}

							}
						} else {

							groundCollision = true;
							player.mySnail.hasFallenTrap = false;
							player.mySnail.isJumping = false;
							if (!player.mySnail.lastFrameGroundCollision) {
								sendGroundCollision = true;
							}
						}
						break;
					case WALL:
						if (player.mySnail.hasPassedDoor) {
							if (object.getClass() == DoorMap.class) {

							} else {
								wallCollision = true;
								player.mySnail.hasPassedDoor = false;
								if (!player.mySnail.lastFrameWallCollision) {
									sendWallCollision = true;
								}
							}
						} else {
							if (object.getClass() == DoorMap.class) {
								isClimbingADoor = true;
							}

							if (!player.mySnail.lastFrameWallCollision) {
								sendWallCollision = true;
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
						if (!player.mySnail.lastFrameWallSlopeCollision) {
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
						powerAux.playerCrash(player, powerArray.indexOf(powerAux), this, id);
						break;
					case DOOR:
						player.mySnail.hasPassedDoor = true;
						break;
					case TRAPDOOR:
						player.mySnail.hasFallenTrap = true;
						player.mySnail.trapDoorPosY = object.posY;
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
						if (!player.mySnail.hasFinish) {
							finishRace(player);
							player.mySnail.hasFinish = true;
						}

						break;
					case WIND:
						player.mySnail.isInWind = true;
						player.mySnail.wind = (Wind) object;
						break;
					default:
						System.err.println("COLISION SIN IDENTIFICAR");
					}

				}
			}

			player.mySnail.lastFrameGroundCollision = groundCollision;
			player.mySnail.lastFrameWallCollision = wallCollision;
			player.mySnail.lastFrameWallSlopeCollision = slopeCollision;

			if (sendGroundCollision) {
				if (!isClimbingADoor) {
					sendGroundCollision(id);
				} else {

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
		msg.addProperty("event", "SLOPECOLLISIONMULTI");
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
		jug.mySnail.hasFinish = false;
		if (numPlayers < 4) {
			if (jugadoresEnSala.putIfAbsent(jug.getSession(), jug) == null) {
				playerArray[numPlayers] = jug;
				numPlayers++;
				matchPointsLock.lock();
				matchmakingPoints += jug.matchMakingPunt();
				matchPointsLock.unlock();
				SnailInGame snailAux = jug.mySnail;
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "WAITINGROOMSTART");
				msg.addProperty("roomName", name);
				msg.addProperty("snail", jug.snailType.toString());
				switch (jug.snailType.toString()) {
				case "NORMAL":
					snailAux = new normalSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;
				case "TANK":
					snailAux = new TankSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;
				case "BAGUETTE":
					snailAux = new BaguetteSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;

				case "MIAU":
					snailAux = new MiauSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;

				case "MERCA":
					snailAux = new MercaSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;

				case "SEA":
					snailAux = new SeaSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;

				case "ROBA":
					snailAux = new RobaSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;

				case "IRIS":
					snailAux = new IrisSnail(jug.getSession(), jug.sessionLock);
					msg.addProperty("stamina", snailAux.getSTATSTAMINA());
					msg.addProperty("ac", snailAux.getSTATAC());
					msg.addProperty("weight", snailAux.getSTATWEIGHT());
					msg.addProperty("regen", snailAux.getSTATREGEN());
					msg.addProperty("speed", snailAux.getSTATSPEED());
					break;
				default:

					break;
				}

				try {
					jug.sessionLock.lock();
					jug.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					jug.sessionLock.unlock();
				}
				JsonObject msg2 = new JsonObject();
				msg2.addProperty("event", "PLAYERENTER");
				msg2.addProperty("name", jug.getNombre());
				broadcast(msg2);
			}
			if (numPlayers == MAXNUMPLAYERS) {
				isFull.set(true);
				// tick();
			}
		} else {
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "MULTIROOMSFULL");

			jug.sessionLock.lock();
			try {
				jug.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			jug.sessionLock.unlock();
		}

		playerLock.unlock();
	}

	public void finishRace(PlayerConected player) {
		player.gamesPlayed.incrementAndGet();
		playerNamePosition.add(player.getNombre());
		playerTimePosition.add(acummulativeTime);
		if (playerNamePosition.get(0).compareTo(player.getNombre()) == 0) {
			player.gamesWon.incrementAndGet();
			player.gamesPlayed.incrementAndGet();
		}

		player.myAchievements.checkAchievements(player, "", false);

		Integer record = player.records.get(mapName);
		if (record != null) {
			if (acummulativeTime < record) {
				player.records.remove(mapName);
				player.records.putIfAbsent(mapName, acummulativeTime);
			}
		} else {
			player.records.putIfAbsent(mapName, acummulativeTime);
		}

		record = player.records.get(mapName);

		game.actualiceRecords(mapName, record, player);

		Gson gson = new Gson();
		String namesArray = gson.toJson(playerNamePosition);
		String timeArray = gson.toJson(playerTimePosition);

		JsonObject msg = new JsonObject();
		msg.addProperty("event", "FINISHMULTI");
		msg.addProperty("time", (int) (acummulativeTime));
		msg.addProperty("record", record);
		msg.addProperty("points", player.getPointsInRace((int) acummulativeTime));
		msg.addProperty("positionNames", namesArray);
		msg.addProperty("positionTime", timeArray);

		try {
			player.sessionLock.lock();
			player.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			player.sessionLock.unlock();
		}
		// quitarJugador(player);

		if (playerNamePosition.size() == MAXNUMPLAYERS) {
			executor.shutdown();
			destroyRoom();
		}

	}

	public void destroyRoom() {

		for (int i = 0; i < MAXNUMPLAYERS; i++) {
			quitarJugador(playerArray[i]);
		}
		game.deleteRoom(this);
	}

	public void checkSnailState() {
		int id = 0;
		playerLock.lock();
		for (PlayerConected player : jugadoresEnSala.values()) {
			boolean mandar = false;
			if (player.mySnail.sendRunOutStamina || player.mySnail.sendRecoverStamina) {
				mandar = true;
			}
			if (mandar) {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "SNAILUPDATEMULTI");
				msg.addProperty("runOutStamina", player.mySnail.sendRunOutStamina);
				msg.addProperty("recoverStamina", player.mySnail.sendRecoverStamina);
				msg.addProperty("id", id);
				broadcast(msg);
			}
			id++;
		}
		playerLock.unlock();

	}

	public void addPlayerReady(PlayerConected player) {
		playerReadyLock.lock();
		if (!player.isReady) {
			if (readyPlayers.incrementAndGet() == MAXNUMPLAYERS) {
				hasStart = true;
				player.isReady = true;
				map = new Map(2000, mapName);
				createMap();
				sendMap();
				tick();
			}
		}

		playerReadyLock.unlock();

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

				broadcast(msg);
			}
			i++;
		}
	}

	@Override
	public void updateDoors() {
		int i = 0;
		for (DoorMap door : doorArray) {
			if (door.update()) {

				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATEDOOR");
				msg.addProperty("id", i);
				msg.addProperty("state", door.estate.toString());

				broadcast(msg);
			}
			i++;
		}
	}

	public void updateWind() {
		int i = 0;
		for (Wind wind : windArray) {
			if (wind.update()) {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "WINDUPDATE");
				msg.addProperty("id", i);
				msg.addProperty("direction", wind.goingRigth);

				broadcast(msg);
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

				broadcast(msg);

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

				broadcast(msg);
			}
			obstacle.playerCrash = false;
			i++;
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
			int id = 0;
			for (PlayerConected player : jugadoresEnSala.values()) {

				player.mySnail.updateSnail(this, id);
				id++;
			}
			checkSnailState();

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
			// }
			// playerReadyLock.unlock();
		};

		// Delay inicial de la sala, empieza un segundo y continua ejecutando el tick
		// cada 33 milisegundos
		executor.scheduleAtFixedRate(task, 10000, TICKTIME, TimeUnit.MILLISECONDS);
	}

	public void quitarJugador(PlayerConected jug) {
		playerLock.lock();
		jug.mySnail.restoreValues();
		jug.mySnail.resetPosition();
		if (jugadoresEnSala.remove(jug.getSession()) != null) {
			numPlayers--;
			if (jug.isReady) {
				readyPlayers.decrementAndGet();
				jug.isReady = false;
			}

			jug.mySnail.hasFinish = true;
			JsonObject msg2 = new JsonObject();
			msg2.addProperty("event", "PLAYERLEFT");
			msg2.addProperty("name", jug.getNombre());
			try {
				jug.getSession().sendMessage(new TextMessage(msg2.toString()));
			} catch (Exception a) {

			}

			System.out.println("ENVIADO: " + msg2.toString());
			if (numPlayers <= 0) {
				System.out.println("Sala borrada por falta de jugadores");
				game.deleteRoom(this);
			}
		}
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

	public int getNumPlayers() {
		return numPlayers;
	}

	public void setNumPlayers(int numPlayers) {
		this.numPlayers = numPlayers;
	}
}
