package com.server.Slooow;


/**
 * +
 * ^			El (0,0) de los colliders se ubica en la parte inferior izquierda
 * |			Se asocia a todos los objetos que deban tener colisión del juego, caracoles, objetos y suelos
 * |			Por alguna extraña razón los offset son el ancho y el largo
 * |_______>	maxX y maxY y minX y minY son las esquinas del collider
 * ESQ IZQ	+ 
 * 
 */
public class SquareCollider {

	float ofssetX;
	float ofssetY;
	float maxX;
	float maxY;
	float minX;
	float minY;

	public SquareCollider(int ofssetX, int ofssetY, float posX, float posY) {
		this.ofssetX = ofssetX;
		this.ofssetY = ofssetY;
		recalculatePosition(posX, posY);
	}

	//Calcula el tamaño del collider
	public void recalculatePosition(float posX, float posY) {
		maxX = posX + ofssetX;
		minX = posX;
		maxY = posY + ofssetY;
		minY = posY;
		if(maxX < minX){
			float aux = maxX;
			maxX = minX;
			minX = aux;
		}
		if(maxY < minY){
			float aux = maxY;
			maxY = minY;
			minY = aux;
		}
	}

	//TODO Compruebar solo lo que es visible
	public boolean hayColision(PlayerConected jugador) { 
		// System.out.println("Collider info: maxX: " +maxX + " minX: " +minX + " maxY:
		// " +maxY + " minY: " + minY);
		// System.out.println("Player info: maxX: " +jugador.mySnail.collider.maxX + "
		// minX: " +jugador.mySnail.collider.minX + " maxY: "
		// +jugador.mySnail.collider.maxY + " minY: " + jugador.mySnail.collider.minY);

		//Compruebas la intersección de forma no analítica entre los tamaños de los colliders

		//Comprobamos las maxX
		if ((maxX >= jugador.mySnail.collider.maxX) && (minX <= jugador.mySnail.collider.maxX)) {
			//
			if ((maxY >= jugador.mySnail.collider.maxY) && (minY <= jugador.mySnail.collider.maxY)) { // comprobamos las
																										// maxY
				return true;
			} else if ((minY <= jugador.mySnail.collider.minY) && (maxY >= jugador.mySnail.collider.minY)) {// comprobamos
																											// las minY
				return true;
			} else if ((maxY >= jugador.mySnail.collider.maxY) && (minY <= jugador.mySnail.collider.minY)) {
				return true;
			}
		} else if ((minX <= jugador.mySnail.collider.minX) && (maxX >= jugador.mySnail.collider.minX)) { // comprobamos
																											// las minX
			if ((maxY >= jugador.mySnail.collider.maxY) && (minY <= jugador.mySnail.collider.maxY)) { // comprobamos las
																										// maxY
				return true;
			} else if ((minY <= jugador.mySnail.collider.minY) && (maxY >= jugador.mySnail.collider.minY)) {// comprobamos
																											// las minY
				return true;
			} else if ((maxY >= jugador.mySnail.collider.maxY) && (minY <= jugador.mySnail.collider.minY)) {
				return true;
			} // si el collider es más grande que el caracol
		} else if ((maxX >= jugador.mySnail.collider.maxX) && (minX <= jugador.mySnail.collider.minX)) {
			if ((maxY >= jugador.mySnail.collider.maxY) && (minY <= jugador.mySnail.collider.maxY)) { // comprobamos las
																										// maxY
				return true;
			} else if ((minY <= jugador.mySnail.collider.minY) && (maxY >= jugador.mySnail.collider.minY)) {// comprobamos
																											// las minY
				return true;
			} else if ((maxY >= jugador.mySnail.collider.maxY) && (minY <= jugador.mySnail.collider.minY)) {
				return true;
			}
		}
		return false; // si no ha colisionado

	}

	@Override
	public String toString() {
		return "SquareCollider [maxX=" + maxX + ", maxY=" + maxY + ", minX=" + minX + ", minY=" + minY + ", ofssetX="
				+ ofssetX + ", ofssetY=" + ofssetY + "]";
	}

}
