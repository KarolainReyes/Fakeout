// classes/habilidad.js
class Habilidad {
    constructor(nombre, poder) {
        if (new.target === Habilidad) {
            throw new Error("No se puede instanciar la clase abstracta Habilidad directamente");
        }
        this.nombre = nombre;
        this.poder = poder; // valor base de daño o poder
    }

    ejecutar(atacante, objetivo) {
        throw new Error("El método ejecutar() debe ser implementado por la subclase");
    }
}

module.exports = Habilidad;
