package server;

import static server.SpikesObstacle.Estate.ACTIVE;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.web.socket.TextMessage;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import server.MapObject.type;

public class SinglePlayerRoom {
	String name;
	PlayerConected player;
	ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
	// TODO width del mapa de momento no es responsive
	Map map = new Map(2000);
	final int MAPSIZE = 5;
	final int TICKTIME = 33;

	ArrayList<SpikesObstacle> spikesArray = new ArrayList<>();

	// Crear la sala, asigna el jugador, creas el map y lo envias al cliente y
	// comienza el juego
	public SinglePlayerRoom(String name, PlayerConected player) {
		this.name = name;
		this.player = player;
		createMap();
		sendMap();
		tick();
	}

	public void sendObstacleUpdate() {
		ArrayList<Integer> posX = new ArrayList<>();
		ArrayList<Integer> posY = new ArrayList<>();
		for (SpikesObstacle spike : spikesArray) {
			posX.add(spike.posX);
			posY.add(spike.posY);
		}
		Gson gson = new Gson();
		String posXArray = gson.toJson(posX);
		String posYArray = gson.toJson(posY);
		JsonObject msgMap = new JsonObject();
		msgMap.addProperty("event", "SPIKEOBSTACLEUPDATE");
		msgMap.addProperty("posX", posXArray);
		msgMap.addProperty("posY", posYArray);
		try {
			player.sessionLock.lock();
			player.getSession().sendMessage(new TextMessage(msgMap.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			player.sessionLock.unlock();
		}

	}

	public void sendMap() {

		// Inicializamos arraylist para cada atributo de cada elemento
		ArrayList<Integer> posX = new ArrayList<>();
		ArrayList<Integer> posY = new ArrayList<>();
		ArrayList<Integer> height = new ArrayList<>();
		ArrayList<Integer> width = new ArrayList<>();
		ArrayList<type> myType = new ArrayList<>();

		for (MapObject obj : map.map) {
			posX.add(obj.posX);
			posY.add(obj.posY);
			height.add(obj.height);
			width.add(obj.width);
			myType.add(obj.myTipe);
		}

		// Se prepara un JSON para poder mandar el mensaje
		Gson gson = new Gson();
		String posXArray = gson.toJson(posX);
		String posYArray = gson.toJson(posY);
		String heightArray = gson.toJson(height);
		String widthArray = gson.toJson(width);
		String myTypeArray = gson.toJson(myType);

		JsonObject msgMap = new JsonObject();
		msgMap.addProperty("event", "DRAWMAP");
		msgMap.addProperty("posX", posXArray);
		msgMap.addProperty("posY", posYArray);
		msgMap.addProperty("height", heightArray);
		msgMap.addProperty("width", widthArray);
		msgMap.addProperty("myType", myTypeArray);
		System.out.println(msgMap.toString());
		try {
			player.sessionLock.lock();
			player.getSession().sendMessage(new TextMessage(msgMap.toString()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			player.sessionLock.unlock();
		}
	}

	public void createMap() {
		// MAPA 1
		/*
		 * map.addMapObject(new MapGround(300,20,0,0,type.GROUND)); map.addMapObject(new
		 * MapGround(200,20,300,0,type.GROUND)); map.addMapObject(new
		 * MapWall(20,400,500,0,type.WALL)); map.addMapObject(new
		 * MapGround(100,20,500,400,type.GROUND)); map.addMapObject(new
		 * MapGround(300,20,800,400,type.GROUND)); map.addMapObject(new
		 * MapGround(300,20,600,200,type.GROUND)); map.addMapObject(new
		 * MapWall(20,200,800,200,type.WALL));
		 */

		// Mapa2
		map.addMapObject(new MapGround(100, 20, 0, 0, type.GROUND));
		map.addMapObject(new MapWall(20, 400, 100, 0, type.WALL));
		// tiene que haber debajo un suelo
		// minimo tiene que estar mas tiempopreparandose qu elo que tarda en recargar el caracol.
		// 4000 serian 4.04 seg de preparacion y estaria activo cerca de 1 seg
		SpikesObstacle spike1 = new SpikesObstacle(100, 20, 100, 400, type.OBSTACLE, 15000,4000, TICKTIME); 
		map.addMapObject(spike1);
		spikesArray.add(spike1);
		map.addMapObject(new MapGround(100, 20, 100, 400, type.GROUND));
		// 30º con 300u de width = 173u de height
		map.addMapObject(new MapSlope(300, Math.toRadians(-30), 200, 400, type.SLOPE));
		map.addMapObject(new MapGround(300, 20, 480, 220, type.GROUND));
		// map.addMapObject(new MapWall(20,200,900,193,type.WALL));
	}

	public void checkCollisions() {

		boolean groundCollision = false;
		boolean wallCollision = false;
		boolean slopeCollision = false;
		boolean obstacleCollision = false;
		double slopeRadians = 0;

		for (MapObject object : map.map) {
			if (object.myTipe == type.OBSTACLE) {
				SpikesObstacle auxSpikes = (SpikesObstacle) object;
				auxSpikes.update();

			}
			if (object.collider.hayColision(player)) {
				switch (object.myTipe) {
				case GROUND:
					groundCollision = true;
					break;
				case WALL:
					wallCollision = true;
					break;
				case SLOPE:
					// Casteamos el obj con el que choca a cuesta para poder recoger su inclinación
					MapSlope auxSlope = (MapSlope) object;
					slopeCollision = true;
					slopeRadians = auxSlope.radians;
					break;
				case OBSTACLE:
					SpikesObstacle auxSpikes = (SpikesObstacle) object;
					if ((auxSpikes.estate) == ACTIVE) {
						player.mySnail.obstacle = auxSpikes;
						obstacleCollision = true;
						System.out.println(auxSpikes.toString());	
						System.out.println("ColisionPinchos");
					}
					
					break;
				default:
					System.out.println("COLISION RARA");
				}

			}
		}
		//Envia los datos al caracol el cual calcula sus fisicas
		player.mySnail.isOnFloor = groundCollision;
		player.mySnail.isOnWall = wallCollision;
		player.mySnail.isOnSlope = slopeCollision;
		player.mySnail.slopeRadians = slopeRadians;
		player.mySnail.isOnObstacle = obstacleCollision;
		
		
		/*
		System.out.println(" collision con suelo es: " + groundCollision);
		System.out.println(" collision con pared es: " + wallCollision);
		System.out.println(" collision con slope es: " + slopeCollision);
		*/
		
	}
	
	
	public void tick() {
		Runnable task = () -> {
			
			checkCollisions();
			sendObstacleUpdate();
			
			player.mySnail.updateSnail();
			JsonObject msg = new JsonObject();
			msg.addProperty("event", "TICK");
			msg.addProperty("posX", player.mySnail.posX);
			msg.addProperty("posY", player.mySnail.posY);
			
			try {
				player.sessionLock.lock();
				player.getSession().sendMessage(new TextMessage(msg.toString()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} finally{
				player.sessionLock.unlock();
			}
		};

		//Delay inicial de la sala, empieza un segundo y continua ejecutando el tick cada 33 milisegundos
		executor.scheduleAtFixedRate(task, 1000, TICKTIME, TimeUnit.MILLISECONDS);
	}
	
}


