import inquirer from 'inquirer';

export async function preguntar(mensaje) {
  const respuesta = await inquirer.prompt([
    {
      type: 'input',
      name: 'valor',
      message: mensaje
    }
  ]);
  return respuesta.valor;
}