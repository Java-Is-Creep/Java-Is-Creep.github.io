package com.server.Slooow;

import java.io.IOException;
import java.util.LinkedList;
import java.util.concurrent.locks.ReentrantLock;

import com.google.gson.JsonObject;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

/*
 * 
 * Clase que comprobará todas las acciones del caracol de interacción con el jugador
 * ya sean acelerar, frenar o usar un objeto 
 * 
*/

public class SnailInGame {

enum SnailType{NORMAL,TANK,BAGUETTE,MIAU,MERCA,SEA,ROBA,IRIS}
enum SkinType{Skin1,Skin2,Skin3}	

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
	public  float MAXSTAMINA;
	public  float MAXVELOCITYX;
	public  float MAXVELOCITYY;
	public  float MAXNORMALVELOCITYX;
	public  float MAXNORMALVELOCITYY; // era 3

	// aceleracion base, es decir sin acelerar
	public  float NORMALACELERATIONX ;
	public  float NORMALACELERATIONY ; // era 0.05

	// aceleracion cuando aceleras - ACTUALMENTE NO ES UN PARÁMETRO USABLE (NO BORRAR)
	public  float ACELERATIONX;
	public  float ACELERATIONY;

	public  float GRAVITY ;
	public  float BREAKFORCE ;
	// Tarda 5 segundos en perder la stamina
	public  float STAMINALOSE;
	public  float STAMINAWALLLOSE;
	// Tarda 2 segundos en recargar la stamina
	public  float STAMINANORMALRECOVER;
	// Tarda 3.33 segundos en recargar la stamina
	public  float STAMINARUNOUTRECOVER;
	public  float MAXGRAVITYSPEED;
	public  float MASS ;
	public  float SPEEDXLOSE ;

	public final int TIMEPROTECTED = 30*10;
	public int timeProtectedRemaining;
	public boolean isProtected = false;

	// valores que cambian por power ups
	public float maxNormalSpeedX;
	public float maxNormalSpeedY;
	public float maxAceleratingSpeedX;
	public float maxAceleratingSpeedY;
	public float normalAcelerationX;
	public float normalAcelerationY;
	public float maxAcelerationAceleratingX;
	public float maxAcelerationAceleratingY;

	public float maxStamina;

	// Varian durante la ejecucion sin ecesidad de power up
	public float maxSpeedX;
	public float maxSpeedY;
	public float maxSpeedInSlopeX;
	public float maxSpeedInSlopeY;
	public float acelerationX;
	public float acelerationY;

	public float breakForce;
	public boolean runOutStamina;
	public float mass;

	// Flags de colisiones
	public boolean isOnFloor = true;
	public boolean isOnWall = false;
	public boolean isOnSlope = false;
	public boolean isOnObstacle = false;
	public boolean hasPassedDoor = false;
	public boolean hasFallenTrap = false;
	public boolean isJumping = false;
	public boolean isInWind = false;
	public double slopeRadians = 0;
	public SpikesObstacle spikes = null;

	//guardamos la posicion de la trampilla para que no choque con el suelo siguiente
	int trapDoorPosY = 0;

	//para evitar que se bugee con varias puertas
	final int timeToPassDoor = 2000;
	int doorTime = 2000;

	final int timeToPassTrap = 1000;
	int trapDoorTime = 1000;

	public float speedX;
	public float speedY;
	public float stamina;
	public float posX = 100;
	public float posY = 500;
	// Última acción que se ha realizado en el cliente
	LastMovement lastMovement = new LastMovement(false, false);

	// booleans para mandar mensajes de animaciones
	protected boolean sendRunOutStamina = false;
	protected boolean sendRecoverStamina = false;

	// Variables relacionadas con powerUps
	
	LinkedList<GenericPowerUp> powerUpList = new LinkedList<>();
	Wind wind = null;
	protected boolean usingPowerUp = false;
	protected boolean hasShield = false;
	protected boolean hasBoostStamina = false;
	protected boolean hasInk = false;


	// COMUNICACION A Cliente
	protected WebSocketSession mySession;
	protected ReentrantLock sessionLock;

	
	protected boolean lastFrameGroundCollision = false;
	protected boolean lastFrameWallCollision = false;
	protected boolean lastFrameWallSlopeCollision = false;
	protected boolean hasFinish = false;

