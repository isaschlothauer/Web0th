import { Router, Request, Response } from 'express';
import { CreateAccountProps } from "../../../@types/express/index"

const router = Router();

router.post("/", (req: Request, res:Response) => {
  console.log("Account creation controller. Delete after test: ", req.body);

  const { email, password }: CreateAccountProps = req.body;

  
  

})


export default router;