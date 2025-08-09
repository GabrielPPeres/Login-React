import { Router } from 'express';
import { register, login, getMe, logout } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation';
import { registerValidation, loginValidation } from '../hooks/useValidation';

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
import { authenticateToken } from '../middlewares/auth';

router.get('/me', authenticateToken, getMe);
router.post('/logout', logout);

export default router;
