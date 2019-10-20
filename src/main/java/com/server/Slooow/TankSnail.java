package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class TankSnail extends SnailInGame {

    public final static float MAXSTAMINA = 1400;
	public final static float MAXVELOCITYX = 7;
	public final static float MAXVELOCITYY = 4.5f;
	public final static float MAXNORMALVELOCITYX = 2.2f;
	public final static float MAXNORMALVELOCITYY = 1.5f; // era 3

	// aceleracion base, es decir sin acelerar
	public final static float NORMALACELERATIONX = 0.7f;
	public final static float NORMALACELERATIONY = 0.7f; // era 0.05

	// aceleracion cuando aceleras - ACTUALMENTE NO ES UN PARÁMETRO USABLE (NO BORRAR)
	public final static float ACELERATIONX = 0.2f;
	public final static float ACELERATIONY = 0.2f;

	public final static float GRAVITY = 0.3f;
	public final static float BREAKFORCE = 0.2f;
	// Tarda 5 segundos en perder la stamina
	public final static float STAMINALOSE = 10;
	public final static float STAMINAWALLLOSE = 3.5f;
	// Tarda 2 segundos en recargar la stamina
	public final static float STAMINANORMALRECOVER = 3.2f;
	// Tarda 3.33 segundos en recargar la stamina
	public final static float STAMINARUNOUTRECOVER = 5.6f;
	public final static float MAXGRAVITYSPEED = -14;
	public final static float MASS = 1.3f;
	public final static float SPEEDXLOSE = 1.02f;

	public final static int STATSPEED = 1;
	public final static int STATAC = 2;
	public final static int STATWEIGHT = 5;
	public final static int STATSTAMINA = 5;
	public final static int STATREGEN = 4;

	public final static int CASHPRICE = 0;
	public final static int POINTSPRICE = 0;

    public TankSnail(WebSocketSession mySession, ReentrantLock sessionLock) {
		super(mySession, sessionLock, MAXSTAMINA, MAXVELOCITYX, 
		MAXVELOCITYY, MAXNORMALVELOCITYX, MAXNORMALVELOCITYY, 
		NORMALACELERATIONX, NORMALACELERATIONY, ACELERATIONX, 
		ACELERATIONY, GRAVITY, BREAKFORCE, STAMINALOSE, STAMINAWALLLOSE, 
		STAMINANORMALRECOVER, STAMINARUNOUTRECOVER, MAXGRAVITYSPEED, 
		MASS, SPEEDXLOSE, STATSPEED, STATAC, STATWEIGHT, STATSTAMINA, 
		STATREGEN, CASHPRICE, POINTSPRICE);
    }


}