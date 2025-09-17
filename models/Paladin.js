import { randomUUID } from "crypto";
import { Personaje } from "./Personaje.js";

export class Paladin extends Personaje{
    constructor(nombre){
        super(nombre, 350, 25, 20, 70)
        this.id = randomUUID();
    }

}