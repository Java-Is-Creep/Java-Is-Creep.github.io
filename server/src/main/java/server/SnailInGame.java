package server;

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
	public final int MAXVELOCIDADX = 3;
	public final int MAXVELOCIDADY = 3;
	//Deben ser la misma aceleracion.
	public final float ACELERATIONX = 0.05f;
	public final float ACALERATIONY = 0.05f;
	public final float GRAVITY = 0.3f;
	public final float BREAKFORCE = 0.1f;
	//Tarda 5 segundos en perder la stamina
	public final float STAMINALOSE = 1;
	//Tarda 2 segundos en recargar la stamina 
	public final float STAMINANORMALRECOVER = 2.5f;
	//Tarda 3.33 segundos en recargar la stamina 
	public final float STAMINARUNOUTRECOVER = 1.5f; 
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
	public double slopeRadians = 0;
	public SpikesObstacle obstacle = null;

	public float speedX;
	public float speedY;
	public float stamina;
	public float posX = 20;
	public float posY = 20;
	//Última acción que se ha realizado en el cliente
	LastMovement lastMovement;
	GenericPowerUp powerUp;

	//Interacción con el escenario

	//Se accede a lastMovement tanto en esta clase como en el WebSocketSnailHandler
	ReentrantLock lastMovementLock = new ReentrantLock(); 
	
	//Inicialización según el caracol
	public SnailInGame() {
		speedX = 0;
		speedY = 0;
		runOutStamina = false;
		maxStamina = MAXSTAMINA;
		maxSpeedX = MAXVELOCIDADX;
		maxSpeedY = MAXVELOCIDADY;
		acelerationX = ACELERATIONX;
		acelerationY = ACALERATIONY;
		breakForce = BREAKFORCE;
		stamina = MAXSTAMINA;
		collider = new SquareCollider(colliderOfsetX, colliderOfsetY, posX, posY);
	}

	//Resetea los valores en caso de que hayas consumido algun power up
	public void restoreValues() {
		maxStamina = MAXSTAMINA;
		maxSpeedX = MAXVELOCIDADX;
		acelerationX = ACELERATIONX;
		acelerationY = ACALERATIONY;
		maxSpeedY = MAXVELOCIDADY;
	}

	public void usePowerUp() {
		if (powerUp != null) {
			powerUp.consumirPowerUp();
			powerUp = null;
		}
	}

	// Actualizacion del movimiento y variables del caracol
	public void updateSnail() {
		lastMovementLock.lock();
		boolean isStopping = lastMovement.isStopping;
		boolean useObject = lastMovement.useObject;
		lastMovementLock.unlock();

		if(isOnObstacle){
			if(obstacle != null) {
				if(!isOnWall && !isOnSlope){
					obstacle.playerCrash();
					crashObstacle();
					isOnObstacle = false;
					System.out.println("////////////////////");
					obstacle.toString();
					System.out.println("////////////////////");
				}
			}
			
		}

		//Si tienes stamina haces funcionamiento normal
		if (!runOutStamina) {
			//Comprobamos si aceleramos o no para perder o quitar stamina
			if (!isStopping) {
				//Si estas cayendo no pierdes stamina, sino que recuperas parte
				if ((!isOnFloor) && (!isOnWall) && (!isOnSlope)) {
					stamina += STAMINARUNOUTRECOVER;
				} else {
					stamina -= STAMINALOSE;
				}

				if (stamina <= 0) {
					runOutStamina = true;
				}
			} else {
				stamina += STAMINANORMALRECOVER;
			}

			//Comprobamos si esta en el suelo para que avance
			if (isOnFloor) {
				if (!isStopping) {
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
				System.out.println("estamos en slope");
				maxSpeedInSlopeX = (float) (maxSpeedX * Math.cos(slopeRadians));
				maxSpeedInSlopeY = (float) (maxSpeedY * Math.sin(slopeRadians));
				System.out.println("maxima velocidad en cuestaX: " + maxSpeedX);
				System.out.println("maxima velocidad en cuestaY: " + maxSpeedY);

				if (!isStopping) {
					speedX += (acelerationX * MASS);
					speedY += (acelerationY * MASS);
					System.out.println("velocidad en cuestaX: " + speedX);
					System.out.println("velocidad en cuestaY: " + speedY);
				} //Si estas frenando no te caes
				 else { 
					speedX -= breakForce * MASS ;
					speedY -= breakForce * MASS ;
					//Si estoy frenando no puedo caerme
					if (speedY < 0) { 
						speedY = 0;
					}
				}
			} //Hago esto para comprobar que no se pase de velocidad al haberla cambiado para la cuesta
			else { 
				maxSpeedX = MAXVELOCIDADX;
				maxSpeedY = MAXVELOCIDADY;
				slopeRadians = 0;
			}

			//Si está en la pared la escala
			if (isOnWall) {
				speedX = 0;
				if (!isStopping) {
					speedY += acelerationY * MASS;
				} else {
					if (!isOnFloor) {
						speedY -= GRAVITY * MASS;
					} else {
						speedY = 0;
					}

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
				posX += speedX *Math.cos(slopeRadians);
				posY += speedX *Math.sin(slopeRadians);
		} else {
			adjustSpeed(maxSpeedX,maxSpeedY);
			posX += speedX;
			posY += speedY;
		}
		//Avisas al collider de que recalcule la posición
		collider.recalculatePosition(posX, posY);
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

}
