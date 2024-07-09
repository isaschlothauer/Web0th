import { RowDataPacket } from "mysql2";
import { JwtPayload } from "jsonwebtoken";

export interface CreateAccountProps {
  email: string;
  password: string;
  passwordConfirm: string
}

export interface UserDataProps {
  login: string;
  passwordHash: string;
}

export interface UserDuplicateCheckProps extends RowDataPacket {
  login: string;
}

export interface LoginPasswordProp extends RowDataPacket {
  userPassword: string;
}

export interface LoginValueProps {
  email: string;
  password: string;
  rememberId?: boolean;
}

export interface loginDataProps {
  login: string,
  password: string
}

export interface CookieOptionProps {
  maxAge?: number,  
  httpOnly: boolean,  
  sameSite?: boolean | "lax" | "strict" | "none",
  secure: boolean,
  signed: boolean,
}

export interface TokenPayloadProps extends JwtPayload {
  email: string;
}

export interface AuthTokenProps {
  authToken: string,
  options: CookieOptionProps
}

export interface ErrorResponseProps {
  success: boolean,
  error: string
}

export interface TokenPayloadProps {
  email: string,
  password: string,
  rememberId: boolean,
  iat: number,
  exp: number
}
