import express, { Request, Response, Express, Router } from 'express';

const app: Express = express();

export const userRoutes = Router();

// Account Registration Route
userRoutes.post("/register", (req: Request, res: Response) => {
  console.log("this is from route", req.body)
  console.log("Test")
})