package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

//Websocket que maneja todos los mensajes entre cliente servidor
public class WebsocketSnailHandler extends TextWebSocketHandler {
	// Lock que protege session cuando se mandan mensajes.
	public ReentrantLock lockSession = new ReentrantLock();
	// Lock que protege el registros
	public ReentrantLock lockLogIn = new ReentrantLock();

	// Instancia del juego completo
	SnailGame game = new SnailGame();

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
				System.out.println("Creando sala");
				game.createSingleRoom(post.roomName, jug, "mapa1");
			}

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
				for(String player : game.playerRegistered.keySet()){
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
			newSession.sendMessage(new TextMessage(msg.toString()));

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
					for(String player : game.playerRegistered.keySet()){
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
