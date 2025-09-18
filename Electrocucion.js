// classes/electrocucion.js
const Habilidad = require("./habilidad");

class Electrocucion extends Habilidad {
    constructor() {
        super("Electrocución", 0); // aquí no hay daño base
    }

    ejecutar(atacante, objetivo) {
        objetivo.puntos -= 2; // le quita puntos (puede ser energía, turnos, etc.)
        return `${atacante.nombre} lanzó ${this.nombre}, quitando 2 puntos a ${objetivo.nombre} ⚡`;
    }
}

module.exports = Electrocucion;
