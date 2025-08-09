import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { findUserById } from '../repositories/user.repository';

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded: any = verifyToken(token);
    const user = await findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
