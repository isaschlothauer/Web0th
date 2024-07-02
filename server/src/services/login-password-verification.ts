import argon2 from 'argon2';

export const loginPasswordValidation = async (password :string, hashedUserPassword: string) => {

  // Password verified against hash
  try {
    if (await argon2.verify(hashedUserPassword, password))
      return true
    else
      return false;
  }
  catch (err: any) {
    return err;
  }
}