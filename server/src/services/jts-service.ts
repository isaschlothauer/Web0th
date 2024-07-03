import { LoginValueProps, CookieOptionProps } from '../../@types/express/index'
import jwt from 'jsonwebtoken';

export const jwtGenerator = async (loginData: LoginValueProps) => {

  const { rememberId } = loginData;

  const jwtSecret : string | undefined = process.env.JWTSECRET;
  
  // Cookie options
  const cookieOptions: CookieOptionProps = {
    maxAge: rememberId? 1000 * 60 * 60: undefined, // expire after 1 hour
    httpOnly: true, // Cookie will not be exposed to client side code
    sameSite: "none", // If client and server origins are different
    secure: true, // use with HTTPS only
    signed: false,
  }

  if (!jwtSecret || !loginData) {
    return { success: false, error: "No JWT Secret or Login data"}
  }


  const token = jwt.sign(loginData, jwtSecret, { expiresIn: '3h' });

  if (!token) 
    return { success: false, error: "No token generated"};

  
  try {
    const tokenOptions: { authToken: string; options: CookieOptionProps } = { authToken: token, options: cookieOptions };

    return tokenOptions;
  }
  catch (err) {
    return { success: false, error: "Error generating token" };
  }
}