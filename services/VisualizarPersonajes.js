
import fs from "fs";
import { sleep } from "../utils/sleeps.js";
 

const rutaArchivo = "../data/personajes.json";

export class VisualizarPersonajes {
    static async mostrar() {
        if (!fs.existsSync(rutaArchivo)) {
            console.log("⚠️ No existe el archivo de personajes.");

            return;
        }

        const data = fs.readFileSync(rutaArchivo, "utf-8");

        if (data.trim().length === 0) {
            console.log("⚠️ No hay personajes guardados.");
            await sleep(1000);
            console.clear();
            return;
        }

        const personajes = JSON.parse(data);
        console.table(
            personajes.map(p => ({
                Nombre: p.nombre,
                Vida: p.vida,
                Ataque: p.ataque,
                Defensa: p.defensa,
                Precisión: p.precision,
                Inventario: p.inventario.length
            }))
        );
    }
}

