package com.server.Slooow;

import java.util.ArrayList;

public class Map {
	ArrayList<MapObject> map = new ArrayList<>();
	ArrayList<MapObject> mapVisible = new ArrayList<>();
	int firstIndexVisible=0;
	int widthCamara;
	int heigthCamara;
	int negativeYOfset; // si borramos el objeto en cuanto pase el caracol, la camara ve un poc por detras del caracol
	// por lo que desaparecerian cosas, este ofset arregla eso
	int negativeXOfset;
	
	
	
	public Map(int widthCamara) {
		this.widthCamara = widthCamara;
	}

	public void addMapObject(MapObject object) {
		map.add(object);
	}
	
	public void checkVisibleMap(SnailInGame snail) { // de momento este metodo solo comprueba lo que se ve en las x
		int indexDisplacement = 0;
		MapObject aux;
		ArrayList<MapObject> mapErase = new ArrayList<>();
		
		for (int i = firstIndexVisible; i<map.size();i++) {
			aux = map.get(i);
			if(aux.collider.minY < (snail.posY-negativeYOfset)) { // comprobamos las cosas que se quedan detras del caracol
				mapErase.add(aux);
				indexDisplacement++;
			} else if((aux.collider.minY)> (snail.posX+widthCamara)) { // comprobamos que todavia no se halla llegado
				break;
				
			} else { // si se ve
				if(!mapVisible.contains(aux)) {
					mapVisible.add(aux);
				}
				
			}
			firstIndexVisible += indexDisplacement;
			mapVisible.removeAll(mapErase);
		}
	}
	
	
}
