import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { login, message, promptLogin, startGame } from './test';
import { game_message } from './globals';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const startRoomId = startGame();

app.use(cors({
  origin: 'http://localhost:3000/'
}));

app.use(express.json());

app.post('/api/test', (req: Request, res: Response) => {
  const inputMessage: game_message = req.body;
  console.debug(`inputRoomId: ${inputMessage.roomId}, inputMessage: ${inputMessage.message}`);
  
  let outputMessage: game_message; 
  if(inputMessage.roomId != "login")
    outputMessage = message(inputMessage);
    
  //send welcome prompt
  else if(inputMessage.roomId == "login" && inputMessage.message == "")
    outputMessage = promptLogin();
    
  //user has entered "bad" character name, start the game
  else 
    outputMessage = login(startRoomId);
    
  console.debug(`outputRoomId: ${outputMessage.roomId}, outputMessage: ${outputMessage.message}`);
  res.send(JSON.stringify(outputMessage));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});