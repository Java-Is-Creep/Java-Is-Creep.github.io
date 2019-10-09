package com.server.Slooow;

import java.util.concurrent.locks.ReentrantLock;

/*
 * 
 * Clase que comprobará todas las acciones del caracol de interacción con el jugador
 * ya sean acelerar, frenar o usar un objeto 
 * 
*/

public class SnailInGame {

	//TODO tamaño no coincide con el tamaño del caracol
	SquareCollider collider;
	final int colliderOfsetX = 50;
	final int colliderOfsetY = 50;

	/*	  
	 *	VALORES INICIALES
	 * 	DEBERÍAN CAMBIAR SEGÚN CADA CARACOL
	 */

	//151 de stamina significa 5 seg con stamina, 300 son 10 segundos, se resta 1 de stamina por segundo
	//Tiempo que se tarda en recargar la stamina si se acaba o nos dan 151 / (1.5f * 30 fps) = 3.33 segundos
	public final int MAXSTAMINA = 300; 
	public final int MAXVELOCITYX = 6;
	public final int MAXVELOCITYY = 6;
	public final int MAXNORMALVELOCITYX = 3;
	public final int MAXNORMALVELOCITYY = 3;


	//aceleracion base, es decir sin acelerar
	public final float NORMALACELERATIONX = 0.05f;
	public final float NORMALACELERATIONY = 0.05f;

	// aceleracion cuando aceleras
	public final float ACELERATIONX = 0.2f;
	public final float ACELERATIONY = 0.2f;

	
	public final float GRAVITY = 0.3f;
	public final float BREAKFORCE = 0.2f;
	//Tarda 5 segundos en perder la stamina
	public final float STAMINALOSE = 10;
	public final float STAMINAWALLLOSE = 1;
	//Tarda 2 segundos en recargar la stamina 
	public final float STAMINANORMALRECOVER = 1.5f;
	//Tarda 3.33 segundos en recargar la stamina 
	public final float STAMINARUNOUTRECOVER = 2.5f; 
	public final float MAXGRAVITYSPEED = -20;
	public final float MASS = 1;
	public final float SPEEDXLOSE = 1.02f;
	

	//Valores maximos que pueden ser cambiado con power ups momentameamente
	public int maxStamina;
	public float maxSpeedX;
	public float maxSpeedY;
	public float maxSpeedInSlopeX;
	public float maxSpeedInSlopeY;
	public float acelerationX;
	public float acelerationY;
	public float breakForce;
	public boolean runOutStamina;

	//Flags de colisiones
	public boolean isOnFloor = true;
	public boolean isOnWall = false;
	public boolean isOnSlope = false;
	public boolean isOnObstacle = false;
	public boolean hasPassedDoor = false;
	public boolean hasFallenTrap = false;
	public boolean isJumping = false;
	public double slopeRadians = 0;
	public SpikesObstacle spikes = null; 

	public float speedX;
	public float speedY;
	public float stamina;
	public float posX = 20;
	public float posY = 20;
	//Última acción que se ha realizado en el cliente
	LastMovement lastMovement;

	//Variables relacionadas con powerUps
	GenericPowerUp powerUp = null;
	protected boolean usingPowerUp = false;
	protected boolean hasShield = false;
	protected boolean hasBoostStamina = false;

	//Interacción con el escenario

	//Se accede a lastMovement tanto en esta clase como en el WebSocketSnailHandler
	ReentrantLock lastMovementLock = new ReentrantLock(); 
	
	//Inicialización según el caracol
	public SnailInGame() {
		speedX = 0;
		speedY = 0;
		runOutStamina = false;
		maxStamina = MAXSTAMINA;
		maxSpeedX = MAXNORMALVELOCITYX;
		maxSpeedY = MAXNORMALVELOCITYY;
		acelerationX = NORMALACELERATIONX;
		acelerationY = NORMALACELERATIONY;
		breakForce = BREAKFORCE;
		stamina = MAXSTAMINA;
		collider = new SquareCollider(colliderOfsetX, colliderOfsetY, posX, posY);
	}

	//Resetea los valores en caso de que hayas consumido algun power up
	public void restoreValues() {
		maxStamina = MAXSTAMINA;
		maxSpeedX = MAXNORMALVELOCITYX;
		acelerationX = NORMALACELERATIONX;
		acelerationY = NORMALACELERATIONY;
		maxSpeedY = MAXNORMALVELOCITYY;
		hasBoostStamina = false;
		powerUp = null;
	}

	public void usePowerUp() {
		if (powerUp != null) {
			powerUp.usePowerUp();
			powerUp = null;
			usingPowerUp = true;
		}
	}

