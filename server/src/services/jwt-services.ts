import { LoginValueProps, CookieOptionProps, TokenPayloadProps } from '../../@types/express/index'
import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtSecret : string | undefined = process.env.JWTSECRET;

export const jwtGenerator = async (loginData: LoginValueProps) => {

  const { rememberId } = loginData;

  // Cookie options
  const cookieOptions: CookieOptionProps = {
    maxAge: rememberId? Math.floor(Date.now() / 1000) + (60 * 60): undefined, // Expire after 1 hour. Session or persisitent login status. 
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

// JWToken verification
export const jwtVerify = async (token: string) => {
  
  try {
    if (jwtSecret && token) {
        const verifiedUser = jwt.verify(token, jwtSecret);
        const { email }  = verifiedUser as TokenPayloadProps;
        
        return { success: true, message: "Token verified", user: email }
    }
  }
  catch (err) {
    console.error(err);
    return { success: false, error: "Token could not be verified"}
  }
}