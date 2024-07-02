import { RowDataPacket } from "mysql2";

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
