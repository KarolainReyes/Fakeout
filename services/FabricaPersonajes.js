
import { Morador } from "../models/Morador.js";
import { Necrofago } from "../models/Necrofago.js";
import { Paladin } from "../models/Paladin.js";
import { Synth } from "../models/Synth.js";
import { v4 as uuidv4 } from 'uuid';

import fs from "fs";

export class FabricaPersonajes {
    static crearPersonaje(tipo, nombre) {
        let personaje;

        switch (tipo.toLowerCase()) {
            case "morador":
                personaje = new Morador(nombre);
                break;
            case "necrofago":
                personaje = new Necrofago(nombre);
                break;
            case "paladin":
                personaje = new Paladin(nombre);
                break;
            case "synth":
                personaje = new Synth(nombre);
                break;
            default:
                throw new Error(`El tipo de personaje "${tipo}" no es válido.`);
        }

        this.guardarPersonaje(personaje);

        return personaje;
    }

    static guardarPersonaje(personaje) {
    let personajes = [];
    const ruta = "../data/personajes.json";


    if (fs.existsSync(ruta)) {
        const data = fs.readFileSync(ruta, "utf-8");
        if (data.trim().length > 0) {
            personajes = JSON.parse(data);
        }
    }
    
    personajes.push({
        id: personaje.id,
        nombre: personaje.nombre,
        vida: personaje.vida,
        ataque: personaje.ataque,
        defensa: personaje.defensa,
        precision: personaje.precision,
        inventario: personaje.inventario,
        equipado: {
            arma: null,
            armadura: null,
        },
    });

    

    fs.writeFileSync(ruta, JSON.stringify(personajes, null, 2), "utf-8");

    
}
}
