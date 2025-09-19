import { FabricaPersonajes } from "../services/FabricaPersonajes.js";
import { GeneradorItems } from "../services/GenerarLoot.js";
import { InventarioInteractivo } from "../services/InventarioInteractivo.js";
import { SeleccionPersonajes } from "../services/SeleccionarPersonajes.js";
import { AsignarPreset } from "../services/SeleccionarPreset.js";
import { VisualizarPersonajes } from "../services/VisualizarPersonajes.js";
import { Menus } from "../utils/menuPrincipal.js";
import { preguntar } from "../utils/RecibirPrompt.js";
import { enemigoAleatorio } from "../services/EnemigoAleatorio.js";
import { sleep } from "../utils/sleeps.js";
import chalk from 'chalk';


class Batalla {
    async ejecucion() {
        throw new Error("Debe crearse desde la subclase");

    }
}

export class PlayerVSMachine extends Batalla {
    async ejecucion() {
        let crear_o_elegir = await Menus("Crear Personaje", "Elegir Personaje");
        await sleep(1000);
        console.clear();
        if (crear_o_elegir == "Crear Personaje") {
            let nombre = await preguntar (chalk.yellow("Ingrese el nombre de su personaje: "));
            console.clear();
            let clase = await Menus("Morador", "Synth", "Paladin", "Necrofago");
            console.clear();
            FabricaPersonajes.crearPersonaje(clase, nombre);
        };
        VisualizarPersonajes.mostrar();

        let personaje = await SeleccionPersonajes.mostrarPersonajes();
        await sleep(1000);
        console.clear();

        let elegirPreset = await Menus("Elegir Preset(Se reiniciara inventario)", "Continuar con el inventario actual");
        await sleep(1000);
        console.clear();
        if (elegirPreset == "Elegir Preset(Se reiniciara inventario)") {
            personaje.inventario = [];
            const asignador = new AsignarPreset();
            personaje = await asignador.asignar(personaje)
            await sleep(1000);
            console.clear();
        };
        let enemigo = enemigoAleatorio("../utils/enemigos.json");
        console.log("  ")
        console.log(chalk.bold.red(`          Ha aparecido un ${enemigo.nombre}  😈 `));
        console.log(chalk.bold.red("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        await sleep(3000);
        console.clear();
        let personajeGana = false;
        let enemigoGana = false;
        let peleaEnCurso = false;
        console.log("  ")
        console.log(chalk.bold.yellow("               ✦ Inicia el combate ✦                       "));
        console.log(chalk.bold.yellow("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        console.log("  ")

        await sleep(1000)
        while (peleaEnCurso = true) {
            console.log(`${chalk.green(personaje.nombre)}, Salud: ${chalk.cyan(personaje.vida)}`);
            console.log(`${chalk.red(enemigo.nombre)}, Salud: ${chalk.cyan(enemigo.vida)}`)
            console.log("  ")
            let movimiento = await Menus("Atacar", "Defenderse", "Inventario");
            await sleep(1000);
            console.clear();
            let defensa = false;
            switch (movimiento) {
                case "Atacar":
                    enemigo.vida -= personaje.ataque;
                    console.log(`${chalk.red(personaje.nombre)} ha hecho ${chalk.red(personaje.ataque)} de daño`);
                    await sleep(1000);
                    console.clear();
                    break;
                case "Defenderse":
                    defensa = true;
                    console.log(chalk.yellow("Te defiendes  🧱 "));
                    await sleep(1000);
                    console.clear();
                    break;
                case "Inventario":
                    const menuInventario = new InventarioInteractivo(personaje);
                    await menuInventario.abrirInventario();
                    break;
                default:
                    break;
            };
            if (enemigo.vida <= 0) {
                console.log(chalk.green("Ganaste  🎉")); GeneradorItems.generarYGuardarItem(personaje); await sleep(4000);
                console.clear(); return
            }
            console.log(chalk.red("Enemigo ataca  ☄️ ")); await sleep(1000);
            console.clear();
            if (defensa == true) {
                let dañoAPersonaje = (enemigo.daño - personaje.defensa);
                if (dañoAPersonaje < 0) { dañoAPersonaje = 5 };
                personaje.vida -= dañoAPersonaje;
                console.log(chalk.red(`El enemigo ha hecho ${dañoAPersonaje} de daño`)); await sleep(1000);
                console.clear();
            }
            else {
                personaje.vida -= enemigo.daño; console.log(chalk.red(`El enemigo ha hecho ${enemigo.daño} de daño`)); await sleep(1000);
                console.clear();
            }
            if (personaje.vida <= 0) {
                console.log(chalk.red ("Perdiste  ☠️ ")); await sleep(1000);
                console.clear(); return
            }
        };
    }

}

export class PlayerVSPlayer extends Batalla {
    async ejecucion() {
        console.log(chalk.bold.blue("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        console.log(chalk.blue("                    JUGADOR 1"));
        console.log(chalk.bold.blue("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        console.log(" ")
        let crear_o_elegir_1 = await Menus("Crear Personaje", "Elegir Personaje");
        await sleep(1000);
        console.clear();
        if (crear_o_elegir_1 == "Crear Personaje") {
            let nombre1 = await preguntar(chalk.yellow("Ingrese el nombre: "));
            await sleep(1000);
            console.clear();
            let clase1 = await Menus("Morador", "Synth", "Paladin", "Necrofago");
            await sleep(1000);
            console.clear();
            FabricaPersonajes.crearPersonaje(clase1, nombre1);
        };
        VisualizarPersonajes.mostrar();
        let personaje1 = await SeleccionPersonajes.mostrarPersonajes();
        let elegirPreset1 = await Menus("Elegir Preset(Se reiniciara inventario)", "Continuar con el inventario actual");
        await sleep(1000);
        console.clear();
        if (elegirPreset1 == "Elegir Preset(Se reiniciara inventario)") {
            personaje1.inventario = [];
            const asignador = new AsignarPreset();
            personaje1 = await asignador.asignar(personaje1);
            await sleep(1000);
            console.clear();
        };
        console.log(chalk.bold.magenta("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        console.log(chalk.magenta("                    JUGADOR 2"));
        console.log(chalk.bold.magenta("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        console.log(" ")
        let crear_o_elegir_2 = await Menus("Crear Personaje", "Elegir Personaje");
        await sleep(1000);
        console.clear();
        if (crear_o_elegir_2 == "Crear Personaje") {
            let nombre2 = await preguntar(chalk.yellow("Ingrese el nombre: "));
            await sleep(1000);
            console.clear();
            let clase2 = await Menus("Morador", "Synth", "Paladin", "Necrofago");
            await sleep(1000);
            console.clear();
            FabricaPersonajes.crearPersonaje(clase2, nombre2);
        };
        VisualizarPersonajes.mostrar();
        let personaje2 = await SeleccionPersonajes.mostrarPersonajes();
        await sleep(1000);
        console.clear();
        let elegirPreset2 = await Menus("Elegir Preset(Se reiniciara inventario)", "Continuar con el inventario actual");
        await sleep(1000);
        console.clear();
        if (elegirPreset2 == "Elegir Preset(Se reiniciara inventario)") {
            personaje2.inventario = [];
            const asignador = new AsignarPreset();
            personaje2 = await asignador.asignar(personaje2);
            await sleep(1000);
            console.clear();
        };
        console.log(chalk.bold.red(`         ESTA BATALLA ESTA POR COMENZAR  `));
        console.log(chalk.bold.red("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        await sleep(3000);
        console.clear();
        let encuentroEnCurso = false;
        console.log(chalk.bold.yellow("               ✦ Inicia el combate ✦                       "));
        console.log(chalk.bold.yellow("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
        console.log(" ")
        while (encuentroEnCurso = true) {
            console.log(`Jugador 1:${chalk.blue(personaje1.nombre)}, Salud: ${chalk.cyan(personaje1.vida)}`);
            console.log(`Jugador 2:${chalk.magenta(personaje2.nombre)}, Salud: ${chalk.cyan(personaje2.vida)}`);
            console.log(" ")
            console.log(chalk.bold.blue("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
            console.log(chalk.blue("               TURNO JUGADOR 1"));
            console.log(chalk.bold.blue("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
            console.log(" ")
            let movimiento1 = await Menus("Atacar", "Defenderse", "Inventario");
            let defensa1 = false;
            let defensa2 = false;
            switch (movimiento1) {
                case "Atacar":
                    if (defensa2 == true) {
                        let dañoAPersonaje2 = personaje1.ataque - personaje2.defensa;
                        if (dañoAPersonaje2 < 0) { dañoAPersonaje2 = 5 }
                        personaje2.vida -= dañoAPersonaje2
                        console.log(`${chalk.blue(personaje1.nombre)} ha hecho ${dañoAPersonaje2} de daño`); await sleep(1000);
                        console.clear();
                    } else {
                        personaje2.vida -= personaje1.ataque;
                        console.log(`${chalk.blue(personaje1.nombre)} ha hecho ${personaje1.ataque} de daño`); await sleep(1000);
                        console.clear();
                    }
                    break;
                case "Defenderse":
                    defensa1 = true;
                    console.log(chalk.yellow("Jugador 1 se defiende  🧱 "));
                    await sleep(1000);
                    console.clear();
                    break;
                case "Inventario":
                    const menuInventario = new InventarioInteractivo(personaje1);
                    await menuInventario.abrirInventario();

                    break;
                default:
                    break;
            };
            if (personaje2.vida <= 0) {
                console.log(chalk.green("Jugador 1 gana  👑 ")); await sleep(4000);
                console.clear(); return
            }
            console.log(chalk.bold.magenta("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
            console.log(chalk.magenta("               TURNO JUGADOR 2"));
            console.log(chalk.bold.magenta("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ "));
            console.log(" ")
            let movimiento2 = await Menus("Atacar", "Defenderse", "Inventario");

            switch (movimiento2) {
                case "Atacar":
                    if (defensa1 == true) {
                        let dañoAPersonaje1 = personaje2.ataque - personaje1.defensa;
                        if (dañoAPersonaje1 < 0) { dañoAPersonaje1 = 5 }
                        personaje1.vida -= dañoAPersonaje1
                        console.log(`${chalk.magenta(personaje2.nombre)} ha hecho ${dañoAPersonaje1} de daño`); await sleep(1000);
                        console.clear();
                    } else {
                        personaje1.vida -= personaje2.ataque;
                        console.log(`${chalk.magenta(personaje2.nombre)} ha hecho ${personaje2.ataque} de daño`); await sleep(1000);
                        console.clear();
                    }
                    break;
                case "Defenderse":
                    defensa2 = true;
                    console.log(chalk.yellow("Jugador 2 se defiende  🧱")); await sleep(1000);
                    console.clear();
                    break;
                case "Inventario":
                    const menuInventario = new InventarioInteractivo(personaje2);
                    await menuInventario.abrirInventario();
                    break;
                default:
                    break;
            };
            if (personaje1.vida <= 0) {
                console.log(chalk.green("Jugador 2 gana  👑")); await sleep(4000);
                console.clear(); return
            }

        };
    }
}