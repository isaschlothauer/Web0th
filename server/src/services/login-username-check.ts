import { database } from '../config/database';
import { UserDuplicateCheckProps } from '../../@types/express/index'

export const loginUsernameCheck = async (username: string) => {

  const [ result, _ ] = await database.promise().query<UserDuplicateCheckProps[]>("SELECT login FROM users WHERE login = ?;", [username])

  return result;
}