	//Arreglo Aceleracionç;
	public final int ACELERATIONTIME = 250;
	public int acelerationTime = 0;
	public boolean isAcelerating = false;
	public final int TICKTIME = 33;

	public int STATSPEED;
	public int STATWEIGHT;
	public int STATSTAMINA;
	public int STATAC;
	public int STATREGEN;

	public int CASHPRICE;
	public int POINTSPRICE;
	
	// Se accede a lastMovement tanto en esta clase como en el WebSocketSnailHandler
	ReentrantLock lastMovementLock = new ReentrantLock();

	// Inicialización según el caracol
	public SnailInGame(WebSocketSession mySession, ReentrantLock sessionLock,float MAXSTAMINA,float MAXVELOCITYX,
	float MAXVELOCITYY,float MAXNORMALVELOCITYX,float MAXNORMALVELOCITYY, float NORMALACELERATIONX,float NORMALACELERATIONY,
	float ACELERATIONX,float ACELERATIONY,float GRAVITY,float BREAKFORCE,float STAMINALOSE,float STAMINAWALLLOSE,
	float STAMINANORMALRECOVER,float STAMINARUNOUTRECOVER,float MAXGRAVITYSPEED,float MASS,float SPEEDXLOSE,
	int STATSPEED, int STATWEIGHT, int STATSTAMINA, int STATAC, int STATREGEN, int CASHPRICE, int POINTSPRICE) {

		this.MAXSTAMINA = MAXSTAMINA;
	this.MAXVELOCITYX = MAXVELOCITYX;
	 this.MAXVELOCITYY = MAXVELOCITYY;
	this.MAXNORMALVELOCITYX= MAXNORMALVELOCITYX;
	this.MAXNORMALVELOCITYY =MAXNORMALVELOCITYY; // era 3

	// aceleracion base, es decir sin acelerar
	this.NORMALACELERATIONX = NORMALACELERATIONX;
	this.NORMALACELERATIONY  = NORMALACELERATIONY; // era 0.05

	// aceleracion cuando aceleras - ACTUALMENTE NO ES UN PARÁMETRO USABLE (NO BORRAR)
	this.ACELERATIONX = ACELERATIONX;
	this.ACELERATIONY = ACELERATIONY;

	this.GRAVITY = GRAVITY;
	this.BREAKFORCE = BREAKFORCE;
	// Tarda 5 segundos en perder la stamina
	this.STAMINALOSE = STAMINALOSE;
	this.STAMINAWALLLOSE = STAMINAWALLLOSE;
	// Tarda 2 segundos en recargar la stamina
	this.STAMINANORMALRECOVER = STAMINANORMALRECOVER;
	// Tarda 3.33 segundos en recargar la stamina
	this.STAMINARUNOUTRECOVER = STAMINARUNOUTRECOVER;
	this.MAXGRAVITYSPEED = MAXGRAVITYSPEED;
	this.MASS  = MASS;
	this.SPEEDXLOSE = SPEEDXLOSE ;


		speedX = 0;
		speedY = 0;
		runOutStamina = false;
		maxStamina = MAXSTAMINA;
		breakForce = BREAKFORCE;
		stamina = MAXSTAMINA;
		mass = MASS;

		this.mySession = mySession;
		this.sessionLock = sessionLock;


		// inicializamos los valores que varian con el power up
		maxNormalSpeedX = MAXNORMALVELOCITYX;
		maxNormalSpeedY = MAXNORMALVELOCITYY;
		maxAceleratingSpeedX = MAXVELOCITYX;
		maxAceleratingSpeedY = MAXVELOCITYY;
		normalAcelerationX = NORMALACELERATIONX;
		normalAcelerationY = NORMALACELERATIONY;
		maxAcelerationAceleratingX = ACELERATIONX;
		maxAcelerationAceleratingY = ACELERATIONY;
		timeProtectedRemaining = TIMEPROTECTED;

		this.STATSPEED = STATSPEED;
		this.STATWEIGHT = STATWEIGHT;
		this.STATSTAMINA = STATSTAMINA;
		this.STATAC = STATAC;
		this.STATREGEN = STATREGEN;

		this.CASHPRICE = CASHPRICE;
		this.POINTSPRICE = POINTSPRICE;

		collider = new SquareCollider(colliderOfsetX, colliderOfsetY, posX, posY);
	}

