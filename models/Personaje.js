class Personaje {
    #nombre;
    #vida;
    #ataque;
    #defensa;
    #precision;

    constructor(nombre, vida, ataque, defensa, precision) {
        if (this.constructor === Personaje) {
            throw new Error('No puedes instanciar una clase abstracta!');
        }
        if (!nombre || nombre.trim().length === 0) {
            throw new Error('El nombre del jugador es invalido');
        }else{
            this.#nombre = nombre;
        }
        if (vida <= 0) {
            console.log('La vida inicial debe ser mayor que 0');
        }else { 
            this.#vida = vida;
        }
        if (ataque <= 0) {
            console.log('El ataque debe ser mayor que 0');
        }else {
            this.#ataque = ataque;
        }
        if (defensa < 0) {
            console.log('La defensa no puede ser negativa');
        }else{
            this.#defensa = defensa;
        }
        if (precision < 50) {
            console.log('La precisión mínima es 50');
        }else {
            this.#precision = precision;
        }
        
        //creo que esto deberia ser una clase
        this.inventario = []; 
    }

    // --- metodos get ---
    get nombre() { return this.#nombre; }
    get vida() { return this.#vida; }
    get ataque() { return this.#ataque; }
    get defensa() { return this.#defensa; }
    get precision() { return this.#precision; }

    // --- metodos set ---
    set vida(nuevaVida) {
        if (nuevaVida < 0) {
            this.#vida = 0;
        }else {
            this.#vida = nuevaVida;
        }
        
    }

    set ataque(nuevoAtaque) {
        if (nuevoAtaque <= 0) {
            console.log("El ataque debe ser positivo");
        }else {
            this.#ataque = nuevoAtaque;
        }
        
    }

    set defensa(nuevaDefensa) {
        if (nuevaDefensa < 0) {
            console.log("La defensa no puede ser negativa");
        }else {
            this.#defensa = nuevaDefensa;
        }
        
    }

    set precision(nuevaPrecision) {
        if (nuevaPrecision < 50) {
            console.log("La precisión mínima es 50");
        }else {
            this.#precision = nuevaPrecision;
        }
        
    }

    // --- MÉTODOS ---
    atacar(objetivo) {
        throw new Error('El método atacar() debe implementarse en la subclase');
    }

    recibirDaño(cantidad) {
        this.vida = this.#vida - cantidad;
    }

}
