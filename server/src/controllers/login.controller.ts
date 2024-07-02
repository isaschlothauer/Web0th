import { Router, Request, Response } from 'express';
import { LoginValueProps } from '../../@types/express/index'
import { loginUsernameCheck } from '../services/login-username-check';
import { userPasswordHash } from '../services/user-password-hash';
import { loginPasswordValidation } from '../services/login-password-verification'
import { UserDuplicateCheckProps, LoginPasswordProp, loginDataProps } from '../../@types/express/index'
import { error } from 'console';


const router = Router();


router.post("/", async (req: Request, res:Response) => {

  const { email, password, rememberId }: LoginValueProps = req.body;

  let login: UserDuplicateCheckProps[] = [];

  // login account check 
  try {
    login = await loginUsernameCheck(email);
  }
  catch (err) {
    console.error(err);

    return res.status(400).send({ success: false, error: "Unable to perform log in operation. Please try again later"});
  }

  // Database username check and rejection
  if (login.length === 0) 
    return res.status(401).send({ success: false, error: "Invalid user name or password"});

  // Retrieving user password hash from the database
  const hashedUserPassword: string = await userPasswordHash(email);

  // Verifying user password against user password hash
  const verified: boolean | Error = await loginPasswordValidation(password, hashedUserPassword);

  // Error
  if (verified instanceof Error) {
    return res.status(500).send({ success: false, error: "Unable to verify credentials. Please try again later" });
  }

  if (!verified) {
    return res.status(401).send({ success: false, error: "Invalid user name or password" });
  }

  return res.status(200).send({ success: true, message: "Log in successful"});
})

export default router;