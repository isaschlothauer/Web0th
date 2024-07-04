import { Router, Request, Response } from 'express';
import { jwtVerify } from '../services/jwt-services'
// Checks credential when the landing page is visited. 
const router = Router();


router.get('/', async (req: Request, res: Response) => {
  let userToken: string = '';

  try {
    const verified : { success: boolean; message: string; error?: undefined; } | { success: boolean; error: string; message?: undefined; } | undefined = await jwtVerify(req.cookies['authenticationToken']);

    // Verification response
    if (verified == undefined) 
      return res.status(400).send({ success: false, error: "Not authenticated"});
    else if (verified.success === true) 
      return res.status(401).send(verified)
    else
      return res.status(200).send(verified);
  }
  catch (err) {
    return res.status(500).send({ success: false, error: "Unable to perform login status verification" })
  }
})

export default router;