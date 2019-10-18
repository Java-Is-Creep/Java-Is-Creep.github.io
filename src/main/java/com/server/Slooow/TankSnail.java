package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

public class TankSnail extends SnailInGame {

    public final static float MAXSTAMINA = 1000;
	public final static float MAXVELOCITYX = 6.5f;
	public final static float MAXVELOCITYY = 5.0f;
	public final static float MAXNORMALVELOCITYX = 1.5f;
	public final static float MAXNORMALVELOCITYY = 1.8f; // era 3

	// aceleracion base, es decir sin acelerar
	public final static float NORMALACELERATIONX = 1.5f;
	public final static float NORMALACELERATIONY = 1.5f; // era 0.05

	// aceleracion cuando aceleras - ACTUALMENTE NO ES UN PARÁMETRO USABLE (NO BORRAR)
	public final static float ACELERATIONX = 0.2f;
	public final static float ACELERATIONY = 0.2f;

	public final static float GRAVITY = 0.3f;
	public final static float BREAKFORCE = 0.2f;
	// Tarda 5 segundos en perder la stamina
	public final static float STAMINALOSE = 7;
	public final static float STAMINAWALLLOSE = 1.5f;
	// Tarda 2 segundos en recargar la stamina
	public final static float STAMINANORMALRECOVER = 3.0f;
	// Tarda 3.33 segundos en recargar la stamina
	public final static float STAMINARUNOUTRECOVER = 6.0f;
	public final static float MAXGRAVITYSPEED = -16;
	public final static float MASS = 2;
	public final static float SPEEDXLOSE = 1.02f;

    public TankSnail(WebSocketSession mySession, ReentrantLock sessionLock) {
		super(mySession, sessionLock, MAXSTAMINA, MAXVELOCITYX, MAXVELOCITYY, MAXNORMALVELOCITYX, MAXNORMALVELOCITYY, NORMALACELERATIONX, NORMALACELERATIONY, ACELERATIONX, ACELERATIONY, GRAVITY, BREAKFORCE, STAMINALOSE, STAMINAWALLLOSE, STAMINANORMALRECOVER, STAMINARUNOUTRECOVER, MAXGRAVITYSPEED, MASS, SPEEDXLOSE);
    }


}