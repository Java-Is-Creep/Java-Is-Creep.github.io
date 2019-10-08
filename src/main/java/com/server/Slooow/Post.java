package com.server.Slooow;

//Todos los mensajes recibidos por el cliente se castean a esta clase, es un wrapper del mensaje
//Si falta algún parámetro al construirlo se incializa a NULL y los parámetro que sobren se ignoran
public class Post { 
	String event;

	String playerName;
	String roomName;
	
	boolean isSprinting;
	boolean useObject;
}
