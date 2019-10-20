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
		SnailInGame snailAux;

		switch (post.event) {
		case "DEBUG":
			System.out.println("Mensaje de debug");

			break;

		/*
		 * Crea una Partida y añade al jugador a una sala single player De momento
		 * comienza la partida también
		 */

		case "LIVEUP":
			jug = game.bucarJugadorConectado(newSession);
			if(jug.getLifes() < jug.MAXNUMLIFES){
				jug.incrementLifes();
			}
		break;
		case "SINGLEPLAYER":

			jug = game.bucarJugadorConectado(newSession);

			if (jug.getLifes() != 0) {
				jug.restartSnail();
				game.singlePlayerRoomMaps.get(post.roomName).startRoom();
			}

			break;
		case "MULTIPLAYER":
			jug = game.bucarJugadorConectado(newSession);
			jug.restartSnail();
			game.multiPlayerRoomMap.get(post.roomName).addPlayerReady(jug);
			break;

		case "SEARCHNAMEROOM":
			jug = game.bucarJugadorConectado(newSession);
			MultiplayerRoom roomAux = game.multiPlayerRoomMap.get(post.roomName);
			if (roomAux != null) {
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
				if (!multi.isFull.get()) {
					double preDiff = Math.abs((double) (multi.getMatchmakingPoints() - matchPoints));
					if (preDiff <= diff) {
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
					} else {
						login = false;
					}

				}
			} else {

			}
			lockLogIn.unlock();
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "LOGINSTATUS");
			if (login) {
				msg.addProperty("conectionStatus", true);
			} else {
				msg.addProperty("conectionStatus", false);
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
				playerR.setConnected(false);
			} else {

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
			System.out.println("Sala creada");
			break;

		case "EXITLOBBYMULTI":
			System.out.println("Exit lobby multi enviado y nombre sala: " + post.roomName);
			jug = game.bucarJugadorConectado(newSession);
			MultiplayerRoom aux = game.multiPlayerRoomMap.get(post.roomName);
			if( aux!= null){
				aux.quitarJugador(jug);
			}
			break;

		case"EXITLOBBY":
			SinglePlayerRoom aux2 = game.singlePlayerRoomMaps.get(post.roomName);
			if(aux2 != null){
				game.singlePlayerRoomMaps.remove(post.roomName);
			}

			break;

		case "ENTERLOBBY":
			jug = game.bucarJugadorConectado(newSession);
			game.createSingleRoom(post.roomName, jug, post.mapName);
			JsonObject msg3 = new JsonObject();
			msg3.addProperty("event", "ENTERLOBBY");
			msg3.addProperty("snail", jug.snailType.toString());
			switch (jug.snailType.toString()) {
			case "NORMAL":
				snailAux = new normalSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;
			case "TANK":
				snailAux = new TankSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;
			case "BAGUETTE":
				snailAux = new BaguetteSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;

			case "MIAU":
				snailAux = new MiauSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;

			case "MERCA":
				snailAux = new MercaSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;

			case "SEA":
				snailAux = new SeaSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;

			case "ROBA":
				snailAux = new RobaSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;

			case "IRIS":
				snailAux = new IrisSnail(newSession, lockSession);
				msg3.addProperty("stamina", snailAux.getSTATSTAMINA());
				msg3.addProperty("ac", snailAux.getSTATAC());
				msg3.addProperty("weight", snailAux.getSTATWEIGHT());
				msg3.addProperty("regen", snailAux.getSTATREGEN());
				msg3.addProperty("speed", snailAux.getSTATSPEED());
				break;
			default:

				break;
			}

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
			msgShop.addProperty("points", jug.getPoints());
			msgShop.addProperty("money", jug.getCash());
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

		case "CHOOSECHARSNAIL":
			playerR = game.findRegistered(jug = game.bucarJugadorConectado(newSession));
			ArrayList<String> owned2 = new ArrayList<>();
			ArrayList<String> notOwned2 = new ArrayList<>();
			for (SnailType snail : playerR.mySnails.keySet()) {
				if (playerR.mySnails.get(snail)) {
					owned2.add(snail.toString());
				} else {
					notOwned2.add(snail.toString());
				}
			}
			Gson gsonOwn2 = new Gson();
			String ownedArray2 = gsonOwn2.toJson(owned2);
			String notOwnedArray2 = gsonOwn2.toJson(notOwned2);

			JsonObject msgChoose = new JsonObject();
			msgChoose.addProperty("event", "CHOOSEENTER");
			msgChoose.addProperty("owned", ownedArray2);
			msgChoose.addProperty("notOwned", notOwnedArray2);
			ArrayList<Integer> NORMAL = new ArrayList<>();
			snailAux = new normalSnail(newSession, lockSession);
			NORMAL.add(snailAux.getSTATSTAMINA());
			NORMAL.add(snailAux.getSTATAC());
			NORMAL.add(snailAux.getSTATWEIGHT());
			NORMAL.add(snailAux.getSTATREGEN());
			NORMAL.add(snailAux.getSTATSPEED());
			ArrayList<Integer> TANK = new ArrayList<>();
			snailAux = new TankSnail(newSession, lockSession);
			TANK.add(snailAux.getSTATSTAMINA());
			TANK.add(snailAux.getSTATAC());
			TANK.add(snailAux.getSTATWEIGHT());
			TANK.add(snailAux.getSTATREGEN());
			TANK.add(snailAux.getSTATSPEED());
			ArrayList<Integer> BAGUETTE = new ArrayList<>();
			snailAux = new BaguetteSnail(newSession, lockSession);
			BAGUETTE.add(snailAux.getSTATSTAMINA());
			BAGUETTE.add(snailAux.getSTATAC());
			BAGUETTE.add(snailAux.getSTATWEIGHT());
			BAGUETTE.add(snailAux.getSTATREGEN());
			BAGUETTE.add(snailAux.getSTATSPEED());
			ArrayList<Integer> MIAU = new ArrayList<>();
			snailAux = new MiauSnail(newSession, lockSession);
			MIAU.add(snailAux.getSTATSTAMINA());
			MIAU.add(snailAux.getSTATAC());
			MIAU.add(snailAux.getSTATWEIGHT());
			MIAU.add(snailAux.getSTATREGEN());
			MIAU.add(snailAux.getSTATSPEED());
			ArrayList<Integer> MERCA = new ArrayList<>();
			snailAux = new MercaSnail(newSession, lockSession);
			MERCA.add(snailAux.getSTATSTAMINA());
			MERCA.add(snailAux.getSTATAC());
			MERCA.add(snailAux.getSTATWEIGHT());
			MERCA.add(snailAux.getSTATREGEN());
			MERCA.add(snailAux.getSTATSPEED());
			ArrayList<Integer> SEA = new ArrayList<>();
			snailAux = new SeaSnail(newSession, lockSession);
			SEA.add(snailAux.getSTATSTAMINA());
			SEA.add(snailAux.getSTATAC());
			SEA.add(snailAux.getSTATWEIGHT());
			SEA.add(snailAux.getSTATREGEN());
			SEA.add(snailAux.getSTATSPEED());
			ArrayList<Integer> ROBA = new ArrayList<>();
			snailAux = new RobaSnail(newSession, lockSession);
			ROBA.add(snailAux.getSTATSTAMINA());
			ROBA.add(snailAux.getSTATAC());
			ROBA.add(snailAux.getSTATWEIGHT());
			ROBA.add(snailAux.getSTATREGEN());
			ROBA.add(snailAux.getSTATSPEED());
			ArrayList<Integer> IRIS = new ArrayList<>();
			snailAux = new IrisSnail(newSession, lockSession);
			IRIS.add(snailAux.getSTATSTAMINA());
			IRIS.add(snailAux.getSTATAC());
			IRIS.add(snailAux.getSTATWEIGHT());
			IRIS.add(snailAux.getSTATREGEN());
			IRIS.add(snailAux.getSTATSPEED());
			String normalArray = gsonOwn2.toJson(NORMAL);
			String tankArray = gsonOwn2.toJson(TANK);
			String baguetteArray = gsonOwn2.toJson(BAGUETTE);
			String miauArray = gsonOwn2.toJson(MIAU);
			String mercaArray = gsonOwn2.toJson(MERCA);
			String seaArray = gsonOwn2.toJson(SEA);
			String robaArray = gsonOwn2.toJson(ROBA);
			String irisArray = gsonOwn2.toJson(IRIS);
			msgChoose.addProperty("normal", normalArray);
			msgChoose.addProperty("tank", tankArray);
			msgChoose.addProperty("baguette", baguetteArray);
			msgChoose.addProperty("miau", miauArray);
			msgChoose.addProperty("merca", mercaArray);
			msgChoose.addProperty("sea", seaArray);
			msgChoose.addProperty("roba", robaArray);
			msgChoose.addProperty("iris", irisArray);

			try {
				jug.sessionLock.lock();
				jug.getSession().sendMessage(new TextMessage(msgChoose.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				jug.sessionLock.unlock();
			}

			break;

		case "SEESNAIL":
			jug = game.bucarJugadorConectado(newSession);
			JsonObject msgCheck = new JsonObject();
			switch (post.snailToSee) {
			case "NORMAL":
				snailAux = new normalSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;
			case "TANK":
				snailAux = new TankSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;
			case "BAGUETTE":
				snailAux = new BaguetteSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;

			case "MIAU":
				snailAux = new MiauSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;

			case "MERCA":
				snailAux = new MercaSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;

			case "SEA":
				snailAux = new SeaSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;

			case "ROBA":
				snailAux = new RobaSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;

			case "IRIS":
				snailAux = new IrisSnail(newSession, lockSession);
				msgCheck.addProperty("event", "SEESNAILRS");
				msgCheck.addProperty("stamina", snailAux.getSTATSTAMINA());
				msgCheck.addProperty("ac", snailAux.getSTATAC());
				msgCheck.addProperty("weight", snailAux.getSTATWEIGHT());
				msgCheck.addProperty("regen", snailAux.getSTATREGEN());
				msgCheck.addProperty("speed", snailAux.getSTATSPEED());
				msgCheck.addProperty("shells", snailAux.getCASHPRICE());
				msgCheck.addProperty("baba", snailAux.getPOINTSPRICE());
				break;
			default:

				break;
			}
			try {
				jug.sessionLock.lock();
				jug.getSession().sendMessage(new TextMessage(msgCheck.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				jug.sessionLock.unlock();
			}
			break;
		case "PURCHASE":
			jug = game.bucarJugadorConectado(newSession);
			playerR = game.findRegistered(jug = game.bucarJugadorConectado(newSession));
			JsonObject msgPurchase = new JsonObject();
			msgPurchase.addProperty("event", "PURCHASEOK");
			switch (post.purchaseId) {
			case 1:
				jug.addCash(120);
				break;
			case 2:
				jug.addCash(250);
				break;
			case 3:
				jug.addCash(520);
				break;
			case 4:
				jug.addCash(1050);
				break;
			default:
				break;
			}
			switch (post.method) {
			
			case "cash":
				switch (post.purchaseSnail) {
				case "NORMAL":
					snailAux = new normalSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.NORMAL, true);
					playerR.setCash(jug.getCash());
					break;
				case "TANK":
					snailAux = new TankSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.TANK, true);
					playerR.setCash(jug.getCash());
					break;
				case "BAGUETTE":
					snailAux = new BaguetteSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.BAGUETTE, true);
					playerR.setCash(jug.getCash());
					break;

				case "MIAU":
					snailAux = new MiauSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.MIAU, true);
					playerR.setCash(jug.getCash());
					break;

				case "MERCA":
					snailAux = new MercaSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.MERCA, true);
					playerR.setCash(jug.getCash());
					break;

				case "SEA":
					snailAux = new SeaSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.SEA, true);
					playerR.setCash(jug.getCash());
					break;

				case "ROBA":
					snailAux = new RobaSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.ROBA, true);
					playerR.setCash(jug.getCash());
					break;

				case "IRIS":
					snailAux = new IrisSnail(newSession, lockSession);
					jug.addCash(-(snailAux.getCASHPRICE()));
					if(jug.getCash() < 0){
						jug.setCash(0);
					}
					playerR.mySnails.put(SnailType.IRIS, true);
					playerR.setCash(jug.getCash());
					break;
				default:

					break;
				}
			break;
			case "points":
				switch(post.purchaseSnail) {
				case "NORMAL":
					snailAux = new normalSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.NORMAL, true);
					playerR.setPoints(jug.getPoints());
				break;
				case "TANK":
					snailAux = new TankSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.TANK, true);
					playerR.setPoints(jug.getPoints());
					break;
				case "BAGUETTE":
					snailAux = new BaguetteSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.BAGUETTE, true);
					playerR.setPoints(jug.getPoints());
					break;

				case "MIAU":
					snailAux = new MiauSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.MIAU, true);
					playerR.setPoints(jug.getPoints());
					break;

				case "MERCA":
					snailAux = new MercaSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.MERCA, true);
					playerR.setPoints(jug.getPoints());
					break;

				case "SEA":
					snailAux = new SeaSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.SEA, true);
					playerR.setPoints(jug.getPoints());
					break;

				case "ROBA":
					snailAux = new RobaSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.ROBA, true);
					playerR.setPoints(jug.getPoints());
					break;

				case "IRIS":
					snailAux = new IrisSnail(newSession, lockSession);
					jug.addPoints(-(snailAux.getPOINTSPRICE()));
					if(jug.getPoints() < 0){
						jug.setPoints(0);
					}
					playerR.mySnails.put(SnailType.IRIS, true);
					playerR.setPoints(jug.getPoints());
					break;
				default:
				
				break;
			}
			
			break;	

			default:

			break;
			}
			ArrayList<String> owned3 = new ArrayList<>();
			ArrayList<String> notOwned3 = new ArrayList<>();
			for (SnailType snail : playerR.mySnails.keySet()) {
				if (playerR.mySnails.get(snail)) {
					owned3.add(snail.toString());
				} else {
					notOwned3.add(snail.toString());
				}
			}
			Gson gsonOwn3 = new Gson();
			String ownedArray3 = gsonOwn3.toJson(owned3);
			String notOwnedArray3 = gsonOwn3.toJson(notOwned3);
			msgPurchase.addProperty("shells", jug.getCash());
			msgPurchase.addProperty("baba", jug.getPoints());
			msgPurchase.addProperty("owned", ownedArray3);
			msgPurchase.addProperty("notOwned", notOwnedArray3);

			try {
				jug.sessionLock.lock();
				jug.getSession().sendMessage(new TextMessage(msgPurchase.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				jug.sessionLock.unlock();
			}
			break;

		case "ENTERSOLO":
			jug = game.bucarJugadorConectado(newSession);
			ArrayList<Integer> myTimes = new ArrayList<>();
			//Esta en segundo
			ArrayList<Integer> mapTimes = new ArrayList<>();
			for(String map : jug.records.keySet()){
				myTimes.add(jug.records.get(map));
			}
			mapTimes.add(game.TIMETOPASSMAP1 * 1000);
			mapTimes.add(game.TIMETOPASSMAP2 * 1000);
			mapTimes.add(game.TIMETOPASSMAP3 * 1000);
			Gson gsonTimes= new Gson();
			String myTimesArray = gsonTimes.toJson(myTimes);
			String mapTimesArray = gsonTimes.toJson(mapTimes);
			JsonObject msgTimes = new JsonObject();
			msgTimes.addProperty("event", "ENTERSOLORS");
			msgTimes.addProperty("myTimes", myTimesArray);
			msgTimes.addProperty("mapTimes", mapTimesArray);
			msgTimes.addProperty("life", jug.getLifes());
			try {
				jug.sessionLock.lock();
				jug.getSession().sendMessage(new TextMessage(msgTimes.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				jug.sessionLock.unlock();
			}

		break;

		default:

			break;

		}

		
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

	}

}
