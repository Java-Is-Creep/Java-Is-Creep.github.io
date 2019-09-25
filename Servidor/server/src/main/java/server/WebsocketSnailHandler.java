package server;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketSnailHandler extends TextWebSocketHandler {

	
	@Override
	protected void handleTextMessage(WebSocketSession session,TextMessage message) throws Exception{
		System.out.println("Mensaje recibido " + message.getPayload());
		String msg = "Mensaje recibido por el server: " + message.getPayload() ;
		session.sendMessage(new TextMessage(msg));
	}
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
	System.out.println("Alguien se ha conectado");
	session.sendMessage(new TextMessage("Mensaje del servidor"));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Adios bb");
	}
	
}
