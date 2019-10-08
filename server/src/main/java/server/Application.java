package server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class Application implements WebSocketConfigurer {
	
	//Main de la aplicación, se declara en el pom.xml
		public static void main(String[] args) {
			SpringApplication.run(Application.class, args);
		}
	
	//Inicializador del registro del websocket, asigna un controller Websocket para la ruta concreta
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(serverHandler(), "/snail").setAllowedOrigins("*");
	}

	//Crea la clase de Websocket y la asocia a una clase
	@Bean
	public WebsocketSnailHandler serverHandler() {
		return new WebsocketSnailHandler();
	}

	
}
