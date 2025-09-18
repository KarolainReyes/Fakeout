// classes/absorberVida.js
const Habilidad = require("./habilidad");

class AbsorberVida extends Habilidad {
    constructor() {
        super("Absorber Vida", 30);
    }

    ejecutar(atacante, objetivo) {
        const dano = this.poder;
        const absorcion = objetivo.vida * 0.2; // 20% de vida del objetivo
        objetivo.vida -= dano;
        atacante.vida += absorcion;
        return `${atacante.nombre} usó ${this.nombre}, causó ${dano} de daño y absorbió ${absorcion.toFixed(1)} de vida 🧛‍♂️`;
    }
}

module.exports = AbsorberVida;
