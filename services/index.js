import { FabricaPersonajes } from "./FabricaPersonajes.js";
import { GeneradorItems } from "./GenerarLoot.js";
import { InventarioInteractivo } from "./InventarioInteractivo.js";
import { SeleccionPersonajes } from "./SeleccionarPersonajes.js";
import { AsignarPreset } from "./SeleccionarPreset.js";
import { VisualizarPersonajes } from "./VisualizarPersonajes.js";
import { Menus } from "../utils/menuPrincipal.js";
import { preguntar } from "../utils/RecibirPrompt.js";
import { enemigoAleatorio } from "./EnemigoAleatorio.js";

async function flow() {
    let salir = false;
    while (salir == false) {
        console.log("Bienvenido A Guejar")
        let pirobo = await Menus("Un Jugador", "Dos Jugadores", "Salir");
        switch (pirobo) {
            case "Un Jugador":
                let crear_o_elegir = await Menus("Crear Personaje", "Elegir Personaje");
                if (crear_o_elegir == "Crear Personaje") {
                    let nombre = await preguntar("Ingrese el nombre: ");
                    let clase = await Menus("Morador", "Synth", "Paladin", "Necrofago");
                    FabricaPersonajes.crearPersonaje(clase, nombre);
                };
                VisualizarPersonajes.mostrar();
                let personaje = await SeleccionPersonajes.mostrarPersonajes();
                

                let elegirPreset = await Menus("Elegir Preset(Se reiniciara inventario)", "Continuar con el inventario actual");
                if (elegirPreset == "Elegir Preset(Se reiniciara inventario)") {
                    personaje.inventario = [];
                    const asignador = new AsignarPreset();
                    personaje = await asignador.asignar(personaje);
                };
                let enemigo = enemigoAleatorio("../utils/enemigos.json");
                console.log(`Ha aparecido un ${enemigo.nombre} `)
                let personajeGana=false;
                let enemigoGana= false;
                let peleaEnCurso=false;
                console.log("Inicia el combate");
                while (peleaEnCurso=true) {
                    console.log(`${personaje.nombre},Salud: ${personaje.vida}`);
                    console.log(`${enemigo.nombre},Salud: ${enemigo.vida}`)
                    let movimiento = await Menus("Atacar", "Defenderse", "Inventario");
                    let defensa=false;
                    switch (movimiento) {
                        case "Atacar":
                            enemigo.vida-=personaje.ataque;
                            console.log(`${personaje.nombre} ha hecho ${personaje.ataque} de daño`);
                            break;
                        case "Defenderse":
                            defensa = true;
                            break; 
                        case "Inventario":
                            console.log(personaje.inventario)
                            const menuInventario = new InventarioInteractivo(personaje);
                            await menuInventario.abrirInventario();
                            break;
                        default:
                            break;
                    };
                    if(enemigo.vida<=0){console.log("Ganaste");GeneradorItems.generarYGuardarItem(personaje);return}
                    console.log("Enemigo ataca");
                    if(defensa==true){let dañoAPersonaje=(enemigo.daño-personaje.defensa);
                        if(dañoAPersonaje<0){dañoAPersonaje=5};
                        personaje.vida-=dañoAPersonaje;
                        console.log(`El enemigo ha hecho ${dañoAPersonaje} de daño`);
                    }
                    else{personaje.vida-=enemigo.daño;console.log(`El enemigo ha hecho ${enemigo.daño} de daño`);}
                    if (personaje.vida<=0){console.log("Perdiste");return}
                };
                break;


            case "Dos Jugadores":
                console.log("Jugador uno")
                let crear_o_elegir_1 = await Menus("Crear Personaje", "Elegir Personaje");
                if (crear_o_elegir_1 == "Crear Personaje") {
                    let nombre1 = await preguntar("Ingrese el nombre: ");
                    let clase1 = await Menus("Morador", "Synth", "Paladin", "Necrofago");
                    FabricaPersonajes.crearPersonaje(clase1, nombre1);
                };
                VisualizarPersonajes.mostrar();
                let personaje1 = await SeleccionPersonajes.mostrarPersonajes();
                let elegirPreset1 = await Menus("Elegir Preset(Se reiniciara inventario)", "Continuar con el inventario actual");
                if (elegirPreset1 == "Elegir Preset(Se reiniciara inventario)") {
                    personaje1.inventario = [];
                    const asignador = new AsignarPreset();
                    personaje1 = await asignador.asignar(personaje1);
                };
                console.log("Jugador dos")
                let crear_o_elegir_2 = await Menus("Crear Personaje", "Elegir Personaje");
                if (crear_o_elegir_2 == "Crear Personaje") {
                    let nombre2 = await preguntar("Ingrese el nombre: ");
                    let clase2 = await Menus("Morador", "Synth", "Paladin", "Necrofago");
                    FabricaPersonajes.crearPersonaje(clase2, nombre2);
                };
                VisualizarPersonajes.mostrar();
                let personaje2 = await SeleccionPersonajes.mostrarPersonajes();
                let elegirPreset2 = await Menus("Elegir Preset(Se reiniciara inventario)", "Continuar con el inventario actual");
                if (elegirPreset2 == "Elegir Preset(Se reiniciara inventario)") {
                    personaje2.inventario = [];
                    const asignador = new AsignarPreset();
                    personaje2 = await asignador.asignar(personaje2);
                };
                console.log("Pelien");
                let encuentroEnCurso=false;
                console.log("Inicia el combate");
                while (encuentroEnCurso=true) {
                    console.log(`Jugador 1:${personaje1.nombre},Salud: ${personaje1.vida}`);
                    console.log(`Jugador 2:${personaje2.nombre},Salud: ${personaje2.vida}`);
                    console.log("Turno jugador 1")
                    let movimiento1 = await Menus("Atacar", "Defenderse", "Inventario");
                    let defensa1=false;
                    let defensa2=false;
                    switch (movimiento1) {
                        case "Atacar":
                            if(defensa2==true){
                                let dañoAPersonaje2=personaje1.ataque-personaje2.defensa;
                                if(dañoAPersonaje2<0){dañoAPersonaje2=5}
                                personaje2.vida-=dañoAPersonaje2
                                console.log(`${personaje1.nombre} ha hecho ${dañoAPersonaje2} de daño`);
                            }else{
                            personaje2.vida-=personaje1.ataque;
                            console.log(`${personaje1.nombre} ha hecho ${personaje1.ataque} de daño`);}
                            break;
                        case "Defenderse":
                            defensa1 = true;
                            break; 
                        case "Inventario":
                            console.log(personaje1.inventario)
                            const menuInventario = new InventarioInteractivo(personaje1);
                            await menuInventario.abrirInventario();
                            break;
                        default:
                            break;
                    };
                    if(personaje2.vida<=0){console.log("Jugador 1 gana");return}
                    console.log("Turno jugador 2");
                    let movimiento2 = await Menus("Atacar", "Defenderse", "Inventario");
                    
                    switch (movimiento2) {
                        case "Atacar":
                            if(defensa1==true){
                                let dañoAPersonaje1=personaje2.ataque-personaje1.defensa;
                                if(dañoAPersonaje1<0){dañoAPersonaje1=5}
                                personaje1.vida-=dañoAPersonaje1
                                console.log(`${personaje2.nombre} ha hecho ${dañoAPersonaje1} de daño`);
                            }else{
                            personaje1.vida-=personaje2.ataque;
                            console.log(`${personaje2.nombre} ha hecho ${personaje2.ataque} de daño`);}
                            break;
                        case "Defenderse":
                            defensa2 = true;
                            break; 
                        case "Inventario":
                            console.log(personaje2.inventario)
                            const menuInventario = new InventarioInteractivo(personaje2);
                            await menuInventario.abrirInventario();
                            break;
                        default:
                            break;
                    };
                    if(personaje1.vida<=0){console.log("Jugador 2 gana");return}
                   
                };
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