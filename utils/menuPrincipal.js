import chalk from 'chalk';
import inquirer from 'inquirer';

export async function Menus(...opciones) {
  const respuesta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message:chalk.yellow (' 🎯 Elige una opción:'),
      choices: opciones
    }
  ]);
 return respuesta.opcion;
}
