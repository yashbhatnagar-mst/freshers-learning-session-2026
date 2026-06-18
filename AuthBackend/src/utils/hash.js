import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export const hash = async (value) => {
  return bcrypt.hash(value, SALT_ROUNDS);
};

export const compareHash = async (value, hashedValue) => {
  return bcrypt.compare(value, hashedValue);
};
