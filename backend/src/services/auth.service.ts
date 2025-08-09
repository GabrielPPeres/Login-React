import { findUserByEmail, createUser } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { CreateUser } from '../types/user.types';

export const registerUser = async (userData: CreateUser) => {
  const { email, password } = userData;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const passwordHash = await hashPassword(password);

  const newUser = await createUser({ email, passwordHash });

  return { ok: true, message: 'User created', user: { id: newUser.id, email: newUser.email } };
};

export const loginUser = async (userData: CreateUser) => {
  const { email, password } = userData;

  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({ id: user.id, email: user.email });

  return { token, user: { id: user.id, email: user.email } };
};
