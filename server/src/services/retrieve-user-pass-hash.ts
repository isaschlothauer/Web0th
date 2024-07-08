import { database } from '../config/database';
import { LoginPasswordProp } from '../../@types/express/index'

export const retrieveUserPasswordHash = async (login: string) => {

  const [ passwordHash, _] = await database.promise().query<LoginPasswordProp[]>("SELECT password_hash FROM users WHERE login = ?;", [login])

  return passwordHash[0].password_hash;
}