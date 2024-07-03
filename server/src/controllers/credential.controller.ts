import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  // console.log(req.cookies['authenticationToken']);
  console.log(req.cookies['authenticationToken']);
})

export default router;