	public void resetPosition(){
		posX = 100;
		posY = 500;
	}

	// Resetea los valores en caso de que hayas consumido algun power up
	public void restoreValues() {
		// valores que varian con el power up

		maxNormalSpeedX = MAXNORMALVELOCITYX;
		maxNormalSpeedY = MAXNORMALVELOCITYY;
		maxAceleratingSpeedX = MAXVELOCITYX;
		maxAceleratingSpeedY = MAXVELOCITYY;
		normalAcelerationX = NORMALACELERATIONX;
		normalAcelerationY = NORMALACELERATIONY;
		maxAcelerationAceleratingX = ACELERATIONX;
		maxAcelerationAceleratingY = ACELERATIONY;
		

		maxStamina = MAXSTAMINA;
		hasBoostStamina = false;
		if(powerUpList.size() >0){
			powerUpList.remove();
		}
		mass = MASS;
	}

	public void usePowerUp() {
		if (powerUpList.size() >0) {
			powerUpList.getFirst().usePowerUp();
			usingPowerUp = true;
		}
	}

	// Si anda por paredes o suelo va a velocidad constante y no pierde stamina
	// En paredes pierde stamina y cuando acelera tambien, si se queda sin estamina,
	// se para hasta que la recupere.
	// Actualizacion del movimiento y variables del caracol
	public void updateSnail(Room room, int id) {
		 if(isProtected){
			 timeProtectedRemaining --;
			 if(timeProtectedRemaining <= 0){
				isProtected = false;
				timeProtectedRemaining = TIMEPROTECTED;
			 }
		 }

		if(hasPassedDoor){
			doorTime -= 33;
			if(doorTime<0){
				hasPassedDoor = false;
				doorTime = timeToPassDoor;
			}
		}

		if(hasFallenTrap){
			trapDoorTime -= 33;
			if(trapDoorTime <0){
				hasFallenTrap = false;
				trapDoorTime = timeToPassTrap;
			}
		}


		sendRunOutStamina = false;
		sendRecoverStamina = false;
		boolean useObject = false;
		boolean wasLastFrameAcelerating = false;
		lastMovementLock.lock();
		if (lastMovement != null) {
			wasLastFrameAcelerating = lastMovement.isAcelerating;
			useObject = lastMovement.useObject;
			
		} else {
		}
		lastMovementLock.unlock();

		if(wasLastFrameAcelerating){
			acelerationTime = ACELERATIONTIME;
			isAcelerating = true;
		}

		if(isAcelerating){
			acelerationTime -= TICKTIME;
			if(acelerationTime <0){
				isAcelerating = false;
				acelerationTime = ACELERATIONTIME;
			}
		}

		if (useObject) {
			if (!usingPowerUp) {
				if (powerUpList.size() >0) {
					powerUpList.getFirst().usePowerUp();
				} else {
				}
			} else {
			}
		}

		if (usingPowerUp) {
			powerUpList.getFirst().decrementTime();
		}

		if (isOnObstacle) {
			if (!runOutStamina) {
				if (spikes != null) {
					if (!isOnWall && !isOnSlope) {
						// si tienes escudo, lo pierdes y reseteas los pinchos
						if (hasShield) {
							hasShield = false;
							spikes.playerCrash();
							isOnObstacle = false;
							if(room.myType.compareTo("SINGLE") == 0){
								sendCrashMessageSingle("LOSESHIELD");
							} else {
								sendCrashMessageMulti("LOSESHIELDMULTI",id,room);
							}
						} else if(isProtected){
						}else {
							spikes.playerCrash();
							crashObstacle();
							isOnObstacle = false;
							isProtected = true;
							if(room.myType.compareTo("SINGLE") == 0){
								sendCrashMessageSingle("OBSTACLECOLLISION");
							} else {
								sendCrashMessageMulti("OBSTACLECOLLISIONMULTI",id,room);
							}
							
							
						}
					}
				}
			}
		}

		// Si tienes stamina haces funcionamiento normal
		if (!runOutStamina) {
			// Comprobamos si aceleramos o no para perder o quitar stamina
			if (!wasLastFrameAcelerating) {

				if (!isOnWall) {
					if (stamina < MAXSTAMINA) {
						stamina += STAMINANORMALRECOVER;
					}

				} else {
					if (!hasBoostStamina) {
						stamina -= STAMINAWALLLOSE;
					}

				}

				if (stamina <= 0) {
					runOutStamina = true;
					sendRunOutStamina = true;
					

				}

			



			} else {
				if (!hasBoostStamina) {
					stamina -= STAMINALOSE;
					if (isOnWall) {
						stamina -= STAMINAWALLLOSE;
					}
				}
				if (stamina <= 0) {
					runOutStamina = true;
					sendRunOutStamina = true;
					

				}
				
			}

			
			if(!isAcelerating){
				maxSpeedX = maxNormalSpeedX;
				maxSpeedY = maxNormalSpeedY;
				acelerationX = normalAcelerationX;
				acelerationY = normalAcelerationY;
			} else {
				maxSpeedX = maxAceleratingSpeedX;
				maxSpeedY = maxAceleratingSpeedY;
				//Probando aceleracion
								
				acelerationX = maxAceleratingSpeedX;
				acelerationY = maxAceleratingSpeedY;
				
				//SI QUEREMOS VOLVER a poner la aceleracion normal
				//acelerationX = maxAcelerationAceleratingX;
				//acelerationY = maxAcelerationAceleratingY;
			}



			if (isInWind) {
				if (wind != null) {
					if (wind.goingRigth) {
						maxSpeedX *= wind.windForce;
						maxSpeedY *= wind.windForce;
						acelerationX *= wind.windForce;
						acelerationY *= wind.windForce;
					} else {
						maxSpeedX /= wind.windForce;
						maxSpeedY /= wind.windForce;
						acelerationX /= wind.windForce;
						acelerationY /= wind.windForce;
					}

				}

			}

			// Comprobamos si esta en el suelo para que avance
			if (isOnFloor) {
				if (speedX < maxSpeedX) {
					speedX += acelerationX * mass;
				} else {
					speedX -= breakForce * mass;
				}
				if (speedY <= 0) {
					speedY = 0;
				}

			} else {
				if (isOnSlope) {

				} else if (!isOnWall) {
					speedY -= GRAVITY * mass;
				}
			}

			// TODO contemplar que una rampa llege a una escalera
			if (isOnSlope) {
				if (isInWind) {
					if (wind != null) {
						if (wind.goingRigth) {
							maxSpeedInSlopeX = (float) (maxSpeedX * Math.cos(slopeRadians)) * wind.windForce;
							maxSpeedInSlopeY = (float) (maxSpeedY * Math.sin(slopeRadians)) * wind.windForce;
						} else {
							maxSpeedInSlopeX = (float) (maxSpeedX * Math.cos(slopeRadians)) / wind.windForce;
							maxSpeedInSlopeY = (float) (maxSpeedY * Math.sin(slopeRadians)) / wind.windForce;
						}
						
					}

				} else {
					maxSpeedInSlopeX = (float) (maxSpeedX * Math.cos(slopeRadians));
					maxSpeedInSlopeY = (float) (maxSpeedY * Math.sin(slopeRadians));
				}

				if (speedX < maxSpeedInSlopeX) {
					speedX += acelerationX;
				} else {
					speedX -= breakForce;
				}
				if (speedY <= 0) {
					speedY = 0;
				}

			} // Hago esto para comprobar que no se pase de velocidad al haberla cambiado para
				// la cuesta
			else {
				slopeRadians = 0;
			}

			// Si está en la pared la escala
			if (isOnWall) {
				speedX = 0;

				if (speedY > maxSpeedY) {
					speedY -= breakForce * mass;
				} else {
					speedY += acelerationY * (1 / mass);
				}
			}

			// si esta en el aire, ponemos la vel X al maximo para saltar las paredes
			// (PROVISIONAL)

			if ((!isOnFloor) && (!isOnWall) && (!isOnSlope)) {
				speedX = speedX / SPEEDXLOSE;
			}
		} // Si te quedas sin estamina te quedas parado hasta que te recuperes,
		else {
			stamina += STAMINARUNOUTRECOVER;
			if ((!isOnFloor) && (!isOnWall) && (!isOnSlope)) {
				speedX = speedX / SPEEDXLOSE;
			}
			if ((!isOnFloor) && (!isOnSlope)) {
				speedY -= GRAVITY * mass;
			} else {
				speedY = 0;
				speedX = 0;
			}
			if (stamina >= maxStamina) {
				runOutStamina = false;
				stamina = maxStamina;
				sendRecoverStamina = true;
			}
		}
		// Ajustamos las velocidades

		// actualizamos posiciones
		if (isOnFloor || isOnWall) {
			adjustSpeed(maxSpeedX, maxSpeedY);
			posX += speedX;
			posY += speedY;
		} else if (isOnSlope) {
			adjustSpeed(maxSpeedInSlopeX, maxSpeedInSlopeY);
			float speedXSlope = 0;
			// diferenciamos si estamos bajado o subiedo para aumentar o disminuir velocidad
			if (slopeRadians > 0) {
				speedXSlope = (-1 * mass) + speedX;
			} else {
				speedXSlope = (+1 * mass) + speedX;
			}
			posX += speedXSlope * Math.cos(slopeRadians);
			posY += speedXSlope * Math.sin(slopeRadians);
		} else if (isJumping) {
			// adjustSpeed(maxSpeedInSlopeX,maxSpeedInSlopeY);
			posX += speedX;
			posY += speedY;
		} else {
			adjustSpeed(maxSpeedX, maxSpeedY);
			posX += speedX;
			posY += speedY;
		}
		

		// reseteamos lo del viiento
		isInWind = false;
		wind = null;

		// Avisas al collider de que recalcule la posición
		collider.recalculatePosition(posX, posY);
	}

