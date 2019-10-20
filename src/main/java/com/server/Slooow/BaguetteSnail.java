package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class BaguetteSnail extends SnailInGame {

    public final static float MAXSTAMINA = 1050;
	public final static float MAXVELOCITYX = 7.6f;
	public final static float MAXVELOCITYY = 5.3f;
	public final static float MAXNORMALVELOCITYX = 2.6f;
	public final static float MAXNORMALVELOCITYY = 1.9f; // era 3

	// aceleracion base, es decir sin acelerar
	public final static float NORMALACELERATIONX = 1.1f;
	public final static float NORMALACELERATIONY = 1.1f; // era 0.05

	// aceleracion cuando aceleras - ACTUALMENTE NO ES UN PARÁMETRO USABLE (NO BORRAR)
	public final static float ACELERATIONX = 0.2f;
	public final static float ACELERATIONY = 0.2f;

	public final static float GRAVITY = 0.3f;
	public final static float BREAKFORCE = 0.2f;
	// Tarda 5 segundos en perder la stamina
	public final static float STAMINALOSE = 9;
	public final static float STAMINAWALLLOSE = 2.4f;
	// Tarda 2 segundos en recargar la stamina
	public final static float STAMINANORMALRECOVER = 2.8f;
	// Tarda 3.33 segundos en recargar la stamina
	public final static float STAMINARUNOUTRECOVER = 5f;
	public final static float MAXGRAVITYSPEED = -10;
	public final static float MASS = 1;
	public final static float SPEEDXLOSE = 1.02f;

	public final static int STATSPEED = 3;
	public final static int STATAC = 3;
	public final static int STATWEIGHT = 3;
	public final static int STATSTAMINA = 3;
	public final static int STATREGEN = 3;

	public final static int CASHPRICE = 100;
	public final static int POINTSPRICE = 12000;

    public BaguetteSnail(WebSocketSession mySession, ReentrantLock sessionLock) {
		super(mySession, sessionLock, MAXSTAMINA, MAXVELOCITYX, 
		MAXVELOCITYY, MAXNORMALVELOCITYX, MAXNORMALVELOCITYY, 
		NORMALACELERATIONX, NORMALACELERATIONY, ACELERATIONX, 
		ACELERATIONY, GRAVITY, BREAKFORCE, STAMINALOSE, 
		STAMINAWALLLOSE, STAMINANORMALRECOVER, STAMINARUNOUTRECOVER, 
		MAXGRAVITYSPEED, MASS, SPEEDXLOSE, STATSPEED, STATAC, 
		STATWEIGHT, STATSTAMINA, STATREGEN, CASHPRICE, POINTSPRICE);
    }


}
