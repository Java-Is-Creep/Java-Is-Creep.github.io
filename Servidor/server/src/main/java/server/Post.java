package server;

import java.util.ArrayList;

public class Post { // en caso de que no coincidan
	String event;
	String message;
	String remitente;
	ArrayList <Integer> datos;

	public Post(String event, String message, String remitente, ArrayList <Integer> datos) {
		this.event = event;
		this.message = message;
		this.remitente = remitente;
		this.datos = datos;
	}

	@Override
	public String toString() {
		return "Post [event=" + event + ", message=" + message + ", remitente=" + remitente + ", datos=" + datos.toString() + "]";
	}

}
