import User, { IUser } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import {Types} from 'mongoose';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10');

export const createUser = async (payload: IUser) => {
  // 1. Validation
  if (!payload.password || payload.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // 2. Hashing
  const hash = await bcrypt.hash(payload.password, SALT_ROUNDS);
  
  // 3. Save
  const user = new User({
    username: payload.username,
    email: payload.email,
    password: hash, 
  });

  return await user.save();
};

export const loginUser = async (email: string, password: string) => {
  // 1. Βρες τον χρήστη
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Σύγκρινε το password με το hash στη βάση
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // 3. Δημιούργησε το JWT
  const secret = process.env.JWT_SECRET as string;

  // Ορίζουμε ρητά το expiresIn ως string για να ηρεμήσει η TypeScript
  const expiry: string = process.env.JWT_EXPIRES_IN || '24h';

  const token = jwt.sign(
  { id: user._id.toString() },
  secret,
  { expiresIn: expiry as any }
  );

  return { user, token };
};