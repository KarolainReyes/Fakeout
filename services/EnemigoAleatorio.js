import fs from "fs";

export function enemigoAleatorio(rutaArchivo) {
  const data = JSON.parse(fs.readFileSync(rutaArchivo, "utf-8"));
  return data[Math.floor(Math.random() * data.length)];
}

