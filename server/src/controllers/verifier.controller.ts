import { Router, Request, Response } from 'express';
import { jwtVerify } from '../services/jwt-services';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  
  try {
    const authToken: string = req.cookies['authenticationToken'];

    const verifiedResult = await jwtVerify(authToken);

    if (verifiedResult && verifiedResult.success == true)
      return res.status(200).send(verifiedResult);
    else
      return res.status(401).send(verifiedResult);
  }
  catch (err: any) {
    console.log(err);
    return res.status(401).send(err);
  }
})

export default router;