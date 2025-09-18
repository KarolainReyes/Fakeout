// classes/servoPuño.js
const Habilidad = require("./habilidad");

class ServoPuño extends Habilidad {
    constructor() {
        super("Servo Puño", 40);
    }

    ejecutar(atacante, objetivo) {
        const dano = this.poder * 1.5; // 150%
        objetivo.vida -= dano;
        return `${atacante.nombre} usó ${this.nombre} y golpeó a ${objetivo.nombre} causando ${dano} de daño (150%) 👊`;
    }
}

module.exports = ServoPuño;
