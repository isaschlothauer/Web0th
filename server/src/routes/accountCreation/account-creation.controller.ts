import { Router, Request, Response } from 'express';

const router = Router();

router.post("/", (req: Request, res:Response) => {
  // console.log("test:", req.body);
  console.log(req.body);

})


export default router;