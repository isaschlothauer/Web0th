import { Router, Request, Response } from 'express';
import { LoginValueProps, AuthTokenProps, ErrorResponseProps } from '../../@types/express/index'
import { loginUsernameCheck } from '../services/login-username-check';
import { retrieveUserPasswordHash } from '../services/retriev-user-pass-hash';
import { loginPasswordVerification } from '../services/login-password-verification'
import { UserDuplicateCheckProps, LoginPasswordProp, loginDataProps } from '../../@types/express/index'
import { jwtGenerator } from '../services/jts-service'


const router = Router();


router.post("/", async (req: Request, res:Response) => {

  const { email, password, rememberId }: LoginValueProps = req.body;

  let login: UserDuplicateCheckProps[] = [];

  // login account check 
  try {
    login = await loginUsernameCheck(email);
  }
  catch (err) {

    return res.status(400).send({ success: false, error: "Unable to perform log in operation. Please try again later"});
  }

  // Database username check and rejection
  if (login.length === 0) 
    return res.status(401).send({ success: false, error: "Invalid user name or password"});

  // Retrieving user password hash from the database
  const hashedUserPassword: string = await retrieveUserPasswordHash(email);

  let verified: boolean;
  // Verifying user password against user password hash
  try {
    verified = await loginPasswordVerification(password, hashedUserPassword);
  }
  catch (err: any) {
    return res.status(500).send({ success: false, error: "Unable to verify credentials. Please try again later" });
  }

  // Verification fail response
  if (!verified) {
    return res.status(401).send({ success: false, error: "Invalid user name or password" });
  }

  // Generate JWT
  const JWToken: AuthTokenProps | ErrorResponseProps = await jwtGenerator(req.body);

  if (!JWToken) 
    return res.status(500).send({ success: false, error: "Unable to create session cookie" })

  if ('authToken' in JWToken) {
    const { authToken, options } = JWToken;

    // Setting session cookies
    res.cookie("authenticationToken", authToken, options);

    res.status(200).send({ success: true, message: "Log in successful"});
  }
})

export default router;