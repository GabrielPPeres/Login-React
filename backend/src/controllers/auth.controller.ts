import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await registerUser({ email, password });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await loginUser({ email, password });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // true in prod (https). Local: false.
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1h
    });

    res.status(200).json({ ok: true, message: 'Logged in', user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  res.status(200).json({ ok: true, user: req.user });
};

export const logout = (req: Request, res: Response) => {
  res.cookie('token', '', { httpOnly: true, maxAge: 0 });
  res.status(200).json({ ok: true, message: 'Logged out' });
};