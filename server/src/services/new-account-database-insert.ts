import { database } from '../config/database'
import { ResultSetHeader } from 'mysql2';
import { UserDataProps } from '../../@types/express'

export const newAccountDatabaseInsert = async (userData: UserDataProps) => {

  const { login, passwordHash } = userData;

  // Value check on variables
  console.log(login, passwordHash);
  if (login === '' || passwordHash === '') {
    return false;
  }

  try {
    await database.promise().query<ResultSetHeader>("INSERT IGNORE INTO users (login, password_hash) VALUES (?, ?);", [login, passwordHash])

  }
  catch (err: any ) {
    console.error(err);
    return err;
  }
}