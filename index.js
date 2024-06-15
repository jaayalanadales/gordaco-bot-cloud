import telegramBot from "node-telegram-bot-api"
import dotenv from "dotenv"
// import fs from "fs"
// import util from "util"

dotenv.config()

import express from 'express'
const app = express()
const port = 8080;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})


// const logFile = fs.createWriteStream("log.txt", { flags: "a" })
// const logStdout = process.stdout

// console.log = function () {
//   logFile.write(util.format.apply(null, arguments) + "\n")
//   logStdout.write(util.format.apply(null, arguments) + "\n")
// }

// Reemplaza 'YOUR_TELEGRAM_BOT_TOKEN' con el token que te dio el BotFather
const token = '7300706486:AAERPAOM7q3z49ZBaU-ZZ4M2Dug8ofURbQI';

// Crea una instancia del bot
const bot = new telegramBot(token, { polling: true });

const introMessage = `¡Hola! Soy El Gordaco. Hace tiempo tenía un escape room en Córdoba, 
pero no me fue muy bien, que digamos... Así que ahora me he metido en el mundo de los escapes virtuales. 
Espero que me vaya mejor aquí. Seré vuestro GM en este escape. ¡Espero que tengáis ganas de empezar!
El escape consta de 4 pruebas: 2 físicas y 2 virtuales. Al terminar todas las pruebas, deberíais tener 
una combinación de 6 números en el mismo orden que las pruebas. Con esos 6 números podéis abrir el candado 
para obtener la llave que abre la caja de los sobres. A continuación os muestro la lista de pruebas. 
Podéis hacerlas en el orden que queráis, pero recomiendo hacerlas de la 1 a la 4 para evitar spoilers 
y porque cada una es mejor que la anterior.`;

// Lista de pruebas
const challengesMessage = `Escribe en el chat el número correspondiente a cada prueba para saber de ella:
1. Prueba 1
2. Prueba 2
3. Prueba 3
4. Prueba 4`;

// Pistas para cada prueba
const hints = {
  1: 'Dentro del bote hay un kilo de lentejas, debéis encontrar las 3 lentejas numeradas y sumar los números para obtener el primer número de la combinación.',
  2: 'Tenéis que completar el puzzle y una vez completado hay un código escondido en él. La solución de ese código es el segundo número.',
  3: 'Debéis de contactar a mi compañero, El Señor Numérico, de la misma forma que me habéis contactado a mí. Su usuario es @AyN_quiz_bot',
  4: 'Os dejaré el siguiente link por aquí: https://openings-anime-quiz-git-master-franmicars-projects.vercel.app/ una vez dentro ya sabréis qué hacer.'
};

// Función para responder con la lista de pruebas
const sendChallenges = (chatId) => {
  bot.sendMessage(chatId, challengesMessage);
};

// Función para responder con la pista correspondiente
const sendHint = (chatId, number) => {
  const hint = hints[number];
  if (hint) {
    bot.sendMessage(chatId, hint).then(() => {
      // Después de enviar la pista, vuelve a enviar la lista de pruebas
      sendChallenges(chatId);
    });
  } else {
    bot.sendMessage(chatId, 'Número inválido. Por favor, elige un número del 1 al 4.');
  }
};

// Manejar el comando de inicio
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Mensaje de introducción
  bot.sendMessage(chatId, introMessage);
  
  // Mensaje con las reglas
  sendRules(chatId);
});

// Manejar cualquier mensaje recibido
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Verificar si el mensaje es un número del 1 al 4
  const number = parseInt(text);
  if (!isNaN(number) && number >= 1 && number <= 4) {
    sendHint(chatId, number);
  } else {
    // Si no es un número válido, enviar la lista de pruebas
    sendChallenges(chatId);
  }
});

console.log('El bot está en funcionamiento');