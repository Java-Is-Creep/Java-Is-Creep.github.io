package com.server.Slooow;

import static com.server.Slooow.SpikesObstacle.Estate.ACTIVE;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

import org.springframework.web.socket.TextMessage;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import com.server.Slooow.MapObject.type;
import com.server.Slooow.Trampoline.trampolineEstate;

public class SinglePlayerRoom extends Room {
	// String name;
	// ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	// TODO width del mapa de momento no es responsive

	final int MAPSIZE = 5;
	final int NUMSECONS = 16;
	final int TIMETOSUCESS = NUMSECONS * 1000; // se multiplica por mil porque TICKTIME esta en milisegundos

	// sirve para comprobar el tipo de clase con la que chocas, puerta o suelo

	// Crear la sala, asigna el jugador, creas el map y lo envias al cliente y
	// comienza el juego
	public SinglePlayerRoom(String name, PlayerConected player, SnailGame game) {
		super(name, player, game);

	}

	public void sendMap() {

		// Inicializamos arraylist para cada atributo de cada elemento
		ArrayList<Integer> posX = new ArrayList<>();
		ArrayList<Integer> posY = new ArrayList<>();
		ArrayList<Integer> height = new ArrayList<>();
		ArrayList<Integer> width = new ArrayList<>();
		ArrayList<type> myType = new ArrayList<>();
		ArrayList<Boolean> windDir = new ArrayList<>();

		for (MapObject obj : map.map) {
			posX.add(obj.posX);
			posY.add(obj.posY);
			if (obj.myType == type.SLOPE) {
				MapSlope aux = (MapSlope) obj;
				height.add((int) aux.degrees);
			} else {
				height.add(obj.height);
			}
			if(obj.myType == type.WIND){
				Wind aux = (Wind) obj;
				windDir.add(aux.goingRigth);
			}
			width.add(obj.width);
			myType.add(obj.myType);
		}

		// Se prepara un JSON para poder mandar el mensaje
		Gson gson = new Gson();
		String posXArray = gson.toJson(posX);
		String posYArray = gson.toJson(posY);
		String heightArray = gson.toJson(height);
		String widthArray = gson.toJson(width);
		String myTypeArray = gson.toJson(myType);
		String WindDirArray = gson.toJson(windDir);

		JsonObject msgMap = new JsonObject();
		msgMap.addProperty("event", "DRAWMAP");
		msgMap.addProperty("posX", posXArray);
		msgMap.addProperty("posY", posYArray);
		msgMap.addProperty("height", heightArray);
		msgMap.addProperty("width", widthArray);
		msgMap.addProperty("myType", myTypeArray);
		msgMap.addProperty("direction", WindDirArray);
		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msgMap.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}
	}

	public void createMap() {
		// MAPA 1
		/*
		 * <<<<<<< HEAD
		 * 
		 * 
		 * >>>>>>> client1 map.addMapObject(new MapGround(300, 20, 0, 0, type.GROUND));
		 * /*TrapDoor trap = new TrapDoor(150, 20, 300, 0, type.TRAPDOOR, 3000, 3000,
		 * TICKTIME, 500, 500); map.addMapObject(trap); doorArray.add(trap);
		 */
		/*
		 * Trampoline trampoline = new Trampoline(100, 20, 300, 0, type.TRAMPOLINE, 99,
		 * 99, TICKTIME, 10, 30);
		 * 
		 * map.addMapObject(trampoline); trampolineArray.add(trampoline);
		 * map.addMapObject(new MapGround(100, 20, 400, 0, type.GROUND));
		 * map.addMapObject(new MapWall(20, 200, 500, 200, type.WALL)); DoorMap door =
		 * new DoorMap(20, 200, 500, 0, type.DOOR, 3000, 3000, TICKTIME, 500, 500);
		 * map.addMapObject(door); doorArray.add(door); map.addMapObject(new
		 * MapGround(100, 20, 500, 400, type.GROUND)); map.addMapObject(new
		 * MapGround(500, 20, 500, 0, type.GROUND)); map.addMapObject(new MapGround(300,
		 * 20, 800, 400, type.GROUND)); map.addMapObject(new MapGround(300, 20, 600,
		 * 200, type.GROUND)); map.addMapObject(new MapWall(20, 200, 800, 200,
		 * type.WALL));
		 */

		/////////////////////////////////////////////////////////////////////////////////////

		/*
		 * map.addMapObject(new MapGround(300, 20, 0, 0, type.GROUND)); // Mapa2
		 * map.addMapObject(new MapGround(100, 20, 0, 0, type.GROUND));
		 * map.addMapObject(new MapWall(20, 400, 100, 0, type.WALL)); // tiene que haber
		 * debajo un suelo // minimo tiene que estar mas tiempopreparandose qu elo que
		 * tarda en recargar el // caracol. // 4000 serian 4.04 seg de preparacion y
		 * estaria activo cerca de 1 seg SpikesObstacle spike1 = new
		 * SpikesObstacle(100,100, 100, 400, type.OBSTACLE, 15000, 4000, TICKTIME);
		 * map.addMapObject(spike1); spikesArray.add(spike1); map.addMapObject(new
		 * MapGround(100, 20, 100, 400, type.GROUND)); // 30º con 300u de width = 173u
		 * de height map.addMapObject(new MapSlope(300, Math.toRadians(-30), 200,
		 * 400,type.SLOPE)); //map.addMapObject(new MapGround(300, 20, 480,
		 * 220,type.GROUND)); //map.addMapObject(new MapPowerUp(40, 40, 550,
		 * 220,type.POWERUP)); map.addMapObject(new MapGround(200, 20, 480,
		 * 220,type.GROUND)); map.addMapObject(new MapSlope(300, Math.toRadians(30),
		 * 680, 220,type.SLOPE)); //map.addMapObject(new MapGround(300, 20, 780,
		 * 400,type.GROUND)); // map.addMapObject(new
		 * MapWall(20,200,900,193,type.WALL));
		 */
		/*
		 * map.addMapObject(new MapGround(600, 20, 0, 400, type.GROUND));
		 * map.addMapObject(new MapWall(20,400,600,400,type.WALL)); map.addMapObject(new
		 * MapGround(300, 20, 600, 810, type.GROUND)); map.addMapObject(new
		 * MapGround(100, 20, 900, 400, type.GROUND)); map.addMapObject(new
		 * FinishMap(50,50,950,420,type.FINISH,this));
		 * 
		 * 
		 * SpikesObstacle spike1 = new SpikesObstacle(100,100, 600, 0, type.OBSTACLE,
		 * 3000, 3000, TICKTIME); map.addMapObject(spike1); spikesArray.add(spike1);
		 * map.addMapObject(new MapGround(300, 20, 600, 0, type.GROUND));
		 * map.addMapObject(new MapGround(100, 20, 900, 0, type.GROUND)); spike1 = new
		 * SpikesObstacle(100,100, 900, 0, type.OBSTACLE, 3000, 3000, TICKTIME);
		 * map.addMapObject(spike1); spikesArray.add(spike1);
		 */

		/*
		 * /* map.addMapObject(new MapGround(100, 20, 0, 0, type.GROUND));
		 * map.addMapObject(new MapWall(20, 400, 100, 0, type.WALL)); // tiene que haber
		 * debajo un suelo // minimo tiene que estar mas tiempopreparandose qu elo
		 * quetarda en recargar el // caracol. // 4000 serian 4.04 seg de preparacion y
		 * estaria activo cerca de 1 seg SpikesObstacle spike1 = new SpikesObstacle(100,
		 * 100, 100, 400, type.OBSTACLE, 15000, 4000, TICKTIME);
		 * map.addMapObject(spike1); spikesArray.add(spike1); map.addMapObject(new
		 * MapGround(100, 20, 100, 400, type.GROUND)); // 30º con 300u de width = 173u
		 * de height map.addMapObject(new MapSlope(300, Math.toRadians(-30), 200, 400,
		 * type.SLOPE)); map.addMapObject(new MapGround(300, 20, 480, 220,
		 * type.GROUND)); map.addMapObject(new MapPowerUp(40, 40, 550, 220,
		 * type.POWERUP)); map.addMapObject(new MapGround(300, 20, 780, 220,
		 * type.GROUND)); // map.addMapObject(new MapWall(20,200,900,193,type.WALL));
		 */

		/*
		 * //PRUEBA VIENTO map.addMapObject(new MapGround(300, 10, 0, 400,
		 * type.GROUND)); map.addMapObject(new MapSlope(300, Math.toRadians(-30), 300,
		 * 400, type.SLOPE)); Wind windAux = new
		 * Wind(150,200,450,220,type.WIND,false,4,false,1000,TICKTIME);
		 * map.addMapObject(windAux); windArray.add(windAux); map.addMapObject(new
		 * MapGround(360, 10, 540, 240, type.GROUND)); map.addMapObject(new
		 * MapSlope(300, Math.toRadians(30), 900, 240, type.SLOPE)); windAux = new
		 * Wind(150,200,1050,260,type.WIND,true,4,true,1000,TICKTIME);
		 * map.addMapObject(windAux); windArray.add(windAux); map.addMapObject(new
		 * MapGround(300, 10, 1140, 400, type.GROUND));
		 */
		createLevel1();

	}

	public void createLevel1() {
		int unit = owner.mySnail.colliderOfsetX;
		int acumulativePosX = 100;
		int acumulativePosY = 400;
		int groundHeigth = 10;
		int wallDisplacement = 0;
		map.addMapObject(new MapGround(160 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;
		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;
		map.addMapObject(new MapGround(4 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 4 * unit;
		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
		acumulativePosY += 5 * unit;

		// el power up no cuenta para el aumento d elo sacumulatives
		MapPowerUp auxPower = new MapPowerUp(unit, unit, acumulativePosX + 3 * unit, acumulativePosY + unit / 2,
				type.POWERUP);

		map.addMapObject(auxPower);
		powerArray.add(auxPower);

		map.addMapObject(new MapGround(6 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 6 * unit;
		TrapDoor trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 3000,
				3000, TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;
		// DESVIO Rojo1
		int acumulativePosXRedPath = acumulativePosX + 2 * unit;
		int acumulativePosYRedPath = 400;
		map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosXRedPath, acumulativePosYRedPath,
				type.WALL));
		acumulativePosYRedPath += 4 * unit;
		map.addMapObject(
				new MapGround(4 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
		acumulativePosXRedPath += 4 * unit;
		// son 5 hacia abajo pero el tamaño real que queremos conseguir es 4, el extra
		// es para que el
		// tenedor quede bien
		map.addMapObject(new MapSlope(5 * unit, Math.toRadians(-45), acumulativePosXRedPath, acumulativePosYRedPath,
				type.SLOPE));
		// FIN DESVIO1
		map.addMapObject(new MapGround(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 3 * unit;
		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(45), acumulativePosX, acumulativePosY, type.SLOPE));
		acumulativePosX += 6 * unit;
		// el alto de la cuesta; 91
		acumulativePosY += 6 * unit;
		map.addMapObject(
				new MapGround(1 * unit, groundHeigth, acumulativePosX, acumulativePosY - (unit / 2), type.GROUND));
		acumulativePosX += 1 * unit;

		Trampoline trampoline = new Trampoline(4 * unit, groundHeigth, acumulativePosX, acumulativePosY - unit,
				type.TRAMPOLINE, 4000, 250, 500, TICKTIME, 10, 22);

		map.addMapObject(trampoline);
		trampolineArray.add(trampoline);
		acumulativePosX += 4 * unit;

		// map.addMapObject(new MapGround(4*unit, groundHeigth,
		// acumulativePosX,acumulativePosY, type.GROUND));

		// Desvio Negro1
		int acumulativePosXNegro = acumulativePosX;
		int acumulativePosYNegro = acumulativePosY;
		acumulativePosXNegro += 5 * unit;
		acumulativePosYNegro += 11 * unit;

		map.addMapObject(
				new MapGround(7 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 7 * unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXNegro, acumulativePosYNegro, type.SLOPE));

		acumulativePosXNegro += 5 * unit;
		acumulativePosYNegro -= 5 * unit;

		// Las posiciones del power up no cuentan para le aumento global
		auxPower = new MapPowerUp(unit, unit, acumulativePosXNegro + 3 * unit, acumulativePosYNegro + unit / 2,
				type.POWERUP);
		map.addMapObject(auxPower);

		powerArray.add(auxPower);

		map.addMapObject(
				new MapGround(8 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosXNegro += 8 * unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXNegro, acumulativePosYNegro, type.SLOPE));

		acumulativePosXNegro += 6 * unit;
		acumulativePosYNegro -= unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXNegro, acumulativePosYNegro, type.SLOPE));

		acumulativePosXNegro += 6 * unit;
		acumulativePosYNegro -= unit;

		// despues del trampolin sarten, volvemos camino azul
		map.addMapObject(
				new MapGround(4 * unit, groundHeigth, acumulativePosX, acumulativePosY - 2 * unit, type.GROUND));
		acumulativePosX += 4 * unit;
		acumulativePosY -= 2 * unit;

		map.addMapObject(new MapSlope(4 * unit, Math.toRadians(-60), acumulativePosX, acumulativePosY, type.SLOPE));
		acumulativePosX += 4 * unit;

		// volvemos a llegar al suelo
		acumulativePosX += 3 * unit;
		acumulativePosY = 400;

		Wind windAux = new Wind(11 * unit, 2 * unit, acumulativePosX, acumulativePosY, type.WIND, false, 4, true, 5000,
				TICKTIME);
		map.addMapObject(windAux);
		windArray.add(windAux);

		acumulativePosX += 12 * unit;

		map.addMapObject(
				new MapWall(20, 6 * unit - wallDisplacement, acumulativePosX + 4 * unit, acumulativePosY, type.WALL));

		acumulativePosX += 4 * unit;
		acumulativePosY += 6 * unit;

		auxPower = new MapPowerUp(unit, unit, acumulativePosX + 2 * unit, acumulativePosY + unit / 2, type.POWERUP);
		map.addMapObject(auxPower);

		powerArray.add(auxPower);

		map.addMapObject(new MapGround(7 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));

		acumulativePosX += 7 * unit;

		// devio Rojo 1ª puerta
		acumulativePosXRedPath = acumulativePosX+1*unit;
		acumulativePosYRedPath = acumulativePosY;

		DoorMap doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR,
				300, 300000000, TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		map.addMapObject(new MapWall(20, 6 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

		acumulativePosY += 6 * unit;

		SpikesObstacle spike1 = new SpikesObstacle(2 * unit, 2 * unit, acumulativePosX + 10 * unit, acumulativePosY,
				type.OBSTACLE, 3000, 3000, 500, TICKTIME);
		map.addMapObject(spike1);
		spikesArray.add(spike1);

		map.addMapObject(new MapGround(19 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));

		acumulativePosX += 19 * unit;

		doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR, 3000, 3000,
				TICKTIME, 66, 66);
		map.addMapObject(doorAux);
		doorArray.add(doorAux);

		acumulativePosY += 2 * unit;

		// Empieza el camino gris
		int acumulativePosXGris = acumulativePosX;
		int acumulativePosYGris = acumulativePosY - 2 * unit;

		map.addMapObject(
				new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXGris, acumulativePosYGris, type.SLOPE));
		acumulativePosXGris += 4 * unit;
		acumulativePosYGris -= 4 * unit;

		map.addMapObject(new MapGround(3 * unit, groundHeigth, acumulativePosXGris, acumulativePosYGris, type.GROUND));

		// FIN DESVIOGRIS

		map.addMapObject(new MapWall(20, 10 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

		acumulativePosY += 10 * unit;

		map.addMapObject(new MapGround(5 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));

		acumulativePosX += 5 * unit;

		// DesvioCaminoNegro2
		acumulativePosXNegro = acumulativePosX - 6 * unit;
		acumulativePosYNegro = acumulativePosY - 7 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosX, acumulativePosY, type.SLOPE));
		acumulativePosX += 4 * unit;
		acumulativePosY -= 4 * unit;

		map.addMapObject(new MapGround(1 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 1 * unit;

		trap = new TrapDoor(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.TRAPDOOR, 3000, 3000,
				TICKTIME, 500, 500);
		map.addMapObject(trap);
		trapDoorArray.add(trap);
		acumulativePosX += 3 * unit;

		map.addMapObject(new MapGround(1 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
		acumulativePosX += 1 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosX, acumulativePosY, type.SLOPE));

		acumulativePosXNegro += 6 * unit;
		acumulativePosYNegro -= unit;

		// camino azul se junta con el negro.

		map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosXNegro,
				acumulativePosYNegro , type.WALL));

		acumulativePosY -= 5 * unit;

		// DEBERIA IR PARTE DEL SUELO MOJADO
		map.addMapObject(
				new MapGround(20 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
		acumulativePosX += 20 * unit;

		///// FIN CAMINO NGERO 2 SE JUNTA CON EL AZUL
		//Empezamos segundo partido rojo
		map.addMapObject(
				new MapGround(7 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
				acumulativePosXRedPath += 7 * unit;

		map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXRedPath, acumulativePosYRedPath, type.SLOPE));

		acumulativePosXRedPath += 5 * unit;
			acumulativePosYRedPath -= 5*unit;

			map.addMapObject(
				new MapGround(5 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
				acumulativePosXRedPath += 6 * unit;

				windAux = new Wind(13*unit, 12*unit, acumulativePosXRedPath, acumulativePosYRedPath, type.WIND, true, 4, false, 4000, 33);
				windArray.add(windAux);
				map.addMapObject(windAux);




			map.addMapObject(new MapSlope(6 * unit, Math.toRadians(45), acumulativePosXRedPath-1*unit, acumulativePosYRedPath-1*unit, type.SLOPE));

			acumulativePosXRedPath += 5 * unit;
			acumulativePosYRedPath += 5*unit;


			map.addMapObject(
				new MapGround(7 * unit, groundHeigth, acumulativePosXRedPath-1*unit, acumulativePosYRedPath-1*unit, type.GROUND));
				acumulativePosXRedPath += 5 * unit;

			
			map.addMapObject(new MapSlope(6 * unit, Math.toRadians(45), acumulativePosXRedPath, acumulativePosYRedPath-1*unit, type.SLOPE));

			acumulativePosXRedPath += 5 * unit;
			acumulativePosYRedPath += 5*unit;


			auxPower = new MapPowerUp(unit, unit, acumulativePosXRedPath + 11 * unit, acumulativePosYNegro + unit / 2,
				type.POWERUP);
			map.addMapObject(auxPower);

			powerArray.add(auxPower);

			
			map.addMapObject(
				new MapGround(14 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
				acumulativePosXRedPath += 14 * unit;

				//acaba el suelo donde se unen el segundo camino rojo y el azul
				acumulativePosX = acumulativePosXRedPath;
				acumulativePosY = acumulativePosYRedPath;

				map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosX+1, acumulativePosY-1*unit, type.SLOPE));

				acumulativePosX += 5 * unit;
				acumulativePosY -= 5*unit;


				map.addMapObject(new MapGround(5 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
				acumulativePosX += 5 * unit;
				map.addMapObject(new MapWall(20, 5 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));
				acumulativePosY += 5 * unit;

				//preparacionCaminoRojo
								
				acumulativePosXRedPath = acumulativePosX;
				acumulativePosYRedPath = acumulativePosY;
		

				 doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR,
				300000000, 300, TICKTIME, 66, 66);
				map.addMapObject(doorAux);
				doorArray.add(doorAux);

				acumulativePosY += 2 * unit;
				
				
				
				
				map.addMapObject(new MapWall(20, 4 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

				acumulativePosY += 4 * unit;

				//PREPARACION segundoCaminO negro
				acumulativePosXNegro = acumulativePosX;
				acumulativePosYNegro = acumulativePosY;

				
				doorAux = new DoorMap(20, 2 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.DOOR, 300, 300000000,
				TICKTIME, 66, 66);
				map.addMapObject(doorAux);
				doorArray.add(doorAux);
				

				acumulativePosY += 2 * unit;

				
				map.addMapObject(new MapWall(20, 3 * unit - wallDisplacement, acumulativePosX, acumulativePosY, type.WALL));

				acumulativePosY += 3 * unit;

				map.addMapObject(
				new MapGround(3 * unit, groundHeigth, acumulativePosX, acumulativePosY, type.GROUND));
				acumulativePosX += 3 * unit;

				map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosX, acumulativePosY-1, type.SLOPE));
				
				//CREACION CAMINO ROJO ULTIMO
				
				map.addMapObject(
				new MapGround(3 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
				acumulativePosXRedPath += 3 * unit;

				map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-45), acumulativePosXRedPath, acumulativePosYRedPath, type.SLOPE));

				acumulativePosXRedPath += 5 * unit;
				acumulativePosYRedPath -= 5*unit;


				map.addMapObject(
				new MapGround(12 * unit, groundHeigth, acumulativePosXRedPath, acumulativePosYRedPath, type.GROUND));
				acumulativePosXRedPath += 12 * unit;

				map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXRedPath, acumulativePosYRedPath, type.SLOPE));

				acumulativePosXRedPath += 6 * unit;
				acumulativePosYRedPath -= unit;


				acumulativePosXRedPath += 8 * unit;

				map.addMapObject(new FinishMap(unit,unit,acumulativePosXRedPath,400,type.FINISH,this));

				System.out.println("POSICION DEL FIN: " +acumulativePosXRedPath );
				
				//REALIZAMOS AHORA EL CAMINO NEGRO
				
				map.addMapObject(
				new MapGround(3 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
				acumulativePosXNegro += 3 * unit;

				map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-30), acumulativePosXNegro, acumulativePosYNegro, type.SLOPE));

				acumulativePosXNegro += 5 * unit;
				acumulativePosYNegro -= 4*unit;

				map.addMapObject(
				new MapGround(6 * unit, groundHeigth, acumulativePosXNegro, acumulativePosYNegro, type.GROUND));
				acumulativePosXNegro += 6 * unit;

				map.addMapObject(new MapSlope(6 * unit, Math.toRadians(-10), acumulativePosXNegro, acumulativePosYNegro-1, type.SLOPE));

				acumulativePosXNegro += 6 * unit;
				acumulativePosYNegro -= unit;
				










				

				

			


	}

	public void checkCollisions() {

		boolean groundCollision = false;
		boolean wallCollision = false;
		boolean slopeCollision = false;
		boolean obstacleCollision = false;
		double slopeRadians = 0;
		int degrees = 0;

		// mandan mensajes para actualizar visualmente al cliente
		boolean sendGroundCollision = false;
		boolean sendWallCollision = false;
		boolean sendSlopeCollision = false;

		for (MapObject object : map.map) {

			if (object.collider.hayColision(owner)) {
				switch (object.myType) {
				case GROUND:
					if (owner.mySnail.hasFallenTrap) {
						if (object.getClass() == TrapDoor.class) {
						} else {
							if (owner.mySnail.trapDoorPosY != object.posY) {
								groundCollision = true;
								owner.mySnail.isJumping = false;
								if (!lastFrameGroundCollision) {
									sendGroundCollision = true;
								}
							}

						}
					} else {
						groundCollision = true;
						owner.mySnail.hasFallenTrap = false;
						owner.mySnail.isJumping = false;
						if (!lastFrameGroundCollision) {
							sendGroundCollision = true;
						}
					}
					break;
				case WALL:
					if (owner.mySnail.hasPassedDoor) {
						System.out.println("PASAPUERTA");
						if (object.getClass() == DoorMap.class) {

						} else {
							wallCollision = true;
							if (!lastFrameWallCollision) {
								sendWallCollision = true;
							}
						}
					} else {
						System.out.println("PARED");
						wallCollision = true;
						if (!lastFrameWallCollision) {
							sendWallCollision = true;
						}
						owner.mySnail.hasPassedDoor = false;
						owner.mySnail.isJumping = false;

					}

					break;
				case SLOPE:
					// Casteamos el obj con el que choca a cuesta para poder recoger su inclinación
					MapSlope auxSlope = (MapSlope) object;
					slopeCollision = true;
					slopeRadians = auxSlope.radians;
					degrees = (int) auxSlope.degrees;
					owner.mySnail.isJumping = false;
					if (!lastFrameWallSlopeCollision) {
						sendSlopeCollision = true;
					}
					break;
				case OBSTACLE:
					SpikesObstacle auxSpikes = (SpikesObstacle) object;
					if ((auxSpikes.estate) == ACTIVE) {
						owner.mySnail.spikes = auxSpikes;
						obstacleCollision = true;
					}

					break;
				case POWERUP:
					MapPowerUp powerAux = (MapPowerUp) object;
					powerAux.playerCrash(owner, powerArray.indexOf(powerAux));
					break;
				case DOOR:
					owner.mySnail.hasPassedDoor = true;
					break;
				case TRAPDOOR:
					owner.mySnail.hasFallenTrap = true;
					owner.mySnail.trapDoorPosY = object.posY;
					// System.out.println("colision trampilla");
					break;
				case TRAMPOLINE:

					Trampoline auxTrampoline = (Trampoline) object;
					if (auxTrampoline.trampoEstate == trampolineEstate.ACTIVE) {
						owner.mySnail.isJumping = true;
						auxTrampoline.throwSnail(owner.mySnail);
					} else {
						groundCollision = true;
						owner.mySnail.hasFallenTrap = false;
						owner.mySnail.isJumping = false;
					}

					break;
				case FINISH:
					finishRace();
					break;
				case WIND:
					owner.mySnail.isInWind = true;
					owner.mySnail.wind = (Wind) object;
					break;
				default:
					System.out.println("COLISION RARA");
				}

			}
		}

		lastFrameGroundCollision = groundCollision;
		lastFrameWallCollision = wallCollision;
		lastFrameWallSlopeCollision = slopeCollision;

		if (sendGroundCollision) {
			sendGroundCollision();
		}

		if (sendWallCollision) {
			sendWallCollision();
		}

		if (sendSlopeCollision) {
			sendSlopeCollision(degrees);
		}

		// Envia los datos al caracol el cual calcula sus fisicas
		owner.mySnail.isOnFloor = groundCollision;
		owner.mySnail.isOnWall = wallCollision;
		owner.mySnail.isOnSlope = slopeCollision;
		owner.mySnail.slopeRadians = slopeRadians;
		owner.mySnail.isOnObstacle = obstacleCollision;

		/*
		 * System.out.println(" collision con suelo es: " + groundCollision);
		 * System.out.println(" collision con pared es: " + wallCollision);
		 * System.out.println(" collision con slope es: " + slopeCollision);
		 */

	}

	public void sendSlopeCollision(int degrees) {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "SLOPECOLLISION");
		msg.addProperty("degrees", degrees);

		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}
	}

	public void sendWallCollision() {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "WALLCOLLISION");

		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}
	}

	public void sendGroundCollision() {
		JsonObject msg = new JsonObject();
		msg.addProperty("event", "GROUNDCOLLISION");

		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}
	}

	public void updateTrapDoor() {
		int i = 0;
		for (TrapDoor trap : trapDoorArray) {
			boolean cambio = trap.update();

			if (cambio) {

				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATETRAPDOOR");
				msg.addProperty("id", i);

				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}

			}
			i++;
		}
	}

	public void updateDoors() {
		int i = 0;
		for (DoorMap door : doorArray) {
			if (door.update()) {

				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATEDOOR");
				msg.addProperty("id", i);

				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}

			}
			i++;
		}
	}

	public void updateTrampoline() {
		int i = 0;
		for (Trampoline trampoline : trampolineArray) {
			if (trampoline.update()) {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "UPDATETRAMPOLINE");
				msg.addProperty("id", i);
				msg.addProperty("estate", trampoline.trampoEstate.toString());

				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}

			}
			i++;
		}
	}

	public void updateWind() {
		int i = 0;
		for (Wind wind : windArray) {
			if(wind.update()){
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "WINDUPDATE");
				msg.addProperty("id", i);
				msg.addProperty("direction", wind.goingRigth);
				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}
			}
			i++;
		}
	}

	public void updateObstacles() {
		int i = 0;
		for (SpikesObstacle obstacle : spikesArray) {

			if (obstacle.update() || obstacle.playerCrash) {
				JsonObject msg = new JsonObject();
				msg.addProperty("event", "OBSTACLEUPDATE");
				msg.addProperty("id", i);
				msg.addProperty("estate", obstacle.estate.toString());
				try {
					owner.sessionLock.lock();
					owner.getSession().sendMessage(new TextMessage(msg.toString()));
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					owner.sessionLock.unlock();
				}
			}
			obstacle.playerCrash = false;
			i++;
		}

	}

	public void finishRace() {
		boolean success = false;
		// acummulative time esta en ml, para pasarlo a segundos se divide entre 1000
		if (acummulativeTime > TIMETOSUCESS) {
			System.out.println("Has perdido, tu tiempo ha sido: " + acummulativeTime);
			owner.decrementLifes();

		} else {
			success = true;
			System.out.println("Has ganado, tu tiempo ha sido: " + acummulativeTime);
		}

		JsonObject msg = new JsonObject();
		msg.addProperty("event", "FINISH");
		msg.addProperty("winner", success);
		msg.addProperty("time", (int)(acummulativeTime));
		msg.addProperty("maxTime", TIMETOSUCESS);

		try {
			owner.sessionLock.lock();
			owner.getSession().sendMessage(new TextMessage(msg.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			owner.sessionLock.unlock();
		}

		executor.shutdown();
		destroyRoom();
	}

	public void checkSnailState() {
		boolean mandar = false;

		if (owner.mySnail.sendRunOutStamina || owner.mySnail.sendRecoverStamina) {
			mandar = true;
		}

		if (mandar) {
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "SNAILUPDATE");
			msg.addProperty("runOutStamina", owner.mySnail.sendRunOutStamina);
			msg.addProperty("recoverStamina", owner.mySnail.sendRecoverStamina);
			System.out.println(msg.toString());
			try {
				owner.sessionLock.lock();
				owner.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				owner.sessionLock.unlock();
			}

		}

	}

	public void tick() {
		Runnable task = () -> {
			acummulativeTime += TICKTIME;

			updateDoors();
			updateTrapDoor();
			updateTrampoline();
			updateWind();
			checkCollisions();
			updateObstacles();

			owner.mySnail.updateSnail();
			checkSnailState();
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "TICK");
			msg.addProperty("posX", owner.mySnail.posX);
			msg.addProperty("posY", owner.mySnail.posY);
			msg.addProperty("stamina", owner.mySnail.stamina);

			try {
				owner.sessionLock.lock();
				owner.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally {
				owner.sessionLock.unlock();
			}
		};

		// Delay inicial de la sala, empieza un segundo y continua ejecutando el tick
		// cada 33 milisegundos
		executor.scheduleAtFixedRate(task, TICKTIME, TICKTIME, TimeUnit.MILLISECONDS);
	}

}
