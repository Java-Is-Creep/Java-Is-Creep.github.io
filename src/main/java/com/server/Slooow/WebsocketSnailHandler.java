package com.server.Slooow;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.server.Slooow.SnailInGame.SnailType;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

//Websocket que maneja todos los mensajes entre cliente servidor
public class WebsocketSnailHandler extends TextWebSocketHandler {
	// Lock que protege session cuando se mandan mensajes.
	public ReentrantLock lockSession = new ReentrantLock();
	// Lock que protege el registros
	public ReentrantLock lockLogIn = new ReentrantLock();

	// Instancia del juego completo
	SnailGame game = new SnailGame();

	/**
	 * @param session
	 * @param message
	 * @throws Exception
	 */
	// Función que se ejecuta siempre que llegue un mensaje
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		lockSession.lock();
		WebSocketSession newSession = session;
		lockSession.unlock();

		Gson googleJson = new Gson();
		Post post = googleJson.fromJson(message.getPayload(), Post.class);

		PlayerConected jug;
		PlayerRegistered playerR;

		switch (post.event) {
		case "DEBUG":
			System.out.println("Mensaje de debug");

			break;
		/*
		 * case "CONECTAR": jug = new PlayerConected(newSession, post.playerName);
		 * System.out.println(" anadiendo jugador " + jug.getNombre());
		 * game.conectarJugador(jug); game.room2.anadirJugador(jug); break;
		 */
		/*
		 * Crea una Partida y añade al jugador a una sala single player De momento
		 * comienza la partida también
		 */
		case "SINGLEPLAYER":

			jug = game.bucarJugadorConectado(newSession);

			if (jug.getLifes() != 0) {
				jug.restartSnail();
				game.singlePlayerRoomMaps.get(post.roomName).startRoom();
			}

			break;
		case "MULTIPLAYER":
			game.multiPlayerRoomMap.get(post.roomName).addPlayerReady();
			break;

		case "SEARCHNAMEROOM":
			jug = game.bucarJugadorConectado(newSession);
			MultiplayerRoom roomAux = game.multiPlayerRoomMap.get(post.roomName);
			if(roomAux != null){
				roomAux.anadirJugador(jug);
			} else {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "MULTIROOMSFULL");

				lockSession.lock();
				jug.getSession().sendMessage(new TextMessage(msg.toString()));
				lockSession.unlock();
			}
			
			break;
		case "SEARCHRANDOMROOM":
			jug = game.bucarJugadorConectado(newSession);
			float matchPoints = jug.matchMakingPunt();
			double diff = 1000000000;
			MultiplayerRoom multiAux = null;

			game.multiPlayerLock.lock();
			for (MultiplayerRoom multi : game.multiPlayerRoomMap.values()) {
				if (multi.isFull.get()) {
					double preDiff = Math.abs((double) (multi.getMatchmakingPoints() - matchPoints));
					if (preDiff < diff) {
						diff = preDiff;
						multiAux = multi;
					}
				}
			}
			if (multiAux != null) {
				multiAux.anadirJugador(jug);
			} else {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "MULTIROOMSFULL");

