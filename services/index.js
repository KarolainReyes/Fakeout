import { PlayerVSMachine, PlayerVSPlayer } from "../models/Batallas.js"
import { Menus } from "../utils/menuPrincipal.js";
import { sleep } from "../utils/sleeps.js";
 

async function flow() {
    let salir = false;
    while (salir == false) {
        console.log("Bienvenido A Guejar");
        sleep(1500);
        let pirobo = await Menus("Un Jugador", "Dos Jugadores", "Salir");
        sleep(1000);
        console.clear();
        switch (pirobo) {
            case "Un Jugador":
                const pvm = new PlayerVSMachine();
                await  pvm.ejecucion();
                break;


            case "Dos Jugadores":
                const pvp = new PlayerVSPlayer();
                await  pvp.ejecucion();
                break;
            case "Salir":
                console.log("Saliendo");
                salir = true;
                return
            default:
                break;
        }

    }
}

flow()