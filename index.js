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

// Lista de pruebas
const challengesMessage = `¡Hola! Aquí tienes la lista de pruebas:
1. Lentejas
2. Puzzle
3. Quizz
4. Quizz musical`;

// Pistas para cada prueba
const hints = {
  1: 'Dentro del bote hay un kilo de lentejas, debéis encontrar las 3 lentejas numeradas y sumar los números para obtener el primer número de la combinación.',
  2: 'Tenéis que completar el puzzle y una vez completado hay un código escondido en él. La solución de ese código es el segundo número.',
  3: 'Debéis de completar todas las preguntas que haga el bot para que os de el tercer número.',
  4: 'Debéis adivinar todos los openings de anime para obtener el cuarto número.'
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