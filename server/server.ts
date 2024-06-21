import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express()

const port: string = process.env.B_PORT || "5001";
const f_port: string = process.env.F_PORT || "3001";

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})