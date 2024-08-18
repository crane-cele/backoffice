import { Router } from 'express';
import { register, login, confirmEmail } from '../controllers/AuthController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/confirm/:token', confirmEmail);

export default router;