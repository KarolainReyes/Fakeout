import { randomUUID } from "crypto";
import { Personaje } from "./Personaje.js";

export class Necrofago extends Personaje{
    constructor(nombre){
        super(nombre, 450, 20, 0, 65)
        this.id = randomUUID();
    }

}

