// classes/monedaChapas.js
const Habilidad = require("./habilidad");

class MonedaChapas extends Habilidad {
    constructor() {
        super("Moneda de Chapas", 50); // poder base
    }

    ejecutar(atacante, objetivo) {
        const dano = this.poder * 2; // 200%
        objetivo.vida -= dano;
        return `${atacante.nombre} lanzó ${this.nombre} causando ${dano} de daño (200%) 🔥`;
    }
}

module.exports = MonedaChapas;
