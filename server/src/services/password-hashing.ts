import argon2 from 'argon2';

export const hashPassword = async (password: string) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }
  catch (err) {
    throw new Error("Unable to complete password hashing...");
  }
}