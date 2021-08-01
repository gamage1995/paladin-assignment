import bcrypt from 'bcrypt';

const saltrounds = 10;

export const getHashedPassword = async (plainTextPassword: string) => {
  return await bcrypt.hash(plainTextPassword, saltrounds);
}

export const hashedMatchesPlain = async (plainTextPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}
