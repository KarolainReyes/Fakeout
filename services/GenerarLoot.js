import fs from "fs";
import { sleep } from "../utils/sleeps.js";
 

export class GeneradorItems {
  static generarYGuardarItem(personaje) {
    const items = JSON.parse(fs.readFileSync("../utils/items.json", "utf-8"));
    const personajes = JSON.parse(fs.readFileSync("../data/personajes.json", "utf-8"));

    // Probabilidades
    const rand = Math.random();
    let tipo;
    if (rand < 0.5) tipo = "Consumible";       // 50%
    else if (rand < 0.75) tipo = "Arma";       // 25%
    else tipo = "Armadura";                    // 25%

    // Filtrar items por tipo (ignorando mayúsculas/minúsculas)
    const itemsFiltrados = items.filter(i => i.tipo.toLowerCase() === tipo.toLowerCase());

    if (itemsFiltrados.length === 0) {
      console.log(`No hay items disponibles del tipo ${tipo}`);
      return;
    }

    // Seleccionar item aleatorio
    const item = itemsFiltrados[Math.floor(Math.random() * itemsFiltrados.length)];

    // Agregar al inventario
    personaje.inventario.push(item);

    // Reemplazar personaje en el JSON
    const personajesActualizados = personajes.map(p =>
      p.id === personaje.id ? personaje : p
    );

    // Guardar JSON actualizado
    fs.writeFileSync("../data/personajes.json", JSON.stringify(personajesActualizados, null, 2), "utf-8");

    console.log(`Se añadió ${item.nombre} al inventario de ${personaje.nombre}`);
  }
}

// // Ejemplo de uso
// const personajes = JSON.parse(fs.readFileSync("../data/personajes.json", "utf-8"));
// const personaje = personajes[0]; // prueba con el primero
// GeneradorItems.generarYGuardarItem(personaje);
