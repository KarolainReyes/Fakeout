import fs from "fs";
import inquirer from "inquirer";

export class AsignarPreset {
  constructor(
    rutaPresets = "../utils/presets.json",
    rutaPersonajes = "../data/personajes.json"
  ) {
    this.rutaPresets = rutaPresets;
    this.rutaPersonajes = rutaPersonajes;
  }

  async asignar(personaje) {
    if (!personaje) {
      console.error("❌ No se proporcionó un personaje válido.");
      return;
    }

    // Leer presets
    const presets = JSON.parse(fs.readFileSync(this.rutaPresets, "utf-8"));

    // Menú para elegir preset
    const { presetNombre } = await inquirer.prompt([
      {
        type: "list",
        name: "presetNombre",
        message: "⚙️ Selecciona un kit de inicio:",
        choices: presets.map((p) => ({
          name: `${p.nombre} (Items: ${p.items.map(i => i.nombre).join(", ")})`,
          value: p.nombre,
        })),
      },
    ]);

    const presetElegido = presets.find((p) => p.nombre === presetNombre);
    if (!presetElegido) {
      console.error("❌ Preset no encontrado.");
      return;
    }

   

    // Agregar todos los items del preset
    personaje.inventario.push(...presetElegido.items);

    // Leer personajes desde JSON
    let personajes = [];
    if (fs.existsSync(this.rutaPersonajes)) {
      const data = fs.readFileSync(this.rutaPersonajes, "utf-8");
      personajes = data.trim() ? JSON.parse(data) : [];
    }

    // Buscar si ya existe el personaje por id
    const index = personajes.findIndex(p => p.id === personaje.id);
    if (index !== -1) {
      personajes[index] = personaje; // actualizar existente
    } else {
      personajes.push(personaje); // agregar nuevo
    }

    // Guardar de nuevo
    fs.writeFileSync(this.rutaPersonajes, JSON.stringify(personajes, null, 2), "utf-8");

    console.log(`✅ Se asignó el preset "${presetElegido.nombre}" a ${personaje.nombre}`);
    return personaje; // devuelve el personaje modificado
  }
}
