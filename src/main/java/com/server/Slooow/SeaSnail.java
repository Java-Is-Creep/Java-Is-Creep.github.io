package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class SeaSnail extends SnailInGame {

    public final static float MAXSTAMINA = 600;
	public final static float MAXVELOCITYX = 20;
	public final static float MAXVELOCITYY = 20;
	public final static float MAXNORMALVELOCITYX = 3;
	public final static float MAXNORMALVELOCITYY = 2.5f; // era 3

	// aceleracion base, es decir sin acelerar
	public final static float NORMALACELERATIONX = 2f;
	public final static float NORMALACELERATIONY = 2f; // era 0.05

	// aceleracion cuando aceleras - ACTUALMENTE NO ES UN PARÁMETRO USABLE (NO BORRAR)
	public final static float ACELERATIONX = 0.2f;
	public final static float ACELERATIONY = 0.2f;

	public final static float GRAVITY = 0.3f;
	public final static float BREAKFORCE = 0.2f;
	// Tarda 5 segundos en perder la stamina
	public final static float STAMINALOSE = 10;
	public final static float STAMINAWALLLOSE = 1;
	// Tarda 2 segundos en recargar la stamina
	public final static float STAMINANORMALRECOVER = 1.5f;
	// Tarda 3.33 segundos en recargar la stamina
	public final static float STAMINARUNOUTRECOVER = 2.5f;
	public final static float MAXGRAVITYSPEED = -10;
	public final static float MASS = 1;
	public final static float SPEEDXLOSE = 1.02f;

	public final static int STATSPEED = 2;
	public final static int STATAC = 2;
	public final static int STATWEIGHT = 4;
	public final static int STATSTAMINA = 3;
	public final static int STATREGEN = 5;

	public final static int CASHPRICE = 100;
	public final static int POINTSPRICE = 100;

    public SeaSnail(WebSocketSession mySession, ReentrantLock sessionLock) {
		super(mySession, sessionLock, MAXSTAMINA, 
		MAXVELOCITYX, MAXVELOCITYY, MAXNORMALVELOCITYX, 
		MAXNORMALVELOCITYY, NORMALACELERATIONX, NORMALACELERATIONY, 
		ACELERATIONX, ACELERATIONY, GRAVITY, BREAKFORCE, 
		STAMINALOSE, STAMINAWALLLOSE, STAMINANORMALRECOVER, 
		STAMINARUNOUTRECOVER, MAXGRAVITYSPEED, MASS, SPEEDXLOSE, 
		STATSPEED, STATAC, STATWEIGHT, STATSTAMINA, 
		STATREGEN, CASHPRICE, POINTSPRICE);
    }


}