import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { startGame } from './test';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
  origin: 'http://localhost:3000/'
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/api/test', (req: Request, res: Response) => {
  console.log(req.body);
  // res.send(res.json());
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

startGame();