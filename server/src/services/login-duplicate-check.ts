import { database } from "../config/database";

import { UserDuplicateCheckProps } from "../../@types/express"

export const loginDuplicateCheck = async (login: string) => {

  // Initial check for existing email
  const [ users, _ ] = await database.promise().query<UserDuplicateCheckProps[]>("SELECT login FROM users WHERE login = ?;", [login])

  return users;
}