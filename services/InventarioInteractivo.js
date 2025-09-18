import fs from "fs";
import inquirer from "inquirer";
import { sleep } from "../utils/sleeps.js";

export class InventarioInteractivo {
  constructor(personaje, rutaArchivo = "../data/personajes.json") {
    this.personaje = personaje;
    this.rutaArchivo = rutaArchivo;

    if (!this.personaje.equipado) {
      this.personaje.equipado = { arma: null, armadura: null };
    }
    if (typeof this.personaje.hp !== "number") {
      this.personaje.hp = this.personaje.vida;
    }
  }

  async abrirInventario() {
    if (!this.personaje.inventario || this.personaje.inventario.length === 0) {
      console.log("📭 Tu inventario está vacío.");
      await sleep(1500);
      return;
    }

    let salir = false;
    while (!salir) {
      console.clear(); // Limpia antes del menú
      const { itemSeleccionado } = await inquirer.prompt([
        {
          type: "list",
          name: "itemSeleccionado",
          message: `🎒 Inventario de ${this.personaje.nombre} (HP: ${this.personaje.hp}, Ataque: ${this.personaje.ataque}, Defensa: ${this.personaje.defensa})`,
          choices: this.personaje.inventario.map((item, index) => ({
            name: `${item.nombre} (${item.tipo})`,
            value: index,
          })).concat([{ name: "❌ Salir", value: -1 }]),
        },
      ]);

      if (itemSeleccionado === -1) return; // Salir del inventario

      await this.usarItem(itemSeleccionado);
      this.guardarPersonaje();
      await sleep(1500); // Tiempo para leer el resultado antes del siguiente menú
    }
  }

  async usarItem(index) {
    const item = this.personaje.inventario[index];
    if (!item) return;

    console.clear();

    switch (item.tipo) {
      case "Consumible":
        this.personaje.hp += item.curacion;
        console.log(`🍎 Usaste ${item.nombre}. HP +${item.curacion} → ${this.personaje.hp}`);
        this.personaje.inventario.splice(index, 1);
        break;

      case "Arma":
        if (this.personaje.equipado.arma?.id === item.id) {
          this.personaje.ataque -= item.daño;
          this.personaje.equipado.arma = null;
          console.log(`⚔️ Desequipaste el arma: ${item.nombre}`);
        } else {
          if (this.personaje.equipado.arma) {
            this.personaje.ataque -= this.personaje.equipado.arma.daño;
          }
          this.personaje.ataque += item.daño;
          this.personaje.equipado.arma = item;
          console.log(`⚔️ Has equipado el arma: ${item.nombre} (+${item.daño} ataque)`);
        }
        break;

      case "Armadura":
        if (this.personaje.equipado.armadura?.id === item.id) {
          this.personaje.defensa -= item.defensa;
          this.personaje.equipado.armadura = null;
          console.log(`🛡️ Desequipaste la armadura: ${item.nombre}`);
        } else {
          if (this.personaje.equipado.armadura) {
            this.personaje.defensa -= this.personaje.equipado.armadura.defensa;
          }
          this.personaje.defensa += item.defensa;
          this.personaje.equipado.armadura = item;
          console.log(`🛡️ Has equipado la armadura: ${item.nombre} (+${item.defensa} defensa)`);
        }
        break;

      default:
        console.log("❓ Tipo de objeto no reconocido.");
        break;
    }

    await sleep(1500); // Da tiempo para que el jugador lea el mensaje
  }

  guardarPersonaje() {
    if (!fs.existsSync(this.rutaArchivo)) return;

    const data = fs.readFileSync(this.rutaArchivo, "utf-8");
    const personajes = data.trim() ? JSON.parse(data) : [];

    const index = personajes.findIndex(p => p.id === this.personaje.id);
    if (index !== -1) {
      personajes[index] = this.personaje;
    } else {
      personajes.push(this.personaje);
    }

    fs.writeFileSync(this.rutaArchivo, JSON.stringify(personajes, null, 2), "utf-8");
  }
}