				lockSession.lock();
				jug.getSession().sendMessage(new TextMessage(msg.toString()));
				lockSession.unlock();

			}
			game.multiPlayerLock.unlock();

			break;
		case "LOGIN":
			boolean login = false;
			lockLogIn.lock();
			if (game.playerRegistered.containsKey(post.playerName)) {
				playerR = game.playerRegistered.get(post.playerName);
				if (playerR.getPass().compareTo(post.pass) == 0) {
					jug = new PlayerConected(newSession, post.playerName, lockSession);
					jug.playerConCast(playerR);
					if (!playerR.isConnected()) {
						login = true;
						game.jugadoresConectados.putIfAbsent(jug.getSession(), jug);
						playerR.setConnected(true);
						System.out.println("LOGGEADO");
					} else {
						login = false;
						System.out.println("NO LOGGEADO");
					}

				}
			} else {
				System.out.println("No cotiene la clave");
				for (String player : game.playerRegistered.keySet()) {
					System.out.println(" Jugador: " + player);
				}
			}
			lockLogIn.unlock();
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "LOGINSTATUS");
			if (login) {
				msg.addProperty("conectionStatus", true);
			} else {
				msg.addProperty("conectionStatus", false);
				System.out.println("NO TE HAS LOGEADO");
			}
			lockSession.lock();
			newSession.sendMessage(new TextMessage(msg.toString()));
			lockSession.unlock();

			break;

		case "CREATEACCOUNT":
			boolean registered = false;
			lockLogIn.lock();
			if (post.confirmPass.compareTo(post.pass) == 0) {
				if (!game.playerRegistered.containsKey(post.playerName)) {
					PlayerRegistered newPlayer = new PlayerRegistered(post.playerName, post.pass);
					game.playerRegistered.putIfAbsent(newPlayer.getName(), newPlayer);
					jug = new PlayerConected(newSession, newPlayer.getName(), lockSession);
					jug.playerConCast(newPlayer);
					game.jugadoresConectados.putIfAbsent(newSession, jug);
					registered = true;
					newPlayer.setConnected(true);
					System.out.println("CuentaCreada");
					for (String player : game.playerRegistered.keySet()) {
						System.out.println(" Jugador: " + player);
					}
				}
			}
			lockLogIn.unlock();
			JsonObject msg2 = new JsonObject();
			msg2.addProperty("event", "CREATEACCOUNTSTATUS");
			if (registered) {
				msg2.addProperty("conectionStatus", true);
			} else {
				msg2.addProperty("conectionStatus", false);
			}
			newSession.sendMessage(new TextMessage(msg2.toString()));

			break;

		case "DISCONNECT":
			jug = game.jugadoresConectados.remove(newSession);
			if (jug != null) {
				playerR = game.playerRegistered.get(jug.getNombre());
				playerR.castFromPlayerCon(jug);
				JsonObject msg3 = new JsonObject();
				msg3.addProperty("event", "DISCONNECTSTATUS");
				msg3.addProperty("disconnectionStatus", true);
				newSession.sendMessage(new TextMessage(msg3.toString()));
				System.out.println("JUGADOR DESCONECTADO");
				playerR.setConnected(false);
			} else {
				System.out.println("JUGADOR NO EXISTE");
			}

			/*
			 * El mensaje llega si el jugador realiza alguna acción Detecta si ha usado un
			 * objeto o si se ha parado el jugador
			 */
			break;
		case "UPDATEINPUT":
			jug = game.bucarJugadorConectado(newSession);
			jug.mySnail.updateMovement(post.isSprinting, post.useObject);
			break;

		case "CHOOSESNAIL":
			jug = game.bucarJugadorConectado(newSession);
			switch (post.chooseSnail) {
			case "NORMAL":
				jug.snailType = SnailType.NORMAL;
				break;
			case "TANK":
				jug.snailType = SnailType.TANK;
				break;
			case "BAGUETTE":
				jug.snailType = SnailType.BAGUETTE;
				break;

			case "MIAU":
				jug.snailType = SnailType.MIAU;
				break;

			case "MERCA":
				jug.snailType = SnailType.MERCA;
				break;

			case "SEA":
				jug.snailType = SnailType.SEA;
				break;

			case "ROBA":
				jug.snailType = SnailType.ROBA;
				break;

			case "IRIS":
				jug.snailType = SnailType.IRIS;
				break;
			default:
			}

			break;

		case "ENTERLOBBYMULTI":
			jug = game.bucarJugadorConectado(newSession);
			game.createMultiRoom(post.roomName, jug, post.mapName);
			break;

		case "ENTERLOBBY":
			jug = game.bucarJugadorConectado(newSession);
			game.createSingleRoom(post.roomName, jug, post.mapName);
			JsonObject msg3 = new JsonObject();
			msg3.addProperty("event", "ENTERLOBBY");
			msg3.addProperty("snail", jug.snailType.toString());
			jug.sessionLock.lock();
			newSession.sendMessage(new TextMessage(msg3.toString()));
			jug.sessionLock.unlock();
			break;

		case "MYRECORDS":

			jug = game.bucarJugadorConectado(newSession);
			PlayerRegistered play = game.findRegistered(jug);
			ConcurrentHashMap<String, Integer> recordsAux = play.records;
			ArrayList<String> name = new ArrayList<>();
			ArrayList<Integer> time = new ArrayList<>();

			for (String mapName : recordsAux.keySet()) {
				name.add(mapName);
				time.add(recordsAux.get(mapName));
			}

			Gson gson = new Gson();
			String namesArray = gson.toJson(name);
			String timeArray = gson.toJson(time);

			JsonObject msgMap = new JsonObject();
			msgMap.addProperty("event", "MYRECORDS");
			msgMap.addProperty("nameMap", namesArray);
			msgMap.addProperty("myTime", timeArray);
			try {
				jug.sessionLock.lock();
				jug.getSession().sendMessage(new TextMessage(msgMap.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				jug.sessionLock.unlock();
			}
			break;

		case "RECORDS":
			jug = game.bucarJugadorConectado(newSession);
			ConcurrentHashMap<String, Integer> recordsAux2 = jug.records;
			game.generalRecords.lock();
			ArrayList<RecordInMap> recordsInMap = game.records.get(post.mapName);
			ArrayList<String> name2 = new ArrayList<>();
			ArrayList<Integer> time2 = new ArrayList<>();
			for (RecordInMap record : recordsInMap) {
				name2.add(record.playerName);
				time2.add(record.time);
			}
			game.generalRecords.unlock();

			Gson gson2 = new Gson();
			String names2Array = gson2.toJson(name2);
			String time2Array = gson2.toJson(time2);

			JsonObject msgMap2 = new JsonObject();
			msgMap2.addProperty("event", "RECORDS");
			msgMap2.addProperty("playerName", names2Array);
			msgMap2.addProperty("time", time2Array);
			msgMap2.addProperty("mapName", post.mapName);
			if (recordsAux2.get(post.mapName) != null) {
				msgMap2.addProperty("myTime", recordsAux2.get(post.mapName));
			} else {
				msgMap2.addProperty("myTime", 0);
			}

			try {
				jug.sessionLock.lock();
				jug.getSession().sendMessage(new TextMessage(msgMap2.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				jug.sessionLock.unlock();
			}

			break;

		case "SHOP":
			playerR = game.findRegistered(jug = game.bucarJugadorConectado(newSession));
			ArrayList<String> owned = new ArrayList<>();
			ArrayList<String> notOwned = new ArrayList<>();
			for (SnailType snail : playerR.mySnails.keySet()) {
				if (playerR.mySnails.get(snail)) {
					owned.add(snail.toString());
				} else {
					notOwned.add(snail.toString());
				}
			}
			Gson gsonOwn = new Gson();
			String ownedArray = gsonOwn.toJson(owned);
			String notOwnedArray = gsonOwn.toJson(notOwned);

			JsonObject msgShop = new JsonObject();
			msgShop.addProperty("event", "SHOPENTER");
			msgShop.addProperty("owned", ownedArray);
			msgShop.addProperty("notOwned", notOwnedArray);
			try {
				jug.sessionLock.lock();
				jug.getSession().sendMessage(new TextMessage(msgShop.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				jug.sessionLock.unlock();
			}

			break;

		default:

		}

		// prueba mensajes
		/*
		 * System.out.println("Mensaje recibido " + message.getPayload()); String msg =
		 * "Mensaje recibido por el server: " + message.getPayload();
		 * session.sendMessage(new TextMessage(msg));
		 */

		// Create new JSON Object y prueba JSONS
		/*
		 * JsonObject person = new JsonObject(); person.addProperty("firstName",
		 * "Sergey"); person.addProperty("lastName", "Kargopolov");
		 * System.out.println(person.toString()); session.sendMessage(new
		 * TextMessage(person.toString()));
		 */
	}

	/**
	 * @param session
	 * @throws Exception
	 */
	// Mensaje que confirma la conexión al jugador si se loguea correctamente
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		// TODO inicio de sesión
		lockSession.lock();
		WebSocketSession sessionAux = session;
		lockSession.unlock();
		JsonObject msg = new JsonObject();
		msg.addProperty("conectionStatus", true);
		sessionAux.sendMessage(new TextMessage(msg.toString()));

	}

	/**
	 * @param session
	 * @param status
	 * @throws Exception
	 */
	// Mensaje que confirma la de desconexión del jugador
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		lockSession.lock();
		WebSocketSession newSession = session;
		lockSession.unlock();
		PlayerConected jug = game.jugadoresConectados.remove(newSession);
		if (jug != null) {
			PlayerRegistered playerR = game.playerRegistered.get(jug.getNombre());
			playerR.castFromPlayerCon(jug);
			playerR.setConnected(false);
		}

		System.out.println("Adios bb");
	}

}
