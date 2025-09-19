import fs from "fs";
import { sleep } from "../utils/sleeps.js";
import chalk from "chalk";


export class GeneradorItems {
  static generarYGuardarItem(personaje) {
    const items = JSON.parse(fs.readFileSync("../utils/items.json", "utf-8"));
    const personajes = JSON.parse(fs.readFileSync("../data/personajes.json", "utf-8"));

    // Probabilidades
    const rand = Math.random();
    let tipo;
    if (rand < 0.5) tipo = "Consumible";       
    else if (rand < 0.75) tipo = "Arma";       
    else tipo = "Armadura";                    


    const itemsFiltrados = items.filter(i => i.tipo.toLowerCase() === tipo.toLowerCase());

    if (itemsFiltrados.length === 0) {
      console.log(`No hay items disponibles del tipo ${tipo}`);
      return;
    }

    const item = itemsFiltrados[Math.floor(Math.random() * itemsFiltrados.length)];


    personaje.inventario.push(item);


    const personajesActualizados = personajes.map(p =>
      p.id === personaje.id ? personaje : p
    );


    fs.writeFileSync("../data/personajes.json", JSON.stringify(personajesActualizados, null, 2), "utf-8");

    console.log(chalk.yellow(`Se añadió ${item.nombre} al inventario de ${personaje.nombre}`));
  }
}


