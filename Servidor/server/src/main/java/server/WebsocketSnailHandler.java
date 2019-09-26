package server;

import java.util.ArrayList;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.JsonParser;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class WebsocketSnailHandler extends TextWebSocketHandler {
	public ReentrantLock lockSession = new ReentrantLock(); //lock que protege la session cuando se mandan mensajes.
	 

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		lockSession.lock();
		Gson googleJson = new Gson();
		 Post post = googleJson.fromJson(message.getPayload(), Post.class);
		 
		 System.out.println(post.toString());
		
		switch(post.event) {
		case"DEBUG":
			System.out.println("Mensaje de debug");
			break;
		default:
			
		}
		
		
		
		// prueba mensajes
		/*
		System.out.println("Mensaje recibido " + message.getPayload());
		String msg = "Mensaje recibido por el server: " + message.getPayload();
		session.sendMessage(new TextMessage(msg));
		*/

		// Create new JSON Object y prueba JSONS
		/*
		 * JsonObject person = new JsonObject(); person.addProperty("firstName",
		 * "Sergey"); person.addProperty("lastName", "Kargopolov");
		 * System.out.println(person.toString()); session.sendMessage(new
		 * TextMessage(person.toString()));
		 */
		lockSession.unlock();
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		lockSession.lock();
		System.out.println("Alguien se ha conectado");
		session.sendMessage(new TextMessage("Mensaje del servidor"));
		lockSession.unlock();
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Adios bb");
	}

}
