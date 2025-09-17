import { randomUUID } from "crypto";
import { Personaje } from "./Personaje.js";

export class Synth extends Personaje{
    constructor(nombre){
        super(nombre, 450, 10, 10, 90)
        this.id = randomUUID();
    }

}