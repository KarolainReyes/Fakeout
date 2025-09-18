// FabricaPersonaje.js
import { Morador } from "../models/Morador.js";
import { Necrofago } from "../models/Necrofago.js";
import { Paladin } from "../models/Paladin.js";
import { Synth } from "../models/Synth.js";

import fs from "fs";

const rutaArchivo = "../data/personajes.json";

export class FabricaPersonaje {
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

        if (fs.existsSync(rutaArchivo)) {
            const data = fs.readFileSync(rutaArchivo, "utf-8");
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
            inventario: personaje.inventario
        });

        fs.writeFileSync(rutaArchivo, JSON.stringify(personajes, null, 2), "utf-8");
    }
}


