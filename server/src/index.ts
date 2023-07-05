import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { message, startGame } from './test';
import { game_message } from './globals';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const startRoomId = startGame();

app.use(cors({
  origin: 'http://localhost:3000/'
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send(startRoomId);
});

app.post('/api/test', (req: Request, res: Response) => {
  const inputMessage: game_message = req.body;
  console.debug(`inputRoomId: ${inputMessage.roomId}, inputMessage: ${inputMessage.message}`);
  
  const outputMessage = message(inputMessage);
  console.debug(`outputRoomId: ${outputMessage.roomId}, outputMessage: ${outputMessage.message}`);
  res.send(JSON.stringify(outputMessage));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});