	//Si anda por paredes o suelo va a velocidad constante y no pierde stamina
	//En paredes pierde stamina y cuando acelera tambien, si se queda sin estamina, se para hasta que la recupere.
	// Actualizacion del movimiento y variables del caracol
	public void updateSnail() {
		lastMovementLock.lock();
		boolean isAcelerating = lastMovement.isAcelerating;
		boolean useObject = lastMovement.useObject;
		lastMovementLock.unlock();

		if(useObject){
			if(!usingPowerUp){
				if(powerUp != null){
					powerUp.usePowerUp();
				}
			}
		}

		if(usingPowerUp){
			powerUp.decrementTime();
		}

		if(isOnObstacle){
			if(spikes != null) {
				if(!isOnWall && !isOnSlope){
					// si tienes escudo, lo pierdes y reseteas los pinchos
					if(hasShield){ 
						hasShield = false;
						spikes.playerCrash();
						isOnObstacle = false;
						System.out.println("se pincho pero se protegio con escudo");
					} else {
						spikes.playerCrash();
						crashObstacle();
						isOnObstacle = false;
						System.out.println("se pincho ");
					}
				}
			}
			
		}

		//Si tienes stamina haces funcionamiento normal
		if (!runOutStamina) {
			//Comprobamos si aceleramos o no para perder o quitar stamina
			if (!isAcelerating) {

				if(!isOnWall){
					if(stamina < MAXSTAMINA){
						stamina += STAMINANORMALRECOVER;
					}
					
				} else {
					if(!hasBoostStamina){
						stamina -= STAMINAWALLLOSE;
					}

				}
				

				if (stamina <= 0) {
					runOutStamina = true;
				}
				
				if(!usingPowerUp){
				maxSpeedX = MAXNORMALVELOCITYX;
				maxSpeedY = MAXNORMALVELOCITYY;
				acelerationX = NORMALACELERATIONX;
				acelerationY = NORMALACELERATIONY;
				}


			} else {
				if(!hasBoostStamina){
					stamina -= STAMINALOSE;
					if(isOnWall){
						stamina -= STAMINAWALLLOSE;
					}
				}
				if (stamina <= 0) {
					runOutStamina = true;
				}
				maxSpeedX = MAXVELOCITYX;
				maxSpeedY = MAXVELOCITYY;
				acelerationX = ACELERATIONX;
				acelerationY = ACELERATIONY;
			}

			//Comprobamos si esta en el suelo para que avance
			if (isOnFloor) {
				if (speedX < maxSpeedX) {
					speedX += acelerationX * MASS;
				} else {
					speedX -= breakForce * MASS;
				}
				if (speedY <= 0) {
					speedY = 0;
				}

			} else {
				if(isOnSlope){

				} else if (!isOnWall) {
					speedY -= GRAVITY * MASS;
				}
			}

			//TODO contemplar que una rampa llege a una escalera
			if (isOnSlope) { 
				maxSpeedInSlopeX = (float) (maxSpeedX * Math.cos(slopeRadians));
				maxSpeedInSlopeY = (float) (maxSpeedY * Math.sin(slopeRadians));

				if (speedX < maxSpeedInSlopeX) {
					speedX += acelerationX * MASS;
				} else {
					speedX -= breakForce * MASS;
				}
				if (speedY <= 0) {
					speedY = 0;
				}
				
			} //Hago esto para comprobar que no se pase de velocidad al haberla cambiado para la cuesta
			else { 
				slopeRadians = 0;
			}

			//Si está en la pared la escala
			if (isOnWall) {
				speedX = 0;
				
				if(speedY > maxSpeedY){
					speedY -= breakForce * MASS;
				} else {
					speedY += acelerationY * MASS;
				}
			}

			// si esta en el aire, ponemos la vel X al maximo para saltar las paredes
			// (PROVISIONAL)

			if ((!isOnFloor) && (!isOnWall) && (!isOnSlope)) {
				speedX = speedX / SPEEDXLOSE;
			}
		}//Si te quedas sin estamina te quedas parado hasta que te recuperes, 
		else { 
			stamina += STAMINARUNOUTRECOVER;
			if ((!isOnFloor) && (!isOnWall) && (!isOnSlope)) {
				speedX = speedX / SPEEDXLOSE;
			}
			if ((!isOnFloor) && (!isOnSlope)) {
				speedY -= GRAVITY * MASS;
			} else {
				speedY = 0;
				speedX = 0;
			}
			if (stamina >= maxStamina) {
				runOutStamina = false;
				stamina = maxStamina;
			}
		}
		//Ajustamos las velocidades
		

		// actualizamos posiciones
		if(isOnFloor || isOnWall){
			adjustSpeed(maxSpeedX,maxSpeedY);
			posX += speedX;
			posY += speedY;
		} else if (isOnSlope){
			adjustSpeed(maxSpeedInSlopeX,maxSpeedInSlopeY);
				float speedXSlope = 0;
				// diferenciamos si estamos bajado o subiedo para aumentar o disminuir velocidad
				if(slopeRadians > 0) {
					speedXSlope = (-1 * MASS) +speedX;
				} else {
					speedXSlope = (+1 * MASS) +speedX;
				}
				posX += speedXSlope *Math.cos(slopeRadians);
				posY += speedXSlope *Math.sin(slopeRadians);
		} else if (isJumping){
				//adjustSpeed(maxSpeedInSlopeX,maxSpeedInSlopeY);
				posX += speedX ;
				posY += speedY ;
		} else {
			adjustSpeed(maxSpeedX,maxSpeedY);
			posX += speedX;
			posY += speedY;
		}
		//Avisas al collider de que recalcule la posición
		collider.recalculatePosition(posX, posY);
	}

	public void trampoThrow(int forceX, int forceY){
		isJumping = true;
		speedX = forceX;
		speedY = forceY;
	}


	//Comprueba que no te pases de tu velocidad Máxima
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
	public void updateMovement(boolean isStoping, boolean useObject) {
		lastMovementLock.lock();
		lastMovement = new LastMovement(isStoping, useObject);
		lastMovementLock.unlock();
	}

	public void crashObstacle(){
		stamina = 0;
		runOutStamina = true;
	}

	public boolean isUsingPowerUp() {
		return usingPowerUp;
	}

	public void setUsingPowerUp(boolean usingPowerUp) {
		this.usingPowerUp = usingPowerUp;
	}

	public void activateShield(){
		hasShield = true;
	}

}
