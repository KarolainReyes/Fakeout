import fs from "fs";
import inquirer from "inquirer";
import { sleep } from "../utils/sleeps.js";
 

export class SeleccionPersonajes {
  static async mostrarPersonajes(rutaArchivo = "../data/personajes.json") {
    const personajes = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));

    const { seleccion } = await inquirer.prompt([
      {
        type: "list",
        name: "seleccion",
        message: "? Selecciona un personaje:",
        choices: personajes.map((p, index) => ({
          name: `${index} - ${p.nombre}`,
          value: index,
        })),
      },
    ]);
    console.log("Personaje seleccionado correctamente");
    return personajes[seleccion];
  }
}