	public void trampoThrow(int forceX, int forceY) {
		isJumping = true;
		speedX = forceX;
		speedY = forceY;
	}

	// Comprueba que no te pases de tu velocidad Máxima
	public void adjustSpeed(float maxX, float maxY) {

		if (speedX > maxX) {
			speedX = maxX;
		} else if (speedX < 0) {
			speedX = 0;
		}
		if (speedY > maxY) {
			speedY = maxY;
		} else if (speedY < MAXGRAVITYSPEED) {
			speedY = MAXGRAVITYSPEED;
		}

	}

	// Cambia el movement anterior por la siguiente actualizacion
	public void updateMovement(boolean isAcelerating, boolean useObject) {
		lastMovementLock.lock();
		lastMovement = new LastMovement(isAcelerating, useObject);
		lastMovementLock.unlock();
	}

	public void crashObstacle() {
		stamina = 0;
		runOutStamina = true;
	}

	public boolean isUsingPowerUp() {
		return usingPowerUp;
	}

	public void setUsingPowerUp(boolean usingPowerUp) {
		this.usingPowerUp = usingPowerUp;
	}

	public void activateShield() {
		hasShield = true;
	}

	public void sendCrashMessageSingle(String event) {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", event);
		try {
			sessionLock.lock();
			mySession.sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			sessionLock.unlock();
		}

	}

