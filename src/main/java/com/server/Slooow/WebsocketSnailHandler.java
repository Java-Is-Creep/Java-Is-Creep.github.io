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
	 //Lock que protege session cuando se mandan mensajes.
	public ReentrantLock lockSession = new ReentrantLock();

	//Instancia del juego completo
	SnailGame game = new SnailGame();
	
	//Función que se ejecuta siempre que llegue un mensaje
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

		lockSession.lock();
		WebSocketSession newSession = session;
		lockSession.unlock();
		
		Gson googleJson = new Gson();
		Post post = googleJson.fromJson(message.getPayload(), Post.class);

		PlayerConected jug;

		switch (post.event) {
		case "DEBUG":
			System.out.println("Mensaje de debug");

			break;
			/*
		case "CONECTAR":
			jug = new PlayerConected(newSession, post.playerName);
			System.out.println(" anadiendo jugador " + jug.getNombre());
			game.conectarJugador(jug);
			game.room2.anadirJugador(jug);
			break;
			*/
		/*
		 * Crea una Partida y añade al jugador a una sala single player
		 * De momento comienza la partida también 
		 */
		case "SINGLEPLAYER":
			jug = new PlayerConected(newSession, post.playerName,lockSession);
			game.jugadoresConectados.putIfAbsent(jug.getSession(), jug); 
			game.room1 = new SinglePlayerRoom(post.roomName,jug);
			break;

		/*
		 * El mensaje llega si el jugador realiza alguna acción
		 * Detecta si ha usado un objeto o si se ha parado el jugador 
		 */
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

	//Mensaje que confirma la conexión al jugador si se loguea correctamente
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//TODO inicio de sesión
		lockSession.lock();
		JsonObject msg = new JsonObject();
		msg.addProperty("conectionStatus", true);
		session.sendMessage(new TextMessage(msg.toString()));
		lockSession.unlock();
	}

	//Mensaje que confirma la de desconexión del jugador
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Adios bb");
	}

}
