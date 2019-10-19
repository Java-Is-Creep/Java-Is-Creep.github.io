package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.WebSocketSession;

/*
 * 
 * Clase que comprobará todas las acciones del caracol de interacción con el jugador
 * ya sean acelerar, frenar o usar un objeto 
 * 
*/

public class normalSnail extends SnailInGame {

	// TODO tamaño no coincide con el tamaño del caracol
	SquareCollider collider;
	final int colliderOfsetX = 40;
	final int colliderOfsetY = 20;

	/*
	 * VALORES INICIALES DEBERÍAN CAMBIAR SEGÚN CADA CARACOL
	 */

	// 151 de stamina significa 5 seg con stamina, 300 son 10 segundos, se resta 1
	// de stamina por segundo
	// Tiempo que se tarda en recargar la stamina si se acaba o nos dan 151 / (1.5f
	// * 30 fps) = 3.33 segundos
	public final static float MAXSTAMINA = 600;
    public final static float MAXVELOCITYX = 8;
    public final static float MAXVELOCITYY = 7;
    public final static float MAXNORMALVELOCITYX = 3;
    public final static float MAXNORMALVELOCITYY = 2.5f; // era 3

    // aceleracion base, es decir sin acelerar
    public final static float NORMALACELERATIONX = 2f;
    public final static float NORMALACELERATIONY = 2f; // era 0.05

    // aceleracion cuando aceleras - ACTUALMENTE NO ES UN PARÁMETRO USABLE (NO
    // BORRAR)
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

    public final static int STATSPEED = 3;
	public final static int STATAC = 3;
	public final static int STATWEIGHT = 3;
	public final static int STATSTAMINA = 3;
	public final static int STATREGEN = 3;


    // Inicialización según el caracol
    public normalSnail(WebSocketSession mySession, ReentrantLock sessionLock) {
        super(mySession, sessionLock, MAXSTAMINA, MAXVELOCITYX, MAXVELOCITYY, MAXNORMALVELOCITYX, MAXNORMALVELOCITYY, 
        NORMALACELERATIONX, NORMALACELERATIONY, ACELERATIONX, 
        ACELERATIONY, GRAVITY, BREAKFORCE, STAMINALOSE, 
        STAMINAWALLLOSE, STAMINANORMALRECOVER, STAMINARUNOUTRECOVER, 
        MAXGRAVITYSPEED, MASS, SPEEDXLOSE, STATSPEED, STATAC, STATWEIGHT, STATSTAMINA, STATREGEN);
	}
}