	public void sendCrashMessageMulti(String event, int id, Room room) {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", event);
		msg.addProperty("id", id);
		if(room.getClass() == MultiplayerRoom.class){
			MultiplayerRoom aux = (MultiplayerRoom) room;
			aux.broadcast(msg);
		}
	}

	public int getSTATSPEED() {
		return STATSPEED;
	}

	public void setSTATSPEED(int sTATSPEED) {
		STATSPEED = sTATSPEED;
	}

	public int getSTATWEIGHT() {
		return STATWEIGHT;
	}

	public void setSTATWEIGHT(int sTATWEIGHT) {
		STATWEIGHT = sTATWEIGHT;
	}

	public int getSTATSTAMINA() {
		return STATSTAMINA;
	}

	public void setSTATSTAMINA(int sTATSTAMINA) {
		STATSTAMINA = sTATSTAMINA;
	}

	public int getSTATREGEN() {
		return STATREGEN;
	}

	public void setSTATREGEN(int sTATREGEN) {
		STATREGEN = sTATREGEN;
	}

	public int getSTATAC() {
		return STATAC;
	}

	public void setSTATAC(int sTATAC) {
		STATAC = sTATAC;
	}

	public int getCASHPRICE() {
		return CASHPRICE;
	}

	public void setCASHPRICE(int cASHPRICE) {
		CASHPRICE = cASHPRICE;
	}

	public int getPOINTSPRICE() {
		return POINTSPRICE;
	}

	public void setPOINTSPRICE(int pOINTSPRICE) {
		POINTSPRICE = pOINTSPRICE;
	}

}
