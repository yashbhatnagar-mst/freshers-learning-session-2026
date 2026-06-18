import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { compareHash, hash } from "../utils/hash.js";
import apiError from "../utils/ApiError.js";

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw apiError(409, "User already exists");
  }

  const hashedPassword = await hash(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw apiError(401, "Invalid credentials"); // invalid email
  }

  const isPasswordValid = await compareHash(password, user.password); // req.body.password === user.password

  if (!isPasswordValid) {
    throw apiError(401, "Invalid credentials"); // invalid password
  }

  return user;
};
