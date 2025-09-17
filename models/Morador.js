import { randomUUID } from "crypto";
import { Personaje } from "./Personaje.js";

export class Morador extends Personaje{
    constructor(nombre){
        super(nombre, 400, 15, 10, 60)
        this.id = randomUUID();
    }

}

