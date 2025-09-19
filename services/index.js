import { PlayerVSMachine, PlayerVSPlayer } from "../models/Batallas.js"
import { Menus } from "../utils/menuPrincipal.js";
import { sleep } from "../utils/sleeps.js";
import chalk from 'chalk';


const logo = `
███████╗ █████╗ ██╗  ██╗███████╗ ██████╗ ██╗   ██╗████████╗
██╔════╝██╔══██╗██║ ██╔╝██╔════╝██╔═══██╗██║   ██║╚══██╔══╝
█████╗  ███████║█████╔╝ █████╗  ██║   ██║██║   ██║   ██║   
██╔══╝  ██╔══██║██╔═██╗ ██╔══╝  ██║   ██║██║   ██║   ██║   
██║     ██║  ██║██║  ██╗███████╗╚██████╔╝╚██████╔╝   ██║   
╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝    ╚═╝   
`;


function generarEstrellas(width, height) {
  let frame = "";
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (Math.random() < 0.02) {
        frame += chalk.yellow("✦"); 
      } else {
        frame += " ";
      }
    }
    frame += "\n";
  }
  return frame;
}

async function escribirTexto(texto, delay = 5) {
  for (let i = 0; i < texto.length; i++) {
    process.stdout.write(chalk.cyanBright(texto[i]));
    await sleep(delay);
  }
}


async function mostrarIntro() {
  const width = 70;
  const height = 20;


  for (let i = 0; i < 15; i++) {
    console.clear();
    console.log(generarEstrellas(width, height));
    await sleep(100);
  }


  console.clear();
  await escribirTexto(logo, 3); 


  await sleep(500);
  console.clear();
  console.log(chalk.yellow(logo));
}


async function flow() {
    await mostrarIntro()
    let salir = false;
    while (salir == false) {
        console.log(chalk.bold.yellow("✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦ ✦"));
        sleep(1500);
        let pirobo = await Menus("Un Jugador", "Dos Jugadores", "Salir");
        sleep(1000);
        console.clear();
        switch (pirobo) {
            case "Un Jugador":
                const pvm = new PlayerVSMachine();
                await  pvm.ejecucion();
                break;


            case "Dos Jugadores":
                const pvp = new PlayerVSPlayer();
                await  pvp.ejecucion();
                break;
            case "Salir":
                console.log("Saliendo");
                salir = true;
                return
            default:
                break;
        }

    }
}

flow()