
import fs from "fs";

const rutaArchivo = "../data/personajes.json";

export class VisualizarPersonajes {
    static mostrar() {
        if (!fs.existsSync(rutaArchivo)) {
            console.log("⚠️ No existe el archivo de personajes.");
            return;
        }

        const data = fs.readFileSync(rutaArchivo, "utf-8");

        if (data.trim().length === 0) {
            console.log("⚠️ No hay personajes guardados.");
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

