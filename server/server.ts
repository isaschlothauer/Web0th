import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { database } from "./src/config/database"
import cors from 'cors';
import { corsOptions } from './src/config/cors';

import { userRoutes } from './src/routes/userRoutes'

dotenv.config();

const app: Express = express()
app.use( cors(corsOptions) );
app.use(express.json());


const port: number = parseInt(process.env.B_PORT || "5001");
const f_port: number = parseInt(process.env.F_PORT || "3001");

// Database connection attempts
database.getConnection((err, connection) => {
  if (err) {
    throw err;
    process.exit(1);
  } else {
    console.log("Database connection established");
    connection.release();
  }
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>This is a test</h1><div>This is a container</div><div>This is a content</div><div>This is the second content</div>");
})


app.use("/userRoutes", userRoutes);