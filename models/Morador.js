import { randomUUID } from "crypto";
import Personaje from "./Personaje.js";

class Morador extends Personaje{
    constructor(nombre){
        super(nombre, 400, 15, 10, 60)
        this.id = randomUUID();
    }

    atacar(objetivo){
        const probabilidad = Math.random() * 100; 

        if (probabilidad <= this.precision){
            const danio = this.ataque;
            objetivo.recibirDanio(danio);
            console.log(`${this.nombre} atacó a ${objetivo.nombre} causando ${daño} de daño!`);
        } else {
            console.log(`${this.nombre} falló el ataque contra ${objetivo.nombre}!`);
        }
    }
}

module.exports = Morador;