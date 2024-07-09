import argon2 from 'argon2';

export const loginPasswordVerification = async (password :string, hashedUserPassword: string) => {

  // Password verified against hash
  if (await argon2.verify(hashedUserPassword, password))
    return true
  else
    return false;
}